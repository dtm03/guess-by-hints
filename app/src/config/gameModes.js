export const GAME_MODES = {
  movie: {
    path: "/movie",
    title: "Guess the Movie",
    statLabel: "Movies Guessed",
    skipLabel: "Skip Movie",
    answerKey: "movie",
  },
  book: {
    path: "/book",
    title: "Guess the Book",
    statLabel: "Books Guessed",
    skipLabel: "Skip Book",
    answerKey: "book",
  },
};

export function getModeConfig(mode) {
  return GAME_MODES[mode] ?? GAME_MODES.movie;
}
