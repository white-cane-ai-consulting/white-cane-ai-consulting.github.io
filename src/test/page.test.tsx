import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "@/pages/Index";
import { translations } from "@/lib/translations";

const gr = translations.GR;

describe("Index", () => {
  it("renders every section in order, with the FAQ folded into the contact section", () => {
    const { container } = render(
      <LanguageProvider>
        <Index />
      </LanguageProvider>,
    );

    const ids = [...container.querySelectorAll("section[id]")].map((s) => s.id);
    expect(ids).toEqual(["top", "offer", "who", "proof", "pricing", "vision", "contact"]);

    // #faq is an anchor inside the contact section rather than a section of its own.
    const contact = container.querySelector("section#contact");
    expect(contact?.querySelector("#faq")).toBeInTheDocument();

    // Both nav links still have something to scroll to.
    for (const href of gr.nav.links.map((l) => l.href)) {
      expect(container.querySelector(href)).toBeInTheDocument();
    }

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
