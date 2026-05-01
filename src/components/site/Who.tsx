import { motion } from "framer-motion";

const ease = [0.6, 0.05, 0.1, 1] as const;

export const Who = () => (
  <section id="who" className="relative py-32 md:py-44 border-t border-border/50">
    <div className="container">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
        className="flex items-center gap-3 mb-20"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-signal">01 —</span>
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Who we are</span>
      </motion.div>

      <div className="grid md:grid-cols-12 gap-10 md:gap-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="md:col-span-7 font-display font-light text-4xl md:text-6xl lg:text-7xl leading-[1] text-balance"
        >
          A small team of operators
          <br />
          <span className="text-muted-foreground">obsessed with one question:</span>{" "}
          <span className="italic font-normal">what should this actually do?</span>
        </motion.h2>

        <div className="md:col-span-5 md:pt-6 space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="text-muted-foreground leading-relaxed"
          >
            White Cane AI Consulting was built on a simple belief — most AI failures aren't model
            failures, they're <span className="text-foreground">clarity failures</span>. We sit with
            your team, map the workflow as it really is, then choose the smallest set of tools that
            change the outcome.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="grid grid-cols-2 gap-6 pt-4 border-t border-border/60"
          >
            {[
              { k: "Independent", v: "No vendor kickbacks. Ever." },
              { k: "Hands-on", v: "We build with you, not for you." },
              { k: "Outcome-led", v: "Hours saved, not seats sold." },
              { k: "Discreet", v: "Most clients stay anonymous." },
            ].map((p) => (
              <div key={p.k}>
                <div className="font-display text-base mb-1">{p.k}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{p.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);
