Feature: Ecom ordering a product and verifying
  @Regression
  Scenario: Placing a order
    Given Login into Ecom application with userName "dzdz1@gmail.com" and password "Pass@123"
    When Add product "ZARA COAT 3" to the cart
    Then Verify the product "ZARA COAT 3" is added to the cart
    When Enter the details and place the order
    Then Verify order is present in order history

 @Error2
  Scenario Outline: Scenario Outline name
    Given Login into Ecom2 application with userName "<UserName>" and password "<PassWord>"
    Then Verify Error message is shown for invalid login
    Examples:
        | UserName         | PassWord  |
        | dzdz1@gmail.com  | Pass@123  |
        | dzdz@gmail.com    | Pass@1234 |