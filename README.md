# Rugby Next Fixture Finder

A tiny static website that lets you enter two international rugby teams and shows the next scheduled match between them.

This repository ships with a small sample dataset (`data/fixtures_sample.json`) for demonstration. You can later swap in a real fixtures API (RapidAPI, SportMonks, etc.).

## Local usage

Open `index.html` in your browser. No build step required.

## How it works

- UI in `index.html` + `styles.css`.
- Logic in `src/app.js`.
- Fixtures source in `src/data-source.js` (currently loads `data/fixtures_sample.json`).
- Utility helpers in `src/utils.js`.

## Replacing the data source with a real API

Edit `src/data-source.js` and replace `loadFixtures()` with a call to your chosen API. Normalize the API's response to this shape:

```jsonc
{
  "date": "2025-11-22T15:00:00Z",
  "competition": "Autumn Nations Series",
  "venue": "Twickenham Stadium, London",
  "teams": { "home": "England", "away": "South Africa" }
}
```

Then ensure `findNextFixtureBetween(teamA, teamB)` still returns the soonest upcoming fixture that contains both teams.

> Important: If your API requires a key, do not expose it directly in a public GitHub Pages site. Use a simple proxy (Cloudflare Workers, Netlify Functions, Vercel Serverless) to keep the key secret server-side, and have the frontend call your proxy endpoint.

## Deploying to GitHub Pages

- Create a GitHub repo and push this folder.
- Enable GitHub Pages for the repo (Settings ➜ Pages ➜ Deploy from branch ➜ `main` ➜ `/` root).
- The site will be available at `https://<your-username>.github.io/<repo-name>/`.

## Notes

- The provided fixtures are illustrative and may not reflect the actual schedule. Replace with a trusted source for production.
- Country name normalization supports a few nicknames in `src/utils.js` and is easy to extend.
