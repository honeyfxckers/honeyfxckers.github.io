let score = 0;
let time = 30; // Игра длится 30 секунд
const honeyCoin = document.getElementById('honey-coin');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

function getRandomPosition() {
    const game = document.getElementById('game');
    const x = Math.random() * (game.clientWidth - honeyCoin.clientWidth);
    const y = Math.random() * (game.clientHeight - honeyCoin.clientHeight);
    return { x, y };
}

function moveHoneyCoin() {
    const { x, y } = getRandomPosition();
    honeyCoin.style.left = `${x}px`;
    honeyCoin.style.top = `${y}px`;
}

honeyCoin.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    moveHoneyCoin();
});

function startTimer() {
    const timer = setInterval(() => {
        time--;
        timerDisplay.textContent = `${time}s`;
        if (time <= 0) {
            clearInterval(timer);
            alert(`Game over! Your score is: ${score}`);
            // Reset game
            score = 0;
            time = 30;
            scoreDisplay.textContent = score;
            timerDisplay.textContent = `${time}s`;
            centerHoneyCoin();
        }
    }, 1000);
}

// Центрирование объекта при старте игры
function centerHoneyCoin() {
    const game = document.getElementById('game');
    const x = (game.clientWidth - honeyCoin.clientWidth) / 2;
    const y = (game.clientHeight - honeyCoin.clientHeight) / 2;
    honeyCoin.style.left = `${x}px`;
    honeyCoin.style.top = `${y}px`;
}

window.addEventListener('resize', centerHoneyCoin);
window.addEventListener('load', centerHoneyCoin);
centerHoneyCoin();
startTimer();
