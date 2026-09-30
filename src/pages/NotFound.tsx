import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/** Also prerendered as dist/404.html, which GitHub Pages serves for unknown URLs. */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
      <div className="max-w-xl text-center">
        <p className="font-display text-sm text-signal-bright">404</p>
        <h1 className="mt-4 font-display text-4xl font-light leading-tight md:text-5xl">Η σελίδα δεν βρέθηκε</h1>
        <p className="mt-4 text-base text-muted-foreground" lang="en">Page not found.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="/"
            className="rounded-full bg-bone px-7 py-3.5 text-xs font-medium uppercase tracking-[0.14em] text-ink transition-colors duration-500 hover:bg-signal hover:text-bone"
          >
            Αρχική σελίδα
          </a>
          <a
            href="/en/"
            hrefLang="en"
            className="rounded-full border border-border px-7 py-3.5 text-xs uppercase tracking-[0.14em] text-foreground transition-colors duration-300 hover:border-foreground"
          >
            English
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
