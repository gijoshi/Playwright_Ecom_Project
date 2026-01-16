const { test: base } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');

const test = base.extend({
  pageObjectManager: async ({ page }, use) => {
    const poManager = new POManager(page);
    await use(poManager);
  },
});

module.exports = { test };
