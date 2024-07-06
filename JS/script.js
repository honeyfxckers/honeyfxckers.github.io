let score = 0;
let energy = 100;
const coin = document.getElementById('coin');
const scoreDisplay = document.getElementById('score');
const energyBar = document.getElementById('energy-bar');
const energyCounter = document.createElement('div');
energyCounter.id = 'energy-counter';
energyCounter.textContent = `${energy}/100`;
document.getElementById('game').appendChild(energyCounter);

// Функция для сохранения очков и энергии в Local Storage
function saveData() {
    localStorage.setItem('score', score);
    localStorage.setItem('energy', energy);
}

// Функция для восстановления очков и энергии из Local Storage
function loadData() {
    const savedScore = localStorage.getItem('score');
    const savedEnergy = localStorage.getItem('energy');
    if (savedScore !== null) {
        score = parseInt(savedScore, 10);
        scoreDisplay.textContent = score;
    }
    if (savedEnergy !== null) {
        energy = parseInt(savedEnergy, 10);
    }
    updateEnergyBar();
}

function updateEnergyBar() {
    energyBar.style.transform = `scaleX(${energy / 100})`;
    energyCounter.textContent = `${energy}/100`;
    if (energy <= 0) {
        coin.style.pointerEvents = 'none';
    } else {
        coin.style.pointerEvents = 'auto';
    }
}

function showPoints(points, x, y) {
    const pointsElement = document.createElement('div');
    pointsElement.className = 'points';
    pointsElement.textContent = `+${points}`;
    pointsElement.style.left = `${x}px`;
    pointsElement.style.top = `${y}px`;
    document.body.appendChild(pointsElement);

    setTimeout(() => {
        pointsElement.remove();
    }, 1000);
}

function handleCoinClick(event) {
    if (energy > 0) {
        score++;
        energy -= 1;
        scoreDisplay.textContent = score;
        saveData(); // Сохраняем очки и энергию при каждом клике
        updateEnergyBar();
        const x = event.clientX || event.touches[0].clientX;
        const y = event.clientY || event.touches[0].clientY;
        showPoints(1, x, y); // Показываем число 1 при каждом клике
        if (navigator.vibrate) {
            navigator.vibrate(50); // Вибрация на 50 миллисекунд
        }
        coin.style.transform = 'scale(0.95)'; // Уменьшение изображения
        setTimeout(() => {
            coin.style.transform = 'scale(1)'; // Возвращение к исходному размеру
        }, 100);
    }
}

coin.addEventListener('click', handleCoinClick);
coin.addEventListener('touchstart', (event) => {
    event.preventDefault(); // Предотвращение всплытия событий на мобильных устройствах
    handleCoinClick(event);
});

function restoreEnergy() {
    if (energy < 100) {
        energy++;
        saveData(); // Сохраняем энергию при восстановлении
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
    setTimeout(openFullscreen, 500); // Задержка для гарантии работы в мобильных браузерах
    loadData(); // Загружаем очки и энергию при загрузке страницы
});

setInterval(restoreEnergy, 500); // Восстановление энергии на 1% каждые 500 миллисекунд

updateEnergyBar();
