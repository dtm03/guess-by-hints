import { getMovieAndHints } from "../api";
import { titlesMatch } from "./stringUtils";

export const handleNewHint = (hintIndex, setHintIndex, hints) => {
  if (hintIndex < hints.length - 1) {
    setHintIndex(hintIndex + 1);
  }
};

export const takeGuess = (gameState) => {
  if (titlesMatch(gameState.guess, gameState.movieData.movie)) {
    gameState.setIsGuessCorrect(true);
    const newScore = gameState.score + 30 - (gameState.hintIndex + 1) * 5;
    gameState.setScore(newScore);

    gameState.setMoviesGuessed(gameState.moviesGuessed + 1);
    gameState.setRoundsPlayed(gameState.roundsPlayed + 1);

    setTimeout(() => {
      resetGame(false, gameState);
    }, 1000);
    return true;
  } else {
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
          resetGame(true, gameState);
        }, 3000);
      } else {
        gameState.setIsGuessCorrect(null);
      }
    }, 300);
    return false;
  }
};

export const skipMovie = (gameState) => {
  gameState.setRoundsPlayed(gameState.roundsPlayed + 1);
  gameState.setScore(0);
  resetGame(true, gameState);
};

export const resetGame = async (resetScore, gameState) => {
  if (resetScore) {
    gameState.setScore(0);
  }
  gameState.setHintIndex(0);
  gameState.setIsGuessCorrect(null);
  gameState.setGuess("");
  gameState.setRemainingNumberOfGuesses(3);

  const data = await getMovieAndHints();
  if (data) {
    const { movie, hints } = data;
    gameState.setMovieData({ movie, hints });
  }
};
