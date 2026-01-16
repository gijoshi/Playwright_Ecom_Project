import {Page, test, expect} from '@playwright/test';
import { POManager } from '../PageObjects_ts/POManager';

//const dataSet = require('../utils/placeOrderTestData1.json');
 import dataSet from '../utils/placeOrderTestData1.json';

  for (const data of dataSet){


//test(`Client App login for ${dataSet.productName}`, async ({ page }) => {
test(`@web Client App login for ${data.productName}`, async ({ page}) => {
 
  //test('Client App login', async ({ page }) => {
   const poManager = new POManager(page);

    /*Login Page Flow */
   const loginPage = poManager.getLoginPage();
   await loginPage.gotoURL();
   await loginPage.validLogin(data.userName, data.passWord);
  
    /*Dashboard Page Flow */
   const dashboardPage = poManager.getDashPage();
   await dashboardPage.searchProductAddCard(data.productName);
   await dashboardPage.navigateToCart();
   
  /*Checkout Page Flow */
   const checkoutPage = poManager.getCheckOutPage();
  //await page.pause();
   await checkoutPage.checkoutFlow(data.productName);
 
  /*Orders Review Page Flow */
  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind","India");
  let orderId1:any;
  orderId1 = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId1);
  
  /*Orders History Page Flow */
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.navigateToOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId1);
  expect(orderId1.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});

}
