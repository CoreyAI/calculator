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
        break;
        
        case '-': return(subtract(num1, num2));
        break;
        
        case '*': return(multiply(num1, num2));
        break;
        
        case '/': return(divide(num1, num2));
        break;
    }
}

let buttonPress = '';
const outputDiv = document.getElementById("output");
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener('click', (btn => {
        // TODO: need to add logic for each button press.
        // insert function within listener to evaluate each button press
        // for appropriate actions (storing value, clearing values, 
        // operation, etc.)
        buttonPress = btn.target.id;
        outputDiv.innerHTML = buttonPress;
    }));
});

