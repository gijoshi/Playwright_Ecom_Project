import { Page, expect, Locator } from "@playwright/test";

export class CheckoutPage{
    
    checkOut: Locator;
    waitForli: Locator;
    country: Locator;
    checkoutDropdown: Locator;
    username: Locator;
    submitButton: Locator;
    page:Page;

constructor(page:Page){
    
    this.page = page;
    this.checkOut = page.locator("text=Checkout");
    this.waitForli =page.locator("div li");
    this.country = page.locator("[placeholder*='Country']");
    this.checkoutDropdown = page.locator(".ta-results");
    this.username = page.locator(".user__name [type='text']");
    this.submitButton = page.locator(".action__submit");


}

async checkoutFlow(productName:String){

    //await this.waitForli.first().waitFor();
    await this.waitForli.last().waitFor();
    const bool = await this.page.locator("h3:has-text('"+ productName +"')").isVisible();
    expect(bool).toBeTruthy();
    await this.page.screenshot({ path: 'Screenshot/screenshot1.png', fullPage: true });
    await this.checkOut.click();
}

}

module.exports = {CheckoutPage};