const UIElements = {
    mood : document.querySelector(".mood"),
    sound : document.querySelector(".sound") ,
    time : document.querySelector(".time") ,
    timeOf : document.querySelector(".session"),
    stats : document.querySelector(".stats span"),
    btns:{
        start : document.querySelector(".start"),
        reset : document.querySelector(".reset"),
    },
    duration : {
        work : document.querySelector(".work"),
        break : document.querySelector(".break"),
    }
}
// window.localStorage.clear();
const alarm = new Audio("finish.mp3");
let isSilent = JSON.parse(window.localStorage.getItem("isSilent")) ?? false;
UIElements.sound.classList.toggle("fa-volume-high", !isSilent);
UIElements.sound.classList.toggle("fa-volume-xmark", isSilent);

//change theme
let darkTheme = JSON.parse(window.localStorage.getItem("darkTheme")) ?? false;
toggleTheme(darkTheme);
UIElements.mood.classList.toggle("fa-moon",!darkTheme);
UIElements.mood.classList.toggle("fa-sun",darkTheme);

function saveInfo(){
    window.localStorage.setItem("workDuration", workDuration);
    window.localStorage.setItem("breakDuration", breakDuration);
    window.localStorage.setItem("darkTheme",JSON.stringify(darkTheme));
    window.localStorage.setItem("isSilent",JSON.stringify(isSilent));
}

function toggleTheme(darkTheme){
    if(darkTheme){
        document.documentElement.style.setProperty('--l1', '#222831');
        document.documentElement.style.setProperty('--l2', '#31363F');
        document.documentElement.style.setProperty('--l3', '#76ABAE');
        document.documentElement.style.setProperty('--l4', '#EEEEEE');
    }else{
        document.documentElement.style.setProperty('--l1', '#F9F7F7');
        document.documentElement.style.setProperty('--l2', '#DBE2EF');
        document.documentElement.style.setProperty('--l3', '#3F72AF');
        document.documentElement.style.setProperty('--l4', '#112D4E');
    }
}
function changeMood(){
    darkTheme = !darkTheme;
    UIElements.mood.classList.toggle("fa-moon",!darkTheme);
    UIElements.mood.classList.toggle("fa-sun",darkTheme);
    window.localStorage.setItem("darkTheme",JSON.stringify(darkTheme));
    toggleTheme(darkTheme);

}

//change sound
function changeSound(){
    isSilent = !isSilent;
    UIElements.sound.classList.toggle("fa-volume-high", !isSilent);
    UIElements.sound.classList.toggle("fa-volume-xmark", isSilent);
    window.localStorage.setItem("isSilent",JSON.stringify(isSilent));
}

//display
let workDuration = JSON.parse(window.localStorage.getItem("workDuration")) || 25;
let breakDuration = JSON.parse(window.localStorage.getItem("breakDuration")) || 5;
let seconds = 0;

function display(duration, seconds, type){
    if(duration >= 10){
        if(seconds>=10){
            UIElements.time.textContent=`${duration}:${seconds}`
        }else{
            UIElements.time.textContent=`${duration}:0${seconds}`
        }
    }else{
        if(seconds>=10){
            UIElements.time.textContent=`0${duration}:${seconds}`            
        }else{
            UIElements.time.textContent=`0${duration}:0${seconds}`            
        }
    }
    UIElements.timeOf.textContent=`${type} session`;
}
display(workDuration, seconds, "work");

//input
UIElements.duration.work.value = workDuration;
UIElements.duration.break.value = breakDuration;
function inputValidation(input){
    input.value = Math.min(Math.max(Math.abs(input.value), 5), 60);
    }
function durations(){
    UIElements.duration.work.addEventListener('input', (e)=>{
        inputValidation(e.target);
        workDuration = parseInt(e.target.value);
        window.localStorage.setItem("workDuration", workDuration);
    });
    UIElements.duration.break.addEventListener('input', (e)=>{
        inputValidation(e.target);
        breakDuration = parseInt(e.target.value);
        window.localStorage.setItem("breakDuration", breakDuration);
        console.log(`breakDuration = ${breakDuration}`);
    });
}
durations();

//counter
let counter = 0;
let sessionNumber = 0
UIElements.stats.textContent = sessionNumber;

let stop = true;
let stoppedMinute = 0;
let stoppedSec = 0;
let stoppedType = "";

//timer
let interval;
function timer(duration, type){
    let minutes = duration;
    display(minutes, seconds, type);

    if(stoppedType=== ""){
        seconds = 60;
        minutes--;
    }

    interval = setInterval(() => {
        if(stop){
            clearInterval(interval);
            stoppedMinute = minutes;
            stoppedSec = seconds;
            stoppedType = type;
            seconds++;
            return;
        }
        seconds--;
        display(minutes, seconds, type);
        if(seconds === 0){
            if(minutes === 0){
                clearInterval(interval);
                counter++;
                if(!isSilent){
                    alarm.play();
                }
                if(UIElements.timeOf.textContent.includes("work")){
                    sessionNumber++;
                    UIElements.stats.textContent = sessionNumber;
                }
                
                stoppedType = "";
                stop = false;
                startSession(workDuration, breakDuration);
                return;
            }
            minutes--;
            seconds = 60;
    }

    }, 1000);

}
function startSession(workDuration, breakDuration){

    if(stoppedType!== "" ){
        seconds = stoppedSec;
        timer(stoppedMinute, stoppedType);
    }else{
        let isWork = counter % 2 === 0 ;
        console.log("is woooooooork")
        console.log(isWork)
        timer(isWork? workDuration : breakDuration, isWork? "work" : "break");

    }
}
//stop session
//start
function start(workDuration, breakDuration){
    let icon = document.querySelector(".start i");
    let span = document.querySelector(".start span");
    if(span.textContent==="start"){
        span.textContent="pause";
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
        stop = false;
        startSession(workDuration, breakDuration);
    }

    else if(span.textContent==="pause"){
        span.textContent="start";
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
        stop = true;
    }
}

//reset
function reset(workDuration, breakDuration) {

    stop = true;
    clearInterval(interval);


    counter = 0;
    sessionNumber = 0;
    stoppedType = "";
    stoppedMinute = 0;
    stoppedSec = 0;
    seconds = 0;


    UIElements.stats.textContent = sessionNumber;
    UIElements.duration.work.value = workDuration;
    UIElements.duration.break.value = breakDuration;


    const icon = document.querySelector(".start i");
    const span = document.querySelector(".start span");
    span.textContent = "start";
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");


    display(workDuration, seconds, "work");
}


// event listener 
document.addEventListener("click",(e)=>{
    //mood
    if(e.target===UIElements.mood){
        changeMood();
    }
    //sound
    if(e.target===UIElements.sound){
        changeSound();
    }
    //reset
    if(e.target.closest(".reset") === UIElements.btns.reset){
        reset(workDuration, breakDuration);
    }
    //start
    if(e.target===UIElements.btns.start){
        start(workDuration, breakDuration);
    }
});


