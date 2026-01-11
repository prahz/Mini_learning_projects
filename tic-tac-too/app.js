const boxes = document.querySelectorAll(".box");
const rstBtn = document.getElementById("rstBtn");
const newGameBtn = document.getElementById("newGame");
const winnerMsg = document.getElementById("winnerMsg");
const winnerLine = document.getElementById("winnerLine");
const mainGame = document.getElementById("mainGame");

let turnO = true;
let gameOver = false;

const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText !== "") return;

        box.innerText = turnO ? "O" : "X";
        turnO = !turnO;
        checkWin();
    });
});

function checkWin() {
    for (const [a,b,c] of winCombos) {
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            gameOver = true;
            showWinner(boxes[a].innerText);
            return;
        }
    }
}

function showWinner(player) {
    winnerLine.innerText = `Player ${player} Wins!`;
    winnerMsg.classList.remove("hide");
    mainGame.classList.add("blur");
}

function resetGame() {
    boxes.forEach(box => box.innerText = "");
    turnO = true;
    gameOver = false;
}

rstBtn.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", () => {
    resetGame();
    winnerMsg.classList.add("hide");
    mainGame.classList.remove("blur");
});
