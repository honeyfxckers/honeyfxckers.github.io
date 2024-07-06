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
    }
});

function restoreEnergy() {
    if (energy < 100) {
        energy++;
        updateEnergyBar();
    }
}

setInterval(restoreEnergy, 300); // Восстановление энергии на 1% каждые 300 миллисекунд

updateEnergyBar();
