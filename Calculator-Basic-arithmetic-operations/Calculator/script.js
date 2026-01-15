let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay(){
    const display = document.getElementById('display');
    display.textContent = displayValue;
}

function appendNumber(num){
    if(waitingForSecondOperand){
        displayValue = num;
        waitingForSecondOperand = false;
    }else{
        displayValue += num;
    }
    updateDisplay();
}

function appendOperator(nextOperator){
    const inputValue = parseFloat(displayValue);

    if(firstOperand   === null){
        firstOperand = inputValue;
    }else if(operator){
        const result = performcalculation(firstOperand, inputValue, operator);
        displayValue = String(result);
        firstOperand = result;
    }
     
    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function performcalculation(first, second, op){
    switch(op){
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return first / second;
        default:
            return second;
    }
}

function calculate(){
    const inputValue = parseFloat(displayValue);

    if(operator && !waitingForSecondOperand){
        const result = performcalculation(firstOperand,inputValue,operator);
        firstOperand = null;
        displayValue = String(result);
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

function clearDisplay(){
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function deleteLast(){
    if(displayValue.length > 1){
        displayValue = displayValue.slice(operator,-1);
    }else{
        displayValue = '0';
    }
    updateDisplay();
}

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e,key <= '9'){
        appendNumber(e.key);
    }else if (e.key === '.'){
        appendNumber('.')
    }else if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
        appendOperator();
    }else if(e.key === 'Enter' || e.key === '='){
        calculate();
    }else if(e.key === 'Escape'){
        clearDisplay();
    }else if(e.key === 'Backspace'){
        deleteLast();
    }
});