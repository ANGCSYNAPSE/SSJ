# SSJ — Shree Shyam Jagat

Devotional platform built from the [Figma design file](https://www.figma.com/design/eqyeNqdl9Q5lo7Vouh2p73/SSJ).

The repo holds two independent applications, each self-contained with its own
`package.json`, dependencies and `.env`:

```
SSJ/
  frontend/   Next.js 14 frontend (App Router, TypeScript)   → :3000
  backend/    Express REST API on Neon Postgres              → :5000
  package.json   convenience scripts that delegate to both
```

They are deployed and run separately — the frontend talks to the API over HTTP
and contains no database access or API route handlers of its own. Nothing is
installed at the root; `node_modules` lives inside each app.

## Getting started

Install both:

```bash
npm run install:all
```

Configure the API — copy `backend/.env.example` to `backend/.env` and fill in
`DATABASE_URL` plus the two JWT secrets, then create the schema:

```bash
npm run migrate
```

Then run each app in its own terminal:

```bash
npm run dev:api
```

```bash
npm run dev:web
```

Open http://localhost:3000. API docs live at http://localhost:5000/api/docs.

### Root scripts

Each delegates into the relevant app, so you never have to `cd` first.

| Command               | Runs                          |
| --------------------- | ----------------------------- |
| `npm run install:all` | Install both apps             |
| `npm run dev:web`     | Frontend dev server           |
| `npm run dev:api`     | API dev server (file watching)|
| `npm run build:web`   | Frontend production build     |
| `npm run start:web`   | Serve the frontend build      |
| `npm run start:api`   | Start the API                 |
| `npm run lint:web`    | ESLint the frontend           |
| `npm run migrate`     | Apply pending SQL migrations  |

You can also work inside either folder directly (`cd frontend && npm run dev`) —
the root scripts are only a shortcut.

## Frontend

| Layer     | Choice                          |
| --------- | ------------------------------- |
| Framework | Next.js 14 (App Router)         |
| Language  | TypeScript (strict)             |
| Styling   | Tailwind CSS                    |
| Icons     | lucide-react                    |
| Fonts     | EB Garamond (display), Poppins  |

### Routes

| Path      | Screen                                        |
| --------- | --------------------------------------------- |
| `/`       | Home — hero (Faith / Service / Humanity)      |
| `/signup` | Create account                                |
| `/login`  | Sign in                                       |

### Auth flow

`AuthProvider` (mounted in the root layout) owns the session:

- The **access token lives in memory only** — never `localStorage` — so an XSS
  bug cannot walk off with a usable credential.
- On mount the provider calls `/auth/refresh`. The httpOnly refresh cookie
  restores the session across reloads; a 401 there simply means "signed out".
- A 401 on any authenticated request triggers one silent refresh-and-replay
  before the error surfaces, so a 15-minute token expiring mid-session is
  invisible to the user.
- `useAuth()` exposes `{ user, loading, signup, login, logout }`.
- `<RequireAuth>` wraps pages that need a session and bounces anonymous
  visitors to `/login?next=<path>`. It is a UX guard only — the API rejects
  unauthenticated requests independently, and that is what protects the data.
- `?next=` is only honoured for same-site paths, so it cannot be used as an
  open redirect.

### Structure

```
frontend/
  src/
    app/
      layout.tsx        Root layout (AuthProvider + header + footer)
      page.tsx          Home
      signup/           page.tsx + SignupForm.tsx (client)
      login/            page.tsx + LoginForm.tsx (client)
      globals.css       Tailwind entry + fonts
    components/
      auth/             AuthProvider, RequireAuth, AuthShell, TextField
      layout/           Header, Footer
      ui/               Button, Card, Container, Section, Slot
    lib/
      api.ts            Typed client for the backend
      constants.ts      Site metadata, nav links
      utils.ts          cn() class merge helper
  public/images/        Assets exported from Figma
  tailwind.config.ts    Design tokens
```

### Design tokens

Pulled from the Figma file into `frontend/tailwind.config.ts` — use these
rather than hardcoding hex values:

| Token           | Value     | Used for                    |
| --------------- | --------- | --------------------------- |
| `primary`       | `#E87722` | CTAs, links, active nav     |
| `primary-dark`  | `#D16206` | Button gradient end         |
| `maroon`        | `#6B1F1F` | Headings, brand text        |
| `cream`         | `#FDF6EC` | Page background             |
| `cream-light`   | `#FFF8F1` | Input fills, right panel    |
| `border`        | `#E8DDD0` | Hairlines, input borders    |

### Conventions

- Server components by default; add `"use client"` only for state or effects.
- Import via the `@/` alias (maps to `frontend/src/`).
- Standard icons come from `lucide-react`; brand art lives in
  `frontend/public/images/`.
- Forms validate client-side with the same rules the API enforces, then render
  the API's field-level errors when the server rejects a submission.

### Environment

Copy `frontend/.env.example` to `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Backend

Node.js + Express + Neon serverless Postgres, documented with OpenAPI 3.
Layering is one-directional: `routes → controllers → services → models`.

See [backend/README.md](backend/README.md) for the full endpoint reference,
token model and schema notes.
