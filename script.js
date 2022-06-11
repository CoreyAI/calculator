// Basic calculation logic.
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num1 == 0 || num2 == 0) {
        return "Divide by ZERO?! What have you done!"
    }
    return num1 / num2;
}

// Logic to determine which operation method to use.
function operate(num1, num2, operator) {
    switch (operator) {
        case '+': return(add(num1, num2));
        
        case '-': return(subtract(num1, num2));

        case '*': return(multiply(num1, num2));
        
        case '/': return(divide(num1, num2));
    }
}

// Variable used to insert numbers and operations into the output field of
// calculator.
const outputDiv = document.getElementById("output");

// Scans and stores button input on the calculator GUI.
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener('click', (btn => {
        calcLogic(btn.target.id);
    }));
});

// Scans and stores keyboard input.
const keys = document.querySelector('body');
keys.addEventListener('keydown', key => {
    let regex = /\d|\+|\-|\*|\/|\=|\.|(Backspace)|(Enter)|(Delete)/;
    if (regex.test(key.key)) {
        calcLogic(key.key.toLowerCase());
    }
});

// Initializing variables for calculation processing.
let i = 0, ansFlag = false, opFlag = false, storage = [];

// Main logic tree for calculator input.
function calcLogic(input) {
    switch (input) {
        case '+':
            calcOperation(input);
            break;
        case '-':
            calcOperation(input);
            break;
        case '*':
            calcOperation(input);
            break;
        case '/':
            calcOperation(input);
            break;
        case '.':
            calcDecimal();
            break;
        case 'clear':
            calcStorageClear();
            break;
        case 'delete':
            calcStorageClear();
            break;
        case 'backspace':
            calcBackspace();
            break;
        case '=':
            calcEquation();
            break;
        case 'enter':
            calcEquation();
            break;
        default:
            calcNumInput(input);
    }
    calcOutput();
}

// Controls which values are shown in output depending on what's stored in
// data.
function calcOutput() {
    if (!storage[i]) {
        if (i != 0) {
            outputDiv.innerHTML = storage[i - 1];
        }
    } else {
        outputDiv.innerHTML = storage[i];
    }   
}

// Handles numerical input based on calculator's previous operational state.
function calcNumInput(input) {
    if (!storage[i]) {
        storage[i] = '';
    } else if (storage[i] == '0') {
        storage[i] = input;
        return;
    } else if (storage[i].length >= 9) {
        return;
    } else if (ansFlag) {
        calcStorageClear();
        storage[i] = '';
    }
    storage[i] += input;
    ansFlag = false
}

// Concatenates a decimal to the numerical input based on current values and
// operational conditions.
function calcDecimal() {
    if (!storage[i] || ansFlag) {
        storage[i] = '0.';
        ansFlag = false;
    } else if (storage[i].includes('.')) {
        return;
    } else {
        storage[i] += ".";
        opFlag = false;
    }
}

// Removes a single digit from current input.
function calcBackspace() {
    if (!storage[i] || ansFlag) {
        return;
    } else if (storage[i].length <= 1) {
        storage[i] = '0';
    } else {
        storage[i] = storage[i].substr(0, storage[i].length - 1);
    }
}

// Clears all input data and sets 1st value to 0.
function calcStorageClear() {
    storage.splice(0, storage.length);
    i = 0;
    storage[i] = '0';
}

// Handles operational input based on stored data.
function calcOperation(input) {
    if (opFlag) {
        storage[i-1] = input;
    } else {
        i++;
            storage[i] = input;
            opFlag = true;
        i++;
    }
}

// Loops through stored input to generate a final output.
// Final output stored at i = 0 of data array for further processing. 
function calcEquation() {
    if (storage.length < 3) {
        return;
    }

    i = 0;
    while (storage.length >= 3) {
        let num1 = parseFloat(storage[0]);
        let operator = storage[1];
        let num2 = parseFloat(storage[2]);
        storage[0] = operate(num1, num2, operator);
        storage.splice(1,2);
    }
    ansFlag = true;
    opFlag = false;
}