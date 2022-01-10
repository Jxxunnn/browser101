import * as sound from "./sound.js";
import Field from "./field.js";

export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  carrotCount(num) {
      this.carrotCount = num;
      return this;
}

bugCount(num) {
    this.bugCount= num;
    return this;
}

build() {
    return new Game(
        this.gameDuration,
        this.carrotCount,
        this.bugCount
    )
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameButton = document.querySelector(".game__button");
    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");

    this.gameButton.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.gameField = new Field(this.CARROT_COUNT, this.BUG_COUNT);
    this.gameField.setClickListner(this.onItemClick);

    this.gameTitle = document.querySelector(".game__title");
    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.hideGameTitle();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackGround();
  }

  stop() {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();

    sound.playAlert();
    sound.stopBackGround();
    this.onGameStop && this.onGameStop("cancel");
  }

  finish(win) {
    this.started = false;
    this.hideGameButton();
    if (win) {
      sound.playWin();
    } else {
      sound.playBug();
    }
    this.stopGameTimer();
    sound.stopBackGround();
    this.onGameStop && this.onGameStop(win ? "win" : "lose");
  }

  onItemClick = (item) => {
    if (!started) {
      return;
    }

    if (item === ".carrot") {
      score++;
      this.updateScoreBoard();
      if (this.score === this.CARROT_COUNT) {
        this.finish(true);
      }
    } else if (item === ".bug") {
      this.finish(false);
    }
  };

  showStopButton() {
    const icon = this.gameButton.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.gameButton.style.visibility = "visible";
  }
  hideGameButton() {
    this.gameButton.style.visibility = "hidden";
  }

  hideGameTitle() {
    this.gameTitle.style.display = "none";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }
  startGameTimer() {
    let remainingTimeSec = this.GAME_DURATION_SEC;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.CARROT_COUNT === this.score);
        return;
      }

      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.CARROT_COUNT;
    this.gameField.init();
    // 벌레와 당근을 생성한 뒤 field에 추가해줌
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.CARROT_COUNT - this.score;
  }
}
