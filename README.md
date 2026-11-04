# Guess by hints

React guessing games: pick **movie** or **book**, get hints until you guess the title.

## Deploy (recommended — one URL with chooser)

Use the unified app in [`app/`](app/):

| URL path | What |
|----------|------|
| `/` | Choose movie or book |
| `/movie` | Movie game |
| `/book` | Book game |

### Vercel

1. Import this GitHub repo in [Vercel](https://vercel.com).
2. **Root Directory:** `app`
3. **Environment variables** (Production):
   - `GEMINI_API_KEY` — server-side, for `/api/gemini` (required in production)
   - Optional for local-style dev on Vercel: `REACT_APP_GEMINI_API_KEY` (usually not needed if the API route works)
4. Deploy. Your site root shows the picker; `/movie` and `/book` work via client routing (`vercel.json` rewrites).

If you had two old Vercel projects (`movie/` and `book/` roots), you can delete one and point your domain at this single project.

### Run locally

```bash
cd app
npm install
cp .env.example .env
# REACT_APP_GEMINI_API_KEY=...  (direct Gemini calls in development)
npm start
```

Open [http://localhost:3000](http://localhost:3000) — start page, then pick a mode.

## Legacy standalone apps

[`movie/`](movie/) and [`book/`](book/) are the earlier split apps (each its own CRA + Vercel root). Kept for reference; **`app/` is what you should deploy** for one combined experience.

## History

Replaces the older GitHub repos `guess-the-movie` and `guess-the-book`.
