const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const scoreField = document.querySelector("#score");
const allBoxes = document.querySelectorAll(".bracket");
const difficulty = [
    [2000, 600],
    [1000, 400]
];
// rezerwacja zmiennej na interwal
let mainLoop = "";
let endGame = "";
// rezerwacja zmiennej na poziom trudnosci
let selectedDif = 0;
let score = 0;

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

    allBoxes[i].addEventListener("mouseover", function () {
        if (!this.classList.contains("active")) {
            this.classList.add("teasing");
        }
    });
    allBoxes[i].addEventListener("mouseout", function () {
        if (this.classList.contains("teasing")) {
            this.classList.remove("teasing");
        }
    });
}



function randomBox(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function mainFunction() {
    const activeBox = document.querySelector(".bracket:nth-of-type(" + randomBox(1, 25) + ")");
    activeBox.classList.add("active");
    let delay = setTimeout(function () {
        if (activeBox.classList.contains("active")) {
            activeBox.classList.remove("active");
        }
    }, difficulty[selectedDif][0]);
}

// function mainFunction() {
//     let timeout = 200;
//     let mimick = randomBox(2, 5)
//     for (let i = 0; i < 5; i++) {
//         setTimeout(function () {
//             if (mimick == i) {
//                 const activeBox = document.querySelector(".bracket:nth-of-type(" + randomBox(1, 25) + ")");
//                 activeBox.classList.add("active");
//                 setTimeout(function () {
//                     activeBox.classList.remove("active");
//                 }, difficulty[selectedDif][0]);
//             } else {
//                 let teaser = document.querySelector(".bracket:nth-of-type(" + randomBox(1, 25) + ")");
//                 if (!teaser.classList.contains("active")) {
//                     teaser.classList.add("teasing");
//                     setTimeout(function () {
//                         teaser.classList.remove("teasing");
//                     }, difficulty[selectedDif][0]);
//                 }
//             }
//         }, timeout * i);
//     }


// let delay = setTimeout(function () {
//     if (activeBox.classList.contains("active")) {
//         activeBox.classList.remove("active");
//     }
// }, difficulty[selectedDif][0]);
// }

startBtn.addEventListener("click", function () {
    startBtn.disabled = true;
    score = 0;
    scoreField.innerText = score;
    selectedDif = document.querySelector("#difficulty").value;
    mainLoop = setInterval(mainFunction, difficulty[selectedDif][1]);
    endGame = setTimeout(function () {
        clearInterval(mainLoop);
        startBtn.disabled = false;
        alert('Złapałeś ' + score + ' skrzyń!')
    }, 30000)
});

stopBtn.addEventListener("click", function () {
    clearInterval(mainLoop);
    clearTimeout(endGame);
    startBtn.disabled = false;
});


var inactivity = setInterval(function () {
    if (!startBtn.disabled) {
        for (let i = 0; i < allBoxes.length; i++) {

            setTimeout(function () {
                allBoxes[i].classList.add("teasing");
            }, 80 * i)
            setTimeout(function () {
                allBoxes[i].classList.remove("teasing");
            }, (80 * i) + 1000)
        }

    }
}, 2300);