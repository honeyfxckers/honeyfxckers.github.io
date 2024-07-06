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
    }
});

function restoreEnergy() {
    if (energy < 100) {
        energy++;
        updateEnergyBar();
    }
}

function openFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
        document.documentElement.msRequestFullscreen();
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    openFullscreen();
});

setInterval(restoreEnergy, 300); // Восстановление энергии на 1% каждые 300 миллисекунд

updateEnergyBar();
