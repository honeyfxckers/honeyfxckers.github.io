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

coin.addEventListener('click', () => {
    if (energy > 0) {
        score++;
        energy -= 1;
        scoreDisplay.textContent = score;
        updateEnergyBar();
        navigator.vibrate(50); // Вибрация на 50 миллисекунд
        coin.style.transform = 'scale(0.9)'; // Уменьшение изображения
        setTimeout(() => {
            coin.style.transform = 'scale(1)'; // Возвращение к исходному размеру
        }, 100);
    }
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
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    openFullscreen();
});

setInterval(restoreEnergy, 300); // Восстановление энергии на 1% каждые 300 миллисекунд

updateEnergyBar();
