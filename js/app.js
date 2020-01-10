const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const scoreField = document.querySelector(".score");
const allBoxes = document.querySelectorAll(".bracket");
const success = "<span class='success'>+</span>";
const fail = "<span class='fail'>X</span>";
const difficulty = [[500,1000,20001],[1000,2000,30001],[2000,3000,40001]];
// rezerwacja zmiennej na interwal
let mainLoop = "";
// rezerwacja zmiennej na poziom trudnosci
let selectedDif = 0;


for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].addEventListener("click", function () {
        if (this.classList.contains("active")) {
            scoreField.innerHTML += success;
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
            scoreField.innerHTML += fail;
            activeBox.classList.remove("active");
        }
    }, difficulty[selectedDif][0]);
}

startBtn.addEventListener("click", function () {
    startBtn.disabled = true;
    scoreField.innerHTML = "";
    selectedDif = document.querySelector("#difficulty").value;
    mainLoop = setInterval(mainFunction, difficulty[selectedDif][1]);
    setTimeout(function () {
        clearInterval(mainLoop);
        startBtn.disabled = false;
    }, difficulty[selectedDif][2])
});

stopBtn.addEventListener("click", function () {
    clearInterval(mainLoop);
    startBtn.disabled = false;
});