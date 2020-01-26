const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const scoreField = document.querySelector("#score");
const allBoxes = document.querySelectorAll(".bracket");
const difficulty = [
    [1800, 2200, 44001],
    [1000, 1200, 24001]
];
// rezerwacja zmiennej na interwal
let mainLoop = "";
// rezerwacja zmiennej na poziom trudnosci
let selectedDif = 0;
let score = 0;

for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].addEventListener("click", function () {
        if (this.classList.contains("active")) {
            score += 1;
            scoreField.innerText = score;
            this.classList.remove("active");
        }
    });
}

function randomBox() {
    return Math.floor(Math.random() * 25) + 1;
}

function mainFunction() {
    const activeBox = document.querySelector(".bracket:nth-of-type(" + randomBox() + ")");
    activeBox.classList.add("active");
    let delay = setTimeout(function () {
        if (activeBox.classList.contains("active")) {
            activeBox.classList.remove("active");
        }
    }, difficulty[selectedDif][0]);
}

startBtn.addEventListener("click", function () {
    startBtn.disabled = true;
    score = 0;
    scoreField.innerText = score;
    selectedDif = document.querySelector("#difficulty").value;
    mainLoop = setInterval(mainFunction, difficulty[selectedDif][1]);
    setTimeout(function () {
        clearInterval(mainLoop);
        startBtn.disabled = false;
        alert('Złapałeś ' + score + ' skrzyń, z 20 możliwych!')
    }, difficulty[selectedDif][2])
});

stopBtn.addEventListener("click", function () {
    clearInterval(mainLoop);
    startBtn.disabled = false;
});