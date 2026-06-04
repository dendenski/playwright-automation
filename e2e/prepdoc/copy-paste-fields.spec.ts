import { test, expect } from "@playwright/test";
import { AuthPage } from "../../pages/authPage";
import path from "path";

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(2000);
});

test("Prepare document, add signature copy paste signature widget, with QR code signing", async ({
  page,
}) => {
  const fileName = "Builder Contract Agreement.pdf";
  const auth = new AuthPage(page);

  await auth.gotoLogin();
  await auth.login(process.env.EMAIL!, process.env.PASSWORD!);
  await auth.expectDashboard();

  await page.getByRole("button", { name: "Prepare document" }).click();
  const filePath = path.resolve(__dirname, "../../fixtures/" + fileName);

  await page.locator('input[type="file"]').setInputFiles(filePath);
  await expect(page.getByText(fileName, { exact: false }).first()).toBeVisible({
    timeout: 30000,
  });
  await page.getByRole("button", { name: "Include me" }).click();
  await page.getByRole("button", { name: "Advanced settings" }).click();
  await page.getByRole("checkbox", { name: "QR Code Signing Enabled" }).check();
  await page.getByRole("button", { name: "Prepare document" }).click();
  await page.getByRole("button", { name: "Signature", exact: true }).click();
  await page
    .getByRole("button", { name: "Click or drag and drop to add" })
    .click();

  const webviewer = page.frameLocator('iframe[title="webviewer"]');
  await webviewer.locator("#pageWidgetContainer1").click();
  await webviewer.locator(".document").press("ControlOrMeta+c");
  await webviewer.locator(".document").press("ControlOrMeta+v");
  const pastedWidget = webviewer.locator("#pageWidgetContainer1").last();
  const box = await pastedWidget.boundingBox();

  if (box) {
    const centerTextX = box.x + box.width / 2;
    const centerTextY = box.y + box.height / 2;
    const startX = centerTextX + 20;
    const startY = centerTextY + 10;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.waitForTimeout(200);
    await page.mouse.move(startX - 300, startY - 200, { steps: 20 });
    await page.mouse.up();
  } else {
    throw new Error("Could not find the widget bounding box to drag!");
  }
  await page.getByRole("button", { name: "Send" }).click();
  await page.getByRole("button", { name: "Other actions" }).click();
  await page.getByRole("menuitem", { name: "Close" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
});

test("Prepare document, add signature copy paste signature widget, without QR code signing", async ({
  page,
}) => {
  const fileName = "Builder Contract Agreement.pdf";
  const auth = new AuthPage(page);

  await auth.gotoLogin();
  await auth.login(process.env.EMAIL!, process.env.PASSWORD!);
  await auth.expectDashboard();

  await page.getByRole("button", { name: "Prepare document" }).click();
  const filePath = path.resolve(__dirname, "../../fixtures/" + fileName);

  await page.locator('input[type="file"]').setInputFiles(filePath);
  await expect(page.getByText(fileName, { exact: false }).first()).toBeVisible({
    timeout: 30000,
  });
  await page.getByRole("button", { name: "Include me" }).click();
  await page.getByRole("button", { name: "Advanced settings" }).click();
  await page
    .getByRole("checkbox", { name: "QR Code Signing Enabled" })
    .uncheck();
  await page.getByRole("button", { name: "Prepare document" }).click();
  await page.getByRole("button", { name: "Signature", exact: true }).click();
  await page
    .getByRole("button", { name: "Click or drag and drop to add" })
    .click();

  const webviewer = page.frameLocator('iframe[title="webviewer"]');
  await webviewer.locator("#pageWidgetContainer1").click();
  await webviewer.locator(".document").press("ControlOrMeta+c");
  await webviewer.locator(".document").press("ControlOrMeta+v");
  const pastedWidget = webviewer.locator("#pageWidgetContainer1").last();
  const box = await pastedWidget.boundingBox();

  if (box) {
    const centerTextX = box.x + box.width / 2;
    const centerTextY = box.y + box.height / 2;
    const startX = centerTextX + 20;
    const startY = centerTextY + 10;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.waitForTimeout(200);
    await page.mouse.move(startX - 300, startY - 200, { steps: 20 });
    await page.mouse.up();
  } else {
    throw new Error("Could not find the widget bounding box to drag!");
  }
  await page.getByRole("button", { name: "Send" }).click();
  await page.getByRole("button", { name: "Other actions" }).click();
  await page.getByRole("menuitem", { name: "Close" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
});
