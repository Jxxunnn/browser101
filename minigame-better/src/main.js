"use strict";
import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";
import Game from "./game.js";

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 15;
const GAME_DURATION_SEC = 5;

const gameFinishBanner = new PopUp();

const game = new Game(20, 20, 20);
game.setGameStopListener((reason) => {
  console.log(reason);
  let message;
  switch (reason) {
    case "cancel":
      message = "cancel";
      break;
    case "win":
      message = "win";
      break;
    case "lose":
      message = "lose";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
