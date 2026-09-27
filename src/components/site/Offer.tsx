import { useState } from "react";
import { motion } from "framer-motion";
import { ServiceModal } from "@/components/site/ServiceModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { serviceDetails, type ServiceId } from "@/lib/serviceDetails";

const ease = [0.6, 0.05, 0.1, 1] as const;
const rowIds: ServiceId[] = ["B", "C", "D"];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, delay, ease },
});

/** An understated text link: the underline turns red on hover instead of the whole thing lighting up. */
const linkText =
  "inline-flex items-center gap-2 text-sm text-foreground underline decoration-border underline-offset-[6px] transition-colors duration-300";

export const Offer = () => {
  const { lang, t } = useLanguage();
  const o = t.offer;
  const a = o.serviceA;
  const [open, setOpen] = useState<ServiceId | null>(null);

  return (
    <section id="offer" className="relative py-32 md:py-44 bg-secondary/40 border-y border-border/50">
      <div className="container">
        <motion.div {...reveal()} className="flex items-center gap-3 mb-16">
          <span className="text-xs uppercase tracking-[0.18em] text-signal-bright">01 —</span>
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{o.label}</span>
        </motion.div>

        <motion.h2
          {...reveal()}
          className="font-display font-light text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-10 max-w-4xl text-balance"
        >
          {o.h2a}
          <br />
          {o.h2b && <span className="text-muted-foreground">{o.h2b} </span>}
          <span className="text-signal-bright italic font-normal">{o.h2c}</span>
        </motion.h2>

        <motion.p {...reveal(0.1)} className="text-base md:text-lg text-muted-foreground leading-[1.75] max-w-3xl mb-24 md:mb-32">
          {o.lead}
        </motion.p>

        {/* Service A: what it is on the left, its three levels as an index on the right. */}
        <motion.div {...reveal()} className="grid gap-12 border-t border-border pt-10 lg:grid-cols-12 lg:gap-16 lg:pt-14">
          <div className="lg:col-span-5">
            <button onClick={() => setOpen("A")} className="group text-left">
              <span className="font-display text-sm text-signal-bright">A</span>
              <h3 className="mt-3 font-display text-3xl leading-tight text-balance transition-colors duration-300 group-hover:text-signal-bright md:text-4xl">
                {a.title}
              </h3>
            </button>
            <p className="mt-6 max-w-md text-base leading-[1.75] text-muted-foreground">{a.body}</p>
            <button onClick={() => setOpen("A")} className={`group mt-8 ${linkText} hover:decoration-signal`}>
              {a.link}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>

          <ol className="border-t border-border lg:col-span-7 lg:border-t-0">
            {a.levels.map((level) => (
              <li key={level.code} className="border-b border-border lg:first:[&>button]:pt-0">
                <button
                  onClick={() => setOpen(level.code as ServiceId)}
                  className="group grid w-full grid-cols-[2.75rem_1fr_auto] items-start gap-x-4 py-7 text-left"
                >
                  <span className="pt-1.5 font-display text-sm text-signal-bright">{level.code}</span>
                  <div>
                    <h4 className="font-display text-xl leading-snug transition-colors duration-300 group-hover:text-signal-bright md:text-2xl">
                      {level.title}
                    </h4>
                    <p className="mt-2 max-w-xl text-[0.9375rem] leading-[1.7] text-muted-foreground">{level.body}</p>
                  </div>
                  <span className="self-center pl-2 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground">
                    →
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Services B · C · D */}
        <div className="mt-24 grid gap-14 border-t border-border pt-10 md:grid-cols-3 md:gap-10 lg:mt-32 lg:pt-14">
          {o.servicesRow.map((s, i) => (
            <motion.button
              key={s.title}
              onClick={() => setOpen(rowIds[i])}
              {...reveal(i * 0.08)}
              className="group flex flex-col text-left"
            >
              <span className="font-display text-sm text-muted-foreground transition-colors duration-300 group-hover:text-signal-bright">
                {rowIds[i]}
              </span>
              <h3 className="mt-3 font-display text-2xl leading-tight text-balance transition-colors duration-300 group-hover:text-signal-bright">
                {s.title}
              </h3>
              <p className="mt-4 mb-6 text-[0.9375rem] leading-[1.75] text-muted-foreground">{s.body}</p>
              <span className={`mt-auto ${linkText} group-hover:decoration-signal`}>
                {o.more}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </motion.button>
          ))}
        </div>
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
