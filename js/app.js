const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const scoreField = document.querySelector("#score");
const timer = document.querySelector(".timer");
const allBoxes = document.querySelectorAll(".bracket");
const difficulty = [
    [2000, 600],
    [1000, 400]
];
// rezerwacja zmiennej na interwaly i timeouty
let mainLoop = "";
let endGame = "";
let seconds = "";
// rezerwacja zmiennej na poziom trudnosci
let selectedDif = 0;
let score = 0;

function randNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function mainFunction() {
    const activeBox = document.querySelector(".bracket:nth-of-type(" + randNum(1, 25) + ")");
    activeBox.classList.add("active");
    let delay = setTimeout(function () {
        if (activeBox.classList.contains("active")) {
            activeBox.classList.remove("active");
        }
    }, difficulty[selectedDif][0]);
}

function counter() {
    const start = (new Date()).getTime();
    seconds = setInterval(function () {
        let now = (new Date()).getTime();
        let left = 30 - (Math.floor((now - start) / 1000));
        (left > 10) ? timer.innerText = left: timer.innerText = '0' + left;
        if (left < 0) {
            clearInterval(seconds);
            timer.innerText = '30';
        }
    }, 1000)
}

startBtn.addEventListener("click", function () {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    score = 0;
    scoreField.innerText = score;
    selectedDif = document.querySelector("#difficulty").value;
    counter();
    mainLoop = setInterval(mainFunction, difficulty[selectedDif][1]);
    endGame = setTimeout(function () {
        clearInterval(mainLoop);
        startBtn.disabled = false;
        alert('Złapałeś ' + score + ' skrzyń!')
    }, 30000)
});

stopBtn.addEventListener("click", function () {
    clearInterval(mainLoop);
    clearInterval(seconds);
    clearTimeout(endGame);
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].addEventListener("click", function () {
        if (this.classList.contains("active")) {
            this.classList.add("coin");
            setTimeout(function () {
                allBoxes[i].classList.remove("coin");
            }, 500);
            score += 1;
            scoreField.innerText = score;
            this.classList.remove("active");
        }
    });
}

var inactivity = setInterval(function () {
    if (!startBtn.disabled) {
        let x = randNum(1, 25);
        allBoxes[x].classList.add("teasing");
        setTimeout(function () {
            allBoxes[x].classList.remove("teasing");
        }, 1000)
    }
}, 700);