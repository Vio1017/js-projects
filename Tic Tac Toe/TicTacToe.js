//replay


//object for all variables
const uiElements = {
    onePlayerBtn : document.querySelector(".one"),
    twoPlayerBtn :document.querySelector(".two"),
    numberOfPlayers : 0,
    overlay : document.querySelector(".overlay"),
    selectMode : document.querySelector(".players-btns"),
    onePlayerMode : document.querySelector(".one-player-btns"),
    twoPlayersMode : document.querySelector(".two-player-btns"),
    goBtn : document.querySelector(".go"),
    playerChoice : "",
    computerChoice : "",
    x : document.querySelector(".x"),
    o : document.querySelector(".o"),
    playerOne : {
        input : document.querySelector(".input-one"),
        name : "", 
        score : 0,
        submit: document.querySelector(".submit1"),
        displayName : document.querySelector(".player1 p"),
        displayChoice : document.querySelector(".player1 span"),
        displayScore : document.querySelector(".player1-score"),
        moves : [],
        win : false
    },
    playerTwo : {
        input : document.querySelector(".input-two"), 
        name : "",
        score : 0,
        submit: document.querySelector(".submit2"),
        displayName : document.querySelector(".player2 p"),
        displayChoice : document.querySelector(".player2 span"),
        displayScore : document.querySelector(".player2-score"),
        moves : [],
        win : false
    },
    squares : document.querySelectorAll(".the-game div"),
    result : document.querySelector(".result"),
    counter : 9,
    winMatrix : [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6],
    ],
    gameOver : false
};
const win = new Audio("audio/success.mp3")
const error = new Audio("audio/error.mp3")
const tap = new Audio("audio/tap.mp3")
const click = new Audio("audio/button-202966.mp3")

let c = [0,1,2,3,4,5,6,7,8];
let n = 9;
let computerTurn = false;




//functions
//reset game 
function replay(){
    c = [0,1,2,3,4,5,6,7,8];
    n = 9;
    computerTurn = false;
    uiElements.gameOver = false;
    uiElements.playerOne.moves = []
    uiElements.playerOne.win = false;
    uiElements.playerTwo.moves = []
    uiElements.playerTwo.win = false;
    uiElements.counter = 9;
    uiElements.squares.forEach((square)=>{
        square.textContent = "";
    })
}
//hide overlay and show other btns
function toggleMode(numberOfPlayers){
    uiElements.selectMode.style.display = "none";

    if(numberOfPlayers===1){
        uiElements.onePlayerMode.style.display = "block";
    } else if(numberOfPlayers===2){
        uiElements.twoPlayersMode.style.display = "block";
    }

    uiElements.goBtn.style.display = "block";
}
//player move array
function playerMoveArray(index){
    c = c.filter( item => item !== index);
    n--;
}

//validation(names, x|o)
function validation(numberOfPlayers){
    //check if user choose x or o
    if(numberOfPlayers === 1 ){
        if(!uiElements.playerChoice){
            error.play();
            window.alert("You Must Choose X or Y");
        }else{
            uiElements.overlay.style.display = "none";
        }
    }
    //check users enter their names
    if(numberOfPlayers === 2){
        if(!uiElements.playerOne.name || !uiElements.playerTwo.name ){
            error.play();
            window.alert("Both Players Must Submit Their Names");
        }else{
            uiElements.overlay.style.display = "none";
        }
    }
}
//players info display
function displayInfo(numberOfPlayers){
    if(numberOfPlayers===2){
        uiElements.playerOne.displayName.innerHTML = `${uiElements.playerOne.name}`;
        uiElements.playerOne.displayChoice.innerHTML = "x";
        uiElements.playerOne.displayScore.innerHTML = `${uiElements.playerOne.score}`;

        uiElements.playerTwo.displayName.innerHTML = `${uiElements.playerTwo.name}`;
        uiElements.playerTwo.displayChoice.innerHTML = "o";
        uiElements.playerTwo.displayScore.innerHTML = `${uiElements.playerTwo.score}`;
    }
    if(numberOfPlayers===1){
        uiElements.playerOne.displayName.innerHTML = "You";
        uiElements.playerOne.displayChoice.innerHTML = `${uiElements.playerChoice}`;
        uiElements.playerOne.displayScore.innerHTML = `${uiElements.playerOne.score}`;

        uiElements.playerTwo.displayName.innerHTML = "Computer";
        uiElements.playerTwo.displayChoice.innerHTML = `${uiElements.computerChoice}`;
        uiElements.playerTwo.displayScore.innerHTML = `${uiElements.playerTwo.score}`;
    }
}
//player turns
function playersTurns(numberOfPlayers, square, index){
    if(uiElements.gameOver) return;
    if(!square.textContent){
        if(numberOfPlayers===1){
            square.innerHTML =`${uiElements.playerChoice}` ;
            uiElements.playerOne.moves.push(index);
            playerMoveArray(index);
            
            if(gameResult("You", uiElements.playerOne.moves,uiElements.playerOne.win,uiElements.playerOne)) return;

            setTimeout(computerRandomMove, 800);
            uiElements.result.innerHTML="Computer Turn";
        }
        else if(numberOfPlayers===2){
            if(uiElements.counter % 2 === 0){
                uiElements.result.innerHTML=`${uiElements.playerOne.name} turn`;
                square.innerHTML ="o" ;
                uiElements.playerTwo.moves.push(index);
                if(gameResult(uiElements.playerTwo.name, uiElements.playerTwo.moves,uiElements.playerTwo.win,uiElements.playerTwo)) return;
            }else{;
                uiElements.result.innerHTML=`${uiElements.playerTwo.name} turn`;
                square.innerHTML ="x" ;
                uiElements.playerOne.moves.push(index);
                if(gameResult(uiElements.playerOne.name, uiElements.playerOne.moves, uiElements.playerOne.win,uiElements.playerOne)) return;
            }
            
        }
        uiElements.counter--;
        draw(uiElements.playerOne.win, uiElements.playerTwo.win)
    }

}
//computer random move
function computerRandomMove(){
    if(n>0){
        let rand = Math.floor(Math.random() * c.length)
        let move = c[rand]
        uiElements.squares[move].textContent = `${uiElements.computerChoice}`;
        tap.play();
        uiElements.playerTwo.moves.push(move);
        playerMoveArray(move);
        uiElements.result.innerHTML = "Your Turn";
        if(gameResult("computer", uiElements.playerTwo.moves, uiElements.playerTwo.win,uiElements.playerTwo)) return;
        uiElements.counter--;
        console.log(uiElements.counter)
    }
}
//display
function display(){
    uiElements.squares.forEach((square, index)=>{
        square.addEventListener("click", (e)=>{
            tap.play();
            playersTurns(uiElements.numberOfPlayers, e.target, index);
        })
    });
}
//win
function gameResult(playerName, playerMove,playerWin, player){
    for(let array of uiElements.winMatrix){
        if(array.every((index)=> playerMove.includes(index))){
            win.play();
            uiElements.result.innerHTML = `${playerName} win`;
            playerWin = true;
            uiElements.gameOver = true;
            playerScore(player);
            setTimeout(replay, 3000);
            return true;
        }
    }
    return false;
}
//draw
function draw(playerOneWin, playerTwoWin){
    if(!playerOneWin && !playerTwoWin && uiElements.counter === 0){
        win.play()
        uiElements.result.innerHTML = "Draw";
        uiElements.gameOver = true;
        setTimeout(replay, 3000);
    }
}
//display core
function playerScore(player){
    player.score++;
    player.displayScore.innerHTML = `${player.score}`
}


//event listener for all events
document.addEventListener("click", (e)=>{
//chose num of players
    //one:

    if(e.target===uiElements.onePlayerBtn){
        uiElements.numberOfPlayers = 1;
        toggleMode(uiElements.numberOfPlayers);
        click.play();
    }
    //two:
    else if(e.target===uiElements.twoPlayerBtn){
        uiElements.numberOfPlayers = 2;
        toggleMode(uiElements.numberOfPlayers);
        click.play();
    }

//one player mode:
    //player and computer choices
    if(e.target===uiElements.x){
        uiElements.playerChoice = "x";
        uiElements.computerChoice = "o";
        click.play();
    }
    else if(e.target===uiElements.o){
        uiElements.playerChoice = "o";
        uiElements.computerChoice = "x";
        click.play();
    }

//two players mode:
    //player one name
    if(e.target===uiElements.playerOne.submit){
        uiElements.playerOne.submit.classList.add("submitted");
        uiElements.playerOne.name = uiElements.playerOne.input.value;
        click.play();
    }
    //player two name
    if(e.target===uiElements.playerTwo.submit){
        uiElements.playerTwo.submit.classList.add("submitted");
        uiElements.playerTwo.name = uiElements.playerTwo.input.value;
        click.play();
    }
    
//start game 
    if(e.target===uiElements.goBtn){
        validation(uiElements.numberOfPlayers);
        displayInfo(uiElements.numberOfPlayers);
        display();
        if(uiElements.numberOfPlayers===1){
            uiElements.result.innerHTML="Your Turn" ;
        }
        if(uiElements.numberOfPlayers===2){
            uiElements.result.innerHTML=`${uiElements.playerOne.name} turn` ;
        }
        click.play();
    }
});




















