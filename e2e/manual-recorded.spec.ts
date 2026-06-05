import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://sign-test.twala.io/login?redirect=%2Fdashboard');
  await page.getByRole('textbox', { name: 'Input valid email' }).click();
  await page.getByRole('textbox', { name: 'Input valid email' }).fill('cypress_1780410871490@wshu.net');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1d^WSsKxL87F!o');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Prepare document' }).click();
  await page.getByText('Upload', { exact: true }).click();
  await page.getByRole('button', { name: ' Include me' }).click();
  await page.getByRole('button', { name: 'Prepare document' }).click();
  await page.getByRole('button', { name: 'Radio Button' }).click();
  await page.getByRole('button', { name: 'Click or drag and drop to add' }).click();
  await page.locator('button').filter({ hasText: 'Back' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
});