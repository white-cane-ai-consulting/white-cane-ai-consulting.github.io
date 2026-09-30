import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "@/pages/Index";
import { translations } from "@/lib/translations";

const c = translations.GR.consent;
const gaScript = () => document.head.querySelector('script[src*="googletagmanager.com"]');

const renderPage = () =>
  render(
    <MemoryRouter>
      <LanguageProvider>
        <Index />
      </LanguageProvider>
    </MemoryRouter>,
  );

describe("Cookie consent", () => {
  beforeEach(() => {
    localStorage.clear();
    gaScript()?.remove();
  });

  it("loads nothing from Google until the visitor accepts", async () => {
    renderPage();
    await screen.findByRole("region", { name: c.title }, { timeout: 2500 });
    expect(gaScript()).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: c.reject }));
    expect(gaScript()).toBeNull();
    expect(JSON.parse(localStorage.getItem("wc-cookie-consent")!).value).toBe("denied");
  });

  it("loads Google Analytics after accepting and remembers the choice", async () => {
    renderPage();
    await screen.findByRole("region", { name: c.title }, { timeout: 2500 });

    fireEvent.click(screen.getByRole("button", { name: c.accept }));
    expect(gaScript()).not.toBeNull();
    expect(JSON.parse(localStorage.getItem("wc-cookie-consent")!).value).toBe("granted");
  });

  it("lets the visitor reopen the policy from the footer", () => {
    localStorage.setItem("wc-cookie-consent", JSON.stringify({ value: "denied", at: Date.now() }));
    renderPage();

    fireEvent.click(screen.getByRole("button", { name: c.footerLink }));
    expect(screen.getByRole("dialog", { name: c.title })).toBeInTheDocument();
  });
});
