# Max the Shiba Inu Website

A simple React + Express app that serves a photo/story site for Max the Shiba Inu, with optional Stripe donations.

### Quick start
- Install dependencies: `npm ci`
- Development (with Vite HMR): `npm run dev`
- Build (client + server): `npm run build`
- Start production server: `npm start`

### Scripts
- `dev`: Runs the Express server in development and mounts Vite middleware
- `build`: Builds the client with Vite to `dist/public` and bundles the server to `dist/index.js`
- `start`: Starts the bundled server (serves API and static client)
- `check`: TypeScript checks

### Environment variables
- `PORT` (optional): Port for the server; your platform may inject this. Defaults to `5000` locally.
- `VITE_STRIPE_PUBLIC_KEY` (optional): Enables client-side Stripe Elements for donations.
- `STRIPE_SECRET_KEY` (optional): Enables server-side Stripe payment intent creation.
- `DATABASE_URL` (optional): Required only if you plan to run Drizzle migrations (`drizzle-kit`). Current storage is in-memory by default.

### Deployment notes
- Node ESM build; ensure a Node 20+ runtime.
- The server must listen on `process.env.PORT` (already implemented).
- Build on CI: `npm ci && npm run build`, then run `npm start`.

### Deploying to Vercel (optional)
This app can be hosted on Vercel in two ways:

1) Single Node server (recommended here):
- Project Settings → Build & Output → Build Command: `npm run build`
- Output Directory: `dist/public`
- Install Command: `npm ci`
- Start Command: `npm start` (Vercel Node Server)

2) Pure static front-end + serverless API (advanced):
- Serve `dist/public` as static output and add API routes under `api/` functions.
- Configure rewrites so `/api/*` go to serverless functions and everything else to `index.html`.

### Project structure
- `client/`: React app (Vite)
- `server/`: Express server (TypeScript)
- `shared/`: Shared types and schema
- `attached_assets/`: Static images used by the site

### API (selected)
- `GET /api/photos` — list photos
- `POST /api/photos` — create photo
- `GET /api/stories` — list stories
- `POST /api/stories` — create story
- `POST /api/create-payment-intent` — create Stripe payment intent (enabled when Stripe keys are set)

### Design resources
- See `design_guidelines.md` for palette, typography, and UI notes.

### License
MIT
