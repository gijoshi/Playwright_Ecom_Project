const { test, expect,request } = require('@playwright/test');
const loginPayload={userEmail: "subbu426@gmail.com", userPassword: "Subbu@123"};
const orderPayload={orders: [{country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};

let token;
let orderId;
//it run once before all tc1,tc2,tc3
test.beforeAll(async()=>{
  //LOgin API  
const apiContext=await request.newContext();
const loginResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
  {
      data:loginPayload
  })
expect(loginResponse.ok()).toBeTruthy(); //status code 200 check
const loginResponsejson=await loginResponse.json(); //fetching json response token,uid,message here as per app
token=loginResponsejson.token;
console.log(token);

//Create Order API
const createOrderResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
  {
      data:orderPayload,
      headers:{
        'Authorization':token,
        'content-type':'application/json'
      },
  })
  const orderResponsejson=await createOrderResponse.json();
  console.log(orderResponsejson);
  orderId=orderResponsejson.orders[0]; //store in array //see structure payload in onlinejson editor
});

test('@API Client App program E2E Scenario with normal',async ({page})=>
    {
   
       //place token value in local storage to skip login and directly navigate dashboard
       //session storage,cookies,local storage any can use for inject data a sper app
        page.addInitScript(value=>{
            window.localStorage.setItem('token',value)}
        ,token);//second token value coming from app //first one set name token 


//comment shift+alt+A
 await page.goto("https://rahulshettyacademy.com/client"); //directly login without login page and dashboard page open

await page.locator("button[routerlink*='myorders']").click();  //click my orders
await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");


for (let i = 0; i < await rows.count(); ++i) {
  const rowOrderId = await rows.nth(i).locator("th").textContent();  //fetch order id in table
  if (orderId.includes(rowOrderId)) {   //compare here
     await rows.nth(i).locator("button").first().click();   //click view button
     break;
  }
}
const orderIdDetails = await page.locator(".col-text").textContent(); //get order id in page
expect(orderId.includes(orderIdDetails)).toBeTruthy();  //compare with first order id and conf page both same
                    
});