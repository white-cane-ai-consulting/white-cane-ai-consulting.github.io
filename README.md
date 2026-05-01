# White Cane AI Consulting

**Clarity in the era of AI.**

Marketing website for [White Cane AI Consulting](mailto:consulting@whitecane-ai.com) — an independent AI consulting firm that helps businesses select, integrate, and operationalise the right AI tools for the work that actually matters.

Est. 2026 · Currently accepting Q3 engagements

---

## What we do

Four practices, one outcome — work that thinks for itself.

| Practice | Description |
|---|---|
| **A — AI Strategy & Mapping** | Audit how your team works, where time leaks, and where AI realistically moves the needle. A prioritised roadmap, not a wishlist. |
| **B — Tool Selection** | A small, defensible stack — picked for your data, your team, and your budget. No vendor kickbacks. |
| **C — Integration & Workflow** | Automations, copilots, and review loops your team will actually use. |
| **D — Governance & Care** | Policies, evals, monitoring, and training — so the system you launch on day one is still the system you trust six months in. |

**How we work:** Listen → Map → Choose → Ship. Slow at the start, sharp at the end.

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

## Project Structure

```
src/
├── components/
│   ├── site/       # Page sections — Nav, Hero, Who, Offer, Achievements, Vision, CTA
│   └── ui/         # shadcn/ui primitive components
├── assets/         # Images and logo
├── hooks/          # use-mobile, use-toast
├── lib/            # Utility functions (cn)
└── pages/          # Index (landing) + NotFound
```

The site is a single page (`/`) with anchor-based navigation (`#who`, `#offer`, `#proof`, `#vision`, `#contact`).

---

© 2026 White Cane AI Consulting
