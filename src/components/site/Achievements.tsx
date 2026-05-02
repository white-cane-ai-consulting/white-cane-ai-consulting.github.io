import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

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

type AiTool = { name: string; icon: React.ReactNode };

const aiTools: AiTool[] = [
  {
    name: "Claude",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 shrink-0" aria-hidden>
        <path fill="#CC785C" d="M13.34 3.6h3.13L12 17.25 7.53 3.6H10.66l1.34 3.95zm-6.47 0H3.6L12 20.4l8.4-16.8H17.13L12 11.63z" />
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 shrink-0" aria-hidden>
        <path fill="#10A37F" d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.815-3.354 2.02-1.164a.076.076 0 0 1 .071 0l4.83 2.786a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.43-.695zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: "Gemini",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 shrink-0" aria-hidden>
        <defs>
          <linearGradient id="gm-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="50%" stopColor="#9C27B0" />
            <stop offset="100%" stopColor="#00ACC1" />
          </linearGradient>
        </defs>
        <path fill="url(#gm-grad)" d="M12 2C12 7.523 7.523 12 2 12c5.523 0 10 4.477 10 10 0-5.523 4.477-10 10-10-5.523 0-10-4.477-10-10z" />
      </svg>
    ),
  },
  {
    name: "Copilot",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 shrink-0" aria-hidden>
        {/* GitHub mark — Copilot is a GitHub product */}
        <path fill="#8B949E" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "Cursor",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 shrink-0" aria-hidden>
        <path fill="#ffffff" d="M4.5 2 21 12.5l-7.8 1.4L11 22z" />
      </svg>
    ),
  },
  {
    name: "Lovable",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 shrink-0" aria-hidden>
        <path fill="#FF4D6D" d="M12 21.6C6.5 17.7 2 14 2 9.5 2 6.4 4.4 4 7.5 4c1.7 0 3.4.9 4.5 2.2C13.1 4.9 14.8 4 16.5 4 19.6 4 22 6.4 22 9.5c0 4.5-4.5 8.2-10 12.1z" />
      </svg>
    ),
  },
  {
    name: "Mistral",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 shrink-0" aria-hidden>
        <rect fill="#FF7000" x="2"    y="2"    width="4.5" height="4.5" />
        <rect fill="#FF7000" x="8.75" y="2"    width="4.5" height="4.5" />
        <rect fill="#FF7000" x="15.5" y="2"    width="4.5" height="4.5" />
        <rect fill="#FF7000" x="2"    y="8.75" width="4.5" height="4.5" />
        <rect fill="#FF7000" x="8.75" y="8.75" width="4.5" height="4.5" />
        <rect fill="#FF7000" x="15.5" y="8.75" width="4.5" height="4.5" />
        <rect fill="#FF7000" x="2"    y="15.5" width="4.5" height="4.5" />
        <rect fill="#FF7000" x="8.75" y="15.5" width="4.5" height="4.5" />
      </svg>
    ),
  },
  {
    name: "Perplexity",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 shrink-0" aria-hidden>
        <path fill="#20808D" fillRule="evenodd" d="M12 2 3 8v8l9 6 9-6V8zm0 3.1 5.5 3.67v5.46L12 17.9l-5.5-3.67V8.77z" />
      </svg>
    ),
  },
  {
    name: "Bolt",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 shrink-0" aria-hidden>
        <path fill="#1389FD" d="M13 2 4 14h7l-2 8 11-12h-7z" />
      </svg>
    ),
  },
  {
    name: "v0",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 shrink-0" aria-hidden>
        <path fill="#f5f5f5" d="M24 22.525H0l12-21.05z" />
      </svg>
    ),
  },
  {
    name: "Windsurf",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 shrink-0" aria-hidden>
        <path fill="#09B6A2" d="M2 17L6.5 7 11 13.5 13.5 7 22 17H2z" />
      </svg>
    ),
  },
  {
    name: "ElevenLabs",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 shrink-0" aria-hidden>
        <rect fill="#c0c0c0" x="7"  y="3" width="4" height="18" rx="1" />
        <rect fill="#c0c0c0" x="13" y="3" width="4" height="18" rx="1" />
      </svg>
    ),
  },
  {
    name: "Midjourney",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 shrink-0" aria-hidden>
        <path fill="#f5f5f5" d="M4 19c1.5-4 4-7 8-9 1-2.5 2-5 4-7 1.5 2.5 2 5.5 2 9C16 16 19 17 21 19H4z" />
      </svg>
    ),
  },
  {
    name: "Runway",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 shrink-0" aria-hidden>
        <rect fill="#d0d0d0" x="2"  y="4"  width="20" height="3.5" rx="1" />
        <rect fill="#d0d0d0" x="2"  y="10" width="14" height="3.5" rx="1" />
        <rect fill="#d0d0d0" x="2"  y="16" width="8"  height="3.5" rx="1" />
      </svg>
    ),
  },
  {
    name: "Notion AI",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 shrink-0" aria-hidden>
        <path fill="#f0f0f0" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
      </svg>
    ),
  },
];

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

      {/* AI tools strip */}
      <div className="border-t border-b border-border/60 py-10 overflow-hidden">
        <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-6">AI tools we've set up &amp; tested</div>
        <div className="flex overflow-hidden mask-gradient">
          <div className="marquee-track flex items-center gap-16 whitespace-nowrap">
            {[...aiTools, ...aiTools].map((t, i) => (
              <span key={i} className="flex items-center gap-3 group cursor-default">
                {t.icon}
                <span className="text-muted-foreground/60 group-hover:text-foreground transition-colors duration-300 font-display text-lg md:text-xl tracking-widest">
                  {t.name}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
