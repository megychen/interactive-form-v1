// When page loaded, get the first text focused
$(document).ready(function() {
	  $("#name").focus();
});

// When option value is changed to other from drop down menu, creat and append input element to the fieldset
    var inputTitle = $("#other-title");
    inputTitle.hide();
    $("#title").on("change", function() {
        if ($(this).val() === "other") {
            inputTitle.show();
						inputTitle.focus();
        } else {
            inputTitle.hide().val("");
        }
    });

/* 1.Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
   2. If design is "Theme - JS Puns", display colors "Cornflower Blue," "Dark Slate Grey," and "Gold."
   3. If design is Theme - JS Puns, display colors "Tomato," "Steel Blue," and "Dim Grey."  */

if($("#design").val() !== "js puns" || $("#design").val() !== "heart js") {
	 $("#colors-js-puns").hide();
}
$("#design").on("change", function() {

     $("#colors-js-puns").show();
		 $("#color").children().hide();
     if($(this).val() === "js puns") {
       $("[value='cornflowerblue'], [value='darkslategrey'], [value='gold']").show().eq(0).prop("selected", "true");
     } else if($(this).val() === "heart js") {
       $("[value='tomato'], [value='steelblue'], [value='dimgrey']").show().eq(0).prop("selected", "true");
     } else {
       $("#color").children().prop("selected", "false");
       $("#color").children().show().eq(0).prop("selected", "true");
			 $("#colors-js-puns").hide();
     }
});

/* 1. If select a workshop, can not select another workshop at the same date and time(disable them)
   2. When user uncheck activity, don't disable the competiting activities
   3. Display the price of chosed activities */

var sum1 = 0; // Calculate total checked items' price
var sum2 = 0; // Calculate total  unchecked items' price
var finalPrice = 0; // To store final checked price
var totalPrice1 = 0; // Initilize total price of checked items' price 0
var totalPrice2 = 0; // Initilize total price of unchecked items' price 0

$(".activities input").on("change", function() {

    $("p.totalPrice").remove(); // Make sure clear last appended price info
		var focused = $(this); // Get currently focused item
		var checkboxText = focused.parent().text(); // Get currently focused item's parents text
    console.log(checkboxText);
		var timeStart = checkboxText.indexOf("—");
		var timeEnd = checkboxText.indexOf(",");
		var date = checkboxText.slice(timeStart + 1, timeEnd); // Find the string of workshop date
		var price = (/\d{3,}/.exec(checkboxText))[0]; // Find the price from workshop
		console.log(timeStart, timeEnd, date, price);

		// If currently focused item is checked, get it's parents siblings, and find if competiting workshop exist, then disable them
		if($(this).is(":checked")) {
				$(this).parent().siblings().each(function() {

				if($(this).text().indexOf(date) !== -1) {
          console.log("find competiting workshop...");
					$(this).children().prop("disabled", "true");
					$(this).css("color", "grey");
				}

			});
			sum1 = checked(price);
		} else { // If currently focused item is unchecked, enable it's competiting workshop
			$(this).parent().siblings().each(function() {
				if($(this).text().indexOf(date) !== -1) {
          console.log("find competiting workshop...");
					$(this).children().removeAttr("disabled");
					$(this).css("color", "black");
				}
			});
			sum2 = unchecked(price);
		}
    finalPrice = sum1 - sum2;
		var $displayPrice = $("<p class='totalPrice'>Total: $" + finalPrice + "</p>");
		$displayPrice.css("color", "lightblue");
		if(finalPrice > 0) {
				$(".activities").append($displayPrice); // Display workshop price when item selected
		} else {
			  $displayPrice.detach(); // If no item been selected, remove price info
		}
});

function checked(price) {
		totalPrice1 += parseInt(price);
		return totalPrice1;
}
function unchecked(price) {
	  totalPrice2 += parseInt(price);
	  return totalPrice2;
}
/*  1.The "Credit Card" payment option selected by default and result in the
    display of the #credit-card div, and hide the "Paypal" and "Bitcoin information.

    2.When a user selects the "PayPal" payment option, display the Paypal information,
    and hide the credit card information and the "Bitcoin" information.

    3.When a user selects the "Bitcoin" payment option, display the Bitcoin information,
    and hide the credit card information. */

$("option[value='credit card']").prop("selected", "true"); // By default, credit-card is selected
$("div > p").hide(); // By default, hide paypal and bitcoin information
$("#payment").on("change", function() {

     if($(this).val() === "credit card") {
       $("div > p").hide();
       $("#credit-card").show();
     } else if($(this).val() === "paypal") {
       $("div > p").eq(0).show();
       $("#credit-card").hide();
     } else if($(this).val() === "bitcoin") {
       $("div > p").eq(1).show();
       $("div > p").eq(0).hide();
       $("#credit-card").hide();
     } else {
       $("#credit-card").show();
       $("div > p").hide();
       $("option[value='credit card']").prop("checked", "true");
     }
});

/* Submit validate
  1. Name can't be empty
	2.Email field must be a validly formatted e-mail address
	3. At least one activity must be checked from the list under "Register for Actitivities."
	4. Payment option must be selected.
	5. If "Credit card" is the selected payment option, make sure the user supplied a credit card number, a zip code, and a 3 number CVV value.
*/

var $name_error = $("<p>Name: (Please input your name)</p>").css("color", "red");
var $mail_error = $("<p>Email: (Please provide a valid email address)</p>").css("color", "red");
var $tshirt_error = $("<p>Please don't forget to pick up a T-shirt</p>").css("color", "red");
var $checkbox_error = $("<p>Please select an activity</p>").css("color", "red");
var $payment_error = $("<p>Please select payment</p>").css("color", "red");
var $submit_info = $("<p>Submitted successfully!</p>").css("color", "green");
var flag1, flag2, flag3, flag4, flag5; // Mark up name, email, T-shirt, checkbox and payment if they valid
var flag6, flag7, flag8; // Mark up card-number, zip code and CVV if payment is credit-card

function validation() {
    console.log("Validate form...");
    // Valiadate if name is empty, then display error message
		var name = $("input[id='name']");
    if(name.val() === "") {
      name.prev().append($name_error);
			flag1 = false;
    } else {
			$name_error.detach();
			flag1 = true;
		}
		// Validate email address, them display error message if invalid
		var mail = $("input[type='email']").val();
		var validMailReg = (/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
		if(!(validMailReg.test(mail))) {
			$("input[type='email']").prev().append($mail_error);
			flag2 = false;
		} else {
      $mail_error.detach();
			flag2 = true;
		}

		// Validate T-shirt selection
		if($("option[value='js puns']").is(":selected") || $("option[value='heart js']").is(":selected")) {
			$tshirt_error.detach();
			flag3 = true;
		} else {
			$(".shirt legend").append($tshirt_error);
			flag3 = false;
		}


    // Validate checkbox, at least one checkbox selected, otherwise display error message
		var checkbox = $(".activities input");
		if(checkbox.is(":checked") === false) {
			$(".activities legend").append($checkbox_error);
			flag4 = false;
		} else {
      $checkbox_error.detach();
			flag4 = true;
		}
		// Validate payment info, at least one option selected, otherwise display error message
		if($("option[value='paypal']").is(':selected') || $("option[value='bitcoin']").is(':selected') || $("option[value='credit card']").is(':selected')) {
			$payment_error.detach();
			flag5 = true;
			console.log("payment is selected...");
		} else {
			$("#payment").prev().append($payment_error);
			flag5 = false;
		}
		// If credit card is selected, valiadate card number, zip code and CVV
		if($("option[value='credit card']").is(':selected')) {
			var creditCard = $("#cc-num").val(); // Get the string of credit card
			var creditCardArray = (creditCard).toString(10).split("").map(Number); //Convert the string of credit card to array
			var lastDigit = creditCardArray.pop(); // Pop the last digit of credit card
      creditCardArray.reverse(); // Reverse all digits in the array
      // Each number multiply 2 in odd position, then substract 9 if number greater than 9, then add all numbers
      var sum = 0;
			for(var i = 0; i < creditCardArray.length; i++) {
        if(i % 2 === 0) {
					creditCardArray[i] = creditCardArray[i] * 2;
				}
			}
			for(var j = 0; j < creditCardArray.length; j++) {
				if(creditCardArray[j] > 9) {
					creditCardArray[j] = creditCardArray[j] - 9;
				}
			}
			for(var z = 0; z < creditCardArray.length; z++) {
				sum += creditCardArray[z];
			}
			// If the sum of all numbers modula 10 is not equal to the last digit of pop up, card number is invalid
			if(sum % 10 === lastDigit && creditCardArray.length !== 0) {
				$("label[for='cc-num']").css("color", "black");
				flag6 = true;
			} else {
				$("label[for='cc-num']").css("color", "red");
        flag6 = false;

			}
			// If credit card zip is less than 5 or is not a number, display error message
			var noNumber = /[^0-9]/; // Check if have any character except digit
			if ( ($("#zip").val().length === 5) && !(noNumber.test($("#zip").val())) ) {
				$("label[for='zip']").css("color", "black");
				flag7 = true;
	    } else {
        $("label[for='zip']").css("color", "red");
				flag7 = false;
			}
			// If credit card cvv is less than 3 or is not a number, display error message
	    if ( ($("#cvv").val().length === 3) && !(noNumber.test($("#cvv").val())) ) {
				$("label[for='cvv']").css("color", "black");
				flag8 = true;
	    } else {
				$("label[for='cvv']").css("color", "red");
				flag8 = false;
			}

		} else if($("option[value='select_method']").is(":selected")){

			flag6 = false;
			flag7 = false;
			flag8 = false;
		} else {
			flag6 = true;
			flag7 = true;
			flag8 = true;
		}
		console.log(flag1, flag2, flag3, flag4, flag5, flag6, flag7, flag8);
    // If all required information is qualified, reset the form
		if(flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8) {
			$("form").append($submit_info);
      flag1 = false;
			flag2 = false;
			flag3 = false;
			flag4 = false;
			flag5 = false;
			flag6 = false;
			flag7 = false;
			flag8 = false;
      $("#name").focus();
			$("#name").val("");
			$("#mail").val("");
			$("#title option").removeAttr("selected");
			$("#size option[value='medium']").prop("selected", true);
			$("#design option").removeAttr("selected");
			$("#color option[value='cornflowerblue']").prop("selected", true);
			$(".activities input").removeAttr("checked");
			$(".activities input").removeAttr("disabled");
			$(".activities label").css("color", "black");
			$(".totalPrice").detach();
			$("option[value='credit card']").prop("selected", "true");
			$("#credit-card").show();
			$("label[for='cc-num']").css("color", "black");
			$("input[id='cc-num']").val("");
			$("label[for='zip']").css("color", "black");
			$("input[id='zip']").val("");
			$("label[for='cvv']").css("color", "black");
			$("input[id='cvv']").val("");

		} else {
			$submit_info.detach();
			$("#name").focus();
		}
}


$("button[type='submit']").on("click", function(e) {

		e.preventDefault();
		validation();
});
