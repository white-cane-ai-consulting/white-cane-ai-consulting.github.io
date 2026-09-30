import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  siAirtable, siAnthropic, siAsana, siBrevo, siCalendly, siClaude, siClickup, siCloudflare, siConfluence, siCursor,
  siDeepl, siDeepseek, siDocker, siElevenlabs, siFigma, siFramer, siGithub, siGithubcopilot, siGmail,
  siGoogleanalytics, siGooglecloud, siGoogledrive, siGooglegemini, siGooglesheets, siGrammarly, siHubspot,
  siHuggingface, siIntercom, siJira, siLangchain, siLoom, siMailchimp, siMake, siMeta, siMiro, siMistralai, siN8n,
  siNotion, siOllama, siPerplexity, siPostgresql, siPython, siQuickbooks, siQwen, siReplit, siSemrush, siShopify,
  siStripe, siSuno, siSupabase, siTrello, siVercel, siViber, siWebflow, siWhatsapp, siWindsurf, siWordpress, siXero,
  siZendesk,
} from "simple-icons";

export type Glyph = { name: string; path?: string; file?: string };

const si = (icon: { title: string; path: string }, name = icon.title): Glyph => ({ name, path: icon.path });
const local = (name: string, file: string): Glyph => ({ name, file: `/logos/${file}` });

/** Models and assistants: the innermost orbit. */
const models: Glyph[] = [
  si(siClaude), local("ChatGPT", "openai.svg"), si(siGooglegemini, "Gemini"), local("Copilot", "copilot.svg"),
  si(siMistralai, "Mistral"), si(siPerplexity), si(siDeepseek), si(siMeta, "Llama"), si(siAnthropic),
];

/** Builders, automation and media tools. */
const builders: Glyph[] = [
  si(siCursor), si(siGithubcopilot), si(siWindsurf), si(siReplit), local("Lovable", "lovable.svg"),
  local("Bolt", "bolt-new.svg"), si(siVercel), si(siSupabase), si(siN8n), si(siMake), si(siLangchain),
  si(siOllama), si(siHuggingface), si(siElevenlabs), local("Midjourney", "midjourney.svg"), si(siQwen),
];

/** The business software the tools get connected to. These float around the whole section (FloatingApps), not in an orbit. */
export const stack: Glyph[] = [
  si(siNotion), si(siAirtable), si(siHubspot), si(siGoogledrive), si(siGmail), si(siGooglesheets), si(siFigma),
  si(siDeepl), si(siGrammarly), si(siShopify), si(siWordpress), si(siStripe), si(siWhatsapp), si(siViber),
  si(siTrello), si(siAsana), si(siClickup), si(siMiro), si(siIntercom), si(siZendesk), si(siJira), si(siConfluence),
  si(siQuickbooks), si(siXero), si(siMailchimp), si(siBrevo), si(siGoogleanalytics), si(siSemrush), si(siWebflow),
  si(siFramer), si(siCalendly), si(siLoom), si(siSuno), si(siGithub), si(siPython), si(siDocker), si(siPostgresql),
  si(siGooglecloud), si(siCloudflare),
];

export const allGlyphs = [...models, ...builders, ...stack];
const galaxyToolNames = allGlyphs.map((g) => g.name);

type Item =
  | { kind: "tile"; glyph: Glyph; ring: number; angle: number; size: number; seed: number }
  | { kind: "word"; text: string; ring: number; angle: number; seed: number };

/**
 * r: on-screen radius as a fraction of the half-width/half-height, so each orbit is an ellipse that fits the box.
 * depth: how far the ring swings toward/away from the viewer, as a fraction of the half-width.
 * roll: tilt of the ring in the screen plane (radians), so the orbits cross instead of nesting like targets.
 */
type Ring = { r: number; speed: number; depth: number; roll: number };

const RINGS: Ring[] = [
  { r: 0.5, speed: 0.1, depth: 0.32, roll: -0.12 },
  { r: 0.74, speed: -0.065, depth: 0.45, roll: 0.08 },
  { r: 0.95, speed: 0.035, depth: 0.5, roll: 0 }, // words
];
const RINGS_COMPACT: Ring[] = [
  { r: 0.68, speed: 0.1, depth: 0.3, roll: -0.1 },
  { r: 0.94, speed: -0.065, depth: 0.42, roll: 0.06 },
];

const PERSPECTIVE = 1400;
const FAR_START = -1300; // tiles fly in from this deep behind the core
const BURST = 1.9;
const PAD = 34;

const spread = <T,>(list: T[], ring: number, offset = 0) =>
  list.map((value, i) => ({ value, ring, angle: offset + (i / list.length) * Math.PI * 2 }));

/** Small deterministic PRNG so every tile keeps its own wobble between renders. */
const seeded = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

const buildItems = (compact: boolean, words: string[]): Item[] => {
  const sizes = compact ? [42, 34] : [66, 54];
  const tiles = [
    ...spread(models, 0),
    ...spread(compact ? builders.filter((_, i) => i % 2 === 0) : builders, 1, 0.2),
  ].map<Item>(({ value, ring, angle }, i) => ({ kind: "tile", glyph: value, ring, angle, size: sizes[ring], seed: seeded(i + 1) }));

  if (compact) return tiles;
  return [
    ...tiles,
    ...spread(words, 2, 0.15).map<Item>(({ value, ring, angle }, i) => ({ kind: "word", text: value, ring, angle, seed: seeded(i + 99) })),
  ];
};

/** A few fixed specks of light behind the scene. */
const stars = (() => {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: 46 }, () => ({ x: rand() * 100, y: rand() * 100, s: rand() < 0.2 ? 2 : 1, o: 0.12 + rand() * 0.35 }));
})();

const easeOutExpo = (p: number) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p));

const GlyphIcon = ({ glyph, size }: { glyph: Glyph; size: number }) => {
  if (glyph.path) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
        <path d={glyph.path} />
      </svg>
    );
  }
  // Local logos come in their own colours; masking them keeps every icon in the same off-white.
  const mask: CSSProperties = {
    width: size,
    height: size,
    backgroundColor: "currentColor",
    WebkitMaskImage: `url(${glyph.file})`,
    maskImage: `url(${glyph.file})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };
  return <span style={mask} aria-hidden className="block" />;
};

const TILE_RADIUS = "26%";

/** One app as a floating slab: a lit front face with two darker layers behind it for thickness. */
export const Tile = ({ glyph, size, inner = false, onEnter, onLeave }: { glyph: Glyph; size: number; inner?: boolean; onEnter?: () => void; onLeave?: () => void }) => {
  const thickness = Math.round(size * 0.16);
  const face = (z: number): CSSProperties => ({
    width: size,
    height: size,
    left: -size / 2,
    top: -size / 2,
    borderRadius: TILE_RADIUS,
    transform: `translateZ(${z}px)`,
  });
  const edge: CSSProperties = { background: "hsl(0 0% 6%)", border: "1px solid hsl(var(--foreground) / 0.1)" };

  return (
    <>
      <div aria-hidden className="absolute" style={{ ...face(-thickness), ...edge }} />
      <div aria-hidden className="absolute" style={{ ...face(-thickness / 2), ...edge }} />
      <div
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        className="group absolute flex items-center justify-center text-foreground"
        style={{
          ...face(0),
          background: "linear-gradient(150deg, hsl(0 0% 20%), hsl(0 0% 10%) 55%, hsl(0 0% 7%))",
          border: `1px solid ${inner ? "hsl(var(--signal) / 0.5)" : "hsl(var(--foreground) / 0.16)"}`,
          boxShadow: "inset 0 1px 0 hsl(var(--foreground) / 0.2), 0 22px 34px -14px rgb(0 0 0 / 0.8)",
        }}
      >
        <GlyphIcon glyph={glyph} size={Math.round(size * 0.46)} />
        {/* Distance haze: the loop sets --fog per tile; a plain overlay keeps the 3D slab intact (opacity would flatten it). */}
        <span aria-hidden className="pointer-events-none absolute inset-[-1px] bg-background" style={{ borderRadius: TILE_RADIUS, opacity: "var(--fog, 0)" }} />
        <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 -translate-y-1 whitespace-nowrap font-display text-xs text-foreground opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          {glyph.name}
        </span>
      </div>
    </>
  );
};

export const ToolGalaxy = ({ words, label, children }: { words: string[]; label: string; children: ReactNode }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [started, setStarted] = useState(false);

  const compact = box.w > 0 && box.w < 640;
  const rings = compact ? RINGS_COMPACT : RINGS;
  const items = useRef<Item[]>([]);
  items.current = buildItems(compact, words);

  // Live values the animation loop reads without re-rendering React.
  const live = useRef({ phase: 0, speed: 1, hover: -1, inside: false, px: 0, py: 0, tx: 0, ty: 0, visible: true, start: 0, lift: [] as number[] });

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Burst out the first time the galaxy is properly on screen; after that only track visibility to pause the loop.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        live.current.visible = entry.isIntersecting;
        if (entry.intersectionRatio > 0.3) setStarted(true);
      },
      { threshold: [0, 0.3] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || box.w === 0) return;
    const s = live.current;
    if (!s.start) s.start = performance.now();

    const cx = box.w / 2;
    const cy = box.h / 2;
    const scaleBase = compact ? 1 : Math.min(1, Math.max(0.78, box.w / 1150));
    const deg = 180 / Math.PI;

    const frame = (now: number, dt: number) => {
      const elapsed = (now - s.start) / 1000;
      const t = reduceMotion ? 0 : elapsed;
      s.speed += ((s.inside ? 0.12 : 1) - s.speed) * Math.min(1, dt * 4);
      s.phase += dt * s.speed;
      s.tx += (s.px - s.tx) * Math.min(1, dt * 3);
      s.ty += (s.py - s.ty) * Math.min(1, dt * 3);

      if (worldRef.current) {
        worldRef.current.style.transform = `rotateX(${(-s.ty * 7).toFixed(2)}deg) rotateY(${(s.tx * 10).toFixed(2)}deg)`;
      }

      items.current.forEach((item, i) => {
        const node = itemRefs.current[i];
        if (!node) return;
        const ring = rings[item.ring];
        const delay = item.ring * 0.12 + (item.angle / (Math.PI * 2)) * 0.25;
        const burst = reduceMotion ? 1 : easeOutExpo(Math.max(0, (elapsed - delay) / BURST));
        // Spiral outward: each item starts a little behind its resting angle and swings into place.
        const angle = item.angle + (reduceMotion ? 0 : s.phase * ring.speed) - (1 - burst) * 1.2;
        const hovered = s.hover === i;
        const lift = (s.lift[i] = (s.lift[i] ?? 0) + ((hovered ? 1 : 0) - (s.lift[i] ?? 0)) * Math.min(1, dt * 10));

        // Near side of every orbit is the bottom of the ellipse, so it reads as a disc seen slightly from above.
        const depth = (Math.sin(angle) + 1) / 2;
        const bob = Math.sin(t * 0.9 + item.seed * 20) * 6;
        let x = Math.cos(angle) * ring.r * (cx - PAD) * burst;
        let y = Math.sin(angle) * ring.r * (cy - PAD) * burst + bob * burst;
        const z = Math.sin(angle) * ring.depth * Math.min(cx, 560) * burst + (1 - burst) * FAR_START + lift * 110;
        // Rotate the orbit in the screen plane, then pre-shrink x/y by the perspective factor so the projected
        // path stays on the ellipse inside the box while the tile itself still grows as it comes forward.
        [x, y] = [x * Math.cos(ring.roll) - y * Math.sin(ring.roll), x * Math.sin(ring.roll) + y * Math.cos(ring.roll)];
        const k = (PERSPECTIVE - z) / PERSPECTIVE;

        if (item.kind === "word") {
          node.style.transform = `translate3d(${(x * k).toFixed(1)}px, ${(y * k).toFixed(1)}px, ${z.toFixed(1)}px)`;
          node.style.opacity = ((0.2 + depth * 0.6) * Math.min(1, burst * 1.6)).toFixed(3);
          return;
        }

        const settle = 1 - lift;
        const yaw = (-Math.cos(angle) * 30 + Math.sin(t * 0.55 + item.seed * 30) * 16) * settle;
        const pitch = (14 + Math.sin(t * 0.7 + item.seed * 40) * 12) * settle;
        const roll = (Math.sin(t * 0.45 + item.seed * 50) * 8 - ring.roll * deg * 0.5) * settle;
        const scale = scaleBase * (1 + lift * 0.18);
        const fog = hovered ? 0 : 1 - (0.3 + depth * 0.7) * Math.min(1, burst * 1.4);

        node.style.transform =
          `translate3d(${(x * k).toFixed(1)}px, ${(y * k).toFixed(1)}px, ${z.toFixed(1)}px) ` +
          `rotateY(${yaw.toFixed(2)}deg) rotateX(${pitch.toFixed(2)}deg) rotateZ(${roll.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        node.style.setProperty("--fog", fog.toFixed(3));
      });
    };

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (s.visible) frame(now, dt);
      raf = requestAnimationFrame(loop);
    };

    if (reduceMotion) {
      frame(performance.now(), 0);
      return;
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [started, box.w, box.h, rings, compact, reduceMotion]);

  const finePointer = typeof window !== "undefined" && window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;

  const core = (
    <div className="pointer-events-none relative w-max text-center">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[210%] w-[160%] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(closest-side, hsl(var(--background)) 35%, hsl(var(--background) / 0.7) 60%, transparent)" }}
      />
      {children}
    </div>
  );
  // On phones the orbits pass too close to the centre, so the core sits flat on top instead of inside the 3D scene.
  const coreIn3d = box.w > 0 && !compact;

  return (
    <div
      ref={boxRef}
      role="img"
      aria-label={`${label}: ${galaxyToolNames.join(", ")}`}
      onPointerMove={(e) => {
        if (!finePointer) return;
        const r = e.currentTarget.getBoundingClientRect();
        live.current.px = ((e.clientX - r.left) / r.width - 0.5) * 2;
        live.current.py = ((e.clientY - r.top) / r.height - 0.5) * 2;
        live.current.inside = true;
      }}
      onPointerLeave={() => {
        Object.assign(live.current, { inside: false, px: 0, py: 0, hover: -1 });
      }}
      className="relative mx-auto aspect-[4/5] w-full max-w-[1200px] select-none sm:aspect-[4/3] lg:aspect-[16/9]"
    >
      {/* Starfield */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {stars.map((st, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-foreground"
            style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, opacity: st.o }}
          />
        ))}
      </div>

      {/* Core glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.6 }}
        animate={started ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-[15%] rounded-full"
        style={{ background: "radial-gradient(closest-side, hsl(var(--signal) / 0.16), hsl(var(--signal) / 0.04) 55%, transparent)" }}
      />

      {/* 3D scene. Nothing in this chain may set overflow or opacity, or the browser flattens it. */}
      <div className="absolute inset-0" style={{ perspective: PERSPECTIVE }}>
        <div ref={worldRef} className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
          {coreIn3d && <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">{core}</div>}

          {box.w > 0 &&
            items.current.map((item, i) => (
              <div
                key={`${compact}-${i}`}
                ref={(n) => (itemRefs.current[i] = n)}
                className="absolute left-0 top-0 will-change-transform"
                style={{ transformStyle: "preserve-3d", visibility: started ? "visible" : "hidden", ...(item.kind === "word" ? { opacity: 0 } : {}) }}
              >
                {item.kind === "tile" ? (
                  <Tile
                    glyph={item.glyph}
                    size={item.size}
                    inner={item.ring === 0}
                    onEnter={() => (live.current.hover = i)}
                    onLeave={() => live.current.hover === i && (live.current.hover = -1)}
                  />
                ) : (
                  <span className="pointer-events-none absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-sm text-muted-foreground">
                    {item.text}
                  </span>
                )}
              </div>
            ))}
        </div>
      </div>

      {!coreIn3d && <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">{core}</div>}
    </div>
  );
};
