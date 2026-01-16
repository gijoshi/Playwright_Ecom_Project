import { test, expect, Page } from '@playwright/test';
import customTest from '../utils/test-base';
import { POManager } from '../PageObjects_ts/POManager';
import { LoginPage } from '../PageObjects/LoginPage';

customTest('Client App login with base test data', async ({ page, testDataForOrder }) => {
   //js file- Login js, DashboardPage
   const uName = testDataForOrder.userName;
   const upwd = testDataForOrder.passWord;
   const productName = testDataForOrder.productName;    

    const loginFlow1 = new LoginPage(page)
    await loginFlow1.gotoURL();
    await loginFlow1.validLogin(uName, upwd);

    console.log("Login successful for user: " + uName);
    console.log("Product to add to cart: " + productName);

    // const dashBoardFlowNew = new DashBoardNew(page);
    // await dashBoardFlowNew.searchProductAndAddToCartNew(productName);
    // await dashBoardFlowNew.navigateToCart();
    
    // //await page.pause();
  
    // await page.locator("div li").first().waitFor();
    // const bool = await page.locator(`h3:has-text('${productName}')`).isVisible();
    // expect(bool).toBeTruthy();

    // await page.locator("text=Checkout").click();
});

