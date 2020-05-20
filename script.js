let input = ['0'];
let index = 0;
/*Boolean used to check if last input was equals, if so handle next click appropriately and toggle*/
let ansExists = false;

let operators = ['+', '-', '÷', '×'];
let ops = ['+', '-', '/', '*'];

let numBtns = document.querySelectorAll('.num');
let opBtns = document.querySelectorAll('.op');

let clearE = document.getElementById('ce');
let clear = document.getElementById('c');
let decBtn = document.getElementById('decimal');
let eqBtn = document.getElementById('equal');

let inputBar = document.getElementById('inputBar');
let result = document.getElementById('resultWindow');

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

function operate() {

    let answer;
    while (input.indexOf('×') > -1 || input.indexOf('÷') > -1) {
        const nextOp = input.findIndex(value => value == '×' || value == '÷');
        switch (input[nextOp]) {
            case '×':
                answer = multiply(Number(input[nextOp - 1]), Number(input[nextOp + 1]));
                input.splice(nextOp - 1, 3, answer);
                break;
            case '÷':
                answer = divide(Number(input[nextOp - 1]), Number(input[nextOp + 1]));
                input.splice(nextOp - 1, 3, answer);
                break;
        }
    }
    while (input.indexOf('+') > -1 || input.indexOf('-') > -1) {
        const nextOp = input.findIndex(value => value == '+' || value == '-');
        switch (input[nextOp]) {
            case '+':
                answer = add(Number(input[nextOp - 1]), Number(input[nextOp + 1]));
                input.splice(nextOp - 1, 3, answer);
                break;
            case '-':
                answer = subtract(Number(input[nextOp - 1]), Number(input[nextOp + 1]));
                input.splice(nextOp - 1, 3, answer);
                break;
        }
    }
    input[0] = parseFloat(input[0].toFixed(4));
    result.textContent = input[0];
    index = 0;
    ansExists = true;
}

for (let i = 0; i < numBtns.length; i++) {
    numBtns[i].addEventListener('click', () => {
        getNumber(numBtns[i]);
    });
}

function getNumber(numBtn) {
    /*if you enter a key after getting a solution, reset expression*/
    if (ansExists) {
        ansExists = false;
        clearResults();
    }
    if (operators.includes(input[index])) {
        index++;
    }
    /*if previously entered a zero, simply replace it*/
    if (input[index] === '0') {
        deleteOne();
        input[index] = numBtn.textContent;
        addContent(numBtn.textContent);
    }
    else if (input[index] == undefined) {
        result.textContent = '';
        input[index] = numBtn.textContent;
        addContent(numBtn.textContent);
    }
    else {
        input[index] += numBtn.textContent;
        addContent(numBtn.textContent);
    }

}

for (let i = 0; i < opBtns.length; i++) {
    opBtns[i].addEventListener('click', () => {
        getOperator(opBtns[i].textContent);
    })
}

function getOperator(opBtn) {
    if (ansExists) {
        ansExists = false;
        inputBar.textContent = input[0];
    }

    if (index === 0 && input[index] === undefined) {
        /*do nothing, can't start expression with an operator*/
    }
    else if (operators.includes(input[index])) {
        input[index] = opBtn;
        inputBar.textContent = inputBar.textContent.slice(0, -2);
        inputBar.textContent += input[index] + ' ';
    }
    else {
        index++;
        input[index] = opBtn;
        inputBar.textContent += ' ' + opBtn + ' ';
    }
}

/*refresh result window before displaying new number, 
i.e. after operator or equals is clicked*/
function refresh(window) {
    window.textContent = '';
}

function addContent(text) {
    result.textContent += text;
    inputBar.textContent += text;

}
/*clear all stored data*/
function clearResults() {
    input = ['0'];
    index = 0;
    result.textContent = '';
    inputBar.textContent = '';
}

function deleteOne() {
    /*if you just got answer, using clear will wipe results*/
    if (ansExists) {
        clearResults();
    }
    /*if you hit an operator, you have to slice more due to added spacing*/
    else if (operators.includes(input[index])) {
        inputBar.textContent = inputBar.textContent.slice(0, -3);
        sliceOutput();
    }

    else {
        inputBar.textContent = inputBar.textContent.slice(0, -1);
        sliceOutput();
    }
}

function sliceOutput() {
    result.textContent = result.textContent.slice(0, -1);
    let temp = input[index].toString();
    temp = temp.slice(0, -1);
    input.splice(-1, 1);
    input[index] = temp;
    if (input[index] === '' && index > 0) {
        index--;
    }

}

function addDecimal(){
    if (ansExists) {
        ansExists = false;
        clearResults();
    }
    if (input[index].includes('.')) {
        /*do nothing*/
    }
    else if (operators.includes(input[index])) {
        index++;
        input[index] = '.';
        inputBar.textContent += '.';
        result.textContent = '.';
    }
    else {
        input[index] += '.';
        inputBar.textContent += '.';
        result.textContent += '.';
    }
}

decBtn.addEventListener('click', () => {
    addDecimal();
});

eqBtn.addEventListener('click', operate);
clearE.addEventListener('click', clearResults);
clear.addEventListener('click', deleteOne);


/*keyboard support*/
document.addEventListener('keyup', (e) => {
    for (let i = 0; i < numBtns.length; i++) {
        if (e.key === numBtns[i].textContent) {
            getNumber(numBtns[i]);
        }
    }
    switch (e.key) {
        case '+':
            getOperator('+');
            break;
        case '-':
            getOperator('-');
            break;
        case '*':
            getOperator('×');
            break;
        case '/':
            getOperator('÷');
            break;
        case 'Backspace':
            deleteOne();
            break;
        case '.':
            addDecimal();
            break;
        case 'Enter':
            operate();
            break;
    }
});

