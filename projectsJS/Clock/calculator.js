const userInput = document.getElementById("userNumber");
const equalBtn = document.getElementById("btnEqual");
const clearBtn = document.getElementById("btnClear");
const buttons = document.querySelectorAll(".btn");

// Variables initialization to store numbers, operator, and calculation completion status
let num1 = "";
let num2 = "";
let operator = "";
let calculationFinished = false;

// Arrays for numbers and operators
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

// Function for clearing
function clearAll() {
  num1 = "";
  num2 = "";
  operator = "";
  calculationFinished = false;
  userInput.value = "0";
}

clearBtn.addEventListener("click", clearAll);

document
  .querySelector(".calculatorBlock")
  .addEventListener("click", (event) => {
    // Check if a button was clicked
    if (!event.target.classList.contains("btn")) return;
    // Check if the "C" button was clicked
    if (event.target.classList.contains("clear")) return;

    // Get the text content of the clicked button
    const key = event.target.textContent;

    // Check if the clicked button is a number
    if (numbers.includes(key)) {
      // Handling the current state
      if (num2 === "" && operator === "") {
        if (key !== "0" || num1.includes(".") || num1 === "") {
          num1 += key;
          userInput.value = num1;
        }
      } else if (num1 != "" && num2 != "" && calculationFinished) {
        num2 = key;
        userInput.value = num2;
        calculationFinished = false;
      } else {
        num2 += key;
        userInput.value = num2;
      }
      return;
    }

    // Check if the clicked button is a decimal point
    if (key === ".") {
      // Logic for handling the "." button to input decimal numbers
      if (!num2.includes(".") && num2 !== "") {
        num2 += key;
        userInput.value = num2;
      } else if (!num1.includes(".") && operator === "") {
        num1 += key;
        userInput.value = num1;
      }
      return;
    }

    // Check if the clicked button is an operator
    if (operators.includes(key)) {
      // Set the operator and display it in the input field
      operator = key;
      userInput.value = operator;
      return;
    }
  });

equalBtn.addEventListener("click", () => {
  // If the second number is not entered, it becomes equal to the first one
  if (num2 === "") num2 = num1;
  // Perform the arithmetic operation
  switch (operator) {
    case "+":
      num1 = parseFloat(num1) + parseFloat(num2);
      break;
    case "-":
      num1 = parseFloat(num1) - parseFloat(num2);
      break;
    case "*":
      num1 = parseFloat(num1) * parseFloat(num2);
      break;
    case "/":
      // Handling division by zero
      if (parseFloat(num2) === 0) {
        userInput.value = "error";
        num1 = "";
        num2 = "";
        operator = "";
        return;
      }
      num1 = parseFloat(num1) / parseFloat(num2);
      break;
  }
  // Set the calculation completion flag and display the result in the input field
  calculationFinished = true;
  userInput.value = num1;
});
