let tapSound = new Audio("audio/tap.mp3");
let success = new Audio("audio/success.mp3");
let fail = new Audio("audio/fail.mp3");
let error = new Audio("audio/error.mp3");

document.addEventListener("keydown", (e)=>{
    tapSound.play();
})

//random word
const words = [
    "apple", "banana", "cat", "dog", "fish", "grape", "house", 
    "ice", "jump", "kite", "lemon", "monkey", "nest", "orange", "pencil", 
    "queen", "rabbit", "sun", "tree"
    ];
let randomWord = words[Math.floor(Math.random() * words.length)];
console.log(randomWord);

//array from the random word
let wordArray = Array.from(randomWord);
console.log(wordArray)

let rows = document.querySelector(".rows");
let numberOfTries = wordArray.length;


for(let i = 1; i <=  numberOfTries ; i++){
    let row = document.createElement("div");
    row.className = `row${i}`;
    row.classList.add("row","disable");
    rows.appendChild(row);
    
    let span = document.createElement("span");
    span.textContent = `Try${i}`;
    row.appendChild(span);

    wordArray.forEach((letter)=>{
        let input= document.createElement("input");
        input.innerHTML= "";
        input.className = "input";
        input.maxLength = 1;
        row.appendChild(input);
    });
};



let currentRow = 1;
enable(currentRow);

function enable(currentRow){
    let current = document.querySelector(`.row${currentRow}`);
    current.classList.remove("disable");
    current.classList.add("enable");

    //disable the else
    for(let i = 1; i <= wordArray.length; i++){
        if(i!==currentRow){
            document.querySelector(`.row${i}`).classList.remove("enable");
            document.querySelector(`.row${i}`).classList.add("disable");
        }
    }

    //focus
    let inputs = current.querySelectorAll(".input");
    inputs[0].focus();


    inputs.forEach((input, index)=>{
        input.addEventListener("input",(e)=>{
            if(e.target.value && inputs[index+1]){
                inputs[index + 1].focus()
            }
        })
        input.addEventListener("keydown", (e)=>{
            if(e.key==="ArrowRight"){
                // e.preventDefault();
                if(inputs[index + 1]){
                    inputs[index + 1].focus();
                }  
            }

            if (e.key === "ArrowLeft") {
                e.preventDefault();
                if (inputs[index - 1]) {
                    inputs[index - 1].focus();  // Move to the previous input
                }
            }
        });
    });
    
};

let inputArray = [];
let counter = 0;
let checkBtn = document.querySelector(".check");
document.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        checkBtn.click();
    }
})
checkBtn.onclick = ()=>{
    tapSound.play();
    let inputValues = document.querySelectorAll(`.row${currentRow} .input`);
    let allValid = true;

    inputValues.forEach((inputValue)=>{
        if(inputValue.value==="" || inputValue.value===" " ){
            error.play();
            allValid = false;
            inputValue.style.border="solid red 2px";
        }else{
            inputValue.style.border="none";
        }
    })
    if(!allValid) return;
    inputArray = [];

    inputValues.forEach((i)=>{
        inputArray.push(i.value.toLowerCase());
    });

    console.log(inputArray)
    counter = 0;
    
    inputArray.forEach((inp, index)=>{

        if (inp===wordArray[index]) {
            inputValues[index].classList.add("in-place");
            counter++;
        }

        else if(wordArray.includes(inp)){
            inputValues[index].classList.add("founded");
        } 

        else{
            inputValues[index].classList.add("no");
        }
    })

    if(counter===inputArray.length){
        // alert("congrats you win!")
        document.querySelector(".the-result").innerHTML = "congrats you win!";
        success.play();
        document.querySelector(`.row${currentRow}`).classList.remove("enable");
        document.querySelector(`.row${currentRow}`).classList.add("disable");
    }else{
        if(currentRow<numberOfTries){
            currentRow++;
            enable(currentRow);
        }else{
            // alert("you loose!");
            document.querySelector(".the-result").innerHTML = "you lose!";
            fail.play();
            document.querySelector(`.row${currentRow}`).classList.remove("enable");
            document.querySelector(`.row${currentRow}`).classList.add("disable");
        }
    }
}

document.querySelector(".reset").onclick = ()=>{
    tapSound.play();
    let fields = document.querySelectorAll(".enable input");
    fields.forEach((i)=>{
        i.value = "";
    })
}
console.log("iiiiiiiii")
console.log(wordArray.indexOf("e"))

let hint = Math.floor(numberOfTries/2);
document.querySelector(".hint").onclick = ()=>{
    tapSound.play();
    if(hint===0) return;
    document.querySelectorAll(`.enable input`)[hint - 1].value = `${wordArray[hint - 1]}`;
    hint--;
    document.querySelector(".hint span").innerHTML = `${hint}`;
}


document.querySelector(".hint span").innerHTML = `${hint}`;