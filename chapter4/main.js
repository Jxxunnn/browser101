"use strict";

const playButton = document.querySelector(".button__play");
const stopButton = document.querySelector(".button__stop");

const timer = document.querySelector(".timer");
const gameField = document.querySelector(".game__field");
const count = document.querySelector(".count");
const modal = document.querySelector(".modal__container");
const replay = document.querySelector(".replay");
const close = document.querySelector(".close");
const modalText = document.querySelector(".modal__text");

window.addEventListener("load", () => {
  playButton.addEventListener("click", () => {
    changeButton();
    setCountDown();
    count.innerHTML = 10;
    setField();
  });
  stopButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  modal.addEventListener("click", (event) => {
    if (event.target.dataset.id == "replay") {
      modal.style.display = "none";
      document.querySelectorAll("img").forEach((elem) => elem.remove());

      changeButton();
      setCountDown();
      count.innerHTML = 10;
      setField();
    }
    if (event.target.dataset.id == "close") {
      modal.style.display = "none";
      playButton.style.display = "block";
      stopButton.style.display = "none";
      document.querySelectorAll("img").forEach((elem) => elem.remove());
      count.innerHTML = 0;

      // 1. 타이머 0으로 만들어줘야 함.
      // 2. 캐롯, 벌레들 다 죽여야 함.
    }
  });

  gameField.addEventListener("click", (event) => {
    if (event.target.dataset.id == "carrot") {
      count.innerHTML--;
      event.target.style.display = "none";
    }
    if (event.target.dataset.id == "bug") {
      modal.style.display = "block";
      modalText.innerHTML = "You Lose!";
    }
  });
});

// 버튼 바꾸는 함수

function changeButton() {
  playButton.style.display = "none";
  stopButton.style.display = "block";
}

// make Bug and Carrot

function setField() {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
  }
  for (let i = 0; i < 10; i++) {
    const carrot = document.createElement("img");
    carrot.classList.add("carrot");
    carrot.src = "./assets/img/carrot.png";
    carrot.setAttribute("data-id", "carrot");
    const bug = document.createElement("img");
    bug.classList.add("bug");
    bug.src = "./assets/img/bug.png";
    bug.setAttribute("data-id", "bug");
    gameField.appendChild(carrot);
    gameField.appendChild(bug);

    const carrotX = getRandomInt(0, 85);
    const carrotY = getRandomInt(0, 50);
    carrot.style.left = `${carrotX}%`;
    carrot.style.top = `${carrotY}%`;

    const bugX = getRandomInt(0, 85);
    const bugY = getRandomInt(0, 50);
    bug.style.left = `${bugX}%`;
    bug.style.top = `${bugY}%`;
  }
}

// 카운트 다운 함수

function paddedFormat(num) {
  return num < 10 ? "0" + num : num;
}

function setCountDown() {
  let time_sec = 10;
  let time_millisec = 0;
  let duration = time_sec * 60 + time_millisec;
  timer.textContent = `${paddedFormat(time_sec)}:${paddedFormat(
    time_millisec
  )}`;
  startCountDown(duration, timer);
}

function startCountDown(duration, timer) {
  let secondsRemaining = duration;
  let sec = 0;
  let milliSec = 0;

  let countInterval = setInterval(function () {
    sec = parseInt(secondsRemaining / 60);
    milliSec = parseInt(secondsRemaining % 60);

    timer.textContent = `${paddedFormat(sec)}:${paddedFormat(milliSec)}`;

    secondsRemaining = secondsRemaining - 1;

    if (secondsRemaining < 0) {
      clearInterval(countInterval);
      modal.style.display = "block";
      modalText.innerHTML = "You Lose!";
    }
  }, 10);
}
