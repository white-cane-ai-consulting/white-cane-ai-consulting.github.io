import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ToolGalaxy } from "@/components/site/ToolGalaxy";
import { FloatingApps } from "@/components/site/FloatingApps";

const ease = [0.6, 0.05, 0.1, 1] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, delay, ease },
});

const Counter = ({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduceMotion = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) return setN(to);
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
};

type CoreSlide = { value: number; suffix: string; text: string; accent: string };

const SLIDE_MS = 4200;
const swap = { duration: 0.55, ease: [0.16, 1, 0.3, 1] } as const;

/** Slowly rotates the centre of the galaxy: "150+ tools tested" → "20+ sectors" → "3+ years of Enterprise GenAI". */
const CoreCycle = ({ slides }: { slides: readonly CoreSlide[] }) => {
  const [i, setI] = useState(0);
  const reduceMotion = useReducedMotion();
  const slide = slides[i];

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  const enter = reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(6px)" };
  const leave = reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, filter: "blur(6px)" };
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <div aria-live="polite">
      {/* Keyed by the number, so it only counts up again when the number itself changes. */}
      <div className="grid font-display text-6xl font-light leading-none tracking-tight md:text-8xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`${slide.value}${slide.suffix}`} initial={enter} animate={shown} exit={leave} transition={swap} className="[grid-area:1/1]">
            <Counter to={slide.value} suffix={slide.suffix} duration={1.4} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative mt-4 grid whitespace-nowrap font-display text-base leading-snug text-muted-foreground md:text-lg">
        {/* Every caption sits invisibly in the same cell, so the block is always as wide as the longest one. */}
        {slides.map((s, n) => (
          <div key={n} aria-hidden className="invisible [grid-area:1/1]">
            {s.text}
            <br />
            {s.accent}
          </div>
        ))}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={i} initial={enter} animate={shown} exit={leave} transition={swap} className="absolute inset-0">
            {slide.text}
            <span className="block text-signal">{slide.accent}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export const Achievements = () => {
  const { t } = useLanguage();
  const a = t.achievements;
  const words = a.sectors.flatMap((s, i) => (a.useCases[i] ? [s, a.useCases[i]] : [s]));
  const sectionRef = useRef<HTMLElement>(null);
  const galaxyRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} id="proof" className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-44">
      <FloatingApps sectionRef={sectionRef} avoidRef={galaxyRef} textRef={textRef} />

      <div className="container relative z-10">
        <motion.div {...reveal()} className="mb-12 flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.18em] text-signal-bright">03 —</span>
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{a.label}</span>
        </motion.div>

        <div ref={textRef} className="w-fit max-w-full">
          <motion.h2 {...reveal()} className="max-w-6xl font-display text-[2.5rem] font-light leading-[1.02] sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="text-signal-bright">{a.h2}</span>{" "}
            <span className="mt-3 block text-3xl leading-[1.15] text-muted-foreground md:text-5xl">{a.h2Sub}</span>
          </motion.h2>
        </div>
      </div>

      <div ref={galaxyRef} className="relative z-10 mt-4 px-4 md:mt-0 md:px-8">
        <ToolGalaxy words={words} label={a.galaxyLabel}>
          <CoreCycle slides={a.coreSlides} />
        </ToolGalaxy>
      </div>
    </section>
  );
};
