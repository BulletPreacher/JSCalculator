let allButtons = Array.from(document.getElementsByClassName('button'));
let screenTop = document.getElementById('top');
let screenBottom = document.getElementById('bottom');


let operatorClicked = "false"
let operatorClicked2 = "false"
let equalsClicked = "false"
let dotClicked = "false"
let lastNumber = "0";
let lastOperator = "";
screenTop.innerHTML = "";
screenBottom.innerHTML = "0";

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
                lastNumber = "0";
                lastOperator = "";
                break;
            case 'del':
                if (screenBottom.innerHTML.length == 1) {
                    screenBottom.innerHTML = "0";
                } else {
                    screenBottom.innerHTML = screenBottom.innerHTML.slice(0, -1);
                }
                break;
            case '%':
                if (operatorClicked2 == true) {
                    let divideHundred = parseFloat(screenBottom.innerHTML) / 100;
                    screenBottom.innerHTML = divideHundred;
                }
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
                if (operatorClicked == true) {
                    screenBottom.innerHTML = input;
                    lastNumber = screenBottom.innerHTML;
                    operatorClicked = false;
                } else if (screenBottom.innerHTML == "0") {
                    screenBottom.innerHTML = "";
                    screenBottom.innerHTML += input;
                    lastNumber = screenBottom.innerHTML;
                } else {
                    screenBottom.innerHTML += input;
                    lastNumber = screenBottom.innerHTML;
                }
                break;
            case '.':
                if (screenBottom.innerHTML.includes('.')) {
                    return;
                } else if (screenBottom.innerHTML == "") {
                    screenBottom.innerHTML = "0";
                } else {
                    screenBottom.innerHTML += input;
                }
                break;

/////////////////////////////////////////////////////////////////////////////////////////////////////

            case '/':
            case '*':
            case '-':
            case '+':
                lastOperator = input;
                if (lastOperator == "*") {
                    lastOperator = "x";
                } else if (lastOperator == "/") {
                    lastOperator = "÷";
                }
                if (equalsClicked == true) {
                    screenTop.innerHTML = screenBottom.innerHTML + lastOperator;
                    equalsClicked = false;
                } else if (screenBottom.innerHTML == '') {
                    screenTop.innerHTML = "0" + lastOperator;
                } else if ((!isNaN(screenBottom.innerHTML)) && (isNaN(screenTop.innerHTML))) {
                    screenTop.innerHTML += screenBottom.innerHTML;
                    let result = evaluate(screenTop.innerHTML, lastOperator);
                    screenTop.innerHTML = result + lastOperator;
                    screenBottom.innerHTML = result;
                } else {
                    var moved = screenBottom.innerHTML;
                    screenTop.innerHTML = moved;
                    screenTop.innerHTML += lastOperator;
                }
                operatorClicked = true;
                operatorClicked2 = true;
                break;
                
/////////////////////////////////////////////////////////////////////////////////////////////////////

            case '=':
                if (equalsClicked == true) {
                    screenTop.innerHTML = screenBottom.innerHTML + lastOperator + lastNumber;
                    let result = evaluate(screenTop.innerHTML, lastOperator);
                    screenTop.innerHTML = screenBottom.innerHTML + lastOperator + lastNumber;
                    screenBottom.innerHTML = result;
                } else if (screenTop.innerHTML !== "") {
                    screenTop.innerHTML += screenBottom.innerHTML;
                    equalsClicked = true;
                    let result = evaluate(screenTop.innerHTML, lastOperator);
                    screenTop.innerHTML += "="
                    screenBottom.innerHTML = result;
                }
                break;
        }
    });
});

function evaluate(exString, symbol) {
    let num1 = parseFloat(exString.split(symbol)[0]);
    let num2 = parseFloat(exString.split(symbol)[1]);
    if (symbol == "x") {
        return result = num1 * num2;
    } else if (symbol == "÷") {
        result = num1 / num2;
        if (result == "Infinity") {
            return "Stop it"
        } else {
            return result;
        }
    } else if (symbol == "-") {
        return result = num1 - num2;
    } else if (symbol == "+") {
        return result = num1 + num2;
    }
}