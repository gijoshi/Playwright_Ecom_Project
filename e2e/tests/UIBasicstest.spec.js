const {test, expect} = require('@playwright/test');  //declare things here that we can use in below code like import ex: By importing expect it will all neccesary methods from expect to code
const { text } = require('stream/consumers');

test('Broswer context Playwright test', async ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Practice Page");

});

test('Page context Playwright test', async ({page})=>
    {
   
        await page.goto("https://google.co.in");
        console.log(await page.title());
       await expect(page).toHaveTitle("Google");
    
    });


test('UI Operations', async ({page})=>
    {
   
       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());

        const userName = page.locator("#username");
        const pwd = page.locator("[type='password']");
        const signInBtn = page.locator("#signInBtn");
        const dropDown1 = page.locator("select.form-control");
        const cardTitles = page.locator(".card-body a");
        const blinkText1 = page.locator("[href*='documents-request']");

        await dropDown1.selectOption("consult");

       await page.locator(".radiotextsty").last().click();
        await page.locator("#okayBtn").click();
       await page.locator("#terms").click();

        console.log(await page.locator(".radiotextsty").last().isChecked());
        await expect(page.locator(".radiotextsty").last()).toBeChecked();
        console.log(await page.locator("#terms").isChecked());
        await expect(page.locator("#terms")).toBeChecked();
        await page.locator("#terms").uncheck();
        expect(await page.locator("#terms").isChecked()).toBeFalsy();
        await expect(blinkText1).toHaveAttribute("class", "blinkingText");

        //
        // 
        // await page.pause();
    
    });

test('Login page practise', async ({browser})=>
    {

         const context = await browser.newContext();
         const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());

        const userName = page.locator("#username");
        const pwd = page.locator("[type='password']");
        const signInBtn = page.locator("#signInBtn");
        const dropDown1 = page.locator("select.form-control");
        const cardTitles = page.locator(".card-body a");

        
        //CSS
        // await userName.fill("Dilli");
        // //xpath
        // await pwd.fill("learningr");
        // await signInBtn.click();
        // console.log(await page.locator("[style*='block']").textContent());
        // await expect (page.locator("[style*='block']")).toContainText('Incorrect');

        // await userName.fill("");
        await userName.fill("rahulshettyacademy");
        await pwd.fill("learning");
        
        await signInBtn.click();
       
        // console.log(await cardTitles.first().textContent());
        // console.log(await cardTitles.nth(1).textContent());
    //    console.log(await cardTitles.first().textContent());
    //    console.log(await cardTitles.nth(1).textContent());
        // console.log(await cardTitles.last().textContent());
        
        await cardTitles.last().waitFor();
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles);



    });


test('Child windows handling', async ({browser})=> //only test case
{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] =await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])

    // const [newPage1, newPage2] =await Promise.all([
    //     context.waitForEvent('page'),
    //     documentLink.click(),
    // ])

    const text1 = await newPage.locator(".red").textContent();
    console.log(text1);
    const head1 = await newPage.locator("h1").textContent();
    console.log(head1);



});