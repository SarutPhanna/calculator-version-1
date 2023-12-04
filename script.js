const numberBtn = document.querySelectorAll("[data-number]");
const operationBtn = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const currentScreenText = document.querySelector("[data-operand-current]");
const prevScreenText = document.querySelector("[data-operand-prev]");

// Create a Calculator class for calculations
class Calculator {
  // Start
  constructor(currentScreenText, prevScreenText) {
    this.currentScreenText = currentScreenText;
    this.prevScreenText = prevScreenText;
    this.clear();
    // console.log(Calculator)
  }

  // Delete all
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = null;
  }

  // Delete last position
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // Add numbers
  appenNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand + number.toString();
  }

  flushOperator(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = ""; // Delete when click + - * /
  }

  // Collection of operators and calculations
  compute() {
    let computation;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = previous + current;
        break;
      case "-":
        computation = previous - current;
        break;
      case "x":
        computation = previous * current;
        break;
      case "÷":
        computation = previous / current;
        break;

      default:
        return;
    }
    this.currentOperand = computation; // Save answer
    this.previousOperand = "";
    this.operation = undefined;
  }

  // Update ScreenText
  updateDisplay() {
    this.currentScreenText.innerText = this.currentOperand;
    if (this.operation != null) {
      this.currentScreenText.innerText = `${this.previousOperand}${this.operation}${this.currentOperand}`;
    }
  }
} // End

const calculator = new Calculator(currentScreenText, prevScreenText);
console.log(prevScreenText);

numberBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appenNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

operationBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.flushOperator(btn.innerText);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
