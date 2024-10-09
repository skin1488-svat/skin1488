let randomNumber;
let attempts = 0;
let timer;
let timeLeft = 30; // Время на угадывание в секундах
let record = localStorage.getItem("guessRecord") || Infinity;

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const score = document.getElementById("score");
const timerDisplay = document.getElementById("timeLeft");
const restartButton = document.getElementById("restartButton");
const rangeDisplay = document.getElementById("range");
const recordDisplay = document.getElementById("record");
const difficultyButtons = document.querySelectorAll(".difficulty");

difficultyButtons.forEach(button => {
    button.addEventListener("click", () => {
        const level = button.getAttribute("data-level");
        startGame(level);
    });
});

function startGame(difficulty) {
    timeLeft = 30; // Сброс таймера
    attempts = 0;
    score.innerText = "Попытки: " + attempts;
    message.innerText = "";
    guessButton.disabled = false;
    restartButton.style.display = "none";
    guessInput.value = "";
    guessInput.focus();

    // Установка диапазона в зависимости от уровня сложности
    if (difficulty === "easy") {
        randomNumber = Math.floor(Math.random() * 50) + 1;
        rangeDisplay.innerText = "1 до 50";
    } else if (difficulty === "medium") {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        rangeDisplay.innerText = "1 до 100";
    } else {
        randomNumber = Math.floor(Math.random() * 150) + 1;
        rangeDisplay.innerText = "1 до 150";
    }

    startTimer();
}

function startTimer() {
    timerDisplay.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            message.innerText = "Время вышло! Число было " + randomNumber + ".";
            guessButton.disabled = true;
            restartButton.style.display = "block";
            updateRecord();
        }
    }, 1000);
}

guessButton.addEventListener("click", () => {
    const userGuess = Number(guessInput.value);
    attempts++;
    score.innerText = "Попытки: " + attempts;

    if (userGuess === randomNumber) {
        clearInterval(timer);
        message.innerText = "Поздравляю! Вы угадали число!";
        guessButton.disabled = true;
        restartButton.style.display = "block";
        updateRecord();
    } else if (userGuess < randomNumber) {
        message.innerText = "Слишком низко! Попробуйте снова.";
    } else if (userGuess > randomNumber) {
        message.innerText = "Слишком высоко! Попробуйте снова.";
    }

    guessInput.value = "";
    guessInput.focus();
});

function updateRecord() {
    if (attempts < record) {
        record = attempts;
        localStorage.setItem("guessRecord", record);
        recordDisplay.innerText = "Рекорд: " + record + " попыток";
    }
}

restartButton.addEventListener("click", () => {
    clearInterval(timer);
    startGame("medium"); // Начинаем заново со средней сложности
});

// Запускаем игру при загрузке страницы
startGame("medium");
