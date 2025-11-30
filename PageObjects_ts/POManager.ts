import{LoginPage} from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { CheckoutPage } from './CheckoutPage';
import { OrdersHistoryPage } from './OrdersHistoryPage';
import { OrdersReviewPage } from './OrdersReviewPage';
import { CartPage } from './CartPage';
import { Page } from '@playwright/test';

export class POManager{

    loginPage:LoginPage;
    dashboardPage:DashboardPage;
    checkoutPage:CheckoutPage;
    ordersHistoryPage:OrdersHistoryPage;
    ordersReviewPage:OrdersReviewPage;
    cartPage:CartPage;
    page:Page;

constructor(page:Page){
    
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