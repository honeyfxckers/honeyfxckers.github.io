let score = 0;
let energy = 100;
const coin = document.getElementById('coin');
const scoreDisplay = document.getElementById('score');
const energyBar = document.getElementById('energy-bar');

function updateEnergyBar() {
    energyBar.style.width = `${energy}%`;
    if (energy <= 0) {
        energyBar.style.backgroundColor = '#ff0000';
        coin.style.pointerEvents = 'none';
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

updateEnergyBar();
