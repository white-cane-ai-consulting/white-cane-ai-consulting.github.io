import { useRef, type PointerEvent, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { RetainerPopover } from "@/components/site/RetainerPopover";

const ease = [0.6, 0.05, 0.1, 1] as const;
const tilt = { stiffness: 180, damping: 18, mass: 0.6 };

/**
 * A package card that catches the light under the cursor: a slight tilt towards the
 * pointer, a soft spotlight that follows it, a rim of light on the border nearest to it,
 * and one sheen that sweeps across on entry. Kept quiet on purpose — a premium card,
 * not a game effect — and switched off for reduced motion.
 */
const TierCard = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), tilt);
  const rotateY = useSpring(useMotionValue(0), tilt);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    if (!reduce) {
      rotateY.set((x - 0.5) * 5);
      rotateX.set((0.5 - y) * 5);
    }
  };
  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div style={{ perspective: 1200 }}>
      <motion.article
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/40 p-7 transition-[background-color,box-shadow] duration-500 hover:bg-card hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:p-8"
      >
        {/* Spotlight that follows the cursor. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), hsl(var(--bone) / 0.07), transparent 60%)" }}
        />
        {/* A rim of light on the border, brightest nearest the cursor. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl p-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), hsl(var(--bone) / 0.55), hsl(var(--signal) / 0.35) 40%, transparent 70%)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        {/* One sheen across the card on entry; it resets instantly on leave. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-y-10 left-0 w-1/2 -translate-x-[150%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-bone/[0.06] to-transparent motion-safe:group-hover:translate-x-[320%] motion-safe:group-hover:transition-transform motion-safe:group-hover:duration-[1200ms] motion-safe:group-hover:ease-out"
        />
        <div className="relative flex flex-col">{children}</div>
      </motion.article>
    </div>
  );
};

export const Pricing = () => {
  const { t } = useLanguage();
  const p = t.pricing;

  return (
    <section id="pricing" className="relative py-32 md:py-44 bg-secondary/40 border-t border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-xs uppercase tracking-[0.18em] text-signal-bright">04 —</span>
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.label}</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            className="lg:col-span-8 font-display font-light text-4xl md:text-6xl leading-[1.05] text-balance"
          >
            {p.h2a}
            <br />
            <span className="text-signal-bright italic font-normal">{p.h2c}</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="lg:col-span-4 lg:flex lg:justify-end"
          >
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground bg-card rounded-full px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-signal" />
              {p.vatNote}
            </span>
          </motion.div>
        </div>

        {/* items-start + no h-full: opening one card's details grows only that card. */}
        <div className="grid lg:grid-cols-3 gap-4 items-start">
          {p.tiers.map((tier, i) => (
            <motion.div
              key={tier.code}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease }}
            >
              <TierCard>
                <span className="mb-7 block font-body text-4xl font-light leading-none text-muted-foreground/50 transition-colors duration-500 group-hover:text-signal-bright">
                  {tier.code}
                </span>

                <h3 className="font-body text-2xl font-medium tracking-tight mb-2 text-balance leading-tight">{tier.name}</h3>
                <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground/80 mb-7">{tier.size}</p>

                <div className="mb-7">
                  <div className="font-body font-light tracking-tight text-[2rem] xl:text-4xl leading-none">{tier.price}</div>
                </div>

                <details className="group/details mb-7 border-y border-border/60">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal [&::-webkit-details-marker]:hidden">
                    {p.detailsLabel}
                    <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-open/details:rotate-180" />
                  </summary>
                  <dl className="rounded-2xl bg-background/50 px-4 py-2 mb-5">
                    <div className="flex items-baseline justify-between gap-4 py-2.5 border-b border-border/50">
                      <dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground/80">{p.timelineLabel}</dt>
                      <dd className="text-sm text-foreground text-right">{tier.timeline}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground/80">{p.scopeLabel}</dt>
                      <dd className="text-sm text-foreground text-right">{tier.scope}</dd>
                    </div>
                  </dl>

                  <ul className="space-y-3 pb-5">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-[0.9375rem] text-muted-foreground leading-[1.7]"
                      >
                        <span className="mt-[9px] h-1 w-1 rounded-full bg-signal-bright shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </details>

                <div>
                  <div className="rounded-2xl border border-border/70 bg-background/60 p-5 transition-colors hover:border-signal/40">
                    <p className="font-body text-base font-medium leading-snug text-foreground">{tier.retainerLabel}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                      <p className="font-body text-2xl font-medium leading-none text-signal">
                        {tier.retainerPrice}
                        <span className="text-sm text-muted-foreground">{tier.retainerPer}</span>
                      </p>
                      <RetainerPopover
                        detail={{
                          code: tier.code,
                          tierName: tier.name,
                          label: tier.retainerLabel,
                          price: tier.retainerPrice,
                          per: tier.retainerPer,
                          hours: tier.retainerHours,
                          features: tier.retainerFeatures,
                        }}
                        triggerLabel={p.retainerContentsLabel}
                        title={p.retainerModalTitle}
                        hoursLabel={p.retainerHoursLabel}
                        startNote={p.retainerStartNote}
                        closeLabel={p.retainerCloseLabel}
                      />
                    </div>
                  </div>
                </div>
              </TierCard>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          className="mt-9 max-w-4xl text-sm font-light leading-[1.8] text-muted-foreground/70"
        >
          {p.footnote}
        </motion.p>
      </div>
    </section>
  );
};
