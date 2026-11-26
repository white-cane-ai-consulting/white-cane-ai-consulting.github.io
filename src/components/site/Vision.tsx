import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FileSignature, KeyRound, Landmark, PackageCheck, ScrollText, ShieldCheck, type LucideIcon } from "lucide-react";
import vision from "@/assets/vision.jpg";
import teamPhoto from "@/assets/team_photo.jpg";
import aiPhoto from "@/assets/ai_crop_photo_new.png";
import conferencePhoto from "@/assets/confrence_photo_new.avif";
import { useLanguage } from "@/contexts/LanguageContext";

const ease = [0.16, 1, 0.3, 1] as const;
// Backgrounds that cross-fade behind the section, in this order.
const backgrounds = [vision, aiPhoto, teamPhoto, conferencePhoto];
const BACKGROUND_MS = 6000;
const CYCLE_MS = BACKGROUND_MS * backgrounds.length;
// One icon per rule, in the order of `vision.items` in translations.ts:
// NDA, access, GDPR, AI use policy, AI Act training, ownership.
const icons: LucideIcon[] = [FileSignature, KeyRound, ShieldCheck, ScrollText, Landmark, PackageCheck];

/** "Our standards": the rules that hold for the client's data and work on every project, as one compact plate. */
export const Vision = () => {
  const { t } = useLanguage();
  const v = t.vision;

  const ref = useRef<HTMLDivElement>(null);
  // Counts photo changes: `step % n` is the photo on show, `step / n` the pass through all of them.
  const [step, setStep] = useState(0);
  const active = step % backgrounds.length;
  const cycle = Math.floor(step / backgrounds.length);
  // False on the server and for reduced motion: then the photos stay put and the progress line is not drawn.
  const [rotating, setRotating] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Read in an effect, never during render, so the prerendered markup matches on hydration.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setRotating(true);
    const id = setInterval(() => setStep((s) => s + 1), BACKGROUND_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="standards" ref={ref} className="relative py-28 md:py-36 bg-ink overflow-hidden border-t border-border/50">
      <motion.div style={{ y }} className="absolute inset-0" aria-hidden="true">
        {backgrounds.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{ opacity: i === active ? 0.3 : 0 }}
            transition={{ duration: 1.6, ease }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
      </motion.div>

      <div className="container relative z-10">
        <div className="flex items-center gap-3 mb-12">
          <span aria-hidden="true" className="h-px w-8 bg-signal-bright" />
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{v.label}</span>
        </div>

        <div className="grid md:grid-cols-12 gap-x-10 gap-y-6 items-end mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            className="md:col-span-7 font-display font-light text-4xl md:text-6xl leading-[1] text-balance"
          >
            {v.h2a}
            <br />
            <span className="italic text-signal-bright">{v.h2b}</span>
          </motion.h2>
        </div>

        {/* One plate split by hairlines: the 1px gap shows the border colour between the cells. */}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60">
          {v.items.map((item, i) => {
            const Icon = icons[i] ?? ShieldCheck;
            return (
              <li
                key={item}
                className="group flex items-center gap-5 bg-background/75 backdrop-blur-md px-6 py-6 md:px-7 md:py-7 transition-colors duration-500 hover:bg-background/90"
              >
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border/80 text-foreground/75 transition-colors duration-500 group-hover:border-signal-bright group-hover:text-signal-bright"
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                </span>
                <span className="font-display font-light text-lg md:text-xl leading-[1.25] text-balance">{item}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The section's bottom edge: fills once across all the photos, then starts over. */}
      {rotating && (
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-10 h-[2px] bg-border/40">
          <motion.div
            key={cycle}
            className="h-full origin-left bg-signal-bright"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
          />
        </div>
      )}
    </section>
  );
};
