  const {test, expect} = require('@playwright/test');  //declare things here that we can use in below code like import ex: By importing expect it will all neccesary methods from expect to code
  const {POManager} = require('../PageObjects/POManager');

  //const dataSet = JSON.parse(JSON.stringify(('../utils/placeOrderTestData.json')));
  //const dataSet = require('../utils/placeOrderTestData.json');
  const dataSet = require('../utils/placeOrderTestData1.json');
 
  for (const data of dataSet){


//test(`Client App login for ${dataSet.productName}`, async ({ page }) => {
test(`@web Client App login for ${data.productName}`, async ({ page }) => {
 
  //test('Client App login', async ({ page }) => {

   const poManager = new POManager(page);
   //js file- Login js, DashboardPage
    //const userName = "dzdz@gmail.com";
    //const passWord = "Pass@123";
   // const productName = 'ZARA COAT 3';

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
 
  /*Cart Page Flow */
  //  const cartPage = poManager.getCartPage();
  //  console.log("Verifying product in cart: " + dataSet.productName);
  //  await cartPage.VerifyProductIsDisplayed(dataSet.productName);
   
    /*Orders Review Page Flow */
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId1 = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId1);
    
    /*Orders History Page Flow */
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.navigateToOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId1);
    expect(orderId1.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
 
});

}
