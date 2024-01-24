const gameBoard = document.querySelector(".game-board");
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");
const scoreDiv = document.querySelector(".score-div");
const score = document.querySelector(".score");

let runningDistance = 0;
let isGameOver = false;
let isGameStart = false;
let loopInterval;

const jump = () => {
    if (!isGameOver && isGameStart) {
        mario.classList.add("jump");
        setTimeout(() => {
            mario.classList.remove("jump");
        }, 750);
    }
};

const updateScore = () => {
    runningDistance++;
    score.textContent = runningDistance;

    if (runningDistance >= 1000) {
        score.style.color = "blue";
        gameBoard.style.background = "#0c1445"
    } else if (runningDistance >= 500) {
        score.style.color = "red";
        gameBoard.style.background = "#ff7b00"
    } else if (runningDistance >= 250) {
        score.style.color = "green";
        gameBoard.style.background = "linear-gradient(#87ceeb, #e0f6ff)"
    }
};


const endGame = () => {
    isGameOver = true;
    clearInterval(loopInterval);
    pipe.style.animation = "none";
    clouds.style.animation = "none";

    const restartBtn = document.querySelector(".restart-btn");
    if (!restartBtn) {
        const gameOver = document.createElement("div");
        gameOver.innerHTML = `<h1>GAME OVER!</h1>`;
        gameOver.classList.add("game-over");
        mario.style.animation = "mario-game-over 3s ease-in-out forwards"
        const btnsDiv = document.createElement("div");
        btnsDiv.className = "btns-div";
        btnsDiv.innerHTML = `<button class="restart-btn">restart</button><button class="menu-btn">menu</button>`;
        btnsDiv.onclick = () => {
            score.style.color = ""
            mario.src = "imgs/mario.gif";
            mario.classList.remove("mario-game-over");
            mario.style.animation = "none"
            mario.style.left = "-150px"
            pipe.style.left = "";
            clouds.style.left = "";
            isGameOver = false;
            isGameStart = false
            runningDistance = 0;
            score.textContent = "0";
            gameOver.remove();
            btnsDiv.remove();
            // startGameBtn.style.display = "block"
            startGame()
        };
        const menuBtn = btnsDiv.querySelector(".menu-btn");
        if (menuBtn) {
            menuBtn.addEventListener("click", () => {
                window.location.href = "../space-img/startGame.html"
            });
        }
        gameBoard.appendChild(gameOver);
        gameOver.appendChild(btnsDiv);
    }
};

const startGameBtn = document.createElement("button")
startGameBtn.innerHTML = `start`
startGameBtn.className = "start-btn"
gameBoard.appendChild(startGameBtn)
startGameBtn.onclick = () => {
    startGame()
    startGameBtn.style.display = "none"
}

const startGame = () => {
    isGameStart = true
    pipe.style.animation = "pipe-animation 2s linear infinite";
    clouds.style.animation = "clouds-animation 20s linear infinite";
    mario.style.left = "0"
    loopInterval = setInterval(() => {
        gameBoard.addEventListener("touchstart", jump);
        document.addEventListener("keyup", jump)
        updateScore();
        const pipePosition = pipe.offsetLeft;
        const cloudsPosition = clouds.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");
        const pipePositionHeight = +window.getComputedStyle(pipe).height.replace("px", "");
        if (pipePosition <= 130 && pipePosition > 0 && marioPosition < pipePositionHeight) {
            endGame();
            mario.src = "imgs/game-over.png";
            mario.classList.add("mario-game-over");
            pipe.style.left = `${pipePosition}px`;
            clouds.style.left = `${cloudsPosition}px`;
        }
    }, 100);
};

