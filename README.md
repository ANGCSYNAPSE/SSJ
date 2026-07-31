# SSJ — Shree Shyam Jagat

Devotional platform built from the [Figma design file](https://www.figma.com/design/eqyeNqdl9Q5lo7Vouh2p73/SSJ).

The repo holds two independent applications:

| Folder     | What                                          | Port |
| ---------- | --------------------------------------------- | ---- |
| `/` (root) | Next.js 14 frontend (App Router, TypeScript)  | 3000 |
| `backend/` | Express REST API on Neon Postgres             | 5000 |

They are deployed and run separately — the frontend talks to the API over HTTP
and contains no database access or API route handlers of its own.

## Getting started

Run each in its own terminal.

**Backend**

```bash
cd backend
npm install
cp .env.example .env   # fill in DATABASE_URL and the two JWT secrets
npm run migrate
npm run dev
```

**Frontend**

```bash
npm install
npm run dev
```

Then open http://localhost:3000. API docs live at http://localhost:5000/api/docs.

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
src/
  app/
    layout.tsx          Root layout (header + footer)
    page.tsx            Home
    signup/             page.tsx + SignupForm.tsx (client)
    login/              page.tsx + LoginForm.tsx (client)
    globals.css         Tailwind entry + fonts
  components/
    auth/               AuthShell, TextField, PasswordField, SubmitButton
    layout/             Header, Footer
    ui/                 Button, Card, Container, Section, Slot
  lib/
    api.ts              Typed client for the backend
    constants.ts        Site metadata, nav links
    utils.ts            cn() class merge helper
public/images/          Assets exported from Figma
```

### Design tokens

Pulled from the Figma file into `tailwind.config.ts` — use these rather than
hardcoding hex values:

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
- Import via the `@/` alias (maps to `src/`).
- Standard icons come from `lucide-react`; brand art lives in `public/images/`.
- Forms validate client-side with the same rules the API enforces, then render
  the API's field-level errors when the server rejects a submission.

### Environment

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Backend

Node.js + Express + Neon serverless Postgres, documented with OpenAPI 3.
Layering is one-directional: `routes → controllers → services → models`.

See [backend/README.md](backend/README.md) for the full endpoint reference,
token model and schema notes.
