import { useEffect, useState, type ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { DetailBlock, DetailCard, ServiceDetail, ServiceId } from "@/lib/serviceDetails";
import { cn } from "@/lib/utils";

const softEase = [0.16, 1, 0.3, 1] as const;

/*
 * The window reads like a page of a report, not a dashboard: a heading, then rows
 * separated by hairlines. No cards, icons or tag pills — the text carries it.
 */

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="border-t border-border pt-6">
    <h4 className="mb-4 font-display text-lg text-foreground">{title}</h4>
    {children}
  </section>
);

const rowGrid = "grid gap-1.5 border-b border-border/60 py-4 last:border-b-0 sm:gap-8";

const RowTerm = ({ term, meta }: { term: string; meta?: string }) => (
  <div>
    <p className="font-display text-base leading-snug text-foreground transition-colors duration-300 group-hover:text-signal-bright">{term}</p>
    {meta && <p className="mt-1 text-sm leading-snug text-muted-foreground">{meta}</p>}
  </div>
);

const Row = ({ term, meta, children }: { term: string; meta?: string; children: ReactNode }) => (
  <div className={cn(rowGrid, "sm:grid-cols-[15rem_1fr]")}>
    <RowTerm term={term} meta={meta} />
    <div className="text-[0.9375rem] leading-[1.7] text-muted-foreground">{children}</div>
  </div>
);

const Tools = ({ items }: { items?: string[] }) =>
  items?.length ? <p className="mt-1.5 text-sm text-foreground/75">{items.join(" · ")}</p> : null;

const EntryRow = ({ card, onNavigate }: { card: DetailCard; onNavigate?: (id: ServiceId) => void }) => {
  if (card.link && onNavigate) {
    const link = card.link;
    return (
      <button
        type="button"
        onClick={() => onNavigate(link)}
        className={cn(rowGrid, "group w-full items-center text-left sm:grid-cols-[15rem_1fr_auto]")}
      >
        <RowTerm term={card.name} meta={card.meta} />
        <div className="text-[0.9375rem] leading-[1.7] text-muted-foreground">
          {card.body}
          <Tools items={card.chips} />
        </div>
        <span className="hidden text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground sm:block">→</span>
      </button>
    );
  }
  return (
    <Row term={card.name} meta={card.meta}>
      {card.body}
      <Tools items={card.chips} />
    </Row>
  );
};

const Tabs = ({ block }: { block: Extract<DetailBlock, { kind: "tabs" }> }) => {
  const [active, setActive] = useState(0);
  return (
    <Section title={block.title}>
      <div role="tablist" className="mb-2 flex gap-6 border-b border-border sm:gap-10">
        {block.tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "-mb-px border-b-2 pb-3 text-left transition-colors duration-300",
              i === active ? "border-signal text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="block font-display text-base">{tab.label}</span>
            <span className="mt-0.5 hidden text-xs text-muted-foreground sm:block">{tab.sub}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          role="tabpanel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: softEase }}
        >
          {block.tabs[active].rows.map(([term, desc]) => (
            <Row key={term} term={term}>{desc}</Row>
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

const Block = ({ block, onNavigate, flat }: { block: DetailBlock; onNavigate?: (id: ServiceId) => void; flat?: boolean }) => {
  switch (block.kind) {
    case "lead":
      return <p className="max-w-3xl text-lg leading-[1.6] text-foreground sm:text-xl">{block.body}</p>;
    case "para":
      return <p className="max-w-2xl text-base leading-[1.75] text-foreground/85">{block.body}</p>;
    case "callout":
      return (
        <p className={cn("max-w-2xl text-base leading-[1.75] text-muted-foreground", block.tone === "warn" && "border-l-2 border-signal pl-5")}>
          <span className="font-medium text-foreground">{block.title}</span> {block.body}
        </p>
      );
    case "bullets": {
      const list = (
        <ul>
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 border-b border-border/60 py-3 text-[0.9375rem] leading-[1.65] text-foreground/85 last:border-b-0">
              <span className="text-signal-bright">–</span>
              {item}
            </li>
          ))}
        </ul>
      );
      return block.title ? <Section title={block.title}>{list}</Section> : list;
    }
    case "checks":
      return (
        <Section title={block.title}>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {block.items.map((item) => (
              <li key={item} className="flex gap-3 border-b border-border/60 py-3 text-[0.9375rem] leading-[1.6] text-foreground/85">
                <span className="text-signal-bright">–</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>
      );
    case "table":
      return (
        <Section title={block.title ?? ""}>
          {block.rows.map(([term, desc]) => (
            <Row key={term} term={term}>{desc}</Row>
          ))}
        </Section>
      );
    case "stack":
      return (
        <Section title={block.title}>
          {block.layers.map(([layer, what]) => (
            <Row key={layer} term={layer}>{what}</Row>
          ))}
        </Section>
      );
    case "cards":
      return (
        <Section title={block.title}>
          {block.items.map((card) => (
            <EntryRow key={card.name} card={card} onNavigate={onNavigate} />
          ))}
        </Section>
      );
    case "catalog":
      return (
        <Section title={block.title}>
          {block.groups.map((group) => (
            <Row key={group.label} term={group.label}>
              {group.body}
              <Tools items={group.items} />
            </Row>
          ))}
        </Section>
      );
    case "tabs":
      // Flat: every tab's rows, one after another, for the copy that sits in the page markup.
      return flat ? (
        <>
          {block.tabs.map((tab) => (
            <Section key={tab.label} title={`${block.title}: ${tab.label} (${tab.sub})`}>
              {tab.rows.map(([term, desc]) => (
                <Row key={term} term={term}>{desc}</Row>
              ))}
            </Section>
          ))}
        </>
      ) : (
        <Tabs block={block} />
      );
    case "compare":
      if (block.tone === "tradeoff") {
        return (
          <Section title={block.title}>
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
              {[0, 1].map((col) => (
                <div key={col}>
                  <p className="pb-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">{block.labels[col]}</p>
                  <ul>
                    {block.rows.map((row) => (
                      <li key={row[col]} className="flex gap-3 border-t border-border/60 py-3 text-[0.9375rem] leading-[1.55] text-foreground/85">
                        <span className={cn("w-3 shrink-0 font-display", col === 0 ? "text-signal-bright" : "text-muted-foreground")}>
                          {col === 0 ? "+" : "−"}
                        </span>
                        {row[col]}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        );
      }
      return (
        <Section title={block.title}>
          <div className="hidden grid-cols-2 gap-8 pb-2 text-xs uppercase tracking-[0.12em] sm:grid">
            <span className="text-muted-foreground">{block.labels[0]}</span>
            <span className="text-signal-bright">{block.labels[1]}</span>
          </div>
          {block.rows.map(([before, after]) => (
            <div key={before} className="grid gap-1 border-t border-border/60 py-3.5 sm:grid-cols-2 sm:gap-8">
              <p className="text-[0.9375rem] leading-[1.6] text-muted-foreground">{before}</p>
              <p className="text-[0.9375rem] leading-[1.6] text-foreground">
                <span className="text-signal-bright sm:hidden">→ </span>
                {after}
              </p>
            </div>
          ))}
        </Section>
      );
    case "note":
      return null;
  }
};

/**
 * A window's full text without the window: every block, every tab. The home page keeps a
 * copy of all windows in its markup (hidden, see Offer) so search engines and AI assistants
 * read what visitors get by opening them.
 */
export const ServiceDetailText = ({ detail }: { detail: ServiceDetail }) => (
  <section>
    <h3>{detail.title}</h3>
    <p>{detail.kicker}</p>
    {detail.blocks.map((block, index) => (
      <Block key={index} block={block} flat />
    ))}
  </section>
);

type ServiceModalProps = {
  detail: ServiceDetail | null;
  onClose: () => void;
  /** Lets an entry inside one window open another service's window in place. */
  onNavigate?: (id: ServiceId) => void;
  ctaLabel: string;
};

export const ServiceModal = ({ detail, onClose, onNavigate, ctaLabel }: ServiceModalProps) => {
  const [shown, setShown] = useState(detail);

  useEffect(() => {
    if (detail) setShown(detail);
  }, [detail]);

  const open = detail !== null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <AnimatePresence>
        {open && shown && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                onClick={onClose}
                data-testid="service-modal-backdrop"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="fixed inset-0 z-[60] bg-ink/85 backdrop-blur-md"
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content forceMount className="fixed inset-x-3 top-1/2 z-[70] mx-auto max-h-[88svh] w-auto max-w-[56rem] -translate-y-1/2 focus:outline-none sm:inset-x-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={{ duration: 0.45, ease: softEase }}
                className="flex max-h-[88svh] w-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-background shadow-[0_36px_100px_-28px_rgba(0,0,0,0.95)]"
              >
                <header className="relative shrink-0 border-b border-border px-6 py-6 sm:px-10 sm:py-8">
                  <p className="mb-3 pr-12 text-sm text-muted-foreground">
                    <span className="font-display text-signal-bright">{shown.code}</span>
                    <span className="mx-2 text-border">/</span>
                    {shown.kicker}
                  </p>
                  <DialogPrimitive.Title className="pr-12 font-display text-2xl font-light leading-tight text-balance sm:text-3xl">{shown.title}</DialogPrimitive.Title>
                  <DialogPrimitive.Description className="sr-only">{shown.kicker}</DialogPrimitive.Description>
                  <DialogPrimitive.Close className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors duration-300 hover:bg-card hover:text-foreground sm:right-6 sm:top-6" aria-label="Close">
                    <X className="h-5 w-5" strokeWidth={1.5} />
                  </DialogPrimitive.Close>
                </header>

                {/* Keyed by service so moving from A to A1 starts the new window at the top. */}
                <div key={shown.code} className="space-y-12 overflow-y-auto overscroll-contain px-6 py-8 sm:px-10 sm:py-10">
                  {shown.blocks.map((block, index) => <Block key={index} block={block} onNavigate={onNavigate} />)}
                </div>

                <footer className="flex shrink-0 justify-end border-t border-border px-6 py-4 sm:px-10">
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="group inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm text-bone transition-colors duration-300 hover:bg-signal-deep"
                  >
                    {ctaLabel}
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </a>
                </footer>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
};
