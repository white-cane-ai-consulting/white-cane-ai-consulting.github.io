import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const ease = [0.6, 0.05, 0.1, 1] as const;

export const CTA = () => {
  const { t } = useLanguage();
  const c = t.cta;

  return (
    <section id="contact" className="relative py-32 md:py-48 border-t border-border/50 overflow-hidden">

      {/* Background scrolling text */}
      <div className="pointer-events-none absolute left-0 right-0 overflow-hidden whitespace-nowrap opacity-[0.06] select-none" style={{ top: "60%" }} aria-hidden="true">
        <div
          className="marquee-track inline-block font-display font-bold leading-none tracking-tight uppercase"
          style={{ fontSize: "22vw", animationDuration: "360s" }}
        >
          {"WHITE CANE   WHITE CANE   WHITE CANE   WHITE CANE   ".repeat(2)}
        </div>
      </div>

      <div className="container">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            className="md:col-span-8"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-signal mb-8">{c.eyebrow}</div>
            <h2 className="font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-balance">
              {c.h2a}
              <br />
              {c.h2b} <span className="italic">AI.</span>
              <br />
              <span className="text-muted-foreground">{c.h2c} </span>
              <span className="text-signal italic font-normal">{c.h2d}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="md:col-span-4 space-y-8"
          >
            <p className="text-muted-foreground leading-relaxed">{c.sub}</p>
            <a
              href="mailto:consulting@whitecane-ai.com"
              className="group block bg-bone text-ink p-8 hover:bg-signal hover:text-bone transition-colors duration-500"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] mb-3 opacity-70">{c.directLine}</div>
              <div className="font-display text-2xl flex items-center justify-between">
                consulting@whitecane-ai.com
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mt-32 pt-10 border-t border-border/60">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="flex items-center gap-5">
            <img src={logo} alt="White Cane AI Consulting" className="h-20 w-auto rounded-xl" />
            <div>
              <div className="font-display text-sm tracking-wider">WHITE CANE AI CONSULTING</div>
              <div className="text-xs text-muted-foreground mt-1">{c.footerTagline}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-10 text-xs">
            <div>
              <div className="text-muted-foreground uppercase tracking-[0.2em] mb-3">{c.practice}</div>
              <ul className="space-y-2">
                {c.practiceLinks.map((l) => (
                  <li key={l}><a href="#offer" className="hover:text-signal transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-muted-foreground uppercase tracking-[0.2em] mb-3">{c.company}</div>
              <ul className="space-y-2">
                {c.companyLinks.map((l, i) => (
                  <li key={l}><a href={["#who","#proof","#contact"][i]} className="hover:text-signal transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-muted-foreground uppercase tracking-[0.2em] mb-3">{c.elsewhere}</div>
              <ul className="space-y-2">
                {c.elsewhereLinks.map((l) => (
                  <li key={l}><a href="#" className="hover:text-signal transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-between text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          <span>© {new Date().getFullYear()} White Cane AI Consulting</span>
          <span><span className="text-signal">●</span> {c.accepting}</span>
        </div>
      </div>
    </section>
  );
};
