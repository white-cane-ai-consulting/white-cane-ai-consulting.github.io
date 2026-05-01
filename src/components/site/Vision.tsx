import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import vision from "@/assets/vision.jpg";

const ease = [0.6, 0.05, 0.1, 1] as const;

const slides = [
  { k: "01 / Listen", t: "We start where the work happens.", d: "Two weeks inside your operations — calls, screenshares, shadowing. We measure where the friction actually lives." },
  { k: "02 / Map", t: "We draw the system as it is.", d: "A single, honest map of your workflows, data and tools. The first deliverable, every time." },
  { k: "03 / Choose", t: "We pick the smallest stack.", d: "From 400+ vetted tools, we recommend the few that fit. No hype, no kickbacks — just what works for your team." },
  { k: "04 / Ship", t: "We build it with you.", d: "Workflows live, copilots tuned, your people trained. We stay until adoption sticks — and then we stay a little longer." },
];

export const Vision = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, 4500);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <section id="vision" ref={ref} className="relative py-32 md:py-44 bg-ink overflow-hidden border-t border-border/50">
      {/* Parallax image */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={vision} alt="" loading="lazy" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </motion.div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-signal">04 —</span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">How we work</span>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease }}
              className="font-display font-light text-4xl md:text-6xl leading-[1] mb-8 text-balance"
            >
              A method,
              <br />
              <span className="italic">not a deck.</span>
            </motion.h2>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
              Every engagement runs through the same four-step rhythm. Slow at the start, sharp at the end.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className="w-12 h-12 border border-foreground/20 hover:border-signal hover:text-signal transition-colors flex items-center justify-center"
              >
                {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-px transition-all duration-500 ${i === active ? "w-12 bg-signal" : "w-6 bg-foreground/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-7 md:pl-8 md:border-l border-border/60 min-h-[340px] flex flex-col justify-end">
            {slides.map((s, i) => (
              <motion.div
                key={s.k}
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  y: i === active ? 0 : 20,
                  pointerEvents: i === active ? "auto" : "none",
                }}
                transition={{ duration: 0.8, ease }}
                className={`${i === active ? "relative" : "absolute"}`}
                style={i === active ? {} : { position: "absolute", inset: 0 }}
              >
                <div className="text-xs uppercase tracking-[0.3em] text-signal mb-6">{s.k}</div>
                <h3 className="font-display font-light text-3xl md:text-5xl leading-[1.05] mb-6 text-balance">
                  {s.t}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-lg">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
