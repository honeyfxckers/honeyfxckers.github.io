let score = 0;
let energy = 100;
const coin = document.getElementById('coin');
const scoreDisplay = document.getElementById('score');
const energyBar = document.getElementById('energy-bar');
const energyText = document.getElementById('energy-text');

function updateEnergyBar() {
    energyBar.style.transform = `scaleX(${energy / 100})`;
    energyText.textContent = `${energy}%`;
    if (energy <= 0) {
        coin.style.pointerEvents = 'none';
    } else {
        coin.style.pointerEvents = 'auto';
    }
}

function handleCoinClick() {
    if (energy > 0) {
        score++;
        energy -= 1;
        scoreDisplay.textContent = score;
        updateEnergyBar();
        if ('vibrate' in navigator) {
            navigator.vibrate(50); // Вибрация на 50 миллисекунд
        }
        coin.style.transform = 'scale(0.9)'; // Уменьшение изображения
        setTimeout(() => {
            coin.style.transform = 'scale(1)'; // Возвращение к исходному размеру
        }, 100);
    }
}

coin.addEventListener('click', handleCoinClick);
coin.addEventListener('touchstart', (event) => {
    event.preventDefault(); // Предотвращение всплытия событий на мобильных устройствах
    handleCoinClick();
});

function restoreEnergy() {
    if (energy < 100) {
        energy++;
        updateEnergyBar();
    }
}

function openFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(openFullscreen, 1000); // Задержка для гарантии работы в мобильных браузерах
});

setInterval(restoreEnergy, 75); // Восстановление энергии на 1% каждые 300 миллисекунд

updateEnergyBar();
