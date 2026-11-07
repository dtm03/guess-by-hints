import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GradientBackground from "../components/GradientBackground";
import GuessInput from "../components/GuessInput";
import {
  handleNewHint,
  takeGuess,
  resetGame,
  skipRound,
  advanceAfterAllHintsRevealed,
} from "../utils/gameUtils";
import { useGameState } from "../hooks/useGameState";
import { getModeConfig } from "../config/gameModes";
import {
  Container,
  Score,
  RemainingGuesses,
  AnswerReveal,
  Hint,
  Button,
  LoadingContainer,
  LoadingSpinner,
  StatsBar,
  StatItem,
  StatLabel,
  StatValue,
  ButtonGroup,
  StyledAvatar,
  BackLink,
} from "../styles/GlobalStyles";

export default function GameScreen({ mode = "movie" }) {
  const config = getModeConfig(mode);
  const gameState = useGameState();

  const roundKeyRef = useRef(null);
  const advanceTimerRef = useRef(null);
  const gameStateRef = useRef(gameState);
  gameStateRef.current = gameState;

  useEffect(() => {
    resetGame(true, gameState, mode);
  }, [mode]);

  const roundData = gameState.roundData;
  const answer = roundData?.[config.answerKey];
  const maxHints = roundData?.hints?.length ?? 5;
  const allHintsShown = gameState.hintIndex >= maxHints - 1;
  const isLastGuess =
    gameState.remainingNumberOfGuesses === 0 &&
    gameState.isGuessCorrect === false;
  const revealAnswerAfterAllHints =
    Boolean(roundData) &&
    allHintsShown &&
    gameState.isGuessCorrect === null;
  const showAnswer = isLastGuess || revealAnswerAfterAllHints;

  useEffect(() => {
    roundKeyRef.current = null;
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, [answer]);

  useEffect(() => {
    if (!revealAnswerAfterAllHints || !answer) return;
    if (roundKeyRef.current === answer) return;
    roundKeyRef.current = answer;

    advanceTimerRef.current = setTimeout(() => {
      advanceAfterAllHintsRevealed(gameStateRef.current, mode);
    }, 3000);

    return () => {
      if (advanceTimerRef.current) {
        clearTimeout(advanceTimerRef.current);
        advanceTimerRef.current = null;
      }
    };
  }, [revealAnswerAfterAllHints, answer, mode]);

  if (!roundData) {
    return (
      <LoadingContainer>
        <GradientBackground color1="#134074" color2="#7899D4" />
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

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

      <StatsBar>
        <StatItem>
          <StatLabel>{config.statLabel}</StatLabel>
          <StatValue>{gameState.itemsGuessed}</StatValue>
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

      {showAnswer ? (
        <AnswerReveal>
          {revealAnswerAfterAllHints
            ? `The answer is: ${answer}`
            : `You should have guessed: ${answer}`}
        </AnswerReveal>
      ) : (
        <RemainingGuesses>
          Remaining Guesses: {gameState.remainingNumberOfGuesses}
        </RemainingGuesses>
      )}

      {!revealAnswerAfterAllHints && (
        <GuessInput
          guess={gameState.guess}
          setGuess={gameState.setGuess}
          takeGuess={() => takeGuess(gameState, mode)}
        />
      )}

      {roundData.hints
        ?.slice(0, gameState.hintIndex + 1)
        .filter((hint) => hint?.trim())
        .map((hint, index) => (
          <Hint key={index}>
            Hint {index + 1}: {hint}
          </Hint>
        ))}

      {!revealAnswerAfterAllHints && (
        <ButtonGroup>
          {!allHintsShown && (
            <Button
              onClick={() =>
                handleNewHint(
                  gameState.hintIndex,
                  gameState.setHintIndex,
                  roundData.hints
                )
              }
            >
              New Hint
            </Button>
          )}
          <Button onClick={() => skipRound(gameState, mode)}>
            {config.skipLabel}
          </Button>
        </ButtonGroup>
      )}

      <BackLink as={Link} to="/">
        ← Choose movie or book
      </BackLink>
    </Container>
  );
}
