import { useRef, useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { motion } from "framer-motion";
import { Check, Info, X } from "lucide-react";

const softEase = [0.16, 1, 0.3, 1] as const;

export type RetainerDetail = {
  readonly code: string;
  readonly tierName: string;
  readonly label: string;
  readonly price: string;
  readonly per: string;
  readonly hours: string;
  readonly features: readonly string[];
};

type RetainerPopoverProps = {
  detail: RetainerDetail;
  triggerLabel: string;
  title: string;
  hoursLabel: string;
  startNote: string;
  closeLabel: string;
};

/**
 * The retainer breakdown. Anchored to its own card's pill rather than centred on the
 * screen, so it never lands on top of the trigger, and it leaves the rest of the page
 * un-dimmed — it opens on hover and only stays put once clicked.
 */
export const RetainerPopover = ({
  detail, triggerLabel, title, hoursLabel, startNote, closeLabel,
}: RetainerPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };

  // A small grace period so the pointer can travel from the pill to the panel.
  const hide = () => {
    if (pinned) return;
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  const close = () => {
    clearTimeout(closeTimer.current);
    setPinned(false);
    setOpen(false);
  };

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(next) => (next ? show() : close())}
      modal={false}
    >
      <PopoverPrimitive.Trigger
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onClick={(event) => {
          // Hover already opened it on a mouse; the click is what pins it. On touch
          // there is no hover, so the first tap opens and pins in one go.
          event.preventDefault();
          if (open && pinned) close();
          else {
            setPinned(true);
            show();
          }
        }}
        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-signal/35 bg-signal/10 px-4 py-2 font-body text-xs text-signal transition-colors duration-300 hover:border-signal/60 hover:bg-signal/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal"
      >
        <Info className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
        {triggerLabel}
      </PopoverPrimitive.Trigger>

      {/* Kept permanently mounted — rather than added/removed via AnimatePresence — and
          shown by tweening `animate`. With mount/unmount, hovering off and back on before
          the exit animation (140ms grace + 280ms fade) finished raced a fresh mount
          against the still-exiting one; Framer Motion only plays the fade-in on a mount's
          `initial`, so the reused instance just snapped straight to visible. `aria-hidden`
          keeps it out of the accessibility tree (and out of `getByRole` queries) while
          closed, and `pointer-events: none` on Content itself — not just the panel inside
          it — keeps its floating box (positioned right above the trigger, so it overlaps
          whatever else is there, e.g. the price or the details toggle) from silently
          catching hover and reopening the panel; `inert` drops the close button from the
          tab order too. */}
      <PopoverPrimitive.Portal forceMount>
        <PopoverPrimitive.Content
          forceMount
          aria-hidden={!open}
          side="top"
          align="center"
          sideOffset={12}
          collisionPadding={16}
          avoidCollisions
          onOpenAutoFocus={(event) => event.preventDefault()}
          onMouseEnter={show}
          onMouseLeave={hide}
          style={{ pointerEvents: open ? "auto" : "none" }}
          // @ts-expect-error -- `inert` is a standard boolean HTML attribute not yet in
          // this React version's types; it keeps the closed panel's contents (the close
          // button) out of the tab order without touching each focusable child.
          inert={!open ? "" : undefined}
          className="z-[70] w-[min(22rem,calc(100vw-2rem))] focus:outline-none"
        >
          <motion.div
            initial={false}
            animate={open ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.28, ease: softEase }}
            className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-background/95 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            <header className="relative border-b border-border/60 px-5 py-4">
              <span className="mb-2 flex items-center gap-2 pr-8 text-[10px] font-semibold uppercase tracking-[0.14em] text-signal">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                {detail.code} / {detail.tierName}
              </span>
              <h4 className="pr-8 font-body text-lg font-light leading-snug text-balance">{title}</h4>
              <PopoverPrimitive.Close
                onClick={close}
                aria-label={closeLabel}
                className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-background/40 text-muted-foreground transition-colors duration-300 hover:bg-card hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </PopoverPrimitive.Close>
            </header>

            <div className="space-y-3 px-5 py-4">
              <dl className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-border/60 bg-card/35 px-3.5 py-2.5">
                  <dt className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground/80">{hoursLabel}</dt>
                  <dd className="mt-1 font-body text-base leading-none text-foreground">{detail.hours}</dd>
                </div>
                <div className="rounded-xl border border-signal/25 bg-signal/[0.07] px-3.5 py-2.5">
                  <dt className="truncate text-[10px] uppercase tracking-[0.1em] text-muted-foreground/80">{detail.label}</dt>
                  <dd className="mt-1 font-body text-base leading-none text-signal">
                    {detail.price}
                    <span className="text-xs text-muted-foreground">{detail.per}</span>
                  </dd>
                </div>
              </dl>

              <ul className="overflow-hidden rounded-xl border border-border/60 bg-card/25">
                {detail.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 border-b border-border/50 px-3.5 py-2.5 text-sm leading-[1.6] text-muted-foreground last:border-b-0"
                  >
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-signal/20 text-signal">
                      <Check className="h-2.5 w-2.5" strokeWidth={2.4} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <p className="text-[11px] font-light leading-[1.65] text-muted-foreground/70">{startNote}</p>
            </div>
          </motion.div>
          <PopoverPrimitive.Arrow className="fill-background/95" width={14} height={7} />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
