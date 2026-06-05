import { expect, Page } from "@playwright/test";
import path from "path";
export class DocsPage {
  constructor(private readonly page: Page) {}

  async prepareDocs(ischeck: boolean, fileName: string, field: string) {
    const filePath = path.resolve(__dirname, "../fixtures/" + fileName);
    await this.page.getByRole("button", { name: "Prepare document" }).click();

    const maxUploadAttempts = 2;
    const fileInput = this.page.locator('input[type="file"]');
    const uploadedFileText = this.page
      .getByText(fileName, { exact: false })
      .first();

    for (let attempt = 1; attempt <= maxUploadAttempts; attempt++) {
      try {
        // Clear any stuck/stale input states from a previous attempt
        await fileInput.setInputFiles([]);

        // Inject the file payload
        await fileInput.setInputFiles(filePath);

        // Fire a change event to force the web framework to notice the new file
        // await fileInput.dispatchEvent("change");

        // Wait up to 10 seconds per attempt for the UI to recognize the upload
        await expect(uploadedFileText).toBeVisible({ timeout: 15000 });

        // If it becomes visible, break out of the loop early and continue!
        break;
      } catch (error) {
        console.warn(`⚠️ File upload attempt ${attempt} failed or timed out.`);

        if (attempt === maxUploadAttempts) {
          // If both attempts fail completely, crash the test with a descriptive error
          throw new Error(
            `Upload stalled: "${fileName}" failed to display after ${maxUploadAttempts} attempts.`,
          );
        }

        console.log("🔄 Attempting to re-inject the file payload...");
        this.page.reload();
        await this.page.waitForLoadState("networkidle");
      }
    }

    await this.page.getByRole("button", { name: "Include me" }).click();
    await this.page.getByRole("button", { name: "Advanced settings" }).click();
    await this.page
      .getByRole("checkbox", { name: "QR Code Signing Enabled" })
      .setChecked(ischeck);
    await this.page.getByRole("button", { name: "Prepare document" }).click();
    await this.page.getByRole("button", { name: field, exact: true }).click();
  }
  async clickOrDrag() {
    await this.page
      .getByRole("button", { name: "Click or drag and drop to add" })
      .click();
  }

  async duplicateAndMoveWidget() {
    // 1. Define your WebViewer iframe context
    const webviewer = this.page.frameLocator('iframe[title="webviewer"]');

    // 2. Perform copy and paste commands inside the document canvas
    await webviewer.locator("#pageWidgetContainer1").click();
    await webviewer.locator(".document").press("ControlOrMeta+c");
    await webviewer.locator(".document").press("ControlOrMeta+v");

    // 3. Target the newly pasted widget instance
    const pastedWidget = webviewer.locator("#pageWidgetContainer1").last();

    // 4. Retrieve spatial dimensions to calculate drag positions
    const box = await pastedWidget.boundingBox();

    if (box) {
      // Calculate safe internal grab coordinates (shifted away from border handles)
      const centerTextX = box.x + box.width / 2;
      const centerTextY = box.y + box.height / 2;
      const startX = centerTextX + 10;
      const startY = centerTextY + 5;

      // Execute the physical mouse drag sequence
      await this.page.mouse.move(startX, startY);
      await this.page.mouse.down();

      // Give the WebViewer engine a split second to register the active grab state
      await this.page.waitForTimeout(200);

      // Smoothly glide the widget up and to the left
      await this.page.mouse.move(startX - 300, startY - 200, { steps: 20 });
      await this.page.mouse.up();
    } else {
      throw new Error("Could not find the widget bounding box to drag!");
    }
  }

  async SendDocumentOutForSignature() {
    await this.page.getByRole("button", { name: "Send" }).click();
    await this.page.getByRole("button", { name: "Other actions" }).click();
    await this.page.getByRole("menuitem", { name: "Close" }).click();
    await this.page.getByRole("button", { name: "Yes" }).click();
  }
  async SendDocumentForDraft() {
    await this.page.locator("button").filter({ hasText: "Back" }).click();
    await this.page.getByRole("button", { name: "Yes" }).click();
  }
}
