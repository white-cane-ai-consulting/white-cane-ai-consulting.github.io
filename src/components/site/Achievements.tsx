import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ease = [0.6, 0.05, 0.1, 1] as const;

const Counter = ({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{n}{suffix}</span>;
};

const stats = [
  { value: 47, suffix: "+", label: "Engagements delivered", note: "Across SaaS, finance, healthcare and creative industries." },
  { value: 12000, suffix: "h", label: "Hours returned to teams", note: "Measured pre/post implementation in client workflows." },
  { value: 92, suffix: "%", label: "Adoption after 90 days", note: "Tools we ship are still in daily use a quarter later." },
  { value: 3.4, suffix: "×", label: "Median ROI on engagement", note: "Based on documented cost savings within 6 months." },
];

const logos = ["FRAMEWORK", "ORBITAL", "LEDGER&CO", "NORTHWIND", "PARALLEL", "ATLAS GROUP", "MERIDIAN", "SAINT&BLACK"];

export const Achievements = () => (
  <section id="proof" className="relative py-32 md:py-44">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
        className="flex items-center gap-3 mb-20"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-signal">03 —</span>
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">What we've achieved</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease }}
        className="font-display font-light text-4xl md:text-6xl lg:text-7xl leading-[1] mb-24 max-w-4xl text-balance"
      >
        Numbers that
        <br />
        <span className="text-muted-foreground">survived</span>{" "}
        <span className="italic font-normal">the audit.</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 mb-24">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease }}
            className="bg-background p-8 md:p-10"
          >
            <div className="font-display font-light text-6xl md:text-7xl mb-4 tracking-tight">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="font-display text-sm uppercase tracking-[0.15em] mb-3 text-foreground">{s.label}</div>
            <div className="text-xs text-muted-foreground leading-relaxed max-w-[28ch]">{s.note}</div>
          </motion.div>
        ))}
      </div>

      {/* Trusted strip */}
      <div className="border-t border-b border-border/60 py-10 overflow-hidden">
        <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-6">Trusted by teams at</div>
        <div className="flex overflow-hidden mask-gradient">
          <div className="marquee-track flex gap-16 whitespace-nowrap font-display text-xl md:text-2xl text-muted-foreground/70">
            {[...logos, ...logos].map((l, i) => (
              <span key={i} className="hover:text-foreground transition-colors duration-300 tracking-widest">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
