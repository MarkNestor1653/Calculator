let currOperation = null;
let firstOperand = '';
let secondOperand = '';


const currOpScreen = document.getElementById('currOperation');
const lastOpScreen = document.getElementById('lastOperation');
const operatorButtons = document.querySelectorAll('[data-operator]');
const numberButtons = document.querySelectorAll('[data-number]');
const equalsButton = document.getElementById('equalsBtn');
const decimalButton = document.getElementById('decimalBtn');
const deleteButton = document.getElementById('deleteBtn');
const clearButton = document.getElementById('clearBtn');


operatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
)

numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

equalsButton.addEventListener('click', evaluate);
deleteButton.addEventListener('click', deleteNum);
clearButton.addEventListener('click', clear);
decimalButton.addEventListener('click', appendPoint);

function deleteNum() {
    currOpScreen.textContent = currOpScreen.textContent
        .toString()
        .slice(0, -1);
}

function appendPoint() {

    //appends 0 before decimal
    if (currOpScreen.textContent === '') {
        currOpScreen.textContent = '0';
    }
    currOpScreen.textContent += '.';
}

function appendNumber(number) {
    if (currOpScreen.textContent === '0') {
        resetScreen()
    }
    currOpScreen.textContent += number;
}

function setOperation(operator) {
    if (currOperation !== null) evaluate();
    firstOperand = currOpScreen.textContent;
    currOperation = operator;
    lastOpScreen.textContent = `${firstOperand} ${currOperation}`;
    resetScreen();
}

function evaluate() {
    //check for null operation when using equals button
    if (currOperation === null) return
    //check for div by 0, return error msg
    if (currOperation === '/' && currOpScreen.textContent === '0') {
        alert('You cannot divide by 0!')
        return
    }
    secondOperand = currOpScreen.textContent;
    currOpScreen.textContent = round(operate(currOperation, firstOperand, secondOperand));
    lastOpScreen.textContent = `${firstOperand} ${currOperation} ${secondOperand} =`;
    currOperation = null;
}

function resetScreen() {
    currOpScreen.textContent = '';
}

function clear() {
    lastOperation = null;
    currOperation = null;
    lastOpScreen.textContent = '';
    currOpScreen.textContent = '0';
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

//takes an operator and 2 numbers and then calls one of the above functions on the numbers.
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null
    }
}

function round(number) {
    return Math.round(number * 1000) / 1000
}

