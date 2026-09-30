/*
 * Google Analytics, loaded only after the visitor accepts it. Until then no Google
 * script is requested and no cookie is set (Consent Mode "basic"), which is what the
 * Greek DPA expects for analytics cookies.
 */

const GA_ID = "G-6QH7W9S26B";
const STORAGE_KEY = "wc-cookie-consent";
/** Ask again after a year, so a stored answer never outlives what the visitor last saw. */
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const readConsent = (): Consent | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { value, at } = JSON.parse(raw) as { value: Consent; at: number };
    if (value !== "granted" && value !== "denied") return null;
    if (Date.now() - at > MAX_AGE_MS) return null;
    return value;
  } catch {
    return null;
  }
};

export const saveConsent = (value: Consent) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, at: Date.now() }));
  } catch {
    // Private mode or blocked storage: the choice still applies for this visit.
  }
};

let loaded = false;

export const enableAnalytics = () => {
  if (typeof window === "undefined") return;
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = false;
  if (loaded) {
    // Accepted again after withdrawing in the same visit.
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    return;
  }
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  // gtag.js reads the `arguments` object, not an array, so this must stay a plain function.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
};

/** Withdrawal: stop collection for the rest of the visit and remove the _ga cookies. */
export const disableAnalytics = () => {
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;

  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
};
