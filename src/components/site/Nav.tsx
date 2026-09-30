import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-icon-white.svg";
import { useLanguage } from "@/contexts/LanguageContext";
import { homePath } from "@/lib/seo";
import type { Lang } from "@/lib/translations";

const langLinks: { lang: Lang; label: string; hrefLang: string }[] = [
  { lang: "EN", label: "EN", hrefLang: "en" },
  { lang: "GR", label: "GR", hrefLang: "el" },
];

export const Nav = () => {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  // Section anchors live on the home page, so from any other page they lead back to it.
  const home = homePath[lang];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, 0.1, 1] }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/50"
    >
      <div className="container flex items-center justify-between h-16">
        <a href={`${home}#top`} className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <div className="h-10 w-10 shrink-0">
            <img src={logo} alt="White Cane AI Consulting" className="h-full w-full" />
          </div>
          <span className="font-display text-sm tracking-wider hidden sm:block">
            WHITE CANE <span className="text-muted-foreground">/ AI Consulting</span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7 text-[11px] xl:text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {t.nav.links.map((l) => (
            <a key={l.href} href={home + l.href} className="rounded-full px-3 py-2 hover:text-foreground hover:bg-card transition-colors duration-300">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-0.5 text-xs uppercase tracking-[0.14em] bg-card rounded-full p-1">
            {langLinks.map((l) => (
              <Link
                key={l.lang}
                to={homePath[l.lang]}
                hrefLang={l.hrefLang}
                aria-current={lang === l.lang ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 transition-colors duration-300 ${lang === l.lang ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <a
            href={`${home}#contact`}
            className="hidden sm:inline-flex group relative items-center gap-2 text-xs uppercase tracking-[0.14em] rounded-full bg-card px-5 py-2.5 hover:bg-signal hover:text-bone transition-colors duration-300"
          >
            <span className="w-1.5 h-1.5 bg-signal pulse-dot" />
            {t.nav.contact}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden grid place-items-center w-10 h-10 rounded-full bg-card text-foreground"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.6, 0.05, 0.1, 1] }}
            className="lg:hidden overflow-hidden border-t border-border/50 bg-background/95"
          >
            <div className="container flex flex-col py-6 gap-1 text-sm uppercase tracking-[0.14em] text-muted-foreground">
              {t.nav.links.map((l) => (
                <a
                  key={l.href}
                  href={home + l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3.5 hover:bg-card hover:text-foreground transition-colors duration-300"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={`${home}#contact`}
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center gap-2 text-xs rounded-full bg-bone text-ink px-5 py-3.5 hover:bg-signal hover:text-bone transition-colors duration-300 justify-center"
              >
                <span className="w-1.5 h-1.5 bg-signal pulse-dot" />
                {t.nav.contact}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
