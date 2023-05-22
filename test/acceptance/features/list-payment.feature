Feature: Compute Total Payment Data
  As a user of PaymentHub
  I want to compute the total number of payments processed till date
  so that I can utilise the information as required


  Scenario: Displaying the default data
    Given various processed payment requests exists for scheme:
      | scheme | paymentAmount                 |
      | SFI    | 100.50, 300.00, 5000.55, 2500 |
      | CS     | 20.50, 150.00, 2000.55, 1200  |
      | FDMR   | 100.50, 2500                  |
      | CB     | 5000.55, 2500, 123.12         |
    And there is a request to compute total payments processed till date for all schemes
    Then the response data should match:
      | Scheme | Payments | value   |
      | SFI    | 4        | 7901.05 |
      | CS     | 4        | 3371.05 |
      | FDMR   | 2        | 2600.50 |
      | CB     | 3        | 7623.67 |
