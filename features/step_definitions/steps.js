const{Given, When, Then} = require('@cucumber/cucumber');
const {POManager} = require('../../PageObjects/POManager');
const {expect} = require('@playwright/test');
const playwright = require('playwright');


Given('Login into Ecom application with userName {string} and password {string}',{timeout: 100*1000}, async function (userName, passWord) {
           
        //    const browser = await playwright.chromium.launch({ headless: false });
        //    const context = await browser.newContext();
        //    const page = await context.newPage();

        //    this.browser = browser;
        //    this.context = context;
        //    this.page = page;

        //    this.poManager = new POManager(page);
           
           const loginPage = this.poManager.getLoginPage();
           await loginPage.gotoURL();
           await loginPage.validLogin(userName, passWord);

         });

When('Add product {string} to the cart',async function (productName) {
            
            const dashboardPage = this.poManager.getDashPage();
            await dashboardPage.searchProductAddCard(productName);
            await dashboardPage.navigateToCart();
         });

Then('Verify the product {string} is added to the cart',async function (productName) {
           
            const checkoutPage = this.poManager.getCheckOutPage();
            //await page.pause();
            await checkoutPage.checkoutFlow(productName);
         });


 When('Enter the details and place the order',async function () {
           
            const ordersReviewPage = this.poManager.getOrdersReviewPage();
            await ordersReviewPage.searchCountryAndSelect("ind","India");
            this.orderId1 = await ordersReviewPage.SubmitAndGetOrderId();
            console.log(this.orderId1);
         });


Then('Verify order is present in order history',async function () {
            
            const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
            await ordersHistoryPage.navigateToOrdersHistoryPage();
            await ordersHistoryPage.searchOrderAndSelect(this.orderId1);
            expect(this.orderId1.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
            console.log("Execution Completed Successfully");

         });

Given('Login into Ecom2 application with userName {string} and password {string}',async function (username1, password1) {
           // Write code here that turns the phrase above into concrete actions
           const userName = this.page.locator("#username");
           const password = this.page.locator("#password");
           const signIn = this.page.locator("#signInBtn");


           await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
           console.log(await this.page.title());

           await userName.fill(username1);
           await password.fill(password1);
           await signIn.click();
         });

Then('Verify Error message is shown for invalid login',async function () {
           // Write code here that turns the phrase above into concrete actions
           console.log(await this.page.locator("[style*='block']").textContent());
           await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
         });