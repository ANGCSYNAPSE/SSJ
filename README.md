# SSJ

Web platform built with Next.js 14 (App Router), TypeScript and Tailwind CSS.

## Tech stack

| Layer      | Choice                          |
| ---------- | ------------------------------- |
| Framework  | Next.js 14 (App Router)         |
| Language   | TypeScript (strict)             |
| Styling    | Tailwind CSS                    |
| Icons      | lucide-react                    |
| Linting    | ESLint (`next/core-web-vitals`) |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Scripts

| Command         | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start the dev server            |
| `npm run build` | Production build                |
| `npm run start` | Serve the production build      |
| `npm run lint`  | Run ESLint                      |

## Project structure

```
src/
  app/                 # App Router routes
    layout.tsx         # Root layout (header + footer)
    page.tsx           # Home
    about/             # /about
    services/          # /services
    contact/           # /contact
    not-found.tsx      # 404
    globals.css        # Tailwind entry + CSS variables
  components/
    layout/            # Header, Footer
    ui/                # Button, Card, Container, Section, Slot
  lib/
    constants.ts       # Site metadata, nav links
    utils.ts           # cn() class merge helper
public/                # Static assets (icons, images)
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in values as needed.

## Conventions

- Components are server components by default; add `"use client"` only when a
  component needs state, effects or browser APIs.
- Import via the `@/` alias (maps to `src/`).
- Design tokens (colors, radii, container widths) live in `tailwind.config.ts`.
  Change them there rather than hardcoding values in components.
- Standard icons come from `lucide-react`. Custom / brand icons go in
  `public/icons/` and are rendered via `next/image` or inline SVG components.
