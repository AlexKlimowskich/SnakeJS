const gameBoard = document.getElementById("game-board");
const scoreInfo = document.getElementById("score-info");
const BestScore = document.getElementById("best-score");
const restartButton = document.getElementById("restart-button");

const context = gameBoard.getContext("2d");

// Colors
const boardColor = "black";
const snakeColor = "cyan";
const foodColor = "crimson";

const boardWidth = gameBoard.width;
const boardHeight = gameBoard.height;
const cellSize = 40;

const initialSnake = [
    { x: cellSize * 4, y: cellSize * 5 },
    { x: cellSize * 5, y: cellSize * 5 },
];
let snake = JSON.parse(JSON.stringify(initialSnake));
let snakeHead = {
    x: snake[0].x,
    y: snake[0].y,
};
const food = {
    x: 0,
    y: 0,
};
const velocity = {
    x: cellSize,
    y: 0,
};
let score = 0;
let interval;

localStorage.setItem('record', 0);
let record = localStorage.getItem('record');


function drawBoard() {
    context.fillStyle = boardColor;
    context.fillRect(0, 0, boardWidth, boardHeight);
}

function drawSnake() {
    for(let index = 0; index < snake.length; index++) {
        const snakePart = snake[index];
        if(
            index !== 0 &&
            snakePart.x === snakeHead.x &&
            snakePart.y === snakeHead.y
        ) {
            return finishGame();
        }
        context.fillStyle = snakeColor;
        context.fillRect(snakePart.x, snakePart.y, cellSize-1, cellSize-1);
    }
}

function drawFood() {
    context.fillStyle = foodColor;
    context.fillRect(food.x, food.y, cellSize, cellSize);
}

function placeFood() {
    food.x = Math.floor((Math.random() * 10)) * cellSize;
    food.y = Math.floor((Math.random() * 10)) * cellSize;
}

function best(){
if(score > record) {
    localStorage.setItem('record', score );
    let record = localStorage.getItem('record');
    BestScore.textContent = record;     
}}

function updateScore(newScore) {
    score = newScore;
    scoreInfo.textContent = score;
}

function checkIfEat() {
    if(snakeHead.x === food.x && snakeHead.y === food.y) {
        placeFood();
        updateScore(score + 1);
        return true;
    }
    return false;
}

function move() {
    snakeHead.x += velocity.x;
    snakeHead.y += velocity.y;

    if(snakeHead.x < - cellSize) {
        return finishGame();
    } else if(snakeHead.x > boardWidth) {
        return finishGame();
    } else if(snakeHead.y < - cellSize) {
        return finishGame();
    } else if(snakeHead.y > boardHeight) {
        return finishGame();
    }
    snake.unshift({
        x: snakeHead.x,
        y: snakeHead.y,
    });
    if(!checkIfEat()) {
        snake.pop();
    }
}

function changeDirection(ev) {
    const isGoingRight = velocity.x > 0;
    const isGoingLeft = velocity.x < 0;
    const isGoingUp = velocity.y < 0;
    const isGoingDown = velocity.y > 0;

    if(ev.key === "ArrowRight" && !isGoingLeft) {
        velocity.x = cellSize;
        velocity.y = 0;
    } else if(ev.key === "ArrowLeft" && !isGoingRight) {
        velocity.x = -cellSize;
        velocity.y = 0;
    } else if(ev.key === "ArrowUp" && !isGoingDown) {
        velocity.x = 0;
        velocity.y = -cellSize;
    } else if(ev.key === "ArrowDown" && !isGoingUp) {
        velocity.x = 0;
        velocity.y = cellSize;
    }
}

function nextTick() {
    drawBoard();
    drawFood();
    drawSnake();
    
    move();
}

function finishGame() {
    context.clearRect(0, 0, boardWidth, boardHeight);
    clearInterval(interval);
    context.fillStyle = "red";
    context.font = "50px cursive";
    context.fillText("Game over !!!", 1.5 * cellSize, 200);
    best()
}

function startGame() {
    snake = JSON.parse(JSON.stringify(initialSnake));
    snakeHead = {
        x: snake[0].x,
        y: snake[0].y
    }
    velocity.x = cellSize;
    velocity.y = 0;
    updateScore(0);
    placeFood();
    localStorage.getItem('record');
    restartButton.addEventListener("click", restartGame);
    window.addEventListener("keydown", changeDirection);
    interval = setInterval(nextTick, 500);
    best();
}

function restartGame() {
    finishGame();
    startGame();
}

window.addEventListener("load", startGame);