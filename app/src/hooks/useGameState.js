import { useState } from "react";

export const useGameState = () => {
  const [score, setScore] = useState(0);
  const [remainingNumberOfGuesses, setRemainingNumberOfGuesses] = useState(3);
  const [isGuessCorrect, setIsGuessCorrect] = useState(null);
  const [guess, setGuess] = useState("");
  const [hintIndex, setHintIndex] = useState(0);
  const [roundData, setRoundData] = useState(null);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [itemsGuessed, setItemsGuessed] = useState(0);

  return {
    score,
    setScore,
    remainingNumberOfGuesses,
    setRemainingNumberOfGuesses,
    isGuessCorrect,
    setIsGuessCorrect,
    guess,
    setGuess,
    hintIndex,
    setHintIndex,
    roundData,
    setRoundData,
    roundsPlayed,
    setRoundsPlayed,
    itemsGuessed,
    setItemsGuessed,
  };
};
