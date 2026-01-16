class LoginPageNew{

constructor(page){
    this.page = page;
    this.uName = page.locator("#userEmail");
    this.upwd = page.locator("#userPassword");
    this.usignInBtn = page.locator("[value='Login']");
}
async openURL(){
    await this.page.goto("https://rahulshettyacademy.com/client");
    //await this.page.goto("https://rahulshettyacademy.com/client");
}
async loginflowPage(userName, pwd){
    await this.uName.fill(userName);
    await this.upwd.fill(pwd);
    await this.usignInBtn.click();
    await this.page.waitForLoadState('networkidle');
}
}
module.exports = {LoginPageNew};