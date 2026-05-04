import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const ease = [0.6, 0.05, 0.1, 1] as const;

export const Hero = () => {
  const { t, lang } = useLanguage();
  const fwdRef = useRef<HTMLVideoElement>(null);
  const revRef = useRef<HTMLVideoElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const marqueeCopy1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fwd = fwdRef.current;
    const rev = revRef.current;
    if (!fwd || !rev) return;

    const SPEED = 0.7;
    const FADE_MS = 500;
    const EARLY_S = 0.6;

    let switching = false;
    // track which video is currently the visible "top" one
    let topIsRev = false;

    const preBuffer = (el: HTMLVideoElement) => {
      el.currentTime = 0;
      el.play().then(() => el.pause()).catch(() => {});
    };

    // Instead of crossfading both simultaneously (which adds opacity),
    // we keep the current video at full opacity underneath and only
    // animate the top video in/out — no additive brightness spike.
    const switchTo = (next: HTMLVideoElement, prev: HTMLVideoElement) => {
      if (switching) return;
      switching = true;

      next.currentTime = 0;
      next.playbackRate = SPEED;
      next.play().catch(() => {});

      // Fade next in on top
      next.style.transition = `opacity ${FADE_MS}ms ease-in-out`;
      next.style.opacity = "0.7";

      setTimeout(() => {
        // Now next is fully visible — hide prev instantly (it's underneath, won't be seen)
        prev.style.transition = "none";
        prev.style.opacity = "0";
        prev.pause();
        preBuffer(prev);
        switching = false;
        topIsRev = !topIsRev;
      }, FADE_MS);
    };

    const onFwdTime = () => {
      if (!topIsRev && fwd.duration && fwd.currentTime >= fwd.duration - EARLY_S) {
        switchTo(rev, fwd);
      }
    };
    const onRevTime = () => {
      if (topIsRev && rev.duration && rev.currentTime >= rev.duration - EARLY_S) {
        switchTo(fwd, rev);
      }
    };

    fwd.addEventListener("timeupdate", onFwdTime);
    rev.addEventListener("timeupdate", onRevTime);

    preBuffer(rev);
    fwd.playbackRate = SPEED;
    fwd.play().catch(() => {});

    return () => {
      fwd.removeEventListener("timeupdate", onFwdTime);
      rev.removeEventListener("timeupdate", onRevTime);
      fwd.pause();
      rev.pause();
    };
  }, []);

  // Measure copy width; if it's shorter than the viewport, stamp extra copies so
  // the strip always fills the screen and the -copyWidth snap is invisible.
  useEffect(() => {
    const track = marqueeTrackRef.current;
    const copy1 = marqueeCopy1Ref.current;
    if (!track || !copy1) return;

    const update = () => {
      const w = copy1.offsetWidth;
      // Need at least ceil(viewportWidth / copyWidth) + 1 copies so there's
      // always content visible while the first copy is off-screen.
      const needed = Math.ceil(window.innerWidth / w) + 1;
      const current = track.children.length;
      for (let i = current; i < needed * 2; i++) {
        const clone = copy1.cloneNode(true) as HTMLElement;
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      }
      track.style.setProperty("--marquee-w", `${w}px`);
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(copy1);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, [t]);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden grain flex items-end pb-20 pt-32">
      {/* Background video with ping-pong playback */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease }}
        className="absolute inset-0"
      >
        <video
          ref={fwdRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        >
          <source src="/Interactive-video.mp4" type="video/mp4" />
        </video>
        <video
          ref={revRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          style={{ opacity: 0 }}
        >
          <source src="/Interactive-video-reverse.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />
      </motion.div>

      {/* Vertical side label */}
      <div className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 vert-text text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
        {t.hero.sideLabel}
      </div>

      {/* Side metric */}
      <div className="hidden lg:block absolute right-8 top-32 text-right">
        <div className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-2">{t.hero.sideMetricLabel}</div>
        <div className="font-display text-2xl">
          {t.hero.sideMetricValue}
        </div>
      </div>

      <div className="container relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="h-px w-12 bg-signal" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t.hero.eyebrow}
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className={`font-display font-light leading-[0.95] tracking-tight max-w-[12ch] text-balance ${lang === "GR" ? "text-[clamp(2rem,7vw,6rem)]" : "text-[clamp(3rem,11vw,12rem)]"}`}>
          {t.hero.lines.map((line, i) => {
            const parts = i === 2 ? line.split(t.hero.lineHighlight) : null;
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, skewY: 4 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 1.1, delay: 0.5 + i * 0.15, ease }}
                className="block"
              >
                {parts ? (
                  <>{parts[0]}<em className="not-italic text-signal font-normal">{t.hero.lineHighlight}</em>{parts[1]}</>
                ) : line}
              </motion.span>
            );
          })}
        </h1>

        {/* Sub */}
        <div className="mt-12 grid md:grid-cols-2 gap-10 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.35, ease }}
            className="flex items-end justify-start md:justify-end gap-4"
          >
            <a
              href="#offer"
              className="group inline-flex items-center gap- bg-bone text-ink px-7 py-4 text-xs uppercase tracking-[0.25em] font-medium hover:bg-signal hover:text-bone transition-colors duration-500"
            >
              {t.hero.cta}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 inset-x-0 border-t border-border/60 py-4 overflow-hidden">
        <div ref={marqueeTrackRef} className="marquee-track flex whitespace-nowrap text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {[0, 1].map((k) => (
            <div key={k} ref={k === 0 ? marqueeCopy1Ref : undefined} aria-hidden={k > 0 ? true : undefined} className="flex shrink-0 items-center">
              {t.hero.marquee.map((item, i) => (
                <span key={i} className={`px-6 ${i % 2 === 1 ? "text-signal" : ""}`}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
