import { motion } from "framer-motion";
import { FAQ } from "@/components/site/FAQ";
import { ContactForm } from "@/components/site/ContactForm";
import { Footer } from "@/components/site/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const ease = [0.6, 0.05, 0.1, 1] as const;

/**
 * Closing section: the questions people ask, then the way to reach us, then the footer.
 * The FAQ and the call to action share one section so the page ends on a single beat.
 */
export const CTA = () => {
  const { t } = useLanguage();
  const c = t.cta;

  return (
    <section id="contact" className="relative pt-32 md:pt-44 pb-0 border-t border-border/50">
      <div className="container">
        <FAQ
          aside={
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="mt-12 pt-12 border-t border-border/60 max-w-xl"
            >
              <ContactForm />
              <a
                href="mailto:consulting@whitecane-ai.com"
                className="group mt-16 flex items-center justify-between gap-3 rounded-3xl bg-bone text-ink px-6 py-4 transition-colors duration-500 hover:bg-signal hover:text-bone"
              >
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-[0.14em] opacity-70">{c.directLine}</span>
                  <span className="block truncate font-display text-base">consulting@whitecane-ai.com</span>
                </span>
                <span className="shrink-0 transition-transform group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          }
        />
      </div>

      <Footer />
    </section>
  );
};
