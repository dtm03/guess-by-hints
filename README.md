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
2. **Project Settings → General → Root Directory:** `app` (Edit → select `app` → Save).
3. **Build settings** (usually auto-detected for Create React App):
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
4. **Environment variables** → **Production** (and Preview if you want):
   - Name: `GEMINI_API_KEY` — your Google AI / Gemini key  
   - Enable **Sensitive** (so teammates cannot read the value; it is still used server-side by `api/gemini.js`).  
   - Do **not** check “expose to browser” / do **not** prefix with `REACT_APP_` (that would leak the key to visitors).
   - Remove `REACT_APP_GEMINI_API_KEY` from Vercel unless you intentionally want client-side calls.
5. Redeploy after changing variables or Root Directory.

Your site root shows the picker; `/movie` and `/book` use client routing (`app/vercel.json` rewrites).

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
