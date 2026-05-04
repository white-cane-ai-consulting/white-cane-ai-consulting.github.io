import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, GraduationCap, Search, Rss } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const ease = [0.6, 0.05, 0.1, 1] as const;
const rowIcons = [GraduationCap, Search, Rss];

type FlowStep = {
  readonly n: string;
  readonly label: string;
  readonly sub: string;
  readonly bullets: ReadonlyArray<string>;
};

const FlowDiagram = ({ steps }: { steps: ReadonlyArray<FlowStep> }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const all = [...steps];
  const rows = [all.slice(0, 3), all.slice(3, 6)];
  const expandedStep = steps.find(s => s.n === expanded) ?? null;

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-8">
        {rows.map((row, ri) => (
          <div key={ri} className="flex items-start justify-center gap-2">
            {row.map((step, i) => (
              <Fragment key={step.n}>
                <button
                  onClick={() => setExpanded(prev => prev === step.n ? null : step.n)}
                  className="group/step flex-1 flex flex-col items-center gap-3 select-none"
                >
                  <div className={cn(
                    "w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ease-out group-hover/step:scale-110",
                    expanded === step.n
                      ? "border-signal bg-signal scale-110"
                      : "border-border group-hover/step:border-signal group-hover/step:bg-signal"
                  )}>
                    <span className={cn(
                      "text-base font-mono transition-colors duration-300",
                      expanded === step.n ? "text-white" : "text-muted-foreground/60 group-hover/step:text-white"
                    )}>
                      {step.n}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-display text-foreground/90 leading-tight">{step.label}</p>
                    <p className="text-base text-muted-foreground/45 leading-tight mt-1">{step.sub}</p>
                  </div>
                </button>
                {i < row.length - 1 && (
                  <div className="flex items-center pt-7 flex-shrink-0 px-1">
                    <span className="text-muted-foreground/25 text-sm tracking-tighter">——›</span>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {expandedStep && (
          <motion.div
            key={expandedStep.n}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mt-5 border border-border/60 bg-card/40 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-base font-mono text-signal">{expandedStep.n}</span>
                <span className="text-base font-display text-foreground/80">{expandedStep.label}</span>
              </div>
              <button
                onClick={() => setExpanded(null)}
                className="text-muted-foreground/40 hover:text-foreground transition-colors duration-200 text-sm leading-none"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-1.5">
              {expandedStep.bullets.map((b, bi) => (
                <li key={bi} className="flex items-start gap-2.5 text-base text-muted-foreground">
                  <span className="text-signal mt-[3px] leading-none">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Offer = () => {
  const { t } = useLanguage();
  const o = t.offer;

  return (
    <section id="offer" className="relative py-32 md:py-44 bg-secondary/40 border-y border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-3 mb-20"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-signal">01 —</span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{o.label}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="font-display font-light text-4xl md:text-6xl lg:text-7xl leading-[1] mb-20 max-w-4xl text-balance"
        >
          {o.h2a}
          <br />
          <span className="text-muted-foreground">{o.h2b} </span>
          <span className="text-signal italic font-normal">{o.h2c}</span>
        </motion.h2>

        {/* Row A — full width */}
        <div className="bg-border/60 mb-px">
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="group/card relative bg-background p-10 md:p-12 hover:bg-card transition-colors duration-500"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="font-display text-5xl text-muted-foreground/40 group-hover/card:text-signal transition-colors duration-500">A</span>
              <Cpu className="w-6 h-6 text-muted-foreground group-hover/card:text-foreground transition-colors duration-500" strokeWidth={1.2} />
            </div>
            <h3 className="font-display text-2xl md:text-3xl mb-8">{o.serviceA.title}</h3>
            <FlowDiagram steps={o.serviceA.flowSteps} />
            <div className="absolute left-0 bottom-0 h-px bg-signal w-0 group-hover/card:w-full transition-all duration-700 ease-out" />
          </motion.article>
        </div>

        {/* Rows B C D */}
        <div className="grid md:grid-cols-3 gap-px bg-border/60">
          {o.servicesRow.map((s, i) => {
            const Icon = rowIcons[i];
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease }}
                className="group relative bg-background p-10 md:p-12 hover:bg-card transition-colors duration-500"
              >
                <div className="flex items-start justify-between mb-10">
                  <span className="font-display text-5xl text-muted-foreground/40 group-hover:text-signal transition-colors duration-500">
                    {String.fromCharCode(66 + i)}
                  </span>
                  <Icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors duration-500" strokeWidth={1.2} />
                </div>
                <h3 className="font-display text-2xl mb-4">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{s.body}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground border border-border px-3 py-1.5">{tag}</span>
                  ))}
                </div>
                <div className="absolute left-0 bottom-0 h-px bg-signal w-0 group-hover:w-full transition-all duration-700 ease-out" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
