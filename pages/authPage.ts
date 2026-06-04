import { expect, Page } from "@playwright/test";

export class AuthPage {
  constructor(private readonly page: Page) {}

  async gotoLogin() {
    await this.page.goto("/login");
  }

  async clickSignUpLink() {
    const signUpButton = this.page.getByText("Sign up for free");
    if (await signUpButton.count()) {
      await signUpButton.first().click();
      return;
    }
    await this.page
      .locator("a:has-text('Sign up'), button:has-text('Sign up')")
      .first()
      .click();
  }

  private async fillIfPresent(selector: string, value: string) {
    const locator = this.page.locator(selector);
    await locator.first().fill(value);
  }

  async fillSignupDetails({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    await this.fillIfPresent(
      'input[name=firstName], input[name=first_name], input[placeholder*="First"], input[id*=first]',
      firstName,
    );
    await this.fillIfPresent(
      'input[name=lastName], input[name=last_name], input[placeholder*="Last"], input[id*=last]',
      lastName,
    );
    await this.fillIfPresent(
      "input[name=email], input[type=email], input[id*=email]",
      email,
    );
    await this.fillIfPresent(
      "input[name=password], input[type=password], input[id*=password]",
      password,
    );
    const agreement = this.page.locator(
      'input[name="agreed"], input[name="agree"], input[type="checkbox"]',
    );
    if (await agreement.count()) {
      await agreement.first().check({ force: true });
    }
  }

  async submitSignup() {
    await this.page
      .locator(
        'button[type=submit], button:has-text("Create account"), button:has-text("Register"), input[type=submit]',
      )
      .first()
      .click();
  }

  async enterOtpCode(otp: string) {
    const inputs = this.page.locator(
      'input[aria-label^="Please enter OTP character"], input[name="otp"], input[name="verificationCode"], input[placeholder*="code"], input[id*=otp]',
    );
    if (await inputs.count()) {
      for (const [index, digit] of otp.split("").entries()) {
        await inputs.nth(index).fill(digit);
      }
      return;
    }
    await this.fillIfPresent(
      'input[name="otp"], input[name="verificationCode"], input[placeholder*="code"], input[id*=otp]',
      otp,
    );
  }

  async skipOnboardingSteps(times = 3) {
    for (let i = 0; i < times; i++) {
      const skipForNowButton = this.page.getByText("Skip for now");

      await expect(skipForNowButton).toBeVisible({ timeout: 30000 });
      await skipForNowButton.click();

      const skipAndVerifyLater = this.page.getByRole("button", {
        name: /skip and verify later/i,
      });
      await expect(skipAndVerifyLater).toBeVisible({ timeout: 10000 });
      await skipAndVerifyLater.click();
    }
  }

  async expectDashboard() {
    await expect(this.page).toHaveURL(/dashboard/, { timeout: 15000 });
  }

  async logout(fullName: string) {
    await this.page
      .getByRole("button", { name: fullName, exact: true })
      .click();
    await this.page.locator('[data-intercom-target="Logout"]').click();
    await this.page.getByRole("button", { name: "yes", exact: false }).click();
    await expect(this.page).toHaveURL(/login/, { timeout: 15000 });
  }

  async login(email: string, password: string) {
    await this.fillIfPresent(
      "input[type=email], input[name=email], input[id*=email]",
      email,
    );
    await this.fillIfPresent(
      "input[type=password], input[name=password], input[id*=password]",
      password,
    );
    await this.page.click('button[type="submit"]');
  }

  async deleteAccount(fullName: string) {
    await this.page
      .getByRole("button", { name: fullName, exact: true })
      .click();
    await this.page.locator('[data-intercom-target="Settings"]').click();
    await this.page.getByText("Delete account").click();
    await this.page
      .getByRole("button", { name: /yes|confirm/i })
      .click({ timeout: 5000 });
    await expect(
      this.page.locator('input[placeholder*="DELETE"]'),
    ).toBeVisible();
    await this.page.locator('input[placeholder*="DELETE"]').fill("DELETE");
    await this.page
      .getByRole("button", { name: /Delete my account/i })
      .click({ timeout: 5000 });
    await expect(this.page).toHaveURL(/\/account-deleted/, { timeout: 15000 });
  }
}
