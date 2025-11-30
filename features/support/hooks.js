const playwright = require('playwright');
const {POManager} = require('../../PageObjects/POManager');

// Import the Before function
const { Before, After, AfterStep } = require('@cucumber/cucumber')

Before(async function () {

    const browser = await playwright.chromium.launch({ headless: false });      
    const context = await browser.newContext();
    const page = await context.newPage();
    this.browser = browser;
    this.context = context;
    this.page = page;
    this.poManager = new POManager(this.page);
})

After(async function () {
    await this.browser.close();
})

AfterStep(async function ({ pickle, result }) {
    if (result.status === 'FAILED') {
        const screenshot = await this.page.screenshot({ path: `screenshots/${pickle.name.replace(/ /g, '_')}.png` });
        this.attach(screenshot, 'image/png');
    }
});

