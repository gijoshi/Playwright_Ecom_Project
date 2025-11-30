const {test, expect, request} = require('@playwright/test');
const { before } = require('node:test');
const loginPayload = {userEmail: "dzdz@gmail.com", userPassword: "Pass@123"}
let token;



test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
    const loginResponce = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: loginPayload})
    expect (loginResponce.ok()).toBeTruthy();

    const loginResponceJson = await loginResponce.json()
    token = loginResponceJson.token;
    const msg = loginResponceJson.message;
    console.log(token);
    console.log(msg);



});

 test('Client Login UI Controls', async ({page})=>
    {

        await page.addInitScript(value => {

            window.localStorage.setItem('token', value);
        }, token);

        const email = "";
        //const productName = "IPHONE 13 PRO";
        //const productName = "ZARA COAT 3";
        const productName = "ADIDAS ORIGINAL";
        await page.goto("https://rahulshettyacademy.com/client/");
        console.log(await page.locator(".card-body b").allTextContents());

        const count = await products.count();
        for(let i=0; i<count; ++i){
        
            if(await products.nth(i).locator("b").textContent() === productName){

              await products.nth(i).locator("text= Add To Cart").click();
              break;
            }

        await page.pause();

          await page.locator("[routerlink*='cart']").click();
          await page.locator("div li h3").first().waitFor();

          const booleanCart = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
          expect(booleanCart).toBeTruthy();
          await page.locator("button[type='button']").nth(last).click();
          //await page.locator("text=Checkout").click();
          await page.locator("[class='input txt text-validated']").nth(first).fill("1111 2222 3333 4444");
          //await expect(page.getByRole('div', { name: 'Credit Card Number ' })).toBeVisible();
          //await page.getByRole('input', { class: 'input txt text-validated' }).fill("1234 1234 1234 1234");
          await page.locator("[class='input txt']").nth(first).fill("123");
          await page.locator("[class='input txt']").nth(last).fill("Dilli ");
          await page.locator("[name='coupon']").fill("rahulshettyacadamy");
          await page.locator("[type='submit']").click();


          await page.pause();


          }
        
    });