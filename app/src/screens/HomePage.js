import React from "react";
import { Link } from "react-router-dom";
import GradientBackground from "../components/GradientBackground";
import { GAME_MODES } from "../config/gameModes";
import {
  HomeContainer,
  HomeTitle,
  HomeSubtitle,
  ModeGrid,
  ModeCard,
  ModeCardTitle,
  ModeCardText,
} from "../styles/GlobalStyles";

export default function HomePage() {
  return (
    <HomeContainer>
      <GradientBackground color1="#134074" color2="#7899D4" />
      <HomeTitle>Guess by hints</HomeTitle>
      <HomeSubtitle>Pick a category — hints get easier until you guess the title.</HomeSubtitle>
      <ModeGrid>
        <ModeCard as={Link} to={GAME_MODES.movie.path}>
          <ModeCardTitle>Movie</ModeCardTitle>
          <ModeCardText>Film titles from cryptic to obvious hints.</ModeCardText>
        </ModeCard>
        <ModeCard as={Link} to={GAME_MODES.book.path}>
          <ModeCardTitle>Book</ModeCardTitle>
          <ModeCardText>Classic and popular books, same scoring rules.</ModeCardText>
        </ModeCard>
      </ModeGrid>
    </HomeContainer>
  );
}
