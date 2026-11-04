import React, { useEffect } from "react";
import GradientBackground from "../components/GradientBackground";
import GuessInput from "../components/GuessInput";
import {
  handleNewHint,
  takeGuess,
  resetGame,
  skipBook,
} from "../utils/gameUtils";
import { useGameState } from "../hooks/useGameState";
import {
  Container,
  Title,
  Score,
  RemainingGuesses,
  BookReveal,
  Hint,
  Button,
  LoadingContainer,
  LoadingSpinner,
  StatsBar,
  StatItem,
  StatLabel,
  StatValue,
  ButtonGroup,
  SkipButton,
  StyledAvatar,
} from "../styles/GlobalStyles";

export default function GameScreen() {
  const gameState = useGameState();

  useEffect(() => {
    resetGame(true, gameState);
  }, []);

  if (!gameState.bookData) {
    return (
      <LoadingContainer>
        <GradientBackground color1="#134074" color2="#7899D4" />
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  const maxHints = gameState.bookData.hints
    ? gameState.bookData.hints.length
    : 5;
  const allHintsShown = gameState.hintIndex >= maxHints - 1;
  const isLastGuess =
    gameState.remainingNumberOfGuesses === 0 &&
    gameState.isGuessCorrect === false;

  return (
    <Container>
      <GradientBackground
        color1={
          gameState.isGuessCorrect === null
            ? "#134074"
            : gameState.isGuessCorrect
            ? "#C3D350"
            : "#C52233"
        }
        color2={
          gameState.isGuessCorrect === null
            ? "#7899D4"
            : gameState.isGuessCorrect
            ? "#52AA5E"
            : "#FF8833"
        }
      />

      {/* Stats Bar */}
      <StatsBar>
        <StatItem>
          <StatLabel>Books Guessed</StatLabel>
          <StatValue>{gameState.booksGuessed}</StatValue>
        </StatItem>
        <StatItem>
          <StyledAvatar
            src={require("../assets/sherlock.png")}
            alt="Sherlock"
          />
        </StatItem>
        <StatItem>
          <StatLabel>Rounds Played</StatLabel>
          <StatValue>{gameState.roundsPlayed}</StatValue>
        </StatItem>
      </StatsBar>

      <Score>{gameState.score}</Score>

      {/* Show book title on last failed guess, otherwise show remaining guesses */}
      {isLastGuess ? (
        <BookReveal>
          You should have guessed: {gameState.bookData.book}
        </BookReveal>
      ) : (
        <RemainingGuesses>
          Remaining Guesses: {gameState.remainingNumberOfGuesses}
        </RemainingGuesses>
      )}

      <GuessInput
        guess={gameState.guess}
        setGuess={gameState.setGuess}
        takeGuess={() => takeGuess(gameState)}
      />

      {gameState.bookData.hints &&
        gameState.bookData.hints
          .slice(0, gameState.hintIndex + 1)
          .map((hint, index) => <Hint key={index}>{hint}</Hint>)}

      <ButtonGroup>
        {!allHintsShown && (
          <Button
            onClick={() =>
              handleNewHint(
                gameState.hintIndex,
                gameState.setHintIndex,
                gameState.bookData.hints
              )
            }
          >
            New Hint
          </Button>
        )}
        <Button onClick={() => skipBook(gameState)}>Skip Book</Button>
      </ButtonGroup>
    </Container>
  );
}
