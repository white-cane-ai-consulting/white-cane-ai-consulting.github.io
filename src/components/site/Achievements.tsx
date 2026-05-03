import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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

const aiTools = [
  { name: "Claude",      file: "claude-ai-icon.svg" },
  { name: "ChatGPT",     file: "openai.svg" },
  { name: "Gemini",      file: "gemini.svg" },
  { name: "Copilot",     file: "copilot.svg" },
  { name: "Cursor",      file: "cursor_light.svg" },
  { name: "Lovable",     file: "lovable.svg" },
  { name: "Mistral",     file: "mistral-ai_logo.svg" },
  { name: "Perplexity",  file: "perplexity.svg" },
  { name: "Bolt",        file: "bolt-new.svg" },
  { name: "Windsurf",    file: "windsurf-light.svg" },
  { name: "Midjourney",  file: "midjourney.svg" },
  { name: "Runway",      file: "runway.svg" },
  { name: "Notion AI",   file: "notion.svg" },
  { name: "n8n",         file: "n8n.svg" },
  { name: "Replit",      file: "replit.svg" },
];

export const Achievements = () => {
  const { t } = useLanguage();
  const a = t.achievements;

  return (
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
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{a.label}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="font-display font-light text-4xl md:text-6xl lg:text-7xl leading-[1] mb-24 max-w-4xl text-balance"
        >
          {a.h2a}
          <br />
          <span className="text-muted-foreground">{a.h2b}</span>{" "}
          <span className="italic font-normal">{a.h2c}</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 mb-24">
          {a.stats.map((s, i) => (
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

        {/* AI tools strip */}
        <div className="border-t border-b border-border/60 py-10 overflow-hidden">
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-6">{a.toolsLabel}</div>
          <div className="flex overflow-hidden mask-gradient">
            <div className="marquee-track flex items-center gap-16 whitespace-nowrap">
              {[...aiTools, ...aiTools].map((tool, i) => (
                <span key={i} className="flex items-center gap-3 group cursor-default">
                  <img
                    src={`/logos/${tool.file}`}
                    alt={tool.name}
                    className="w-9 h-9 shrink-0 object-contain"
                  />
                  <span className="text-muted-foreground/60 group-hover:text-foreground transition-colors duration-300 font-display text-lg md:text-xl tracking-widest">
                    {tool.name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
