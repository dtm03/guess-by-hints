import axios from "axios";
import { normalizeTitle } from "./utils/stringUtils";

const isDevelopment = process.env.NODE_ENV === "development";
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const makeGeminiRequest = async (requestBody) => {
  if (isDevelopment && API_KEY) {
    return await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return await axios.post("/api/gemini", requestBody, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const queues = {
  movie: [],
  book: [],
};
const usedTitles = {
  movie: new Set(),
  book: new Set(),
};

const PROMPTS = {
  movie: {
    batch: `Generate 8 different popular movie titles with 5 hints each. Make sure they are all different movies from various genres and decades. 
Format it as follows for each movie:
Movie: [Movie Title]
Hint 1: [Challenging hint]
Hint 2: [Moderately challenging hint]
Hint 3: [Moderate hint]
Hint 4: [Easier hint]
Hint 5: [Easiest hint]

---

Repeat this format for all 8 movies. Make sure to include the --- separator between movies.`,
    single: `Give me a movie title of a rather popular movie and five hints to help someone guess the movie. 
Format it as follows:
Movie: [Movie Title]
Hint 1: [Challenging hint]
Hint 2: [Moderately challenging hint]
Hint 3: [Moderate hint]
Hint 4: [Easier hint]
Hint 5: [Easiest hint]

Make sure to follow this exact format with proper line breaks.`,
    label: "Movie: ",
  },
  book: {
    batch: `Generate 8 different popular book titles with 5 hints each. Make sure they are all different books from various genres and decades. 
Format it as follows for each book:
Book: [Book Title]
Hint 1: [Challenging hint]
Hint 2: [Moderately challenging hint]
Hint 3: [Moderate hint]
Hint 4: [Easier hint]
Hint 5: [Easiest hint]

---

Repeat this format for all 8 books. Make sure to include the --- separator between books.`,
    single: `Give me a book title of a rather popular book and five hints to help someone guess the book. 
Format it as follows:
Book: [Book Title]
Hint 1: [Challenging hint]
Hint 2: [Moderately challenging hint]
Hint 3: [Moderate hint]
Hint 4: [Easier hint]
Hint 5: [Easiest hint]

Make sure to follow this exact format with proper line breaks.`,
    label: "Book: ",
  },
};

async function getMultiple(mode) {
  const { batch, label } = PROMPTS[mode];
  try {
    const response = await makeGeminiRequest({
      contents: [{ parts: [{ text: batch }] }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1500,
      },
    });

    const result = response.data.candidates[0].content.parts[0].text.trim();
    const blocks = result
      .split("---")
      .map((block) => block.trim())
      .filter((block) => block.length > 0);

    return blocks
      .map((block) => {
        const lines = block
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);
        const title = lines[0].replace(label, "");
        const hints = lines
          .slice(1)
          .map((line) => line.replace(/Hint \d+: /, ""));
        return { [mode === "movie" ? "movie" : "book"]: title, hints };
      })
      .filter((entry) => {
        const title = entry.movie ?? entry.book;
        return title && entry.hints.length >= 5;
      });
  } catch (error) {
    console.error(`Error fetching multiple ${mode}s:`, error);
    return [];
  }
}

export async function getRoundAndHints(mode) {
  const answerKey = mode === "movie" ? "movie" : "book";

  if (queues[mode].length <= 2) {
    const fresh = await getMultiple(mode);
    const unused = fresh.filter((item) => {
      const title = item[answerKey];
      return !usedTitles[mode].has(normalizeTitle(title));
    });
    queues[mode].push(...unused);
  }

  if (queues[mode].length > 0) {
    const item = queues[mode].shift();
    const title = item[answerKey];
    usedTitles[mode].add(normalizeTitle(title));
    if (usedTitles[mode].size > 50) {
      usedTitles[mode].clear();
    }
    return item;
  }

  try {
    const response = await makeGeminiRequest({
      contents: [{ parts: [{ text: PROMPTS[mode].single }] }],
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
    const title = lines[0].replace(PROMPTS[mode].label, "");
    const hints = lines.slice(1).map((line) => line.replace(/Hint \d+: /, ""));

    return { [answerKey]: title, hints };
  } catch (error) {
    console.error(`Error fetching ${mode} and hints:`, error);
    return null;
  }
}
