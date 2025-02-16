const easy = document.querySelector(".easy");
const intermediate = document.querySelector(".intermediate");
const hard = document.querySelector(".hard");
const legend = document.querySelector(".legend");
const overlay = document.querySelector(".overlay");
const scoreDisplay = document.querySelector(".score span");
const holes = document.querySelectorAll(".the-game div");
let time = 0;
let score = 0;
scoreDisplay.innerHTML = `${score}`;
let mole = document.createElement("img");
mole.src = "mole.png";

document.addEventListener("click",(e)=>{
    if(e.target === easy){
        time = 1200;
        overlay.style.display = "none";
        startGame(time)
    }
    if(e.target === intermediate){
        time = 1000;
        overlay.style.display = "none";
        startGame(time)
    }
    if(e.target === hard){
        time = 800;
        overlay.style.display = "none";
        startGame(time)
    }
    if(e.target === legend){
        time = 400;
        overlay.style.display = "none";
        startGame(time)
    }
    if(e.target === mole){
        score++;
        scoreDisplay.innerHTML = `${score}`;
    }
})


function startGame(time){
    scoreDisplay.innerHTML = `${score}`;
    setInterval(()=>{
        let rand = Math.floor(Math.random() * 9);
        holes[rand].appendChild(mole);
    },time)

}

