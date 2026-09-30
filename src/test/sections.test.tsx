import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Achievements } from "@/components/site/Achievements";
import { Offer } from "@/components/site/Offer";
import { Pricing } from "@/components/site/Pricing";
import { CTA } from "@/components/site/CTA";
import { translations } from "@/lib/translations";

const gr = translations.GR;

const renderWithLang = (ui: React.ReactElement) => render(<LanguageProvider>{ui}</LanguageProvider>);

describe("Offer", () => {
  it("shows service A with its three levels and B, C, D", () => {
    renderWithLang(<Offer />);

    expect(screen.getByRole("heading", { name: gr.offer.serviceA.title })).toBeInTheDocument();
    for (const level of gr.offer.serviceA.levels) {
      expect(screen.getByRole("heading", { name: level.title })).toBeInTheDocument();
    }
    for (const service of gr.offer.servicesRow) {
      expect(screen.getByRole("heading", { name: service.title })).toBeInTheDocument();
    }
  });

  it("opens the floating window for a service and closes it again", async () => {
    renderWithLang(<Offer />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("heading", { name: gr.offer.serviceA.title }));

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: gr.offer.serviceA.title })).toBeInTheDocument();
    expect(within(dialog).getByText("Πριν και μετά")).toBeInTheDocument();

    // The window animates out, so it leaves the tree a frame later rather than instantly.
    fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument(), { timeout: 3000 });
  });

  it("switches the size tabs inside service A's window", async () => {
    renderWithLang(<Offer />);

    fireEvent.click(screen.getByRole("heading", { name: gr.offer.serviceA.title }));
    const dialog = await screen.findByRole("dialog");

    expect(within(dialog).getByText("Περίπου 5 εργάσιμες.")).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("tab", { name: /100\+ άτομα/ }));
    expect(await within(dialog).findByText("10–30 εργάσιμες.")).toBeInTheDocument();
  });

  it("moves from service A's window to a level's window", async () => {
    renderWithLang(<Offer />);

    fireEvent.click(screen.getByRole("heading", { name: gr.offer.serviceA.title }));
    const dialog = await screen.findByRole("dialog");

    fireEvent.click(within(dialog).getByRole("button", { name: /Τοπικό AI/ }));
    expect(await within(screen.getByRole("dialog")).findByText("Πού το στήνουμε")).toBeInTheDocument();
  });

  it("opens a level-specific window from the A1 tile", async () => {
    renderWithLang(<Offer />);

    fireEvent.click(screen.getByRole("heading", { name: gr.offer.serviceA.levels[0].title }));

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText("Enterprise AI πλατφόρμες")).toBeInTheDocument();
    expect(within(dialog).getByText("Ποια πλατφόρμα, για ποια εταιρεία")).toBeInTheDocument();
  });

  it("closes the service window when the backdrop is clicked", async () => {
    renderWithLang(<Offer />);

    fireEvent.click(screen.getByRole("heading", { name: gr.offer.servicesRow[1].title }));
    const dialog = await screen.findByRole("dialog");

    expect(within(dialog).queryByText("Παράδειγμα")).not.toBeInTheDocument();
    expect(within(dialog).queryByText("Πότε δεν ταιριάζει")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("service-modal-backdrop"));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument(), { timeout: 3000 });
  });
});

describe("Why us", () => {
  it("shows the AI Transformation heading and the tool galaxy", () => {
    const { container } = renderWithLang(<Achievements />);

    expect(container.querySelector("section#proof")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /AI Transformation/ })).toBeInTheDocument();

    // The galaxy is decorative motion, so screen readers get the tool list through its label instead.
    const galaxy = screen.getByRole("img", { name: new RegExp(gr.achievements.galaxyLabel) });
    for (const tool of ["Claude", "ChatGPT", "Gemini", "n8n", "Notion", "HubSpot"]) {
      expect(galaxy.getAttribute("aria-label")).toContain(tool);
    }
  });
});

describe("Pricing", () => {
  it("renders the three packages with their monthly support price", () => {
    renderWithLang(<Pricing />);

    const cards = screen.getAllByRole("article");
    gr.pricing.tiers.forEach((tier, i) => {
      expect(screen.getByRole("heading", { name: tier.name })).toBeInTheDocument();
      expect(screen.getByText(tier.price)).toBeInTheDocument();
      // Scoped to the card: the retainer panel (always mounted, hidden until hovered)
      // repeats the same price, which would otherwise match twice here.
      // The retainer price and its "/μήνα" suffix sit in one paragraph, split across nodes.
      expect(within(cards[i]).getByText(tier.retainerPrice, { exact: false })).toBeInTheDocument();
    });
    // The label is now the same on all three cards, so the hours no longer leak into it.
    // Scoped per card: each card's (always-mounted, hidden) retainer panel repeats it too.
    cards.forEach((card) => {
      expect(within(card).getAllByText(gr.pricing.tiers[0].retainerLabel)).toHaveLength(1);
    });
    expect(screen.getByText(gr.pricing.vatNote)).toBeInTheDocument();
    // The per-package "discuss" button was removed; the contact form picks the package instead.
    expect(screen.queryByRole("link", { name: /Συζητήστε/ })).not.toBeInTheDocument();
  });

  it("opens the retainer panel on hover and pins it on click", async () => {
    renderWithLang(<Pricing />);

    const tier = gr.pricing.tiers[0];
    const trigger = screen.getAllByRole("button", { name: gr.pricing.retainerContentsLabel })[0];

    // The panel is mounted from the start (so hovering it never races a fresh
    // mount against one still fading out) but is `aria-hidden` until opened, which
    // keeps it out of role-based queries and off screen readers.
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.mouseEnter(trigger);
    const panel = await screen.findByRole("dialog");
    // The hours live in the panel rather than on the card.
    expect(within(panel).getByText(tier.retainerHours)).toBeInTheDocument();
    for (const feature of tier.retainerFeatures) {
      expect(within(panel).getByText(feature)).toBeInTheDocument();
    }

    // A click pins it, so leaving with the pointer no longer dismisses it.
    fireEvent.click(trigger);
    fireEvent.mouseLeave(trigger);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    fireEvent.click(within(panel).getByRole("button", { name: gr.pricing.retainerCloseLabel }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument(), { timeout: 3000 });
  });
});

describe("closing section", () => {
  it("carries the FAQ and the contact call to action in one section", () => {
    const { container } = renderWithLang(<CTA />);

    const section = container.querySelector("section#contact");
    expect(section).toBeInTheDocument();
    // The FAQ anchor is nested inside it rather than being a section of its own.
    expect(section?.querySelector("#faq")).toBeInTheDocument();
    expect(within(section as HTMLElement).getByText(gr.faq.items[0].q)).toBeInTheDocument();
    expect(section?.querySelector('a[href="mailto:consulting@whitecane-ai.com"]')).toBeInTheDocument();
  });

  it("offers the free call and the three packages in the contact form", () => {
    renderWithLang(<CTA />);

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(4);
    expect(screen.getByRole("radio", { name: gr.cta.form.packages[0] })).toBeChecked();
    for (const tier of gr.pricing.tiers) {
      expect(screen.getByRole("radio", { name: tier.name })).toBeInTheDocument();
    }
  });

  it("does not submit an empty contact form", async () => {
    renderWithLang(<CTA />);

    fireEvent.click(screen.getByRole("button", { name: new RegExp(gr.cta.form.submit) }));
    expect(await screen.findByText(gr.cta.form.errors.name)).toBeInTheDocument();
    expect(screen.getByText(gr.cta.form.errors.email)).toBeInTheDocument();
    // Company is the one optional field.
    expect(screen.getByLabelText(new RegExp(gr.cta.form.company))).not.toHaveAttribute("aria-required");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("expands an answer on click", () => {
    renderWithLang(<CTA />);

    const second = gr.faq.items[1];
    const trigger = screen.getByRole("button", { name: new RegExp(second.q.slice(0, 20), "i") });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(second.a)).toBeInTheDocument();
  });
});
