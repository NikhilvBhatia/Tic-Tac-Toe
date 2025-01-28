let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset-btn");
//for determining turn of x and o
let turnO = true //will be true if O turn and false if X turn 
let msgcontainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");
let button = document.querySelector(".reset-btn");
let winner = false;
let count = 0;
let scorex = document.querySelector("#score-x");
let scoreo = document.querySelector("#score-o");
let scorecountx;
let scorecounto;
scorecountx = scorecounto = 0;
let newgamebutton = document.querySelector(".new-btn");

const winningpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

boxes.forEach(box => {
    box.addEventListener("click", function () {
        if (turnO) {
            box.classList.toggle("o", true);
            box.classList.toggle("x", false);
            box.innerHTML = "O";
            turnO = false;
        }
        else {
            box.classList.toggle("o", false);
            box.classList.toggle("x", true);
            box.innerHTML = "X";
            turnO = true;
        }
        count++;
        box.disabled = true;
        checkWinner();
    })
});
function reset_game() {
    console.log("reset box was clicked");
        boxes.forEach(box => {
            box.innerHTML = "";
        })
        turnO = true;
        for (let box of boxes) {
            box.disabled = false;
        }
        msgcontainer.classList.toggle("hide", true)
        count = 0;
        winner = false;
     if (button.innerText == "New Game") {
        button.innerText = "Reset Game";
    }
}
button.addEventListener("click", reset_game);

function disableboxes() {
    for (let box of boxes) {
        box.disabled = true;
    }
}
function show_winner(winner) {

    msg.innerHTML = `winner is ${winner}`;
    msgcontainer.classList.toggle("hide", false);
    button.innerText = "New Game";
}
function calc_score(winner) {
    if (winner === "X") {
        console.log(winner)
        scorex.innerText = ++scorecountx;
    }
    else if (winner === "O") {
        scoreo.innerText = ++scorecounto;
    }
}
const checkWinner = () => {
    for (let pattern of winningpatterns) {
        //console.log("pattern",pattern)
        // console.log(pattern[0])
        // console.log(boxes[pattern[0]])
        let pos1 = boxes[pattern[0]].innerHTML;
        let pos2 = boxes[pattern[1]].innerHTML;
        let pos3 = boxes[pattern[2]].innerHTML;
        //console.log(pos1,pos2,pos3)
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                winner = true;
                disableboxes();
                show_winner(pos1);
                calc_score(pos1);
            }
            else if (winner === false && count === 9) {
                msg.innerText = "TIE PLAY A NEW GAME";
                msgcontainer.classList.toggle("hide", false);
                button.innerText = "New Game";
            }
        }

    }
}
function new_game(){
    scorex.innerText = scorecountx = 0;
    scoreo.innerText = scorecounto = 0;
    reset_game();
}
newgamebutton.addEventListener("click",new_game)