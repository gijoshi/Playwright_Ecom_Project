Feature: Ecom ordering a product and verifying
  @ErrorValidations
  Scenario: Placing a order
    Given Login into Ecom2 application with userName "dzdz1@gmail.com" and password "Pass@123"
    Then Verify Error message is shown for invalid login

  @Error2
  Scenario Outline: Scenario Outline name
    Given Login into Ecom2 application with userName "<UserName>" and password "<PassWord>"
    Then Verify Error message is shown for invalid login
    Examples:
        | UserName         | PassWord  |
        | dzdz1@gmail.com  | Pass@123  |
        | rahulshettyacademy | learning |
