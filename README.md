# Portfolio Racer

A lightweight 3D portfolio website where visitors drive an F1-inspired car through a futuristic map of portfolio landmarks.

## Stack

- React 19
- Vite 8
- Three.js
- React Three Fiber
- Drei
- Nginx production container

The app is fully client-side. Your server only has to serve static files, so a 2-vCPU / 4-GB RAM VPS is more than sufficient.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite.

## Production build

```bash
npm install
npm run build
npm run preview
```

## Deploy with Docker

```bash
docker compose up -d --build
```

The site is served on port 80. Put Caddy, Nginx Proxy Manager, Traefik, Cloudflare Tunnel, or your preferred reverse proxy in front if you want automatic HTTPS/domain routing.

## Customize your portfolio

Edit `src/data.js` first. It contains the name, role, intro text and all six landmark content objects.

Useful next upgrades:

1. Replace the procedural car with an optimized `.glb` model (keep it under ~3–5 MB compressed).
2. Add real project detail routes and project screenshots.
3. Add downloadable CV/motivation-letter PDFs under `public/documents/`.
4. Connect the Contact landmark to a serverless form endpoint.
5. Add a small minimap and route guidance once the world grows larger.

## Controls

- `W` / `↑` — accelerate
- `S` / `↓` — reverse
- `A` / `←` — steer left
- `D` / `→` — steer right
- `Shift` — boost
- `Space` — brake
- Click any landmark to open it

## Performance choices

The scene avoids a physics engine, post-processing stack, heavy textures and large external 3D assets. Camera/car motion is kinematic, shadows are limited to a 1024px map, DPR is capped at 1.5, and the world is intentionally low-poly. This keeps client rendering significantly lighter while the server remains essentially static-file-only.
