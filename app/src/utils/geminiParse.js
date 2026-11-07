/** Text from all content parts (Gemini may split or add thinking metadata). */
export function extractGeminiText(data) {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!parts?.length) return "";
  return parts
    .map((part) => part.text)
    .filter(Boolean)
    .join("\n")
    .trim();
}

function cleanLine(line) {
  return line
    .trim()
    .replace(/^\*\*|\*\*$/g, "")
    .trim();
}

export function parseTitleAndHints(text, mode) {
  const titlePrefix = mode === "movie" ? /^Movie:\s*/i : /^Book:\s*/i;
  const lines = text
    .split("\n")
    .map(cleanLine)
    .filter((line) => line.length > 0);

  let title = "";
  const hints = [];

  for (const line of lines) {
    if (titlePrefix.test(line)) {
      title = line.replace(titlePrefix, "").trim();
      continue;
    }
    const hintMatch = line.match(/^Hint\s*(\d+)\s*:\s*(.*)$/i);
    if (hintMatch) {
      const body = hintMatch[2].trim();
      if (body) hints.push(body);
    }
  }

  return { title, hints };
}

export function parseBatchBlocks(text, mode) {
  const label = mode === "movie" ? "Movie: " : "Book: ";
  const answerKey = mode === "movie" ? "movie" : "book";

  return text
    .split("---")
    .map((block) => block.trim())
    .filter((block) => block.length > 0)
    .map((block) => {
      const { title, hints } = parseTitleAndHints(block, mode);
      return { [answerKey]: title, hints };
    })
    .filter((entry) => {
      const t = entry[answerKey];
      return t && entry.hints.length >= 5;
    });
}
