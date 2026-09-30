import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "@/App";
import { serviceDetails } from "@/lib/serviceDetails";
import { buildSitemap, getPageMeta, renderHead, retiredPaths, routes } from "@/lib/seo";
import { translations } from "@/lib/translations";

const gr = translations.GR;

describe("page metadata", () => {
  it("serves Greek at / and English at /en/, linked to each other", () => {
    const el = getPageMeta("/");
    const en = getPageMeta("/en/");
    expect(el.lang).toBe("GR");
    expect(en.lang).toBe("EN");
    expect(el.title).toMatch(/Συμβουλευτική AI/);
    expect(el.alternates?.map((a) => a.hreflang)).toEqual(["el", "en", "x-default"]);
    expect(getPageMeta("/en").path).toBe("/en/");
  });

  it("gives every page its own title and a description that fits a search result", () => {
    const metas = routes.map(getPageMeta);
    expect(new Set(metas.map((m) => m.title)).size).toBe(routes.length);
    expect(new Set(metas.map((m) => m.description)).size).toBe(routes.length);
    for (const m of metas) {
      // Google shows roughly the first 60–65 characters; past ~72 the cut gets noticeable.
      expect(m.title.length).toBeLessThanOrEqual(72);
      expect(m.description.length).toBeLessThanOrEqual(170);
      expect(m.noindex).toBeFalsy();
    }
  });

  it("marks unknown URLs noindex", () => {
    expect(getPageMeta("/does-not-exist/").noindex).toBe(true);
  });

  it("writes parseable JSON-LD, with the FAQ answers and the package prices", () => {
    const head = renderHead(getPageMeta("/"));
    const blocks = [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    expect(blocks.map((b) => b["@type"])).toEqual(["ProfessionalService", "WebSite", "FAQPage"]);

    const faq = blocks[2].mainEntity;
    expect(faq).toHaveLength(gr.faq.items.length);
    expect(faq[0].acceptedAnswer.text).toBe(gr.faq.items[0].a);

    const offers = blocks[0].hasOfferCatalog.itemListElement;
    expect(offers[0].priceSpecification).toMatchObject({ minPrice: 1500, maxPrice: 3000, priceCurrency: "EUR" });
    // "€20.000+" is open-ended, so it has no maximum.
    expect(offers[2].priceSpecification.maxPrice).toBeUndefined();
  });

  it("lists every page in the sitemap", () => {
    const xml = buildSitemap("2026-09-30");
    for (const path of routes) expect(xml).toContain(`<loc>https://whitecane-ai.com${path}</loc>`);
  });
});

describe("one page for everything", () => {
  it.each(retiredPaths)("%s leads to the home page", (path) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <AppShell />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1, name: /Συμβουλευτική AI/ })).toBeInTheDocument();
  });

  it("keeps retired URLs out of the sitemap", () => {
    const xml = buildSitemap("2026-10-01");
    for (const path of retiredPaths) expect(xml).not.toContain(path);
  });

  it.each(["GR", "EN"] as const)("quotes every package price in the %s cost question", (lang) => {
    const cost = translations[lang].faq.items.find((item) => /κοστίζει|cost/i.test(item.q))!;
    for (const tier of translations[lang].pricing.tiers) expect(cost.a).toContain(tier.price);
  });
});

describe("prerendering", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("puts every FAQ answer in the HTML, not only the open one", () => {
    const html = renderToString(
      <StaticRouter location="/">
        <AppShell />
      </StaticRouter>,
    );
    const page = document.createElement("div");
    page.innerHTML = html;
    for (const item of gr.faq.items) expect(page.textContent).toContain(item.a);
  });

  it("puts the text of every service window in the HTML, not only when opened", () => {
    const html = renderToString(
      <StaticRouter location="/">
        <AppShell />
      </StaticRouter>,
    );
    const page = document.createElement("div");
    page.innerHTML = html;
    for (const detail of Object.values(serviceDetails.GR)) {
      expect(page.textContent).toContain(detail.title);
      const lead = detail.blocks.find((b) => b.kind === "lead" || b.kind === "para");
      if (lead && "body" in lead) expect(page.textContent).toContain(lead.body);
    }
    // Every tab of the size comparison, not only the one selected by default.
    expect(page.textContent).toContain("10–30 εργάσιμες.");
  });

  it.each(routes)("%s hydrates without a mismatch", async (path) => {
    const html = renderToString(
      <StaticRouter location={path}>
        <AppShell />
      </StaticRouter>,
    );
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    await act(async () => {
      hydrateRoot(
        container,
        <MemoryRouter initialEntries={[path]}>
          <AppShell />
        </MemoryRouter>,
      );
    });

    const hydrationErrors = errors.mock.calls.filter((args) => /hydrat|did not match|server/i.test(String(args[0])));
    expect(hydrationErrors).toEqual([]);
  });
});
