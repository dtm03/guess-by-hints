import React from "react";
import {
  GuessInputContainer,
  GuessInput as StyledInput,
  Button,
} from "../styles/GlobalStyles";

const GuessInput = ({ guess, setGuess, takeGuess }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    takeGuess();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <GuessInputContainer>
        <StyledInput
          type="text"
          placeholder="Enter your guess here"
          onChange={(e) => setGuess(e.target.value)}
          value={guess}
          onKeyPress={handleKeyPress}
        />
        <Button
          style={{
            marginTop: "0",
          }}
        >
          Guess
        </Button>
      </GuessInputContainer>
    </form>
  );
};

export default GuessInput;
