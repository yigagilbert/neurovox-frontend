# NeuroVox Front‑end

A lightweight React (Vite) interface for the Dementia Detection API.

## Quick start
```bash
# 1. install
pnpm install   # or npm/yarn

# 2. duplicate env file
cp .env.example .env
# add your backend url
VITE_API_URL=https://backend-9277c693-08f7-4400-9585.renu-01.cranecloud.io

# 3. dev
pnpm dev

# 4. build for prod
pnpm build && pnpm preview
```

## Notes
- Uses **MediaRecorder** to capture microphone audio.
- Client‑side converts WebM/OGG to WAV (librosa‑friendly) via *wavefile*.
- TailwindCSS for styling (already configured by `npm i -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`).
- Deployed easily on Vercel, Netlify or Cloudflare Pages.

---
Feel free to tweak colours, fonts, or extend routes for additional tests (Memory Q&A, etc.).
