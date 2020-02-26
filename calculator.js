//ASSIGNMENT OF JS VARIABLES TO HTML OBJECTS
	var numArr = [];
	var oppArr = [];

	for(let i=0; i<10; i++){
		numArr[i]=document.getElementById("keypad").childNodes[2*i-1]; 
	}
	numArr[0]=document.getElementById("keypad").childNodes[9]; 

	//NOTE THAT THIS DECLARATION IS BUGGY AS IF 
	//I CHANGE THE HTML INSIDE THE BUTTON (TO HAVE MORE THAN ONE OBJECT)
	//THEN THE ASSIGNMENTS ABOVE WILL BE WRONG! 
	console.log(numArr);


	for(let i=0; i<7; i++){
		oppArr[i]=document.getElementById("operations").childNodes[2*i+1]; 
	}

	//NOTE THAT THIS DECLARATION IS BUGGY AS IF 
	//I CHANGE THE HTML INSIDE THE BUTTON (TO HAVE MORE THAN ONE OBJECT)
	//THEN THE ASSIGNMENTS ABOVE WILL BE WRONG! 
	console.log(oppArr);


	//variables for the display
	var inputDisplay = document.getElementById("input");
	var outputDisplay = document.getElementById("output");

//VARIABLE FOR STORING USER INPUT DATA, and FINAL OUTPUT
	var inputArr = [];
	var inputString = "";  
	var output; 

//FUNCTIONS TO UPDATE INPUT STRING, AND RESET OUTPUT STRING.
	function updateInput(){
		inputString = inputArr.join("");
		console.log(inputString);
		inputDisplay.innerHTML = inputString; //shouldn't use innerHTTML according to DOM tutorial
	}
	function resetOutput(){
		outputDisplay.innerHTML="output"; //shouldn't use innerHTTML according to DOM tutorial
	}

//EVENT LISTENERS
	//adds any input numbers user clicks to input string 
	for(let i=0; i<numArr.length; i++){
		numArr[i].addEventListener("click", function(){
			resetOutput();
			inputArr.push(i); 
			//might lead to bugs if html is changed
			updateInput();
		}, false); 

		//does the same as above but works for when you press keys on keyboard
		window.addEventListener("keypress", function(key){
          	if(key.keyCode == 48+i){
				resetOutput();
				inputArr.push(i); 
				//might lead to bugs if html is changed
				updateInput();
			}
		}, false);
	}

	//adds any operation buttons user clicks to the input string (excluding equals sign)
	for(let i=0; i<oppArr.length-1; i++){
		oppArr[i].addEventListener("click", function(){
			resetOutput();
			inputArr.push(document.getElementById("operations").childNodes[2*i+1].textContent);
			//might lead to bugs if html is changed
			updateInput();
		}, false);
	}

	
	//below adds keypresses for each of the operations
	window.addEventListener("keypress", function(key){
          	if(key.keyCode == 42){
				resetOutput();
				inputArr.push("*");
				updateInput();
			}else if(key.keyCode == 43){
				resetOutput();
				inputArr.push("+");
				updateInput();
			}else if(key.keyCode == 45){
				resetOutput();
				inputArr.push("-");
				updateInput();
			}else if(key.keyCode == 47){
				resetOutput();
				inputArr.push("/");
				updateInput();
			}else if(key.keyCode == 40){
				resetOutput();
				inputArr.push("(");
				updateInput();
			}else if(key.keyCode == 41){
				resetOutput();
				inputArr.push(")");
				updateInput();
			}else if(key.keyCode == 61 || key.keyCode == 13){
				evaluate(); 
			}
		}
	, false); 
	
	
	//Sets the output variable to evaluating the input string.
	//note: oppArr[oppArr.length-1] is the equals button.
	oppArr[oppArr.length-1].addEventListener("click", function(){
		evaluate();
	}, false); 
	
	
//FUNCTIONS USED BY EQUALS BUTTON

	//This function evaluates and does resetting etc. when equals button clicked (or enter pressed)
	function evaluate(){
		if(inputValid()){
			output = eval(inputString); //shouldn't use eval according to MDN
			console.log(output);
			inputDisplay.innerHTML = inputString + " =";
			outputDisplay.innerHTML = output.toString(); //shouldn't use innerHTTML according to DOM tutorial
		}else{
			//console.log(parenthesesCheckString);
			window.alert("Invalid input. Please try again.")
		}
		//Resets input
		inputArr = []; 
		inputString = ""; 
	}

	//These functions check if the user input is valid
	function inputValid(){
		//write function that checks if inputString is valid for evaluation
		//can also add feature that it edits input string if invalid expression is given by interpreting user input
		let parenthesesCheckString = inputString.replace(/[^()]/g, "");
		return validParentheses(parenthesesCheckString) && validOp();
	}

	function validOp(){
		let operationCheckString = inputString; //NEED TO WRITE THIS FUNCTION TO CHECK THAT VALID OPERATORS ARE USED (E.G. * FOLLOWED BY / FOR EXAMPLE IS NOT USED)
		return true;
		// write!
	}

	function validParentheses(parens){
	  let n = 0;
	  for(let i = 0; i < parens.length; i++){
	    if(parens[i] == '('){
	    	n++;	
	    } 
	    if(parens[i] == ')'){
	    	n--;	
	    } 
	    if(n < 0){
	    	return false;
	    }
	  }
	  return n == 0;
	}


//BELOW ADDS USER HISTORY SECTION
	/*var historySection = document.getElementById("calculationHistory").ul; 
	function addUserHistory(){
		let listNode = document.createElement("LI");
		listNode.appendChild(document.createTextNode(inputString + " = " + output.toString()))
		historySection.appendChild(listNode);
	}*/

	/*ALSO NEED TO FIX 5 BUTTON (WHICH ALSO DISPLAYS 0 WHEN CLICKED)--PERHAPS CSS ERROR.
