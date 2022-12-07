let allButtons = Array.from(document.getElementsByClassName('button'));
let screenTop = document.getElementById('top');
let screenBottom = document.getElementById('bottom');
screenTop.innerHTML = "";
screenBottom.innerHTML = "0";
var operatorClicked = "false"
var operatorClicked2 = "false"
var equalsClicked = "false"
var lastNumber = "0";
var lastOperator = "";


allButtons.forEach(button => {
    button.addEventListener('click', function handleClick(e) {
        let input = e.target.getAttribute("data-value");
        switch (input) {
            case 'AC':
                screenTop.innerHTML = "";
                screenBottom.innerHTML = "0";
                operatorClicked = "false"
                equalsClicked = "false"
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
                if (operatorClicked == true){
                   let  bob =  parseFloat(screenBottom.innerHTML)/100;
                   screenBottom.innerHTML=bob;
                }
                break;

            ///////////////////////////////////////////////////////////////////////////////////////////

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
                if (operatorClicked2 == true) {
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
                if (screenBottom.innerHTML == "") {
                    screenBottom.innerHTML = "0";
                } else {
                    screenBottom.innerHTML += input;
                }
                break;

            ///////////////////////////////////////////////////////////////////////////////////////////

            case '/':
            case '*':
            case '-':
            case '+':
                lastOperator = input;
                if(equalsClicked==true){
                    screenTop.innerHTML=screenBottom.innerHTML + input;
                    equalsClicked=false;
                }else if(screenBottom.innerHTML == '') {
                    screenTop.innerHTML = "0" + input;
                } else if ((!isNaN(screenBottom.innerHTML)) && (isNaN(screenTop.innerHTML))) {
                    screenTop.innerHTML += screenBottom.innerHTML;
                    let result = eval(screenTop.innerHTML);
                    console.log(lastNumber);
                    screenTop.innerHTML = result + input;
                    screenBottom.innerHTML = result;
                } else {
                    var moved = screenBottom.innerHTML;
                    screenTop.innerHTML = moved;
                    screenTop.innerHTML += input;
                }
                operatorClicked = true;
                operatorClicked2 = true;
                break;

            ///////////////////////////////////////////////////////////////////////////////////////////

            case '=':
                if (equalsClicked == true) {
                    screenTop.innerHTML = screenBottom.innerHTML + lastOperator + lastNumber;
                    let result = eval(screenTop.innerHTML);
                    screenTop.innerHTML = screenBottom.innerHTML + lastOperator + lastNumber;
                    screenBottom.innerHTML = result;
                    console.log(screenTop.innerHTML);
                    console.log(lastOperator);

                } else if (screenTop.innerHTML !== "") {
                    screenTop.innerHTML += screenBottom.innerHTML;
                    equalsClicked = true;
                    let result = eval(screenTop.innerHTML);
                    screenTop.innerHTML += "="
                    screenBottom.innerHTML = result;
                }
                break;
        }
    });
});

function evaluate() {


}