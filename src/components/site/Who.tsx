import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const ease = [0.6, 0.05, 0.1, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, delay, ease },
});

type Seg = { text: string; b?: boolean; s?: boolean };
type BioParagraphs = (Seg[])[];

const renderBio = (paragraphs: BioParagraphs, paraClass: string) =>
  paragraphs.map((segs, i) => (
    <p key={i} className={paraClass}>
      {segs.map((seg, j) =>
        seg.b || seg.s ? (
          <strong key={j} className={cn("font-semibold", seg.s && "text-signal")}>
            {seg.text}
          </strong>
        ) : (
          <span key={j}>{seg.text}</span>
        )
      )}
    </p>
  ));

export const Who = () => {
  const { t } = useLanguage();
  const w = t.who;

  return (
    <section id="who" className="relative py-32 md:py-44 bg-bone text-ink border-t border-border/50">
      <div className="container">

        {/* Eyebrow — above the grid */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-signal">02 —</span>
          <span className="text-xs uppercase tracking-[0.3em] text-ink/50">{w.label}</span>
        </motion.div>

        {/* Header row */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center mb-20">

          {/* Logo */}
          <motion.div
            {...fadeUp(0.05)}
            className="md:col-span-4 flex items-center justify-start"
          >
            <img
              src={logo}
              alt="White Cane AI Consulting"
              className="w-48 md:w-56 lg:w-64 mix-blend-multiply"
            />
          </motion.div>

          {/* Headline + intro + bio */}
          <div className="md:col-span-8 flex flex-col gap-8">
            <motion.h2
              {...fadeUp(0.1)}
              className="font-display font-light text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-balance"
            >
              {w.h2a}
              <br />
              <span className="text-ink/35">{w.h2b}</span>{" "}
              <span className="italic font-normal">{w.h2c}</span>
            </motion.h2>

            <motion.div {...fadeUp(0.2)}>
              <div className="flex flex-col gap-4 border-l-2 border-signal pl-5">
                {renderBio(
                  w.team[0].bio[0] as unknown as BioParagraphs,
                  "text-ink/60 leading-relaxed max-w-2xl"
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Proof strip */}
        <motion.div
          {...fadeUp(0.4)}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10"
        >
          {w.proof.map((p) => (
            <div
              key={p.k}
              className="group bg-bone hover:bg-ink transition-colors duration-500 p-6 cursor-default"
            >
              <div className="font-display text-2xl text-signal mb-1 group-hover:text-bone transition-colors duration-500">
                {p.k}
              </div>
              <div className="text-xs text-ink/50 group-hover:text-bone/50 transition-colors duration-500 leading-relaxed">
                {p.v}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Closing insight — appears after credentials */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-12 flex flex-col gap-2 text-sm text-ink/55 leading-relaxed"
        >
          {renderBio(
            w.team[0].bio[1] as unknown as BioParagraphs,
            ""
          )}
        </motion.div>

      </div>
    </section>
  );
};
