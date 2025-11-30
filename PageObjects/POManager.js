const{DashboardPage}=require('./DashboardPage');
const{CheckoutPage}=require('./CheckoutPage');
const{LoginPage} = require('./LoginPage');
const {OrdersHistoryPage} = require('./OrdersHistoryPage');
const {OrdersReviewPage} = require('./OrdersReviewPage');
const {CartPage} = require('./CartPage');

class POManager{

constructor(page){
    
     this.page = page;
     this.loginPage = new LoginPage(this.page);
     this.dashboardPage = new DashboardPage(this.page);
     this.checkoutPage = new CheckoutPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    this.cartPage = new CartPage(this.page);

}

getLoginPage(){
    return this.loginPage;
}

getDashPage(){
    return this.dashboardPage;
}

getCheckOutPage(){
    return this.checkoutPage;
}

getOrdersHistoryPage()
{
    return this.ordersHistoryPage;
}

getOrdersReviewPage()
{
    return this.ordersReviewPage;
}

getCartPage(){

    return this.cartPage;

}
}
module.exports = {POManager};