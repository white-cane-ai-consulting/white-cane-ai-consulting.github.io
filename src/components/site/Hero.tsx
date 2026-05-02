import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const ease = [0.6, 0.05, 0.1, 1] as const;

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const SPEED = 0.7;
    const NEAR_END = 0.3;
    let goingBack = false;

    const goForward = () => {
      goingBack = false;
      video.playbackRate = SPEED;
      // retry play in case of transient AbortError
      const tryPlay = () => video.play().catch((e) => { if (e?.name === "AbortError") setTimeout(tryPlay, 50); });
      tryPlay();
      rafRef.current = requestAnimationFrame(monitor);
    };

    const goBackward = () => {
      if (goingBack) return;           // guard against double-trigger
      goingBack = true;
      video.pause();
      let lastTs: number | null = null;

      const backward = (ts: number) => {
        if (lastTs !== null) {
          video.currentTime = Math.max(0, video.currentTime - ((ts - lastTs) / 1000) * SPEED);
        }
        lastTs = ts;

        if (video.currentTime <= 0) {
          goForward();
          return;
        }
        rafRef.current = requestAnimationFrame(backward);
      };

      rafRef.current = requestAnimationFrame(backward);
    };

    const monitor = (_ts: number) => {
      if (!video.duration) { rafRef.current = requestAnimationFrame(monitor); return; }
      if (!goingBack && video.currentTime >= video.duration - NEAR_END) {
        goBackward();
        return;
      }
      rafRef.current = requestAnimationFrame(monitor);
    };

    video.addEventListener("ended", goBackward);   // hard failsafe
    video.playbackRate = SPEED;
    video.play().catch(() => {});
    rafRef.current = requestAnimationFrame(monitor);

    return () => {
      video.removeEventListener("ended", goBackward);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
          ref={videoRef}
          muted
          playsInline
          className="w-full h-full object-cover opacity-70"
        >
          <source src="/Interactive-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />
      </motion.div>


      {/* Vertical side label */}
      <div className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 vert-text text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
        EST. 2026 — Clarity Engineered
      </div>

      {/* Side metric */}
      <div className="hidden lg:block absolute right-8 top-32 text-right">
        <div className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-2">Currently</div>
        <div className="font-display text-2xl">
          <span className="text-signal">●</span> Onboarding Q3
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
            White Cane / AI Consulting
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display font-light text-[clamp(3rem,11vw,12rem)] leading-[0.85] tracking-tight max-w-[14ch] text-balance">
          {["Clarity", "in the era", "of AI."].map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80, skewY: 4 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 1.1, delay: 0.5 + i * 0.15, ease }}
              className="block"
            >
              {i === 2 ? (
                <>
                  of <em className="not-italic text-signal font-normal">AI</em>.
                </>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </h1>

        {/* Sub */}
        <div className="mt-12 grid md:grid-cols-2 gap-10 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md"
          >
            We help businesses cut through the noise — selecting, integrating, and operationalizing
            the right AI tools for the work that actually matters.
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
              Explore the Services
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 inset-x-0 border-t border-border/60 py-4 overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap gap-12 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Strategy", "● Tooling Audits", "Implementation", "● Training", "Workflow Design", "● Vendor Selection", "Governance", "● Continuous Care"].map(
              (t, i) => (
                <span key={`${k}-${i}`} className={i % 2 === 1 ? "text-signal" : ""}>{t}</span>
              )
            )
          )}
        </div>
      </div>
    </section>
  );
};
