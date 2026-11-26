import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import logo from "@/assets/logo-stacked-color.svg";
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
          // Crimson, like the other highlights, at the owner's request (3.9:1 on Soft Silver, below AA for body text).
          <strong key={j} className={cn("font-semibold", seg.s && "text-signal-bright")}>
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
          <span aria-hidden="true" className="h-px w-8 bg-signal" />
          <span className="text-xs uppercase tracking-[0.18em] text-harbor">{w.label}</span>
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
              className="w-56 md:w-64 lg:w-72"
            />
          </motion.div>

          {/* Headline + intro + bio */}
          <div className="md:col-span-8 flex flex-col gap-8">
            <motion.h2
              {...fadeUp(0.1)}
              className="font-display font-light text-sapphire text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-balance"
            >
              {w.h2a}
              <br />
              <span className="text-sapphire/60">{w.h2b}</span>
              <br />
              <span className="italic font-normal">{w.h2c}</span>
            </motion.h2>

            <motion.div {...fadeUp(0.2)}>
              <div className="flex flex-col gap-4">
                {renderBio(
                  w.team[0].bio[0] as unknown as BioParagraphs,
                  "text-harbor leading-[1.75] max-w-2xl"
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Proof strip */}
        <motion.div
          {...fadeUp(0.4)}
          className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {w.proof.map((p) => (
            <div
              key={p.k}
              className="group rounded-xl bg-signal p-6 text-xl font-semibold leading-[1.4] text-white transition-[transform,background-color] duration-500 ease-expo hover:-translate-y-1.5 hover:bg-ink motion-reduce:transition-colors motion-reduce:hover:translate-y-0 md:p-7"
            >
              {/* One size for both lines; at 20px semibold the white on crimson counts as large text for WCAG.
                  The first line is black on crimson (about 5:1) and turns crimson when the card goes black. */}
              <div className="text-ink transition-colors duration-500 group-hover:text-signal-bright">{p.k}</div>
              <div>{p.v}</div>
            </div>
          ))}
        </motion.div>

        {/* Closing insight, set as a centred quote after the credentials. */}
        <motion.figure {...fadeUp(0.5)} className="mx-auto mt-24 max-w-3xl text-center md:mt-28">
          {/* A drawn mark: the fonts' own quotation glyphs read as a chevron (Lilex) or slashes (Inter). */}
          <Quote aria-hidden className="mx-auto h-10 w-10 text-signal md:h-12 md:w-12" fill="currentColor" strokeWidth={0} />
          <blockquote className="mt-6flex flex-col gap-2 text-xl font-light leading-[1.55] tracking-[-0.01em] text-ink text-balance md:text-[1.75rem]">
            {renderBio(
              w.team[0].bio[1] as unknown as BioParagraphs,
              ""
            )}
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-3 text-sm text-harbor">
            <span aria-hidden className="h-px w-8 bg-signal" />
            {w.quoteBy}
          </figcaption>
        </motion.figure>

      </div>
    </section>
  );
};
