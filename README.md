# interactive-form-v1

In this project, you'll create an interactive registration form for "FullStack Conf".

1.When the page loads, give focus to the first text field

2.Make sure you add an text input field
  Use the id of "other-title" for the field
  Add placeholder text of "Your Title" for the field

3.If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
  If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."

4.Some events are at the same time as others. If the user selects a workshop, don't allow selection of a workshop at the same date and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
  When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
  As a user selects activities to register for, a running total is listed below the list of checkboxes. For example, if the user selects "Main conference" then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
  
5.The "Credit Card" payment option should be selected by default and result in the display of the #credit-card div, and hide the "Paypal" and "Bitcoin information.
  When a user selects the "PayPal" payment option, display the Paypal information, and hide the credit card information and the "Bitcoin" information.
  When a user selects the "Bitcoin" payment option, display the Bitcoin information, and hide the credit card information.
  
6.Name field can't be empty
  Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example. You'll need to use a regular expression to get this requirement. 
  At least one activity must be checked from the list under "Register for Actitivities."
  Payment option must be selected.
  If "Credit card" is the selected payment option, make sure the user supplied a credit card number, a zip code, and a 3 number CVV value.
  
Extra Credit:

1.Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.

2.Style the "select" menus (drop down menus) on the form, so they match the styling of the text fields

3.Validate the credit card number to make sure it's entered in a valid format. You can use a plugin or write you own code.
