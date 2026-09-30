# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for **White Cane AI Consulting** ("Clarity in the era of AI"). React/TypeScript site (one long home page plus Greek landing pages), built with Vite, prerendered to static HTML at build time, and styled with TailwindCSS + a custom editorial design system.

## Commands

```bash
# Development
npm run dev          # Start dev server on port 8080
npm run build        # Client build + SSR build + prerender (scripts/prerender.mjs) → dist/
npm run preview      # Serve production build locally

# Quality
npm run lint         # ESLint
npm run test         # Vitest (single run)
npm run test:watch   # Vitest (watch mode)
```

The project also has a `bun.lockb`, so Bun can be used as an alternative to npm.

## Architecture

**Routes** (`AppShell` in `App.tsx`): `/` Greek home and `/en/` English home both render `Index.tsx`; the language comes from the URL (`langFromPath`), not from state. Each entry in `src/lib/guides.ts` gets its own Greek landing page (`GuidePage.tsx`). A catch-all renders `NotFound.tsx`. Section anchors are prefixed with the home path (`/#offer`) so they work from every page.

**Prerendering / SEO:** `npm run build` builds the browser bundle, then an SSR bundle from `src/entry-server.tsx`, then `scripts/prerender.mjs` renders every route in `routes` to `dist/<path>/index.html`, plus `404.html`, `sitemap.xml` and `llms.txt`. `main.tsx` hydrates that markup. Per-page `<title>`, description, canonical, hreflang, Open Graph and JSON-LD come from `src/lib/seo.ts`. Anything rendered must match between server and client: no `window`/`localStorage` reads during render (use effects), or hydration fails. `src/test/seo.test.tsx` hydrates every route and fails on a mismatch. Content that should be indexable must be in the markup even when visually collapsed (see `FAQ.tsx`).

**Component split:**
- `src/components/site/` — page-specific marketing sections (Nav, Hero, Who, Offer, Achievements, Vision, Pricing, CTA, Footer). These are the primary working files for content/layout changes.
- `src/components/ui/` — shadcn/ui primitives (Radix UI wrappers). Treat as a library; edit only when customizing the component system itself.

**Global providers** are in `App.tsx`: `QueryClientProvider`, `TooltipProvider`, and two toast systems (Sonner via `<Toaster />` and the legacy `<Toaster>` from `use-toast`).

## Design System

Design tokens live in `src/index.css` as CSS custom properties. Key values:
- Background: `hsl(0 0% 4%)` (near-black `#0A0A0A`)
- Foreground: `hsl(40 14% 93%)` (warm off-white `#F0EDE5`)
- Primary / signal red: `hsl(354 78% 56%)` (`~#E63956`)
- Fonts: Space Grotesk (display, class `font-display`) · Inter (body, class `font-body`)
- Custom utilities: `.grain` (noise texture), `.vert-text` (vertical text), `.marquee-track` (scrolling ticker), `.pulse-dot` (animated indicator)

TailwindCSS is configured with these tokens in `tailwind.config.ts` — use Tailwind classes rather than inline styles.

## Path Alias

`@/` resolves to `src/`. Use it for all imports:
```ts
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
```

## Key Dependencies

| Dependency | Purpose |
|---|---|
| Framer Motion | All animations — prefer `motion.*` components and variants |
| React Hook Form + Zod | Form state and validation |
| TanStack React Query | Data fetching / async state |
| `cn()` in `lib/utils` | Merge Tailwind classes (clsx + twMerge) |
| Lucide React | Icon set |
| `next-themes` | Dark/light mode |

## Testing

Tests live in `src/test/`. Vitest is configured with jsdom and a setup file at `src/test/setup.ts` that mocks `window.matchMedia`. Use `@testing-library/react` for component tests.
