const colors = document.querySelectorAll(".circle div");
const scoreDisplay = document.querySelector(".score");
const gameArray = [];
const playerArray = [];
let score = 1;
let playerTurn = false;


const error = new Audio("audio/error.mp3")
const win = new Audio("audio/success.mp3")
const tap = new Audio("audio/tap.mp3")

//functions
function delay(color){
    setTimeout(() => {
        color.style.filter = "brightness(0.6)";
    }, 500);
} 

function playerGame(e){
    colors.forEach((color,index)=>{
        if(e === color){
            tap.play();
            playerArray.push(index);
            color.style.filter = "brightness(1)";
            delay(color);
            check();
        }
    });
}

function check(){
    for(let i = 0; i < playerArray.length; i++){
        if(playerArray[i] !== gameArray[i]){
            error.play();
            scoreDisplay.innerHTML = "Start";
            playerArray.length = 0;
            gameArray.length = 0;
            playerTurn = false;
            score = 1;
            return;
        }
    }
    if(playerArray.length === gameArray.length){
        win.play();
        score++;
        setTimeout(()=> game(score), 1000);
    }
}

function game(score){
    scoreDisplay.textContent = `${score}`;
    let rand = Math.floor(Math.random()*4);
    gameArray.push(rand);
    gameArray.forEach((play, index)=>{
        console.log("playing")
        setTimeout(() => {
            colors[play].style.filter = "brightness(1)";
            delay(colors[play]);
            if(gameArray.length-1 === index){
                setTimeout(() => {playerTurn = true;}, 500);
            }
        }, (index + 1) * 1000);
    });
    playerArray.length = 0;
    playerTurn = false;
}

document.addEventListener("click", (e)=>{
    if(e.target === scoreDisplay){
        tap.play();
        if(scoreDisplay.textContent === "Start"){
            game(score);
        }
    } 
    if(scoreDisplay.textContent !== "Start" && playerTurn ) {
        playerGame(e.target);
    }
});


















// const colors = document.querySelectorAll(".circle div");
// const scoreDisplay = document.querySelector(".score");
// let score = 1;
// const game = [];
// const player = [];

// function delay(color){
//     setTimeout(() => {
//         color.style.filter = "brightness(0.6)";
//     }, 800);
// }

// function gameColors(){
//     let rand = Math.floor(Math.random() * 4);
//     game.push(rand);
//     game.forEach((turn)=>{
//         setTimeout(() => {
//             colors[turn].style.filter = "brightness(1)";
//             delay(colors[turn]);
//         }, 1000);

//     })

// }

// document.addEventListener("click", (e)=>{
//     if(e.target === scoreDisplay){
//         if(scoreDisplay.textContent === "Start"){
//             scoreDisplay.innerHTML = `${score}`;
//             gameColors();
//         }
//     }
//     colors.forEach((color, index)=>{
//         if(e.target === color){
//             color.style.filter = "brightness(1)";
//             player.push(index)
//             delay(color);
//         }
//     })
// })

