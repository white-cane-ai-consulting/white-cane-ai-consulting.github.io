import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const ease = [0.6, 0.05, 0.1, 1] as const;

export const Who = () => (
  <section id="who" className="relative py-32 md:py-44 bg-bone text-ink border-t border-border/50">
    <div className="container">
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-stretch">

        {/* Left: logo panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="md:col-span-4 flex flex-col items-center justify-center py-16 px- gap-6 min-h-[420px]"
        >
          <img
            src={logo}
            alt="White Cane AI Consulting"
            className="w-56 md:w-72 lg:w-80 mix-blend-multiply"
          />
        </motion.div>

        {/* Right: content */}
        <div className="md:col-span-8 flex flex-col justify-center gap-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="flex items-center gap-3"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-signal">02 —</span>
            <span className="text-xs uppercase tracking-[0.3em] text-ink/50">Who we are</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="font-display font-light text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-balance"
          >
            A small team of operators
            <br />
            <span className="text-ink/35">obsessed with one question:</span>{" "}
            <span className="italic font-normal">what should this actually do?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="text-ink/55 leading-relaxed max-w-xl border-l-2 border-signal pl-5"
          >
            White Cane AI Consulting was built on a simple belief — most AI failures aren't model
            failures, they're{" "}
            <span className="text-ink font-medium">clarity failures</span>. We sit with your team,
            map the workflow as it really is, then choose the smallest set of tools that change the
            outcome.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="grid grid-cols-2 gap-px bg-ink/10"
          >
            {[
              { k: "Independent", v: "No vendor kickbacks. Ever." },
              { k: "Hands-on", v: "We build with you, not for you." },
              { k: "Outcome-led", v: "Hours saved, not seats sold." },
              { k: "Discreet", v: "Most clients stay anonymous." },
            ].map((p) => (
              <div
                key={p.k}
                className="group bg-bone hover:bg-ink transition-colors duration-500 p-6 cursor-default"
              >
                <div className="font-display text-base mb-1 text-ink group-hover:text-bone transition-colors duration-500">
                  {p.k}
                </div>
                <div className="text-xs text-ink/50 group-hover:text-bone/50 transition-colors duration-500 leading-relaxed">
                  {p.v}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  </section>
);
