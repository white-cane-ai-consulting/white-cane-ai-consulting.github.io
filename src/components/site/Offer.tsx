import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ServiceDetailText, ServiceModal } from "@/components/site/ServiceModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { serviceDetails, type ServiceId } from "@/lib/serviceDetails";
import { cn } from "@/lib/utils";

type Curve = [number, number, number, number];
const ease: Curve = [0.6, 0.05, 0.1, 1];
const softEase: Curve = [0.16, 1, 0.3, 1];

/*
 * A is the core service, so it gets the one coloured surface in the section (Midnight
 * Sapphire with a Crimson glow). B, C and D hang off it through a connector that draws
 * itself on scroll: they are services in their own right, but they build on the set-up.
 */

export const Offer = () => {
  const { lang, t } = useLanguage();
  const reduce = useReducedMotion();
  const o = t.offer;
  const a = o.serviceA;
  const [open, setOpen] = useState<ServiceId | null>(null);

  // Footer links like "/#offer-B" open that service's window. Read in an effect, never during render.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.match(/^#offer-([ABCD])$/)?.[1] as ServiceId | undefined;
      if (id) {
        document.getElementById("offer")?.scrollIntoView();
        setOpen(id);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  // `initial` stays the same for everyone so the prerendered markup hydrates cleanly;
  // reduced motion only drops the duration.
  const reveal = (delay = 0, duration = 0.9, curve: Curve = ease) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: reduce ? { duration: 0 } : { duration, delay, ease: curve },
  });

  const draw = (axis: "x" | "y", delay: number) => ({
    initial: axis === "x" ? { scaleX: 0 } : { scaleY: 0 },
    whileInView: axis === "x" ? { scaleX: 1 } : { scaleY: 1 },
    viewport: { once: true, margin: "-40px" },
    transition: reduce ? { duration: 0 } : { duration: 0.5, delay, ease: softEase },
  });

  return (
    <section id="offer" className="relative py-28 md:py-40 bg-secondary/40 border-y border-border/50">
      <div className="container">
        <motion.div {...reveal()} className="flex items-center gap-3 mb-12 md:mb-14">
          <span className="text-xs uppercase tracking-[0.18em] text-signal-bright">01 —</span>
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{o.label}</span>
        </motion.div>

        <motion.h2
          {...reveal()}
          className="max-w-5xl pb-1 font-display text-[2.5rem] font-light leading-[1.08] tracking-[-0.02em] text-balance md:text-6xl lg:text-7xl"
        >
          {o.h2a}
          <br />
          {o.h2b && <span className="text-muted-foreground">{o.h2b} </span>}
          <span className="font-normal italic text-signal-bright">{o.h2c}</span>
        </motion.h2>

        <motion.p
          {...reveal(0.1)}
          className="mt-8 max-w-[60ch] text-lg leading-[1.7] text-muted-foreground md:mt-10 md:text-xl md:leading-[1.65]"
        >
          {o.lead}
        </motion.p>

        {/* A: the core service. */}
        <motion.div
          {...reveal(0, 1)}
          className="relative mt-20 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,hsl(217_45%_15%)_0%,hsl(217_30%_9%)_55%,hsl(60_4%_7%)_100%)] py-7 shadow-[inset_0_1px_0_hsl(0_0%_100%/0.08),0_40px_120px_-50px_hsl(217_60%_20%/0.9)] px-5 sm:p-10 md:mt-28 lg:p-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_100%_0%,hsl(var(--signal)/0.16),transparent_70%),radial-gradient(60%_80%_at_0%_100%,hsl(var(--sapphire)/0.55),transparent_70%)]"
          />

          <div className="relative grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-5">
              <span aria-hidden className="block font-display text-[5.5rem] font-light leading-[0.8] text-signal-bright md:text-[7.5rem]">
                A
              </span>
              <p className="mt-8 text-sm text-foreground/70">{serviceDetails[lang].A.kicker}</p>
              <button type="button" onClick={() => setOpen("A")} className="group mt-3 block text-left focus-visible:outline-none">
                <h3 className="font-display text-4xl font-light leading-[1.1] text-balance transition-colors duration-300 group-hover:text-signal-bright group-focus-visible:text-signal-bright md:text-5xl">
                  {a.title}
                </h3>
              </button>
              <p className="mt-6 max-w-md text-base leading-[1.75] text-foreground/75">{a.body}</p>
              <button
                type="button"
                onClick={() => setOpen("A")}
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-[background-color,transform] duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
              >
                {a.link}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </button>
            </div>

            <ol className="border-t border-white/10 lg:col-span-7 lg:border-t-0">
              {a.levels.map((level, i) => (
                <motion.li key={level.code} {...reveal(0.15 + i * 0.07, 0.7, softEase)}>
                  <button
                    type="button"
                    onClick={() => setOpen(level.code as ServiceId)}
                    className={cn(
                      "group relative grid w-full grid-cols-[2rem_1fr_1rem] gap-x-2 py-8 text-left focus-visible:outline-none sm:grid-cols-[3.5rem_1fr_1.5rem] sm:gap-x-4 md:py-9",
                      i === 0 && "lg:pt-2",
                    )}
                  >
                    <span className="pt-1.5 font-display text-sm text-signal-bright">{level.code}</span>
                    <div>
                      <h4 className="font-display text-xl leading-snug text-balance transition-colors duration-300 group-hover:text-signal-bright group-focus-visible:text-signal-bright md:text-2xl">
                        {level.title}
                      </h4>
                      <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.7] text-foreground/70">{level.body}</p>
                    </div>
                    <span
                      aria-hidden
                      className="pt-1 text-right text-foreground/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground group-focus-visible:translate-x-1 group-focus-visible:text-foreground"
                    >
                      →
                    </span>
                    {/* Hairline under the row that fills with red from the left. */}
                    {i < a.levels.length - 1 && <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10" />}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-700 ease-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                  </button>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>

        {/* Connector from A down to B, C and D, drawn outward from the stem. On phones it is a single stem. */}
        <div aria-hidden className="relative h-24 md:h-28">
          <motion.span {...draw("y", 0.1)} className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-signal to-border md:h-1/2" />
          <div className="absolute inset-0 hidden grid-cols-3 gap-5 md:grid">
            {[0, 1, 2].map((col) => (
              <div key={col} className="relative">
                <motion.span
                  {...draw("x", 0.4)}
                  className={cn(
                    "absolute top-1/2 h-px bg-border",
                    col === 0 && "left-1/2 -right-5 origin-right",
                    col === 1 && "left-0 -right-5",
                    col === 2 && "left-0 right-1/2 origin-left",
                  )}
                />
                <motion.span {...draw("y", 0.75)} className="absolute bottom-0 left-1/2 top-1/2 w-px origin-top bg-border" />
              </div>
            ))}
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={reduce ? { duration: 0 } : { duration: 0.4, delay: 0.5 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-border bg-background px-4 py-1.5 text-sm text-foreground/80"
          >
            {o.around}
          </motion.span>
        </div>

        {/* B · C · D: services of their own that build on the set-up. */}
        <ol className="grid gap-5 md:grid-cols-3">
          {o.servicesRow.map((s, i) => (
            <motion.li key={s.id} {...reveal(0.1 + i * 0.08, 0.7, softEase)} className="h-full">
              <button
                type="button"
                onClick={() => setOpen(s.id)}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-[linear-gradient(180deg,hsl(var(--sapphire)/0.4)_0%,hsl(var(--card)/0.7)_55%)] p-7 text-left transition-[transform,border-color,background-color] duration-500 ease-expo hover:-translate-y-1 hover:border-foreground/20 focus-visible:border-signal focus-visible:outline-none md:p-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-signal transition-transform duration-700 ease-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <span className="font-display text-6xl font-light leading-[0.8] text-foreground/40 transition-colors duration-500 group-hover:text-signal-bright group-focus-visible:text-signal-bright">
                  {s.id}
                </span>
                <h3 className="mt-10 font-display text-xl leading-snug text-balance md:text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm text-foreground/60">{s.when}</p>
                <p className="mt-5 text-[0.9375rem] leading-[1.7] text-muted-foreground">{s.body}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm text-foreground underline decoration-border underline-offset-[6px] transition-colors duration-300 group-hover:decoration-signal">
                  {o.more}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </button>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* The same text the service windows open with, in the page from the start, so search
          engines and AI assistants read it without clicking. Visitors get it through the windows. */}
      <div hidden>
        {Object.values(serviceDetails[lang]).map((detail) => (
          <ServiceDetailText key={detail.code} detail={detail} />
        ))}
      </div>

      <ServiceModal
        detail={open ? serviceDetails[lang][open] : null}
        onClose={() => setOpen(null)}
        onNavigate={setOpen}
        ctaLabel={t.nav.contact}
      />
    </section>
  );
};
