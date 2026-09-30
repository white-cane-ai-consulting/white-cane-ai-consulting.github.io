import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-icon-color.svg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConsent } from "@/contexts/ConsentContext";
import { homePath } from "@/lib/seo";

const linkClass = "hover:text-signal-bright transition-colors";

/** A page path ("/ai-transformation/") navigates in-app; a "#section" anchor points at the home page. */
const FooterLink = ({ href, home, children }: { href: string; home: string; children: string }) =>
  href.startsWith("/") ? (
    <Link to={href} className={linkClass}>{children}</Link>
  ) : (
    <a href={href.startsWith("#") ? home + href : href} className={linkClass}>{children}</a>
  );

export const Footer = () => {
  const { lang, t } = useLanguage();
  const c = t.cta;
  const home = homePath[lang];
  const { setPolicyOpen } = useConsent();
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const update = () => setGridWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <footer className="relative mt-16">
      {/* Decorative text — full viewport width, starts at the border line */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 overflow-hidden whitespace-nowrap opacity-[0.06] select-none leading-none" aria-hidden="true">
        <div
          className="marquee-track inline-block font-display font-bold tracking-tight uppercase"
          style={{ fontSize: "22vw", animationDuration: "360s", lineHeight: 0.85 }}
        >
          {"WHITE CANE   WHITE CANE   WHITE CANE   WHITE CANE   ".repeat(2)}
        </div>
      </div>

      <div className="container pt-10 border-t border-border/60 relative z-10">
        {/* Top footer row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="flex items-center gap-5">
            <div className="h-24 aspect-square rounded-2xl bg-bone overflow-hidden shrink-0 p-2.5">
              <img src={logo} alt="White Cane AI Consulting" className="h-full w-full" />
            </div>
            <div>
              <div className="font-display text-sm tracking-wider">WHITE CANE AI CONSULTING</div>
              <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{c.footerTagline}</div>
            </div>
          </div>
          <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8 sm:gap-10 text-sm">
            <div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-[0.14em] mb-3">{c.practice}</div>
              <ul className="space-y-2">
                {c.practiceLinks.map((l) => (
                  <li key={l.label}><FooterLink href={l.href} home={home}>{l.label}</FooterLink></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-[0.14em] mb-3">{c.company}</div>
              <ul className="space-y-2">
                {c.companyLinks.map((l) => (
                  <li key={l.label}><FooterLink href={l.href} home={home}>{l.label}</FooterLink></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-[0.14em] mb-3">{c.elsewhere}</div>
              <ul className="space-y-2">
                {c.elsewhereLinks.map((l) => (
                  <li key={l}><a href="#" className={linkClass}>{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom footer row — accepting text aligned to grid above */}
        <div className="mt-8 mb-16 flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          <div className="flex flex-col gap-1">
            <span>© {new Date().getFullYear()} White Cane AI Consulting</span>
            <button type="button" onClick={() => setPolicyOpen(true)} className="self-start uppercase tracking-[0.16em] transition-colors hover:text-foreground">
              {t.consent.footerLink}
            </button>
            <span className="text-muted-foreground/70">v0.5</span>
          </div>
          <span style={gridWidth ? { width: gridWidth } : undefined} className="flex items-center">
            <span className="text-signal-bright mr-2">●</span>
            <span>{c.accepting}</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
