class LoginPage{

constructor(page){
    this.page = page;
    this.userName = page.locator("#userEmail");
    this.passWord = page.locator("#userPassword");
    this.signInBtn = page.locator("[value='Login']");
}

async validLogin(userName1, passWord1){

    await this.userName.fill(userName1);
    await this.passWord.fill(passWord1);
    await this.signInBtn.click();
    await this.page.waitForLoadState('networkidle');
}

async gotoURL(){
    await this.page.goto("https://rahulshettyacademy.com/client");
}

}
module.exports = {LoginPage};