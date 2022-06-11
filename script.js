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

function operate(num1, num2, operator) {
    switch (operator) {
        case '+': return(add(num1, num2));
        
        case '-': return(subtract(num1, num2));

        case '*': return(multiply(num1, num2));
        
        case '/': return(divide(num1, num2));
    }
}

const outputDiv = document.getElementById("output");
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener('click', (btn => {
        calcLogic(btn.target.id);
    }));
});

const keys = document.querySelector('body');
keys.addEventListener('keydown', key => {
    let regex = /\d|\+|\-|\*|\/|\=|\.|(Backspace)|(Enter)|(Delete)/;
    if (regex.test(key.key)) {
        calcLogic(key.key.toLowerCase());
    }
});

let i = 0, ansFlag = false, storage = [];
function calcLogic(input) {
    switch (input) {
        case '+':
            i++;
            storage[i] = "+";
            i++;
            break;
        case '-':
            i++;
            storage[i] = "-";
            i++;
            break;
        case '*':
            i++;
            storage[i] = "*";
            i++;
            break;
        case '/':
            i++;
            storage[i] = "/";
            i++;
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

function calcOutput() {
    if (!storage[i]) {
        if (i != 0) {
            outputDiv.innerHTML = storage[i - 1];
        }
    } else {
        outputDiv.innerHTML = storage[i];
    }   
}

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

function calcDecimal() {
    if (!storage[i]) {
        storage[i] = '0.';
    } else if (storage[i].includes('.')) {
        return;
    } else {
        storage[i] += ".";
    }
}

function calcBackspace() {
    if (!storage[i]) {
        return;
    } else if (storage[i].length <= 1) {
        storage[i] = '0';
    } else {
        storage[i] = storage[i].substr(0, storage[i].length - 1);
    }
}

function calcStorageClear() {
    storage.splice(0, storage.length);
    i = 0;
    storage[i] = '0';
}

function calcEquation() {
    i = 0;
    while (storage.length >= 3) {
        let num1 = parseFloat(storage[0]);
        let operator = storage[1];
        let num2 = parseFloat(storage[2]);
        storage[0] = operate(num1, num2, operator);
        storage.splice(1,2);
    }
    ansFlag = true;
}