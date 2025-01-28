const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const easyButton = document.querySelector('#easy');
const mediumButton = document.querySelector('#medium');
const hardButton = document.querySelector('#hard');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let countDownTimeId = null;
let moleSpeed = 500; 
let gameDuration = 60; 

function randomSquare() {
    squares.forEach(square => square.classList.remove('mole'));
    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    });
});

function moveMole() {
    timerId = setInterval(randomSquare, moleSpeed);
}

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if (currentTime == 0) {
        clearInterval(timerId);
        clearInterval(countDownTimeId);
        alert('GAME OVER! Your Final Score is ' + result);
    }
}

function startGame() {
    result = 0;
    score.textContent = result;
    currentTime = gameDuration;
    timeLeft.textContent = currentTime;
    clearInterval(timerId);
    clearInterval(countDownTimeId);
    moveMole();
    countDownTimeId = setInterval(countDown, 1000);
}

function setDifficulty(speed, duration) {
    moleSpeed = speed;
    gameDuration = duration;
}

easyButton.addEventListener('click', () => {
    setDifficulty(1000, 60);
    startGame();
});
mediumButton.addEventListener('click', () => {
    setDifficulty(700, 40);
    startGame();
});
hardButton.addEventListener('click', () => {
    setDifficulty(500, 25); 
    startGame();
});
