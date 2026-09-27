import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const ease = [0.6, 0.05, 0.1, 1] as const;
const softEase = [0.16, 1, 0.3, 1] as const;

/**
 * The question list. Rendered as a block rather than its own <section> — it shares
 * the closing section with the contact call to action, which is passed in as `aside`
 * and sits directly under the heading, in the same column.
 */
export const FAQ = ({ aside }: { aside?: ReactNode }) => {
  const { t } = useLanguage();
  const f = t.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div id="faq" className="scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
        className="flex items-center gap-3 mb-14"
      >
        <span className="text-xs uppercase tracking-[0.18em] text-signal-bright">06 —</span>
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{f.label}</span>
      </motion.div>

      {/* On wide screens the heading gets its own row, so the question list and the
          contact form below it start at the same height. */}
      <div className="grid lg:grid-cols-12 gap-x-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="lg:col-span-6 min-w-0"
        >
          <h2 className="font-display font-light text-4xl md:text-5xl leading-[1.05] text-balance">
            {f.h2a} <span className="text-muted-foreground">{f.h2b}</span>{" "}
            <span className="text-signal-bright italic font-normal">{f.h2c}</span>
          </h2>
        </motion.div>

        <div className="lg:col-span-6 lg:col-start-1 min-w-0">{aside}</div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className="lg:col-span-6 lg:col-start-7 lg:row-start-2 min-w-0 flex flex-col gap-3 mt-10 lg:mt-12 lg:pt-12 lg:border-t lg:border-transparent"
        >
          {f.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`rounded-2xl border transition-colors duration-300 ${
                  isOpen ? "border-border bg-card" : "border-border/60 bg-card/30 hover:bg-card/60"
                }`}
              >
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group w-full text-left flex items-start gap-4 px-5 sm:px-6 py-5"
                  >
                    <span
                      className={`font-display text-sm shrink-0 pt-1 transition-colors duration-300 ${
                        isOpen ? "text-signal-bright" : "text-white group-hover:text-signal-bright"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-lg leading-snug text-white">{item.q}</span>
                    <span
                      className={`shrink-0 grid place-items-center w-7 h-7 rounded-full transition-colors duration-300 ${
                        isOpen ? "bg-signal text-bone" : "bg-background/70 text-muted-foreground group-hover:text-foreground"
                      }`}
                      aria-hidden="true"
                    >
                      <span className="relative block w-3 h-3">
                        <span className="absolute top-1/2 left-0 w-3 h-[1.5px] -translate-y-1/2 rounded-full bg-current" />
                        <span
                          className={`absolute top-1/2 left-0 w-3 h-[1.5px] -translate-y-1/2 rounded-full bg-current transition-all duration-300 ${
                            isOpen ? "rotate-0 opacity-0" : "rotate-90"
                          }`}
                        />
                      </span>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: softEase }}
                      className="overflow-hidden"
                    >
                      <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] px-5 sm:px-6 pb-6 sm:pl-[3.4rem]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
