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

const euros = (s: string) => Number(s.replace(/[^\d]/g, ""));

/** "€1.500 – €3.000" → { min: 1500, max: 3000 }; an open-ended "€20.000+" has no max. */
const priceRange = (price: string) => {
  const [lo, hi] = price.split("–").map((s) => s.trim());
  return { min: euros(lo), max: hi && !hi.endsWith("+") ? euros(hi) : undefined };
};

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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.pricing.label,
      itemListElement: t.pricing.tiers.map((tier) => {
        const { min, max } = priceRange(tier.price);
        return {
          "@type": "Offer",
          name: tier.name,
          description: tier.size,
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "EUR",
            minPrice: min,
            ...(max ? { maxPrice: max } : {}),
            valueAddedTaxIncluded: false,
          },
          itemOffered: { "@type": "Service", name: tier.name, description: tier.features.join(" ") },
        };
      }),
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

/** /llms.txt: a plain summary with links, for AI assistants that read the site. */
export const buildLlmsTxt = () => {
  const gr = translations.GR;
  const packages = gr.pricing.tiers.map((t) => `- ${t.name} (${t.size}): ${t.price} προ ΦΠΑ, ${t.timeline}`).join("\n");
  const services = Object.values(serviceDetails.GR)
    .map((d) => `- ${d.code}. ${d.title}: ${d.kicker}`)
    .join("\n");
  return `# ${ORG_NAME}

> Συμβουλευτική AI στην Αθήνα για ελληνικές επιχειρήσεις. Επιλέγουμε, στήνουμε και εκπαιδεύουμε ομάδες σε εργαλεία AI: ChatGPT, Claude, Gemini, Microsoft 365 Copilot, και τοπικά μοντέλα όπως Qwen, Llama και Mistral σε vLLM. Τα συνδέουμε με τα έγγραφα και τα συστήματα της εταιρείας (ERP, CRM, Microsoft 365, Google Workspace), με ρυθμίσεις ασφάλειας και GDPR.

AI consulting firm in Athens, Greece. We select, set up and train teams on AI tools for Greek businesses, and test every tool in Greek before recommending it.

## Σελίδες

- [Αρχική](${abs("/")}): υπηρεσίες, ομάδα, πακέτα και τιμές, μεθοδολογία, συχνές ερωτήσεις
- [Home (English)](${abs("/en/")})

## Υπηρεσίες

${services}

## Πακέτα

${packages}

Κάθε πακέτο περιλαμβάνει έρευνα εργαλείων, στήσιμο, εκπαίδευση της ομάδας και δύο μήνες υποστήριξη. Μετά, προαιρετικό μηνιαίο πακέτο υποστήριξης.

## Επικοινωνία

- Email: ${EMAIL}
- Έδρα: Αθήνα
`;
};
