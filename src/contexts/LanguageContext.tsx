import { createContext, useContext, ReactNode } from "react";
import { translations, Lang, Translations } from "@/lib/translations";

type LanguageContextType = {
  lang: Lang;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType>(null!);

/** The language comes from the URL (`/` Greek, `/en/` English), so each version is its own crawlable page. */
export const LanguageProvider = ({ lang = "GR", children }: { lang?: Lang; children: ReactNode }) => (
  <LanguageContext.Provider value={{ lang, t: translations[lang] }}>{children}</LanguageContext.Provider>
);

export const useLanguage = () => useContext(LanguageContext);
