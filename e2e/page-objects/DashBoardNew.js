class DashBoardNew{

constructor(page){
    this.page = page;
    this.products = page.locator(".card-body");
    this.productText = page.locator(".card-body b");
    this.AddToCartNew = page.locator("[routerlink*='cart']");
    this.HomeLinkCheck = page.locator("text=' Home '");

}

async searchProductAndAddToCartNew(productNameNew){

    //expect(this.HomeLinkCheck).toHaveText("Home");
    console.log("Home text: " + this.HomeLinkCheck.textContent());
    await this.productText.first().waitFor();
    
       const titles = await this.productText.allTextContents();
       console.log(titles); 
    
       const count = await this.products.count();
    
       for (let i = 0; i < count; ++i) {
          if (await this.products.nth(i).locator("b").textContent() === productNameNew) {
             //add to cart
             await this.products.nth(i).locator("text= Add To Cart").click();
             break;
          }
       }
     
}

async navigateToCart(){
    await this.AddToCartNew.click();
}

}
module.exports = {DashBoardNew};