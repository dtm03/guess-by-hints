# Guess by hints

Two small React guessing games: hints get easier until you guess the title. Same UI and scoring; different prompts (movies vs books).

| App | Folder | Stack |
|-----|--------|--------|
| Guess the Movie | [`movie/`](movie/) | Create React App + Vercel serverless (`api/gemini.js`) |
| Guess the Book | [`book/`](book/) | Same |

## Run locally

Each app is independent (own `package.json`):

```bash
cd movie   # or book
npm install
cp .env.example .env
# set REACT_APP_GEMINI_API_KEY in .env
npm start
```

## Deploy on Vercel

Create **one Vercel project per app** (or two deployments from this repo):

- **Movie:** Root Directory = `movie`
- **Book:** Root Directory = `book`

Set `REACT_APP_GEMINI_API_KEY` in the Vercel project environment. The Gemini proxy lives in each app’s `api/` folder.

## History

Replaces the older GitHub repos `guess-the-movie` and `guess-the-book`.
