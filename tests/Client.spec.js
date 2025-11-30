  const {test, expect} = require('@playwright/test')  //declare things here that we can use in below code like import ex: By importing expect it will all neccesary methods from expect to code


  test('Client Registration', async ({page})=>
    {

        await page.goto("https://rahulshettyacademy.com/client/");
        console.log(await page.title());
        await expect(page).toHaveTitle("Let's Shop");

        //Register link
        await page.locator("[class='btn1']").click();
        console.log(await page.locator("[class='login-title']").textContent());
        await page.locator("#firstName").fill("Maaaas");
        await page.locator("#lastName").fill("Karat");
        await page.locator("[type='email']").fill("dzdz11@gmail.com");
        await page.locator("[type='text']").fill("1223334444");
        await page.locator("[formcontrolname='occupation']").selectOption("3: Engineer");
       // await page.getByLabel("Male").check();
        await page.locator("[value='Female']").check();
        await page.locator("#userPassword").fill("Pass@123");
        await page.locator("#confirmPassword").fill("Pass@123");
        await page.locator("[type='checkbox']").check();
        await page.locator("#login").click();
        //console.log(await page.locator("#headcolor").textContent());
       // await page.locator("#headcolor").toContainText("Account Created Successfully");

        await page.locator("[class='btn btn-primary']").click();

        console.log(page.locator(".card-body b").allTextContents());
        
    });
    test ('Validate Order Id', async ({page})=>
      {
        await page.goto("https://rahulshettyacademy.com/client/");
        await page.locator("#userEmail").fill("dzdz@gmail.com");
        await page.locator("#userPassword").fill("Pass@123");
        await page.locator("#login").click();
        await page.waitForLoadState("networkidle");

      }
  
  )

  //Below code not completed, having few issues

   test('Client Login UI Controls', async ({page})=>
    {

        await page.goto("https://rahulshettyacademy.com/client/");
        console.log(await page.title());
        await expect(page).toHaveTitle("Let's Shop");


        const productName = "IPHONE 13 PRO";
        const productName2 = "ZARA COAT 3";
        const userName1 = page.locator("#userEmail");
        const userPwd = page.locator("#userPassword");
        const signIn = page.locator("#login");
        const products = page.locator(".card-body");



        await page.locator("#userEmail").fill("dzdz@gmail.com");
        await page.locator("#userPassword").fill("Pass@123");
        await page.locator("#login").click();
        
        //console.log(await page.locator(".card-body b").nth(1).textContent());
        await page.waitForLoadState("networkidle");
        console.log(await page.locator(".card-body b").allTextContents());

        //IPHONE 13 PRO
        const count = await products.count();
        for(let i=0; i<count; ++i){
        
            if(await products.nth(i).locator("b").textContent() === productName2){

              await products.nth(i).locator("text= Add To Cart").click();
              break;
            }

        await page.pause();

          await page.locator("[routerlink*='cart']").click();
          await page.locator("div li h3").first().waitFor();

          const booleanCart = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
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

    test('Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "dzdz@gmail.com";
   const productName = 'ZARA COAT 3';

   const products = page.locator(".card-body");

   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Pass@123");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();

   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 

   const count = await products.count();

   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 
   await page.locator("[routerlink*='cart']").click();
   //await page.pause();
 
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();

   await page.locator("text=Checkout").click();
   await page.locator("[placeholder*='Country']").pressSequentially("ind");
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();

   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");

   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }

   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
   console.log('Client Login UI Controls');
 
});

test('Screenshot', async({page}) =>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.locator('#displayed-text')).toBeVisible();
//await page.screenshot({path: '/Screenshots/capture.png'});
await page.screenshot({ path: 'Screenshot/screenshot.png', fullPage: true });
await page.locator("#hide-textbox").click();
await expect(page.locator('#displayed-text')).toBeHidden();


});
 


