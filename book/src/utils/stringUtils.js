// Normalize book titles for better matching
export const normalizeTitle = (title) => {
  return title
    .toLowerCase()
    .replace(/^(the|a|an)\s+/i, "") // Remove articles at the beginning
    .replace(/[^a-zA-Z0-9]/g, "") // Remove all non-alphanumeric characters
    .trim();
};

// Check if two titles match using normalized comparison
export const titlesMatch = (guess, bookTitle) => {
  const normalizedGuess = normalizeTitle(guess);
  const normalizedTitle = normalizeTitle(bookTitle);

  return normalizedGuess === normalizedTitle;
};
