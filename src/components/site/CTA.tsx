import { motion } from "framer-motion";
import { FAQ } from "@/components/site/FAQ";
import { ContactForm } from "@/components/site/ContactForm";
import { Footer } from "@/components/site/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const ease = [0.6, 0.05, 0.1, 1] as const;

/**
 * Closing section: the free call with its form, the questions people ask beside it, then the
 * footer. The call comes first in the markup, so #contact lands on it and phones show it
 * before the questions.
 */
export const CTA = () => {
  const { t } = useLanguage();
  const c = t.cta;

  return (
    <section id="contact" className="relative pt-32 md:pt-44 pb-0 border-t border-border/50">
      <div className="container grid lg:grid-cols-12 gap-x-16 gap-y-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="lg:col-span-6 xl:col-span-5 min-w-0"
        >
          <h2 className="font-display font-light text-4xl md:text-5xl leading-[1.05] text-balance">
            {c.h2a} <span className="text-signal-bright italic font-normal">{c.h2c}</span>
          </h2>

          <div className="mt-10">
            <ContactForm />
          </div>

          <a
            href="mailto:consulting@whitecane-ai.com"
            className="group mt-6 flex items-center justify-between gap-3 rounded-3xl bg-bone text-ink px-6 py-4 transition-colors duration-500 hover:bg-signal hover:text-bone"
          >
            <span className="min-w-0">
              <span className="block text-[11px] uppercase tracking-[0.14em] opacity-70">{c.directLine}</span>
              <span className="block truncate font-display text-base">consulting@whitecane-ai.com</span>
            </span>
            <span className="shrink-0 transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>

        <div className="lg:col-span-6 xl:col-start-7 min-w-0">
          <FAQ />
        </div>
      </div>

      <Footer />
    </section>
  );
};
