import { useState } from "react";

export const useGameState = () => {
  const [score, setScore] = useState(0);
  const [remainingNumberOfGuesses, setRemainingNumberOfGuesses] = useState(3);
  const [isGuessCorrect, setIsGuessCorrect] = useState(null);
  const [guess, setGuess] = useState("");
  const [hintIndex, setHintIndex] = useState(0);
  const [bookData, setBookData] = useState(null);

  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [booksGuessed, setBooksGuessed] = useState(0);

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
    bookData,
    setBookData,
    roundsPlayed,
    setRoundsPlayed,
    booksGuessed,
    setBooksGuessed,
  };
};
