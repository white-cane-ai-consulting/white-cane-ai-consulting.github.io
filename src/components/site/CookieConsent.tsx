import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useConsent } from "@/contexts/ConsentContext";
import { useLanguage } from "@/contexts/LanguageContext";

const softEase = [0.16, 1, 0.3, 1] as const;

// Accept and decline share one style on purpose: the Greek DPA requires refusing
// to be as easy and as visible as accepting.
const choiceButton =
  "rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background";

/** Small note in the bottom corner, shown until the visitor answers. */
export const CookieBanner = () => {
  const { t } = useLanguage();
  const c = t.consent;
  const { consent, accept, reject, policyOpen, setPolicyOpen } = useConsent();
  // Let the hero settle before the note appears.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  const show = ready && consent === null && !policyOpen;

  return (
    <AnimatePresence>
      {show && (
        // From 2xl the note ends level with the hero's "Explore" button (hero sm:pb-20).
        // Narrower screens put the button under this corner, so there it sits just above it.
        <motion.div
          role="region"
          aria-label={c.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.45, ease: softEase }}
          className="fixed inset-x-3 bottom-6 z-[55] rounded-2xl border border-border/60 bg-background/60 p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:inset-x-auto sm:bottom-36 sm:right-6 sm:max-w-[25rem] 2xl:bottom-20"
        >
          <p className="text-sm leading-[1.65] text-muted-foreground">
            {c.banner}{" "}
            <button
              type="button"
              onClick={() => setPolicyOpen(true)}
              className="text-foreground underline decoration-border underline-offset-4 transition-colors duration-300 hover:decoration-foreground"
            >
              {c.policy}
            </button>
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={accept} className={choiceButton}>{c.accept}</button>
            <button type="button" onClick={reject} className={choiceButton}>{c.reject}</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/** The privacy and cookie policy, in the same window style as the service details. */
export const PrivacyModal = () => {
  const { t } = useLanguage();
  const c = t.consent;
  const { consent, accept, reject, policyOpen, setPolicyOpen } = useConsent();
  const close = () => setPolicyOpen(false);

  return (
    <DialogPrimitive.Root open={policyOpen} onOpenChange={setPolicyOpen}>
      <AnimatePresence>
        {policyOpen && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                onClick={close}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="fixed inset-0 z-[60] bg-ink/85 backdrop-blur-md"
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content forceMount className="fixed inset-x-3 top-1/2 z-[70] mx-auto max-h-[88svh] w-auto max-w-[46rem] -translate-y-1/2 focus:outline-none sm:inset-x-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={{ duration: 0.45, ease: softEase }}
                className="flex max-h-[88svh] w-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-background shadow-[0_36px_100px_-28px_rgba(0,0,0,0.95)]"
              >
                <header className="relative shrink-0 border-b border-border px-6 py-6 sm:px-10 sm:py-8">
                  <p className="mb-3 pr-12 text-sm text-muted-foreground">{c.updated}</p>
                  <DialogPrimitive.Title className="pr-12 font-display text-2xl font-light leading-tight sm:text-3xl">{c.title}</DialogPrimitive.Title>
                  <DialogPrimitive.Description className="sr-only">{c.intro}</DialogPrimitive.Description>
                  <DialogPrimitive.Close className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors duration-300 hover:bg-card hover:text-foreground sm:right-6 sm:top-6" aria-label={c.close}>
                    <X className="h-5 w-5" strokeWidth={1.5} />
                  </DialogPrimitive.Close>
                </header>

                <div className="overflow-y-auto overscroll-contain px-6 py-8 sm:px-10 sm:py-10">
                  <p className="mb-8 max-w-2xl text-base leading-[1.75] text-foreground/85">{c.intro}</p>
                  {c.sections.map(({ term, body }) => (
                    <div key={term} className="grid gap-1.5 border-t border-border/60 py-4 sm:grid-cols-[12rem_1fr] sm:gap-8">
                      <p className="font-display text-base leading-snug text-foreground">{term}</p>
                      <p className="text-[0.9375rem] leading-[1.7] text-muted-foreground">{body}</p>
                    </div>
                  ))}
                </div>

                <footer className="flex shrink-0 flex-col gap-3 border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-10">
                  <p className="text-sm text-muted-foreground">
                    {c.status}{" "}
                    <span className="text-foreground">{consent === "granted" ? c.on : c.off}</span>
                  </p>
                  <div className="flex gap-2">
                    <button type="button" onClick={accept} className={choiceButton}>{c.accept}</button>
                    <button type="button" onClick={reject} className={choiceButton}>{c.reject}</button>
                  </div>
                </footer>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
};
