const {test, expect, request} = require('@playwright/test');
const loginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
let token;
 
// test.beforeAll(async ()=>
// {
// const apiContext = await request.newContext();
// const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data: loginPayLoad})

//     expect(loginResponse.ok()).toBeTruthy();
//     const loginResponseJson = loginResponse.json();
//     token = await loginResponseJson.token;
//     console.log(loginResponseJson);
//     console.log(token);
// });



test.beforeAll(async () => {
   
    console.log('Before tests');

    const apiContext = await request.newContext();
    const loginresponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: loginPayLoad});
    let loginresponceJson = await loginresponse.json();
    token = await loginresponceJson.token;
    console.log(token);
})
 
test('@Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
   
    // await page.locator("#userEmail").fill(email);
    // await page.locator("#userPassword").fill("Iamking@000");
    // await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle');
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
  
    await page.locator("[placeholder*='Country']").type("ind");
  
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
    
});