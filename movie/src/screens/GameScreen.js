import React, { useEffect } from "react";
import GradientBackground from "../components/GradientBackground";
import GuessInput from "../components/GuessInput";
import {
  handleNewHint,
  takeGuess,
  resetGame,
  skipMovie,
} from "../utils/gameUtils";
import { useGameState } from "../hooks/useGameState";
import {
  Container,
  Title,
  Score,
  RemainingGuesses,
  MovieReveal,
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

  if (!gameState.movieData) {
    return (
      <LoadingContainer>
        <GradientBackground color1="#134074" color2="#7899D4" />
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  const maxHints = gameState.movieData.hints
    ? gameState.movieData.hints.length
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
          <StatLabel>Movies Guessed</StatLabel>
          <StatValue>{gameState.moviesGuessed}</StatValue>
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

      {/* Show movie title on last failed guess, otherwise show remaining guesses */}
      {isLastGuess ? (
        <MovieReveal>
          You should have guessed: {gameState.movieData.movie}
        </MovieReveal>
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

      {gameState.movieData.hints &&
        gameState.movieData.hints
          .slice(0, gameState.hintIndex + 1)
          .map((hint, index) => <Hint key={index}>{hint}</Hint>)}

      <ButtonGroup>
        {!allHintsShown && (
          <Button
            onClick={() =>
              handleNewHint(
                gameState.hintIndex,
                gameState.setHintIndex,
                gameState.movieData.hints
              )
            }
          >
            New Hint
          </Button>
        )}
        <Button onClick={() => skipMovie(gameState)}>Skip Movie</Button>
      </ButtonGroup>
    </Container>
  );
}
