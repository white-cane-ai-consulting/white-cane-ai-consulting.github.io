# White Cane AI Consulting

**Clarity in the era of AI.**

Marketing website for [White Cane AI Consulting](mailto:consulting@whitecane-ai.com) — an independent AI consulting firm that helps businesses select, integrate, and operationalise the right AI tools for the work that actually matters.

Est. 2026 · Currently accepting engagements

The site is Greek-first: Greek at `/`, English at `/en/`.

---

## What we do

We set up AI apps and tools for your team, with research before it and training and updates after it.

| Service | Description |
|---|---|
| **A — AI tool set-up** | The core service: enterprise AI platforms (A1), local AI on your own infrastructure (A2), and specialised tools and connections (A3). |
| **B — Research & Tool Selection** | Before the set-up: we evaluate tools for your industry, including how they perform in Greek. |
| **C — Training & Enablement** | After the set-up: seminars and practical guides so the team actually uses what was built. |
| **D — Staying Current** | Ongoing: we tell you when new tools or models become relevant to your business. |

**Contact:** [consulting@whitecane-ai.com](mailto:consulting@whitecane-ai.com)

---

## Tech Stack

- **React 18** + **TypeScript** — component-based UI
- **Vite** — build tooling and dev server
- **TailwindCSS** — utility-first styling with a custom editorial design system
- **Framer Motion** — animations and scroll-driven transitions
- **shadcn/ui** (Radix UI) — accessible component primitives

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:8080)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

Tests:

```bash
npm run test        # single run
npm run test:watch  # watch mode
```

---

## Contact form

The form emails each submission to us through [Web3Forms](https://web3forms.com). It needs a public access key:

```bash
# .env.local (git-ignored); see .env.example
VITE_WEB3FORMS_KEY=your-key
```

For the deployed site, add the same value as the `WEB3FORMS_KEY` secret in the GitHub repository (Settings → Secrets and variables → Actions). Without it the form shows an error.

---

## Project Structure

```
src/
├── components/
│   ├── site/       # Page sections: Nav, Hero, Who, Offer, Achievements, Vision, Pricing, CTA, FAQ, Footer
│   └── ui/         # shadcn/ui primitive components
├── assets/         # Images and logos
├── hooks/          # use-mobile, use-toast
├── lib/            # seo, translations (Greek + English), serviceDetails, utils
├── pages/          # Index (home, both languages) + NotFound
└── test/           # Vitest suites, including hydration checks for every route
scripts/prerender.mjs  # static HTML, sitemap, llms.txt at build time
```

Everything lives on the home page, with anchor navigation (`#who`, `#offer`, `#proof`, `#vision`, `#contact`). There are no separate landing pages: former guide URLs redirect to `/`. `/#offer-A` to `/#offer-D` open the matching service window.

---

© 2026 White Cane AI Consulting
