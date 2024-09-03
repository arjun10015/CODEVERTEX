document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button");
    const currentScreen = document.getElementById("currentOperationScreen");
    const lastScreen = document.getElementById("lastOperationScreen");

    let currentOperation = "";
    let previousOperation = "";
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.dataset.value;
            const action = button.dataset.action;

            if (action === "clear") {
                clearScreen();
            } else if (action === "calculate") {
                calculateResult();
            } else if (button.classList.contains("operator")) {
                selectOperator(value);
            } else {
                appendNumber(value);
            }
        });
    });

    function appendNumber(number) {
        if (currentOperation === "0") {
            currentOperation = number;
        } else {
            currentOperation += number;
        }
        updateScreen();
    }

    function selectOperator(selectedOperator) {
        if (currentOperation === "") return;
        if (previousOperation !== "") {
            calculateResult();
        }
        operator = selectedOperator;
        previousOperation = currentOperation;
        currentOperation = "";
        updateScreen();
    }

    function calculateResult() {
        if (previousOperation === "" || operator === null) return;
        const result = operate(previousOperation, currentOperation, operator);
        currentOperation = result;
        operator = null;
        previousOperation = "";
        updateScreen();
    }

    function clearScreen() {
        currentOperation = "0";
        previousOperation = "";
        operator = null;
        updateScreen();
    }

    function operate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case "+":
                return (a + b).toString();
            case "-":
                return (a - b).toString();
            case "*":
                return (a * b).toString();
            case "/":
                return b !== 0 ? (a / b).toString() : "Error";
            default:
                return b;
        }
    }

    function updateScreen() {
        currentScreen.textContent = currentOperation || "0";
        lastScreen.textContent = previousOperation + (operator ? ` ${operator}` : "");
    }
});
