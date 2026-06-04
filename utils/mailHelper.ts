import { request, APIRequestContext } from "@playwright/test";

export class MailHelper {
  private static api: APIRequestContext;

  // Initialize API context (call this once)
  static async init() {
    this.api = await request.newContext({
      baseURL: "https://api.mail.tm",
    });
  }

  static async getAvailableDomain(): Promise<string> {
    const res = await this.api.get("/domains");
    const body = await res.json();

    const domains = body["hydra:member"] || [];
    if (!domains.length) {
      throw new Error("No available mail.tm domains returned by API");
    }

    return domains[0].domain;
  }

  static async generatePassword(): Promise<string> {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  static async createTempEmail(address?: string, password?: string) {
    const emailPassword = password || (await this.generatePassword());

    let emailAddress: string;

    if (address) {
      emailAddress = address;
    } else {
      const domain = await this.getAvailableDomain();
      emailAddress = `pw_${Date.now()}@${domain}`;
    }

    const res = await this.api.post("/accounts", {
      data: {
        address: emailAddress,
        password: emailPassword,
      },
    });

    const body = await res.json();

    return {
      email: body.address,
      password: emailPassword,
      id: body.id,
    };
  }

  static async getToken(email: string, password: string): Promise<string> {
    const res = await this.api.post("/token", {
      data: {
        address: email,
        password,
      },
    });

    const body = await res.json();
    return body.token;
  }

  static async getMessages(token: string) {
    const res = await this.api.get("/messages", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await res.json();
    return body["hydra:member"] || [];
  }

  static async getMessage(messageId: string, token: string) {
    const res = await this.api.get(`/messages/${messageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  }

  static parseOtpFromMessage(message: any): string | null {
    const content = [message.subject, message.text, message.html]
      .filter(Boolean)
      .join(" ");

    const match = content.match(/\b(\d{6})\b/);
    return match ? match[1] : null;
  }

  static async waitForOtp(email: string, password: string, timeout = 30000) {
    const token = await this.getToken(email, password);
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const messages = await this.getMessages(token);

      if (messages.length > 0) {
        const latest = messages[0];
        const fullMessage = await this.getMessage(latest.id, token);

        const otp = this.parseOtpFromMessage(fullMessage);

        if (otp) return otp;
      }

      await new Promise((r) => setTimeout(r, 2000));
    }

    throw new Error(`OTP not found within ${timeout}ms`);
  }

  static async deleteAccount(email: string, password: string) {
    const token = await this.getToken(email, password);

    const meRes = await this.api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const me = await meRes.json();

    await this.api.delete(`/accounts/${me.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
