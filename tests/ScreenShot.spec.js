const {test, expect} = require('@playwright/test');


test('Screenshot', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    console.log(await page.locator('#displayed-text').textContent());
    await page.locator('#displayed-text').screenshot({ path: 'Screenshot/screenshot12.png'});
    await expect(page.locator('#displayed-text')).toBeVisible();
    //await page.screenshot({path: '/Screenshots/capture.png'});
    await page.screenshot({ path: 'Screenshot/screenshot.png', fullPage: true });
    await page.locator("#hide-textbox").click();

    await expect(page.locator('#displayed-text')).toBeHidden();
});

test.only('Visual Testing', async ({page})=>
{
    await page.goto("http://spicejet.com/");
    expect(await page.screenshot()).toMatchSnapshot("Homepage.png");

});
