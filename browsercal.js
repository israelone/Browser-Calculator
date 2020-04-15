let numbersButtons = Array.from(document.getElementsByClassName("numbers"));
let displayScreen = document.getElementById("input");
let preResultDisplay=document.getElementById("equation");
let operatorsButtons = Array.from(document.getElementsByClassName("operations"));
let equalButton = document.getElementById("operator");
let clearButton = document.getElementById("clear");
let mathArray = [];
let orderOfOperation = [];
let operatorsValues = [{symbol:"*", preference:3, associative:"left"}, {symbol:"/", preference:3, associative:"left"}, {symbol:"+", preference:2, associative:"left"}, {symbol:"-", preference:2, associative:"left"} ]

//Listen for user input 
numbersButtons.forEach(function(e){

    e.addEventListener("click", function(){
        
        displayScreen.textContent += this.textContent;
        preResultDisplay.textContent+=this.textContent;

    })
    
});

operatorsButtons.forEach(function(e){

    e.addEventListener("click", function(){

        mathArray.push(parseInt(displayScreen.textContent));
        preResultDisplay.textContent+=this.textContent;
        displayScreen.textContent="";
        mathArray.push(this.textContent);

    })
})  

equalButton.addEventListener("click", function(){
    
    mathArray.push(parseInt(displayScreen.textContent));
    
    if(isNaN(mathArray[mathArray.length-1])){

        displayScreen.textContent="Error";

    }

    else{
    
        preResultDisplay.textContent="";        
        displayScreen.textContent=sortArray(mathArray);
        mathArray.splice(0, mathArray.length);
        preResultDisplay.textContent+=displayScreen.textContent;
        orderOfOperation=[];

    }
       
})

clearButton.addEventListener("click", function(){

    mathArray=[];
    orderOfOperation=[];
    preResultDisplay.textContent="";
    displayScreen.textContent="";

})


//Iterates through user input and sort it using shunting yard algorithm
function sortArray(){

    let outputQueue = [];

    for(var i = 0; i < mathArray.length; i++){

        let inputPreference = 0;
        let stackPreference = 0;

        if(typeof(mathArray[i]) === "number"){

            outputQueue.push(mathArray[i]);

        }

        else{

            if(orderOfOperation.length-1>=0){ 
                
                //find operators preferences
                stackPreference = operatorsValues.find(element => element.symbol === orderOfOperation[orderOfOperation.length-1]);
                inputPreference = operatorsValues.find(element => element.symbol === mathArray[i]);
    
                    
                if(stackPreference.preference < inputPreference.preference){
                    
                    orderOfOperation.push(mathArray[i]);
                
                }
                
                
                else if(stackPreference.preference > inputPreference.preference){

                        orderOfOperation.reverse();
                        outputQueue.push(...orderOfOperation);
                        orderOfOperation = [];
                        orderOfOperation.push(mathArray[i]);

                }

                else if(stackPreference.preference === inputPreference.preference){

                    outputQueue.push(orderOfOperation[orderOfOperation.length - 1]);
                    orderOfOperation.splice(orderOfOperation.length-1, 1, mathArray[i]);

                }

            }

            else {

                orderOfOperation.push(mathArray[i]);

            }

        }

    }  

   orderOfOperation.reverse()
   outputQueue = outputQueue.concat(orderOfOperation);
   return calculator(outputQueue);

} 

//Calculates user input after it has been sorted
function calculator(arr){

    let stack=[];

    for(var i = 0; i < arr.length; i++){

        if(isNaN(arr[i])){

            stack.splice(stack.length - 2, 2, calculate(stack[stack.length - 2], arr[i], stack[stack.length - 1]));
        
        }

        else{

          stack.push(arr[i]);

        }

    }

    return stack;

}

function calculate(firstNumber, operator, secondNumber){
    
    switch(operator){

        case "*":
        return Math.round(10*(firstNumber * secondNumber))/10;
        break;

        case "/":
        return Math.round(10*(firstNumber / secondNumber))/10;
        break;
            
        case "+":
        return (firstNumber + secondNumber);
        break;

        case "-":
        return (firstNumber - secondNumber);
        break;

    }
        
}
   
 

