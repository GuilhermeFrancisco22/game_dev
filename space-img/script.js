const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const finishDiv = document.querySelector(".finish");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const mainGame = document.querySelector(".main-game")
const titleGame = document.querySelector(".main-game h1")

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;

const quitBtn = document.createElement("button")
quitBtn.innerText = "quit"
quitBtn.className = "quit-btn"
mainGame.appendChild(quitBtn)

quitBtn.onclick = () => {
  finish()
}

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
  }
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  quitBtn.style.display = "none"
  textFinish.innerHTML = `você acertou <span class="questions-correct">${questionsCorrect}</span> de ${questions.length}`;
  const questionsCorrectSpan = textFinish.querySelector(".questions-correct")
  questionsCorrectSpan.style.color = ""
  if (questionsCorrect >= 7) {
    questionsCorrectSpan.style.color = "green"
  } else {
    questionsCorrectSpan.style.color = "red"
  }
  content.style.display = "none";
  contentFinish.style.display = "flex";
  titleGame.innerHTML = "END GAME"
  titleGame.classList.add("end-game")
  const divBtns = document.createElement("div")
  divBtns.className = "div-btns"
  divBtns.innerHTML = `<button class="restart-btn">restart</button><button class="menu-btn">menu</button><button class="podio-btn">pódio</button>`
  const restartBtn = divBtns.querySelector(".restart-btn")
  restartBtn.onclick = () => {
    quitBtn.style.display = "block"
    content.style.display = "flex";
    contentFinish.style.display = "none";
    currentIndex = 0;
    questionsCorrect = 0;
    divBtns.innerHTML = ""
    loadQuestion();
  };
  const menuBtn = divBtns.querySelector(".menu-btn")
  menuBtn.onclick = () => {
    window.location.href = "./startGame.html"
  }
  finishDiv.appendChild(divBtns)
}

function loadQuestion() {
  spnQtd.innerHTML = `question: ${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;
  titleGame.innerHTML = "DEV QUIZ"
  titleGame.classList.remove("end-game")

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
     <span>${answer.alternative}</span> ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
