"use strict";

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 15;
const GAME_DURATION_SEC = 5;
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

const gameButton = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const gameTitle = document.querySelector(".game__title");

const popUp = document.querySelector(".pop-up");
const popUpText = document.querySelector(".pop-up__message");
const popUpRefresh = document.querySelector(".pop-up__refresh");

const carrotSound = new Audio("./assets/sound/carrot_pull.mp3");
const alertSound = new Audio("./assets/sound/alert.wav");
const bgSound = new Audio("./assets/sound/bg.mp3");
const bugSound = new Audio("./assets/sound/bug_pull.mp3");
const winSound = new Audio("./assets/sound/game_win.mp3");

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener("click", onFieldClick);

gameButton.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpRefresh.addEventListener("click", () => {
  startGame();
  hidePopUp();
});

function startGame() {
  started = true;
  initGame();
  hideGameTitle();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText("REPLAY❓");
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  showPopUpWithText(win ? "YOU WON🎉" : "YOU LOST💥");
}

function showStopButton() {
  const icon = gameButton.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  gameButton.style.visibility = "visible";
}
function hideGameButton() {
  gameButton.style.visibility = "hidden";
}

function hideGameTitle() {
  gameTitle.style.display = "none";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}
function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }

    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove("pop-up--hide");
}

function hidePopUp() {
  popUp.classList.add("pop-up--hide");
}

function initGame() {
  field.innerHTML = "";
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  // 벌레와 당근을 생성한 뒤 field에 추가해줌
  addItem("carrot", 10, "./assets/img/carrot.png");
  addItem("bug", 15, "./assets/img/bug.png");
}

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    stopGameTimer();
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
