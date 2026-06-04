# Playwright Automation

A Playwright test automation project for browser end-to-end testing.

## Setup

1. Use Node.js 22 with nvm:

```bash
nvm use 22
```

2. Install dependencies:

```bash
npm install
```

3. Run Playwright tests:

```bash
npx playwright test
```

4. Run tests in headed mode:

```bash
npx playwright test --headed
```

5. Generate test code interactively with Playwright Codegen:

```bash
npx playwright codegen <your-app-url> -o e2e/manual-recorded.spec.ts
```

For example:

```bash
npx playwright codegen https://sign-test.twala.io -o e2e/manual-recorded.spec.ts
```

## Project Structure

- `config/playwright.config.ts` - Playwright configuration file
- `e2e/` - End-to-end test files
- `fixtures/` - Test fixtures and test data
- `pages/` - Page object models and page helpers
- `reports/` - Generated report files
- `results/` - Test results output
- `test-results/` - Playwright test artifacts and traces
- `utils/` - Shared utilities and helper functions

## Notes

- This project uses `@playwright/test` for test execution.
- Update `package.json` scripts if you want to add aliases for common commands.
