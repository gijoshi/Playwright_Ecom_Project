import{test, expect, Locator, Page} from '@playwright/test';

export class CartPage{
    cartProducts: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    checkout: Locator;
    page:Page;

constructor(page:Page)
{
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}

async VerifyProductIsDisplayed(productName: string)
{
   
    await this.page.waitForLoadState('networkidle');
    await this.cartProducts.waitFor();
    //const bool =await this.getProductLocator(productName).isVisible();
    console.log(await this.page.locator("h3:has-text('"+productName+"')").textContent());

    const bool = await this.page.locator("h3:has-text('"+productName+"')").isVisible();
    console.log("Is product visible in cart: " + bool);
    expect(bool).toBeTruthy();

}

async Checkout()
{
    await this.checkout.click();
}

 getProductLocator(productName: string): Locator
{
    return this.page.locator("h3:has-text('"+productName+"')");
}

}
module.exports = {CartPage};