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

// Book queue to avoid repeats
let bookQueue = [];
let usedBooks = new Set();

export const getMultipleBooks = async () => {
  try {
    const response = await makeGeminiRequest({
      contents: [
        {
          parts: [
            {
              text: `Generate 8 different popular book titles with 5 hints each. Make sure they are all different books from various genres and decades. 
Format it as follows for each book:
Book: [Book Title]
Hint 1: [Challenging hint]
Hint 2: [Moderately challenging hint]
Hint 3: [Moderate hint]
Hint 4: [Easier hint]
Hint 5: [Easiest hint]

---

Repeat this format for all 8 books. Make sure to include the --- separator between books.`,
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
    const bookBlocks = result
      .split("---")
      .map((block) => block.trim())
      .filter((block) => block.length > 0);

    const books = bookBlocks
      .map((block) => {
        const lines = block
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);
        const book = lines[0].replace("Book: ", "");
        const hints = lines
          .slice(1)
          .map((line) => line.replace(/Hint \d+: /, ""));
        return { book, hints };
      })
      .filter((book) => book.book && book.hints.length >= 5);

    return books;
  } catch (error) {
    console.error("Error fetching multiple books:", error);
    return [];
  }
};

export const getBookAndHints = async () => {
  // If queue is empty or low, fetch new books
  if (bookQueue.length <= 2) {
    console.log("Fetching new books...");
    const newBooks = await getMultipleBooks();

    // Filter out already used books
    const unusedBooks = newBooks.filter((book) => {
      const normalizedTitle = normalizeTitle(book.book);
      return !usedBooks.has(normalizedTitle);
    });

    bookQueue.push(...unusedBooks);
    console.log(`Added ${unusedBooks.length} new books to queue`);
  }

  // Get next book from queue
  if (bookQueue.length > 0) {
    const book = bookQueue.shift();
    const normalizedTitle = normalizeTitle(book.book);
    usedBooks.add(normalizedTitle);

    // Clear used books if we've used too many (reset after 50 books)
    if (usedBooks.size > 50) {
      usedBooks.clear();
      console.log("Cleared used books cache");
    }

    return book;
  }

  // Fallback: fetch single book if queue system fails
  try {
    const response = await makeGeminiRequest({
      contents: [
        {
          parts: [
            {
              text: `Give me a book title of a rather popular book and five hints to help someone guess the book. 
Format it as follows:
Book: [Book Title]
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
    const book = lines[0].replace("Book: ", "");
    const hints = lines.slice(1).map((line) => line.replace(/Hint \d+: /, ""));

    return { book, hints };
  } catch (error) {
    console.error("Error fetching book and hints:", error);
    return null;
  }
};
