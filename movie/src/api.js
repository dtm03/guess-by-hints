import axios from "axios";
import { normalizeTitle } from "./utils/stringUtils";

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === "development";
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

// Function to make API call - handles both development and production
const makeGeminiRequest = async (requestBody) => {
  if (isDevelopment && API_KEY) {
    // In development, call Gemini API directly if API key is available
    return await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    // In production or when no local API key, use serverless function
    return await axios.post("/api/gemini", requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

// Movie queue to avoid repeats
let movieQueue = [];
let usedMovies = new Set();

export const getMultipleMovies = async () => {
  try {
    const response = await makeGeminiRequest({
      contents: [
        {
          parts: [
            {
              text: `Generate 8 different popular movie titles with 5 hints each. Make sure they are all different movies from various genres and decades. 
Format it as follows for each movie:
Movie: [Movie Title]
Hint 1: [Challenging hint]
Hint 2: [Moderately challenging hint]
Hint 3: [Moderate hint]
Hint 4: [Easier hint]
Hint 5: [Easiest hint]

---

Repeat this format for all 8 movies. Make sure to include the --- separator between movies.`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1500,
      },
    });

    const result = response.data.candidates[0].content.parts[0].text.trim();
    const movieBlocks = result
      .split("---")
      .map((block) => block.trim())
      .filter((block) => block.length > 0);

    const movies = movieBlocks
      .map((block) => {
        const lines = block
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);
        const movie = lines[0].replace("Movie: ", "");
        const hints = lines
          .slice(1)
          .map((line) => line.replace(/Hint \d+: /, ""));
        return { movie, hints };
      })
      .filter((movie) => movie.movie && movie.hints.length >= 5);

    return movies;
  } catch (error) {
    console.error("Error fetching multiple movies:", error);
    return [];
  }
};

export const getMovieAndHints = async () => {
  // If queue is empty or low, fetch new movies
  if (movieQueue.length <= 2) {
    console.log("Fetching new movies...");
    const newMovies = await getMultipleMovies();

    // Filter out already used movies
    const unusedMovies = newMovies.filter((movie) => {
      const normalizedTitle = normalizeTitle(movie.movie);
      return !usedMovies.has(normalizedTitle);
    });

    movieQueue.push(...unusedMovies);
    console.log(`Added ${unusedMovies.length} new movies to queue`);
  }

  // Get next movie from queue
  if (movieQueue.length > 0) {
    const movie = movieQueue.shift();
    const normalizedTitle = normalizeTitle(movie.movie);
    usedMovies.add(normalizedTitle);

    // Clear used movies if we've used too many (reset after 50 movies)
    if (usedMovies.size > 50) {
      usedMovies.clear();
      console.log("Cleared used movies cache");
    }

    return movie;
  }

  // Fallback: fetch single movie if queue system fails
  try {
    const response = await makeGeminiRequest({
      contents: [
        {
          parts: [
            {
              text: `Give me a movie title of a rather popular movie and five hints to help someone guess the movie. 
Format it as follows:
Movie: [Movie Title]
Hint 1: [Challenging hint]
Hint 2: [Moderately challenging hint]
Hint 3: [Moderate hint]
Hint 4: [Easier hint]
Hint 5: [Easiest hint]

Make sure to follow this exact format with proper line breaks.`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 200,
      },
    });

    const result = response.data.candidates[0].content.parts[0].text.trim();
    const lines = result
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    const movie = lines[0].replace("Movie: ", "");
    const hints = lines.slice(1).map((line) => line.replace(/Hint \d+: /, ""));

    return { movie, hints };
  } catch (error) {
    console.error("Error fetching movie and hints:", error);
    return null;
  }
};
