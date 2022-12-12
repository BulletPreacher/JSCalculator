let allButtons = Array.from(document.getElementsByClassName('button'));
let screenTop = document.getElementById('top');
let screenBottom = document.getElementById('bottom');

screenTop.innerHTML = "";
screenBottom.innerHTML = "0";
let operatorClicked = "false"
let operatorClicked2 = "false"
let equalsClicked = "false"
let dotClicked = "false"
var lastNumber = 0;
var firstNumber = 0;
var lastOperator = "";
var result = 0;
var active = false;
var count = 0;

allButtons.forEach(button => {
    button.addEventListener('click', function handleClick(e) {
        let input = e.target.getAttribute("data-value");
        switch (input) {
            case 'AC':
                screenTop.innerHTML = "";
                screenBottom.innerHTML = "0";
                operatorClicked = "false"
                operatorClicked2 = "false"
                equalsClicked = "false"
                dotClicked = "false"
                firstNumber = 0
                lastNumber = 0;
                lastOperator = "";
                result = 0;
                active = false;
                count = 0;
                break;
            case 'del':
                if (screenBottom.innerHTML.length == 1) {
                    screenBottom.innerHTML = "0";
                } else {
                    screenBottom.innerHTML = screenBottom.innerHTML.slice(0, -1);
                }
                break;
            case '%':

                let divideHundred = parseFloat(screenBottom.innerHTML) / 100;
                screenBottom.innerHTML = divideHundred;

                break;

            /////////////////////////////////////////////////////////////////////////////////////////////////////

            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                if (active == true) {   //After operator used, overwrite last number with new input
                    screenBottom.innerHTML = input;
                    active = false;
                } else if (screenBottom.innerHTML == "0") { //Overwrites zero, eg. prevents 0002 being typed 
                    screenBottom.innerHTML = "";
                    screenBottom.innerHTML += input;
                } else {
                    screenBottom.innerHTML += input; //Active false && !="0", type normally
                }
                break;
            case '.':
                if (active == true) {   //After operator used, overwrite last number with 0.
                    screenBottom.innerHTML = "0" + input;
                    active = false;
                } else if (screenBottom.innerHTML.includes('.')) { //prevents double pressing .
                    return;
                } else if (screenBottom.innerHTML == "") { //If number empty, display default of 0.
                    screenBottom.innerHTML = "0";
                } else {
                    screenBottom.innerHTML += input; //Havent pressed operator, types normally
                }
                break;

            /////////////////////////////////////////////////////////////////////////////////////////////////////

            case '/':
            case '*':
            case '-':
            case '+':
                if (input == "*") {
                    input = "x";
                } else if (input == "/") {
                    input = "÷";
                }

                if (count == 0) {
                    if (screenTop.innerHTML.includes("=")) {//After operator pressed for first time, E.g 6 *
                        screenTop.innerHTML = `${screenBottom.innerHTML} ${input}`;
                        lastOperator = input;
                    } else {
                        screenTop.innerHTML += `${screenBottom.innerHTML} ${input}`; //6*
                        firstNumber = screenBottom.innerHTML; //6
                        lastOperator = input; //*
                    }
                } else if (count == 1) {        //After operator pressed again     
                    if (screenTop.innerHTML.includes("=")) { //If equals was pressed
                        firstNumber = result;
                        lastNumber = screenBottom.innerHTML;
                        lastOperator = input;
                        screenTop.innerHTML = `${lastNumber} ${input}`
                    } else {                   //After operator pressed and equals not pressed
                        lastNumber = screenBottom.innerHTML;
                        result = evaluate(firstNumber, lastNumber, lastOperator);
                        screenTop.innerHTML = `${result} ${input} `;
                        screenBottom.innerHTML = result;
                        lastOperator = input;
                        firstNumber = result;
                    }
                } else if (count >= 2) {
                    if (screenTop.innerHTML.includes("=")) {
                        lastNumber = screenBottom.innerHTML;
                        screenTop.innerHTML = `${result} ${input} `
                        lastOperator = input;
                    } else {
                        lastNumber = screenBottom.innerHTML;
                        screenTop.innerHTML += screenBottom.innerHTML;
                        result = evaluate(firstNumber, lastNumber, lastOperator);
                        screenTop.innerHTML = `${result} ${input} `;
                        firstNumber = result;
                        lastNumber = screenBottom.innerHTML;
                        lastOperator = input;
                    }

                }
                active = true;
                count = count + 1;
                break;

            /////////////////////////////////////////////////////////////////////////////////////////////////////

            case '=':
                if ((screenTop.innerHTML == "") && (screenBottom.innerHTML == "0")) {
                    screenBottom.innerHTML = "0";
                    screenTop.innerHTML = "0="
                } else if ((screenTop.innerHTML == "") && (screenBottom.innerHTML !== "0")) {
                    firstNumber = screenBottom.innerHTML;
                    screenTop.innerHTML = firstNumber + "="
                } else if (screenTop.innerHTML.includes("=")) {
                    result = evaluate(firstNumber, lastNumber, lastOperator);
                    screenTop.innerHTML = `${firstNumber} ${lastOperator} ${lastNumber} =`;
                    screenBottom.innerHTML = result;
                    firstNumber = result;
                } else {
                    lastNumber = screenBottom.innerHTML;
                    result = evaluate(firstNumber, lastNumber, lastOperator);
                    screenTop.innerHTML = `${firstNumber} ${lastOperator} ${lastNumber} =`;
                    screenBottom.innerHTML = result;
                    firstNumber = result;
                    active = true;
                }
                active = true;
                break;
        }
    });
});

function evaluate(num1, num2, symbol) {
    if (symbol == "x") {
        result = parseFloat(num1) * parseFloat(num2);
    } else if (symbol == "÷") {
        result = num1 / num2;
        if (result == "Infinity") {
            return "Stop it"
        } else {
            return result;
        }
    } else if (symbol == "-") {
        result = parseFloat(num1) - parseFloat(num2);
    } else if (symbol == "+") {
        result = parseFloat(num1) + parseFloat(num2);
    }
    return result;
}