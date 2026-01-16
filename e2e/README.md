# E2E Test Structure

This directory contains all end-to-end tests organized in a modular structure.

## Directory Structure

```
e2e/
├── tests/                 # All test spec files (.spec.js, .spec.ts)
├── page-objects/          # Page Object Models for application pages
├── fixtures/              # Playwright test fixtures and setup
├── utils/                 # Utility functions (test data, helpers, etc.)
└── README.md             # This file
```

## Directories Overview

### tests/
Contains all Playwright test files (.spec.js, .spec.ts). These are the actual test cases that execute your scenarios.

**Files:**
- `Client.spec.js` - Client-related tests
- `ClientPageObject.spec.js` - Tests using page objects
- `ClientPageObjectwithMultipleData.spec.js` - Tests with multiple data sets
- `ScreenShot.spec.js` - Screenshot/visual testing
- And more...

### page-objects/
Contains Page Object Model (POM) classes that encapsulate page elements and interactions.

**Files:**
- `POManager.js` - Main page object manager
- `LoginPage.js` / `LoginPage.ts` - Login page object
- `DashboardPage.js` / `DashboardPage.ts` - Dashboard page object
- `CartPage.js` / `CartPage.ts` - Cart page object
- `CheckoutPage.js` / `CheckoutPage.ts` - Checkout page object
- `OrdersHistoryPage.js` / `OrdersHistoryPage.ts` - Orders page object
- `OrdersReviewPage.js` / `OrdersReviewPage.ts` - Review page object

### fixtures/
Contains Playwright test fixtures for test setup and teardown.

**Files:**
- `testFixtures.js` - Provides `pageObjectManager` fixture for tests

**Usage in tests:**
```javascript
const { test } = require('../fixtures/testFixtures');

test('Login test', async ({ pageObjectManager }) => {
  const loginPage = pageObjectManager.getLoginPage();
  await loginPage.enterEmail('user@example.com');
  // ... more test steps
});
```

### utils/
Contains utility files and test data.

**Files:**
- `test-base.js` - Base test utilities
- `test-base_ts.ts` - TypeScript version of base utilities
- `placeOrderTestData.json` - Test data for orders

## Running Tests

From the project root, use these commands:

```bash
# Run all e2e tests
npm run Regression

# Run specific test with grep
npm run web1

# Run tests in Firefox
npm run FireFox

# Run specific test file
npx playwright test e2e/tests/Client.spec.js

# Run tests with headed browser
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug
```

## Creating New Tests

1. Create a new file in `e2e/tests/` with naming pattern: `FeatureName.spec.js`
2. Import the test fixture: `const { test } = require('../fixtures/testFixtures');`
3. Use page objects from the fixture

**Example:**
```javascript
const { test } = require('../fixtures/testFixtures');

test('New feature test', async ({ pageObjectManager, page }) => {
  await page.goto('https://your-app.com');
  const loginPage = pageObjectManager.getLoginPage();
  await loginPage.login('email@test.com', 'password');
  // ... test assertions
});
```

## Creating New Page Objects

1. Create a new file in `e2e/page-objects/` with naming pattern: `PageName.js`
2. Export a class with methods for page interactions
3. Register it in `POManager.js`

**Example:**
```javascript
class NewPage {
  constructor(page) {
    this.page = page;
    // Define locators
    this.heading = page.locator('h1');
  }

  async clickButton() {
    await this.page.click('button');
  }
}

module.exports = { NewPage };
```

## Test Configuration

See [playwright.config.js](../../playwright.config.js) for:
- Browser configuration
- Timeout settings
- Reporter setup
- Base URL settings

## Reports

After running tests:
- **HTML Report**: `playwright-report/index.html`
- **Allure Report**: `allure-report/index.html`
- **Cucumber Report**: `cucumber-report.html` (for BDD tests)
