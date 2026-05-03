import { motion } from "framer-motion";
import { Cpu, GraduationCap, Search, Rss } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ease = [0.6, 0.05, 0.1, 1] as const;
const rowIcons = [GraduationCap, Search, Rss];

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
            className="group relative bg-background p-10 md:p-12 hover:bg-card transition-colors duration-500"
          >
            <div className="flex items-start justify-between mb-10">
              <span className="font-display text-5xl text-muted-foreground/40 group-hover:text-signal transition-colors duration-500">A</span>
              <Cpu className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors duration-500" strokeWidth={1.2} />
            </div>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <h3 className="font-display text-2xl md:text-3xl">{o.serviceA.title}</h3>
              <div>
                <p className="text-muted-foreground leading-relaxed mb-8">{o.serviceA.body}</p>
                <div className="flex flex-wrap gap-2">
                  {o.serviceA.tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground border border-border px-3 py-1.5">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute left-0 bottom-0 h-px bg-signal w-0 group-hover:w-full transition-all duration-700 ease-out" />
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
