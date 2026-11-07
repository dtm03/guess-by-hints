import { getRoundAndHints } from "../api";
import { getModeConfig } from "../config/gameModes";
import { titlesMatch } from "./stringUtils";

export const handleNewHint = (hintIndex, setHintIndex, hints) => {
  if (hintIndex < hints.length - 1) {
    setHintIndex(hintIndex + 1);
  }
};

function getAnswer(roundData, mode) {
  const { answerKey } = getModeConfig(mode);
  return roundData?.[answerKey];
}

export const takeGuess = (gameState, mode) => {
  const answer = getAnswer(gameState.roundData, mode);
  if (titlesMatch(gameState.guess, answer)) {
    gameState.setIsGuessCorrect(true);
    const newScore = gameState.score + 30 - (gameState.hintIndex + 1) * 5;
    gameState.setScore(newScore);
    gameState.setItemsGuessed(gameState.itemsGuessed + 1);
    gameState.setRoundsPlayed(gameState.roundsPlayed + 1);

    setTimeout(() => {
      resetGame(false, gameState, mode);
    }, 1000);
    return true;
  }

  gameState.setIsGuessCorrect(false);
  if (gameState.remainingNumberOfGuesses > 0) {
    gameState.setRemainingNumberOfGuesses(
      gameState.remainingNumberOfGuesses - 1
    );
  }
  setTimeout(() => {
    if (gameState.remainingNumberOfGuesses <= 1) {
      gameState.setRoundsPlayed(gameState.roundsPlayed + 1);
      setTimeout(() => {
        gameState.setIsGuessCorrect(null);
        gameState.setScore(0);
        resetGame(true, gameState, mode);
      }, 3000);
    } else {
      gameState.setIsGuessCorrect(null);
    }
  }, 300);
  return false;
};

export const skipRound = (gameState, mode) => {
  gameState.setRoundsPlayed(gameState.roundsPlayed + 1);
  gameState.setScore(0);
  resetGame(true, gameState, mode);
};

/** After all hints are visible, show the answer then load the next round. */
export const advanceAfterAllHintsRevealed = (gameState, mode) => {
  gameState.setRoundsPlayed(gameState.roundsPlayed + 1);
  gameState.setScore(0);
  resetGame(true, gameState, mode);
};

export const resetGame = async (resetScore, gameState, mode) => {
  if (resetScore) {
    gameState.setScore(0);
  }
  gameState.setHintIndex(0);
  gameState.setIsGuessCorrect(null);
  gameState.setGuess("");
  gameState.setRemainingNumberOfGuesses(3);

  let data = await getRoundAndHints(mode);
  if (!data) {
    data = await getRoundAndHints(mode);
  }
  if (data) {
    gameState.setRoundData(data);
  }
};
