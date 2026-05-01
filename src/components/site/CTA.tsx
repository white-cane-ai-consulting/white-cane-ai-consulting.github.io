import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const ease = [0.6, 0.05, 0.1, 1] as const;

export const CTA = () => (
  <section id="contact" className="relative py-32 md:py-48 border-t border-border/50">
    <div className="container">
      <div className="grid md:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="md:col-span-8"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-signal mb-8">— Begin</div>
          <h2 className="font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-balance">
            Stop guessing
            <br />
            at <span className="italic">AI.</span>
            <br />
            <span className="text-muted-foreground">Start </span>
            <span className="text-signal italic font-normal">choosing.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="md:col-span-4 space-y-8"
        >
          <p className="text-muted-foreground leading-relaxed">
            A 30-minute call. No pitch, no slides — we'll listen, ask hard questions, and tell you
            honestly whether we're the right fit.
          </p>
          <a
            href="mailto:hello@whitecane.ai"
            className="group block bg-bone text-ink p-8 hover:bg-signal hover:text-bone transition-colors duration-500"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] mb-3 opacity-70">Direct line</div>
            <div className="font-display text-2xl flex items-center justify-between">
              hello@whitecane.ai
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </a>
        </motion.div>
      </div>
    </div>

    {/* Footer */}
    <div className="container mt-32 pt-10 border-t border-border/60">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <div className="flex items-center gap-4">
          <img src={logo} alt="" className="h-10 w-10 invert" />
          <div>
            <div className="font-display text-sm tracking-wider">WHITE CANE AI CONSULTING</div>
            <div className="text-xs text-muted-foreground mt-1">Clarity in the era of AI.</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 text-xs">
          <div>
            <div className="text-muted-foreground uppercase tracking-[0.2em] mb-3">Practice</div>
            <ul className="space-y-2">
              <li><a href="#offer" className="hover:text-signal transition-colors">Strategy</a></li>
              <li><a href="#offer" className="hover:text-signal transition-colors">Selection</a></li>
              <li><a href="#offer" className="hover:text-signal transition-colors">Integration</a></li>
            </ul>
          </div>
          <div>
            <div className="text-muted-foreground uppercase tracking-[0.2em] mb-3">Company</div>
            <ul className="space-y-2">
              <li><a href="#who" className="hover:text-signal transition-colors">Who we are</a></li>
              <li><a href="#proof" className="hover:text-signal transition-colors">Work</a></li>
              <li><a href="#contact" className="hover:text-signal transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="text-muted-foreground uppercase tracking-[0.2em] mb-3">Elsewhere</div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-signal transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-signal transition-colors">Substack</a></li>
              <li><a href="#" className="hover:text-signal transition-colors">X / Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12 flex justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>© {new Date().getFullYear()} White Cane AI Consulting</span>
        <span><span className="text-signal">●</span> Currently accepting Q3 engagements</span>
      </div>
    </div>
  </section>
);
