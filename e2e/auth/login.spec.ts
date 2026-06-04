import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");

  await page.fill('input[type="email"]', process.env.EMAIL!);
  await page.fill('input[type="password"]', process.env.PASSWORD!);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/dashboard/);
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(2000);
});

test("login and navigate to dashboard", async ({ page }) => {
  // perform login
});

test("login and logout", async ({ page }) => {
  // perform logout
  const fullName = `${process.env.FIRST_NAME} ${process.env.LAST_NAME}`;
  await page.getByRole("button", { name: fullName, exact: true }).click();
  await page.locator('[data-intercom-target="Logout"]').click();
  await page.getByRole("button", { name: "yes", exact: false }).click();
  await expect(page).toHaveURL(/login/);
});
