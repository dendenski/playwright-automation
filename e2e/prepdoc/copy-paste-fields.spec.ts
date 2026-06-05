import { test, expect } from "@playwright/test";
import { AuthPage } from "../../pages/authPage";
import { DocsPage } from "../../pages/docsPage";
import { getRandomPDF } from "../../utils/randomUtils";

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(2000);
});

test("Prepare document, copy paste signature, with QR code signing", async ({
  page,
}) => {
  const fileName = getRandomPDF();
  const auth = new AuthPage(page);
  const docs = new DocsPage(page);
  const field = "Signature";

  await auth.gotoLogin();
  await auth.login(process.env.EMAIL!, process.env.PASSWORD!);
  await auth.expectDashboard();

  await docs.prepareDocs(true, fileName, field);
  await docs.clickOrDrag();

  await docs.duplicateAndMoveWidget();
  await docs.SendDocumentForDraft();
});

test("Prepare document, copy paste signature(Left Aligned), with QR code signing", async ({
  page,
}) => {
  const fileName = getRandomPDF();
  const auth = new AuthPage(page);
  const docs = new DocsPage(page);
  const field = "Signature (Left aligned)";

  await auth.gotoLogin();
  await auth.login(process.env.EMAIL!, process.env.PASSWORD!);
  await auth.expectDashboard();

  await docs.prepareDocs(true, fileName, field);
  await docs.clickOrDrag();

  await docs.duplicateAndMoveWidget();
  await docs.SendDocumentForDraft();
});

test("Prepare document, copy paste signature(Right Aligned), with QR code signing", async ({
  page,
}) => {
  const fileName = getRandomPDF();
  const auth = new AuthPage(page);
  const docs = new DocsPage(page);
  const field = "Signature (Right aligned)";

  await auth.gotoLogin();
  await auth.login(process.env.EMAIL!, process.env.PASSWORD!);
  await auth.expectDashboard();

  await docs.prepareDocs(true, fileName, field);
  await docs.clickOrDrag();

  await docs.duplicateAndMoveWidget();
  await docs.SendDocumentForDraft();
});

test("Prepare document, copy paste Text Field, with QR code signing", async ({
  page,
}) => {
  const fileName = getRandomPDF();
  const auth = new AuthPage(page);
  const docs = new DocsPage(page);
  const field = "Text Field";

  await auth.gotoLogin();
  await auth.login(process.env.EMAIL!, process.env.PASSWORD!);
  await auth.expectDashboard();

  await docs.prepareDocs(true, fileName, field);
  await docs.clickOrDrag();

  await docs.duplicateAndMoveWidget();
  await docs.SendDocumentForDraft();
});

test("Prepare document, copy paste Checkbox, with QR code signing", async ({
  page,
}) => {
  const fileName = getRandomPDF();
  const auth = new AuthPage(page);
  const docs = new DocsPage(page);
  const field = "Checkbox";

  await auth.gotoLogin();
  await auth.login(process.env.EMAIL!, process.env.PASSWORD!);
  await auth.expectDashboard();

  await docs.prepareDocs(true, fileName, field);
  await docs.clickOrDrag();

  await docs.duplicateAndMoveWidget();
  await docs.SendDocumentForDraft();
});

test("Prepare document, copy paste Radio Button, with QR code signing", async ({
  page,
}) => {
  const fileName = getRandomPDF();
  const auth = new AuthPage(page);
  const docs = new DocsPage(page);
  const field = "Radio Button";

  await auth.gotoLogin();
  await auth.login(process.env.EMAIL!, process.env.PASSWORD!);
  await auth.expectDashboard();

  await docs.prepareDocs(true, fileName, field);
  await docs.clickOrDrag();

  await docs.duplicateAndMoveWidget();
  await docs.SendDocumentForDraft();
});

test("Prepare document, copy paste Date Signed, with QR code signing", async ({
  page,
}) => {
  const fileName = getRandomPDF();
  const auth = new AuthPage(page);
  const docs = new DocsPage(page);
  const field = "Date Signed";

  await auth.gotoLogin();
  await auth.login(process.env.EMAIL!, process.env.PASSWORD!);
  await auth.expectDashboard();

  await docs.prepareDocs(true, fileName, field);

  await docs.duplicateAndMoveWidget();
  await docs.SendDocumentForDraft();
});

test("Prepare document, copy paste Email, with QR code signing", async ({
  page,
}) => {
  const fileName = getRandomPDF();
  const auth = new AuthPage(page);
  const docs = new DocsPage(page);
  const field = "Email";

  await auth.gotoLogin();
  await auth.login(process.env.EMAIL!, process.env.PASSWORD!);
  await auth.expectDashboard();

  await docs.prepareDocs(true, fileName, field);

  await docs.duplicateAndMoveWidget();
  await docs.SendDocumentForDraft();
});

test("Prepare document, copy paste Name, with QR code signing", async ({
  page,
}) => {
  const fileName = getRandomPDF();
  const auth = new AuthPage(page);
  const docs = new DocsPage(page);
  const field = "Name";

  await auth.gotoLogin();
  await auth.login(process.env.EMAIL!, process.env.PASSWORD!);
  await auth.expectDashboard();

  await docs.prepareDocs(true, fileName, field);

  await docs.duplicateAndMoveWidget();
  await docs.SendDocumentForDraft();
});

test("Prepare document, copy paste Initials, with QR code signing", async ({
  page,
}) => {
  const fileName = getRandomPDF();
  const auth = new AuthPage(page);
  const docs = new DocsPage(page);
  const field = "Initials";

  await auth.gotoLogin();
  await auth.login(process.env.EMAIL!, process.env.PASSWORD!);
  await auth.expectDashboard();

  await docs.prepareDocs(true, fileName, field);

  await docs.duplicateAndMoveWidget();
  await docs.SendDocumentForDraft();
});
