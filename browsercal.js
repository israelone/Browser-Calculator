const numbers= Array.from(document.getElementsByClassName("numbers"));
let inputScreen=document.getElementById("input");
let operators=Array.from(document.getElementsByClassName("operations"));
let equal=document.getElementById("operator");


function add(num, num1){
    return num+num1;
}

function subtract(num, num1){
    return num-num1;
}

function multiply(num, num1){
    return num * num1;
}

function divide(num, num1){
    return num / num1;
}

function operate(){

    
}

numbers.forEach(function(e){
    e.addEventListener("click", function(){
        
        inputScreen.textContent+=this.textContent;
    })
});

operators.forEach(function(e){
    e.addEventListener("click", function(){
        let operation=e.innerHTML;
        console.log("click", e.innerHTML);
        let firstNumber=inputScreen.textContent;
        inputScreen.textContent="";
        console.log(typeof(firstNumber));
        console.log(typeof(e));
        
    equal.addEventListener("click", function(){
        let seconNumber=inputScreen.textContent;
        console.log(firstNumber, seconNumber);
        inputScreen.textContent="";
        
        inputScreen.textContent= firstNumber +e.innerHTML +seconNumber;
    })
        
    })
});