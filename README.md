# Lars Moelleken – CV & Prompt-Injection Demo

Interactive CV for Lars Moelleken (Senior PHP Developer) with a built-in educational demo showing how AI recruiters can be manipulated through prompt-injection attacks—and how to defend against them.

**Live:** https://voku.github.io/Lars_Moelleken_CV/

---

## Features

- **Interactive CV** – Professional landing page with skills, experience, and open-source highlights.
- **AI Trust Boundary Demo** – Side-by-side comparison of a *naive* AI recruiter vs a *hardened* one when processing the CV HTML.
- **Trust Boundary Report** – Visual breakdown of detected injection signals, sanitized facts, and injection attempts.
- **GitHub Pages deployment** – Static build served via Vite, auto-deployed on every push to `main`.

---

## Run Locally

**Prerequisites:** Node.js ≥ 18

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the example env file and fill in your tokens:
   ```bash
   cp .env.example .env.local
   ```
   Set `GITHUB_TOKEN` (required for the `/api/analyze` endpoint).

3. Start the API server (in one terminal):
   ```bash
   npm run server
   ```

4. Start the Vite dev server (in another terminal):
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000

---

## Production Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

---

## GitHub Pages Deployment

Push to `main` and the included GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and deploy to GitHub Pages.

---

## Key Files

| File | Purpose |
|---|---|
| `src/App.tsx` | Main React application (CV + demo UI) |
| `server.ts` | Express API server (`/api/analyze`) |
| `src/trust.ts` | Sanitization & injection-signal classifier |
| `src/components/TrustBoundaryReport.tsx` | Visual trust report component |
| `src/types.ts` | Shared TypeScript types |
| `vite.config.ts` | Vite build configuration |
| `.github/workflows/deploy.yml` | GitHub Pages CI/CD workflow |

---

## Key Files Detector (helper prompt)

Paste the following into any AI assistant to quickly identify the most important files in this repository:

```
List the most important source files in this repo and explain what each one does.
Focus on: entry points, API routes, data models, and configuration files.
Ignore node_modules, dist, and generated files.
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GITHUB_TOKEN` | Yes (server) | GitHub PAT used to call the Copilot API for `/api/analyze` |
| `OPENAI_MODEL` | No | Override the model (default: `gpt-4.1-2025-04-14`) |
| `API_PORT` | No | Port for the Express server (default: `3001`) |
