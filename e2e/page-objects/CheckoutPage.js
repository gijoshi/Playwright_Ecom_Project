const {expect} = require('@playwright/test'); 
class CheckoutPage{

constructor(page){
    this.page = page;
    this.checkOut = page.locator("text=Checkout");
    this.waitForli =page.locator("div li");
    this.country = page.locator("[placeholder*='Country']");
    this.checkoutDropdown = page.locator(".ta-results");
    this.username = page.locator(".user__name [type='text']");
    this.submitButton = page.locator(".action__submit");


}

async checkoutFlow(productName){

    //await this.waitForli.first().waitFor();
    await this.waitForli.last().waitFor();
    //const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    const bool = await this.page.locator("h3:has-text('"+ productName +"')").isVisible();
    expect(bool).toBeTruthy();
    await this.page.screenshot({ path: 'Screenshot/screenshot1.png', fullPage: true });
    await this.checkOut.click();

    //Added below in another function in getOrdersReviewPage.js

    // await this.country.pressSequentially("ind");
    // const dropdown = this.page.locator(".ta-results");
    // await dropdown.waitFor();
    // const optionsCount = await dropdown.locator("button").count();
    // for (let i = 0; i < optionsCount; ++i) {
    //     const text = await dropdown.locator("button").nth(i).textContent();
    //     if (text === " India") { 
    //         await dropdown.locator("button").nth(i).click();
    //         break;
    //     }
    // }

    //expect((this.username).first()).toHaveText(userName);
    //await this.submitButton.click();
}



}

module.exports = {CheckoutPage};