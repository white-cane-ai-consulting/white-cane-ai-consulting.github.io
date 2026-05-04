import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

export const Nav = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, 0.1, 1] }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/50"
    >
      <div className="container flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-3 group">
          <img src={logo} alt="White Cane AI Consulting" className="h-9 w-9" />
          <span className="font-display text-sm tracking-wider hidden sm:block">
            WHITE CANE <span className="text-muted-foreground">/ AI Consulting</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t.nav.links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors duration-300">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center text-xs uppercase tracking-[0.2em] border border-foreground/20">
            <button
              onClick={() => setLang("EN")}
              className={`px-3 py-1.5 transition-colors duration-300 ${lang === "EN" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("GR")}
              className={`px-3 py-1.5 transition-colors duration-300 ${lang === "GR" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              GR
            </button>
          </div>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] px-4 py-2 border border-foreground/20 hover:border-signal hover:text-signal transition-colors duration-300"
          >
            <span className="w-1.5 h-1.5 bg-signal pulse-dot" />
            {t.nav.contact}
          </a>
        </div>
      </div>
    </motion.header>
  );
};
