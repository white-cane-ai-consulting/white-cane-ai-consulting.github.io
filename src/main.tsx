import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource-variable/inter";
import "./index.css";

const container = document.getElementById("root")!;

// Built pages arrive prerendered (scripts/prerender.mjs), so React attaches to the
// existing markup. The dev server serves an empty shell and renders from scratch.
if (container.firstElementChild) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
