
let input = document.querySelectorAll(".input div");
let hang = document.querySelectorAll(".HangMan div");
let counter = 10;
let foundCounter = 0;
let gameOver = false;

const words = {
    programming: ["php", "go", "java", "cpp", "mysql", "python"],
    countries: ["syria", "aswan", "yemen", "Egypt", "japan", "Qatar", "cairo"],
    food: ["pizza", "burger", "donut", "shrimp", "rice", "tomato", "cake"],
    fruit: ["banana", "apple", "berry", "orange", "grape", "apple", "cherry"],
};

let randomTopic = Math.floor(Math.random()*Object.keys(words).length);
let randomWord = Math.floor(Math.random()*words[Object.keys(words)[randomTopic]].length);
let targetTopic = Object.keys(words)[randomTopic] ;
let targetWord = words[targetTopic][randomWord].toLowerCase();

document.querySelector(".chosen").innerHTML = "";
Array.from(targetWord).forEach(()=>{
    let newDiv = document.createElement("div");
    newDiv.className = "letter";
    document.querySelector(".chosen").appendChild(newDiv);
});

let output = document.querySelectorAll(".chosen .letter");

input.forEach((i)=>{   
    i.addEventListener("click", (e)=>{
        if(gameOver){
            return;
        }
        i.style = "display:none"
        console.log(e.target.innerHTML)

        let found = false;
            Array.from(targetWord).forEach((o,index)=>{
                if(o === e.target.innerHTML.toLowerCase()){
                    output[index].innerHTML = i.innerHTML || "";
                    found = true;
                    foundCounter++;
                }
            });
            if(!found){
                hang[counter].style.display = "block";
                counter--;
            }
            if(counter === -1){
                let result = document.querySelector(".result");
                result.innerHTML=`You Are Dead! the word was ${targetWord}`;
                gameOver = true;
            }

            if(foundCounter === targetWord.length){
                let result = document.querySelector(".result");
                result.innerHTML="You Survived!";
                gameOver = true;
            }
    });
});
            document.querySelector(".result").innerHTML = ` topic : ${targetTopic}`

// console.log(randomTopic)
// console.log(randomWord)
