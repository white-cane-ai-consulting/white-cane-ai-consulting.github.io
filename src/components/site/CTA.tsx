import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/logo-icon-color.svg";
import { FAQ } from "@/components/site/FAQ";
import { ContactForm } from "@/components/site/ContactForm";
import { useLanguage } from "@/contexts/LanguageContext";

const ease = [0.6, 0.05, 0.1, 1] as const;

/**
 * Closing section: the questions people ask, then the way to reach us, then the footer.
 * The FAQ and the call to action share one section so the page ends on a single beat.
 */
export const CTA = () => {
  const { t } = useLanguage();
  const c = t.cta;
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
    <section id="contact" className="relative pt-32 md:pt-44 pb-0 border-t border-border/50">
      <div className="container">
        <FAQ
          aside={
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="mt-12 pt-12 border-t border-border/60 max-w-xl"
            >
              <ContactForm />
              <a
                href="mailto:consulting@whitecane-ai.com"
                className="group mt-16 flex items-center justify-between gap-3 rounded-3xl bg-bone text-ink px-6 py-4 transition-colors duration-500 hover:bg-signal hover:text-bone"
              >
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-[0.14em] opacity-70">{c.directLine}</span>
                  <span className="block truncate font-display text-base">consulting@whitecane-ai.com</span>
                </span>
                <span className="shrink-0 transition-transform group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          }
        />
      </div>

      {/* Footer */}
      <div className="relative mt-16">
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
                    <li key={l}><a href="#offer" className="hover:text-signal-bright transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-[0.14em] mb-3">{c.company}</div>
                <ul className="space-y-2">
                  {c.companyLinks.map((l, i) => (
                    <li key={l}><a href={["#who","#proof","#contact"][i]} className="hover:text-signal-bright transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-[0.14em] mb-3">{c.elsewhere}</div>
                <ul className="space-y-2">
                  {c.elsewhereLinks.map((l) => (
                    <li key={l}><a href="#" className="hover:text-signal-bright transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom footer row — accepting text aligned to grid above */}
          <div className="mt-8 mb-16 flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <div className="flex flex-col gap-1">
              <span>© {new Date().getFullYear()} White Cane AI Consulting</span>
              <span className="text-muted-foreground/70">v0.2</span>
            </div>
            <span style={gridWidth ? { width: gridWidth } : undefined} className="flex items-center">
              <span className="text-signal-bright mr-2">●</span>
              <span>{c.accepting}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
