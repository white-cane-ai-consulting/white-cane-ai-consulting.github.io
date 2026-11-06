import { translations, type Lang } from "@/lib/translations";
import { serviceDetails } from "@/lib/serviceDetails";

/*
 * Everything search engines and AI assistants read before the page itself: title,
 * description, canonical URL, language alternates and structured data (JSON-LD).
 * The build prerenders it into each page's <head>; on the client `applyMeta` keeps
 * the basics in step when the visitor moves between pages without a reload.
 */

export const SITE_URL = "https://whitecane-ai.com";
const ORG_NAME = "White Cane AI Consulting";
const EMAIL = "consulting@whitecane-ai.com";
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const homePath: Record<Lang, string> = { GR: "/", EN: "/en/" };
export const htmlLang: Record<Lang, string> = { GR: "el", EN: "en" };
const ogLocale: Record<Lang, string> = { GR: "el_GR", EN: "en_US" };

export const langFromPath = (pathname: string): Lang => (/^\/en(\/|$)/.test(pathname) ? "EN" : "GR");

/** Every URL the build writes out, in sitemap order. */
export const routes = [homePath.GR, homePath.EN];

/**
 * Greek landing pages that were live from 30 Sep to 1 Oct 2026 and got indexed. The user
 * wants every visitor on the home page, so each now redirects there for everyone (people and
 * crawlers alike, which is what search engines accept). Keep them until Search Console shows
 * none of them indexed any more.
 */
export const retiredPaths = [
  "/stisimo-ergaleion-ai/",
  "/symvouleftiki-ai/",
  "/ai-stin-epicheirisi/",
  "/ai-transformation/",
  "/ekpaidefsi-ai/",
];

type JsonLd = Record<string, unknown>;

export type PageMeta = {
  path: string;
  lang: Lang;
  title: string;
  description: string;
  alternates?: { hreflang: string; href: string }[];
  jsonLd: JsonLd[];
  noindex?: boolean;
  ogType: "website" | "article";
};

const home: Record<Lang, { title: string; description: string }> = {
  GR: {
    title: "Συμβουλευτική AI και στήσιμο εργαλείων AI | White Cane AI",
    description:
      "Στήνουμε εργαλεία AI σε ελληνικές επιχειρήσεις: ChatGPT, Claude, Gemini, Copilot ή τοπικά μοντέλα, συνδεδεμένα με τα συστήματά σας, με εκπαίδευση της ομάδας.",
  },
  EN: {
    title: "AI consulting and AI tool set-up in Greece | White Cane AI",
    description:
      "We set up AI tools for businesses in Greece: ChatGPT, Claude, Gemini, Copilot or local models, connected to your systems, with training for your team.",
  },
};

const abs = (path: string) => `${SITE_URL}${path}`;

const organization = (lang: Lang): JsonLd => {
  const t = translations[lang];
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: ORG_NAME,
    alternateName: "White Cane AI",
    url: abs("/"),
    logo: abs("/icon-512.png"),
    image: OG_IMAGE,
    email: EMAIL,
    description: home[lang].description,
    foundingDate: "2026",
    address: { "@type": "PostalAddress", addressLocality: lang === "GR" ? "Αθήνα" : "Athens", addressCountry: "GR" },
    areaServed: { "@type": "Country", name: lang === "GR" ? "Ελλάδα" : "Greece" },
    knowsLanguage: ["el", "en"],
    knowsAbout: [
      "Artificial intelligence",
      "Generative AI",
      "AI consulting",
      "AI transformation",
      "AI training",
      "ChatGPT",
      "Claude",
      "Gemini",
      "Microsoft 365 Copilot",
      "On-premise LLM",
      "vLLM",
      "Model Context Protocol",
      "n8n",
      "GDPR",
      "EU AI Act",
    ],
    // The services shown in the "offer" section. No prices: the site quotes per project.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.offer.label,
      itemListElement: Object.values(serviceDetails[lang]).map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d.title, description: d.kicker, provider: { "@id": ORG_ID } },
      })),
    },
  };
};

const website: JsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: abs("/"),
  name: "White Cane AI",
  inLanguage: ["el", "en"],
  publisher: { "@id": ORG_ID },
};

const faqPage = (url: string, items: readonly { q: string; a: string }[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

const homeAlternates = [
  { hreflang: "el", href: abs(homePath.GR) },
  { hreflang: "en", href: abs(homePath.EN) },
  { hreflang: "x-default", href: abs(homePath.GR) },
];

const withSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

export const getPageMeta = (pathname: string): PageMeta => {
  const path = withSlash(pathname.split(/[?#]/)[0] || "/");

  if (path === homePath.GR || path === homePath.EN) {
    const lang: Lang = path === homePath.EN ? "EN" : "GR";
    return {
      path,
      lang,
      ...home[lang],
      alternates: homeAlternates,
      ogType: "website",
      jsonLd: [organization(lang), website, faqPage(abs(path), translations[lang].faq.items)],
    };
  }

  return {
    path,
    lang: langFromPath(path),
    title: "Η σελίδα δεν βρέθηκε | White Cane AI",
    description: home.GR.description,
    noindex: true,
    ogType: "website",
    jsonLd: [],
  };
};

const escapeAttr = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** JSON is safe inside <script> once "<" can no longer close the tag. */
const jsonForScript = (data: JsonLd) => JSON.stringify(data).replace(/</g, "\\u003c");

/** The per-page part of <head>, as prerendered into each HTML file. */
export const renderHead = (meta: PageMeta) => {
  const url = abs(meta.path);
  const tags = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    meta.noindex ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${url}" />`,
    ...(meta.alternates ?? []).map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`),
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:site_name" content="${ORG_NAME}" />`,
    `<meta property="og:locale" content="${ogLocale[meta.lang]}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1904" />`,
    `<meta property="og:image:height" content="941" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@WhiteCaneAI" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    ...meta.jsonLd.map((data) => `<script type="application/ld+json">${jsonForScript(data)}</script>`),
  ];
  return tags.join("\n    ");
};

/** Client side: keep title, description, canonical and <html lang> right after in-app navigation. */
export const applyMeta = (meta: PageMeta) => {
  if (typeof document === "undefined") return;
  document.title = meta.title;
  document.documentElement.lang = htmlLang[meta.lang];
  document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", abs(meta.path));
};

export const buildSitemap = (lastmod: string) => {
  const entries = routes.map((path) => {
    const meta = getPageMeta(path);
    const links = (meta.alternates ?? [])
      .map((a) => `\n    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
      .join("");
    return `  <url>\n    <loc>${abs(path)}</loc>\n    <lastmod>${lastmod}</lastmod>${links}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;
};

/** One plain sentence per service for llms.txt, taken from what each service window already says. */
const llmsServices: Record<"GR" | "EN", Record<string, string>> = {
  GR: {
    A: "Στήνουμε τα εργαλεία AI της εταιρείας ώστε να δουλεύουν πάνω στα δικά της δεδομένα, με εταιρικούς λογαριασμούς και ελεγμένη ασφάλεια, έτσι ώστε η ομάδα να τα χρησιμοποιεί από την πρώτη μέρα.",
    A1: "ChatGPT, Claude, Gemini και Microsoft Copilot σε εταιρικό πλάνο, στημένα για όλη την ομάδα.",
    A2: "Μοντέλα (vLLM, Qwen, Llama, Mistral) που τρέχουν στη δική σας υποδομή, όταν ο νόμος, μια σύμβαση ή η πολιτική της εταιρείας δεν επιτρέπει να βγουν δεδομένα έξω.",
    A3: "Εργαλεία φτιαγμένα για συγκεκριμένες δουλειές, συνδεδεμένα με ERP, CRM και αυτοματισμούς, μόνο όταν λύνουν πραγματική ανάγκη και περνούν έλεγχο ασφάλειας.",
    B: "Ορίζουμε τι πρέπει να κάνει το εργαλείο, δοκιμάζουμε τους υποψηφίους στα ελληνικά και πάνω στα πραγματικά αρχεία του πελάτη, και παραδίδουμε σύγκριση με τεκμηριωμένη πρόταση.",
    C: "Σεμινάρια, πρακτικά μαθήματα ανά ρόλο και γραπτοί οδηγοί πάνω στη δουλειά της ίδιας της εταιρείας, ώστε τα εργαλεία να χρησιμοποιούνται πραγματικά.",
    D: "Όταν βγαίνουν νέα εργαλεία ή μοντέλα που αφορούν την επιχείρηση, στέλνουμε σύντομη ενημέρωση με συγκεκριμένη πρόταση, όχι newsletter.",
  },
  EN: {
    A: "We set up a company's AI tools to work on its own data, with company accounts and verified security, so the team uses them from day one.",
    A1: "ChatGPT, Claude, Gemini and Microsoft Copilot on a business plan, set up for the whole team.",
    A2: "Models (vLLM, Qwen, Llama, Mistral) running on your own infrastructure, when the law, a contract or company policy does not allow data to leave.",
    A3: "Tools built for specific jobs, connected to ERP, CRM and automations, only when they solve a real need and pass a security check.",
    B: "We define what the tool must do, test candidates in Greek and on the client's real files, and deliver a comparison with a reasoned recommendation.",
    C: "Seminars, hands-on lessons per role and written guides built on the company's own work, so the tools actually get used.",
    D: "When new tools or models matter to the business, we send a short note with a concrete suggestion, not a newsletter.",
  },
};

/**
 * /llms.txt: a plain, factual summary with links, for AI assistants that read the site.
 * Everything here is also on the visible pages (no extra claims, no prices); the services
 * and the FAQ questions come straight from the same data the page renders.
 */
export const buildLlmsTxt = () => {
  const services = (lang: "GR" | "EN", path: string) =>
    Object.entries(serviceDetails[lang])
      .map(([id, d]) => `- [${d.title}](${abs(path)}#offer-${id}): ${llmsServices[lang][id]}`)
      .join("\n");
  const questions = (lang: "GR" | "EN", path: string) =>
    translations[lang].faq.items.map((item) => `- [${item.q}](${abs(path)}#faq)`).join("\n");

  return `# ${ORG_NAME}

> Η White Cane AI Consulting είναι συμβουλευτική AI από την Αθήνα για ελληνικές επιχειρήσεις. Επιλέγουμε, στήνουμε και εκπαιδεύουμε ομάδες σε εργαλεία AI (ChatGPT, Claude, Gemini, Microsoft 365 Copilot, και τοπικά μοντέλα), τα συνδέουμε με τα έγγραφα και τα συστήματα της εταιρείας, με ρυθμίσεις ασφάλειας και GDPR, και δοκιμάζουμε κάθε εργαλείο στα ελληνικά πριν το προτείνουμε.

## Βασικά στοιχεία

- Τι κάνουμε: στήσιμο εργαλείων AI, έρευνα και αξιολόγηση εργαλείων, εκπαίδευση ομάδων, συνεχής ενημέρωση.
- Για ποιους: ελληνικές επιχειρήσεις, από μικρές ομάδες 5 ατόμων μέχρι οργανισμούς άνω των 100 ατόμων.
- Έδρα: Αθήνα. Ιδρύθηκε το 2026. Εργαζόμαστε στα ελληνικά και στα αγγλικά.
- Εμπειρία (όπως δηλώνεται στο site): 3+ χρόνια σε enterprise Generative AI, 150+ εργαλεία AI που έχουμε δοκιμάσει, 20+ κλάδοι.
- Κόστος: δεν δημοσιεύουμε τιμές. Δίνουμε προσφορά ανά έργο, ανάλογα με το μέγεθος της εταιρείας και τα εργαλεία και τις συνδέσεις που χρειάζονται, μετά από μια δωρεάν κλήση 30 λεπτών χωρίς δέσμευση.
- Κάθε έργο περιλαμβάνει έρευνα εργαλείων, στήσιμο, εκπαίδευση της ομάδας και δύο μήνες υποστήριξης.
- Πώς ξεκινάτε: δωρεάν κλήση 30 λεπτών μέσω της φόρμας επικοινωνίας ή με email στο ${EMAIL}.

## Υπηρεσίες

${services("GR", "/")}

## Συχνές ερωτήσεις (με πλήρεις απαντήσεις στη σελίδα)

${questions("GR", "/")}

## Σελίδες

- [Αρχική (ελληνικά)](${abs("/")}): όλες οι ενότητες σε μία σελίδα
- [Home (English)](${abs("/en/")}): the same page in English

## Επικοινωνία

- Email: ${EMAIL}
- Φόρμα επικοινωνίας: ${abs("/")}#contact (English: ${abs("/en/")}#contact)
- Έδρα: Αθήνα, Ελλάδα

## English summary

White Cane AI Consulting is an AI consultancy in Athens, Greece. We select, set up and train teams on AI tools for Greek businesses (ChatGPT, Claude, Gemini, Microsoft 365 Copilot and local models), connect them to the company's documents and systems with security and GDPR settings, and test every tool in Greek before recommending it. We work with teams from 5 people up to organisations of 100+. We do not publish prices: we quote per project after a free 30-minute call, and every project includes research, set-up, team training and two months of support.

### Services

${services("EN", "/en/")}

### Frequently asked questions

${questions("EN", "/en/")}
`;
};
