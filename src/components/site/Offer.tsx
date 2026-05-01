import { motion } from "framer-motion";
import { Compass, Layers, Workflow, ShieldCheck } from "lucide-react";

const ease = [0.6, 0.05, 0.1, 1] as const;

const services = [
  {
    n: "A",
    icon: Compass,
    title: "AI Strategy & Mapping",
    body: "We audit how your team actually works, where time leaks, and where AI realistically moves the needle. You leave with a prioritised roadmap — not a wishlist.",
    tags: ["Discovery", "Roadmap", "ROI Modelling"],
  },
  {
    n: "B",
    icon: Layers,
    title: "Tool Selection",
    body: "We've tested the market so you don't have to. We recommend a small, defensible stack — picked for your data, your team, and your budget — and negotiate the contracts.",
    tags: ["Vendor Audit", "POC Design", "Procurement"],
  },
  {
    n: "C",
    icon: Workflow,
    title: "Integration & Workflow",
    body: "We design and implement the workflows that connect your AI tools to the work — automations, prompts, internal copilots and review loops your team will actually use.",
    tags: ["Automation", "Copilots", "Prompt Systems"],
  },
  {
    n: "D",
    icon: ShieldCheck,
    title: "Governance & Care",
    body: "Policies, evals, monitoring and ongoing training — so the system you launch on day one is still the system you trust six months in.",
    tags: ["Policy", "Evaluation", "Training"],
  },
];

export const Offer = () => (
  <section id="offer" className="relative py-32 md:py-44 bg-secondary/40 border-y border-border/50">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
        className="flex items-center gap-3 mb-20"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-signal">02 —</span>
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">What we offer</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease }}
        className="font-display font-light text-4xl md:text-6xl lg:text-7xl leading-[1] mb-20 max-w-4xl text-balance"
      >
        Four practices.
        <br />
        <span className="text-muted-foreground">One outcome — </span>
        <span className="text-signal italic font-normal">work that thinks for itself.</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-px bg-border/60">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease }}
              className="group relative bg-background p-10 md:p-12 hover:bg-card transition-colors duration-500"
            >
              <div className="flex items-start justify-between mb-10">
                <span className="font-display text-5xl text-muted-foreground/40 group-hover:text-signal transition-colors duration-500">
                  {s.n}
                </span>
                <Icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors duration-500" strokeWidth={1.2} />
              </div>
              <h3 className="font-display text-2xl md:text-3xl mb-4">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">{s.body}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground border border-border px-3 py-1.5">
                    {t}
                  </span>
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
