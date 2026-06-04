import { test, expect } from "@playwright/test";
import { MailHelper } from "../../utils/mailHelper";
import { randomName, randomPassword } from "../../utils/randomUtils";
import { AuthPage } from "../../pages/authPage";

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(2000);
});

test("completes account lifecycle from signup to account deletion", async ({
  page,
}) => {
  const auth = new AuthPage(page);

  await MailHelper.init();
  const tempAccount = await MailHelper.createTempEmail();
  const firstName = randomName("Test");
  const lastName = randomName("User");
  const password = randomPassword();
  const fullName = `${firstName} ${lastName}`;

  await auth.gotoLogin();
  await auth.clickSignUpLink();
  await auth.fillSignupDetails({
    firstName,
    lastName,
    email: tempAccount.email,
    password,
  });
  await auth.submitSignup();

  const otp = await MailHelper.waitForOtp(
    tempAccount.email,
    tempAccount.password,
    60000,
  ).catch(() => null);

  console.log("Received OTP:", otp);
  if (otp) {
    expect(otp).toMatch(/^[0-9]{6}$/);
    await auth.enterOtpCode(otp);
  }

  await auth.skipOnboardingSteps();
  await auth.expectDashboard();

  await auth.logout(fullName);
  await auth.login(tempAccount.email, password);
  await auth.expectDashboard();

  await auth.deleteAccount(fullName);

  await MailHelper.deleteAccount(tempAccount.email, tempAccount.password);
});
