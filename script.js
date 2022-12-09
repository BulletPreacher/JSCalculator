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
                if (active == true) {
                    screenBottom.innerHTML = input;
                    active = false;
                } else if (screenBottom.innerHTML == "0") {
                    screenBottom.innerHTML = "";
                    screenBottom.innerHTML += input;
                } else {
                    screenBottom.innerHTML += input;
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

                if (count == 0) {
                    screenTop.innerHTML += screenBottom.innerHTML + input;
                    firstNumber = screenBottom.innerHTML;
                    lastOperator = input;
                } else if (count == 1) { //will only run on the second time
                    if (screenTop.innerHTML.includes("=")) {
                        console.log("lmao");
                        firstNumber=result;
                        console.log(result);
                        lastNumber=screenBottom.innerHTML;
                        lastOperator = input;
                        result = evaluate(firstNumber, lastNumber, lastOperator);
                        console.log("Equals: " + result)
                        screenTop.innerHTML=result + input
                    } else {
                        lastNumber = screenBottom.innerHTML;
                        console.log("count1:FirstNumber " + firstNumber)
                        console.log("count1:LastNumber " + lastNumber)
                        console.log("count1:Operator " + lastOperator)
                        result = evaluate(firstNumber, lastNumber, lastOperator);
                        console.log(result);
                        screenTop.innerHTML = result + input;
                        screenBottom.innerHTML = result;
                        lastOperator = input;
                        firstNumber = result;
                        console.log("Again  " + lastNumber);
                    }

                } else if (count >= 2) {
                    if (screenTop.innerHTML.includes("=")) {
                        firstNumber=result;
                        lastNumber=screenBottom.innerHTML;
                        result = evaluate(firstNumber, lastNumber, lastOperator);
                        console.log("Equals: " + result)
                        screenTop.innerHTML=result + input
                    } else {
                        lastNumber = screenBottom.innerHTML;
                        screenTop.innerHTML += screenBottom.innerHTML;
                        console.log("count2:FirstNumber " + firstNumber)
                        console.log("count2:LastNumber " + lastNumber)
                        console.log("count2:Operator " + lastOperator)
                        result = evaluate(firstNumber, lastNumber, lastOperator);
                        screenTop.innerHTML = result + input;
                        firstNumber = result;
                        lastNumber = screenBottom.innerHTML;
                        lastOperator = input;
                    }

                }

                active = true;
                count = count + 1;
                console.log("Overallcount" + count);

                break;

            /////////////////////////////////////////////////////////////////////////////////////////////////////

            case '=':
                if (screenBottom.innerHTML == "0") {
                    screenTop.innerHTML = "0=";
                } else {
                    lastNumber = screenBottom.innerHTML;
                    result = evaluate(firstNumber, lastNumber, lastOperator);
                    screenTop.innerHTML = firstNumber + lastOperator + lastNumber + "=";
                    screenBottom.innerHTML = result;
                    lastNumber = screenBottom.innerHTML;
                    firstNumber = result;
                    active = true;
                }

                break;
        }
    });
});

function evaluate(num1, num2, symbol) {
    if (symbol == "*") {
        result = parseFloat(num1) * parseFloat(num2);
    } else if (symbol == "/") {
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