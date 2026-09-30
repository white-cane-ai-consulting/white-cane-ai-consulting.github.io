import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";
import { Tile, stack, type Glyph } from "@/components/site/ToolGalaxy";

type Floater = { x: number; y: number; z: number; size: number; seed: number; glyph: Glyph };
type Rect = { x: number; y: number; w: number; h: number };
type Area = { w: number; h: number; avoid: { cx: number; cy: number; rx: number; ry: number } | null; text: Rect | null };

const NEAR = 120;
const FAR = -520;

const rand = (n: number) => {
  const x = Math.sin(n * 91.7 + 13.3) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Jittered grid: one chance per cell, nudged randomly inside it and sometimes left empty, so the tiles cover the
 * whole section evenly without reading as a grid. Cells inside the galaxy's orbits are skipped.
 */
const layout = ({ w, h, avoid, text }: Area, compact: boolean): Floater[] => {
  const cols = compact ? 4 : 9;
  const rows = Math.max(1, Math.round(h / (w / cols)));
  const out: Floater[] = [];
  let n = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      n++;
      const x = (c + 0.12 + rand(n) * 0.76) * (w / cols);
      const y = (r + 0.12 + rand(n + 500) * 0.76) * (h / rows);
      if (avoid && ((x - avoid.cx) / avoid.rx) ** 2 + ((y - avoid.cy) / avoid.ry) ** 2 < 1) continue;
      // Tiles behind the heading show between the letters and hurt reading, so keep them clear of it (plus drift room).
      if (text && x > text.x - 50 && x < text.x + text.w + 50 && y > text.y - 50 && y < text.y + text.h + 50) continue;
      if (rand(n + 900) < 0.1) continue;
      out.push({
        x,
        y,
        z: FAR + rand(n + 1300) * (NEAR - FAR),
        size: Math.round((compact ? 30 : 40) + rand(n + 1700) * (compact ? 16 : 30)),
        seed: rand(n + 2100),
        // 7 is coprime with the list length, so neighbouring tiles never repeat an app.
        glyph: stack[(n * 7) % stack.length],
      });
    }
  }
  return out;
};

const easeOut = (p: number) => 1 - Math.pow(1 - Math.min(1, p), 3);

/** App tiles drifting in 3D across the whole section, behind its content. Purely decorative. */
export const FloatingApps = ({
  sectionRef,
  avoidRef,
  textRef,
}: {
  sectionRef: RefObject<HTMLElement>;
  avoidRef: RefObject<HTMLElement>;
  textRef: RefObject<HTMLElement>;
}) => {
  const reduceMotion = useReducedMotion();
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const [area, setArea] = useState<Area>({ w: 0, h: 0, avoid: null, text: null });
  const [started, setStarted] = useState(false);
  const visible = useRef(true);

  // A passive effect, not a layout one: the section and galaxy refs belong to the parent and are only attached after this child commits.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const measure = () => {
      const s = section.getBoundingClientRect();
      const g = avoidRef.current?.getBoundingClientRect();
      const tx = textRef.current?.getBoundingClientRect();
      setArea({
        w: s.width,
        h: s.height,
        avoid: g ? { cx: g.left - s.left + g.width / 2, cy: g.top - s.top + g.height / 2, rx: g.width * 0.36, ry: g.height * 0.4 } : null,
        text: tx ? { x: tx.left - s.left, y: tx.top - s.top, w: tx.width, h: tx.height } : null,
      });
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    if (avoidRef.current) ro.observe(avoidRef.current);
    if (textRef.current) ro.observe(textRef.current);
    return () => ro.disconnect();
  }, [sectionRef, avoidRef, textRef]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (entry.intersectionRatio > 0.08) setStarted(true);
      },
      { threshold: [0, 0.08] },
    );
    io.observe(section);
    return () => io.disconnect();
  }, [sectionRef]);

  const compact = area.w > 0 && area.w < 640;
  const floaters = useMemo(() => (area.w ? layout(area, compact) : []), [area, compact]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!started || !section || floaters.length === 0) return;
    const start = performance.now();

    const frame = (now: number) => {
      const t = reduceMotion ? 0 : (now - start) / 1000;
      const appear = reduceMotion ? 1 : easeOut((now - start) / 1600);
      const rect = section.getBoundingClientRect();
      // Distance of the section's centre from the viewport's centre drives the scroll parallax.
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;

      floaters.forEach((f, i) => {
        const node = nodes.current[i];
        if (!node) return;
        const depth = (f.z - FAR) / (NEAR - FAR); // 0 far … 1 near
        const x = f.x + Math.sin(t * 0.18 + f.seed * 40) * 18;
        const y =
          f.y -
          (reduceMotion ? 0 : offset * (0.04 + depth * 0.2)) +
          Math.cos(t * 0.22 + f.seed * 30) * 14 +
          (1 - appear) * 80 * (0.3 + depth);
        const yaw = Math.sin(t * 0.25 + f.seed * 20) * 38 + (f.seed - 0.5) * 30;
        const pitch = Math.cos(t * 0.2 + f.seed * 10) * 26 + 8;
        const roll = Math.sin(t * 0.15 + f.seed * 5) * 12;
        node.style.transform =
          `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) perspective(900px) translateZ(${f.z.toFixed(0)}px) ` +
          `rotateY(${yaw.toFixed(2)}deg) rotateX(${pitch.toFixed(2)}deg) rotateZ(${roll.toFixed(2)}deg)`;
        // Kept in the background: even the nearest tile never gets fully bright.
        node.style.setProperty("--fog", (1 - (0.2 + depth * 0.45) * appear).toFixed(3));
      });
    };

    if (reduceMotion) {
      frame(performance.now());
      return;
    }
    let raf = 0;
    const loop = (now: number) => {
      if (visible.current) frame(now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [started, floaters, reduceMotion, sectionRef]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {floaters.map((f, i) => (
        <div
          key={`${compact}-${i}`}
          ref={(n) => (nodes.current[i] = n)}
          className="absolute left-0 top-0 will-change-transform"
          style={{ transformStyle: "preserve-3d", visibility: started ? "visible" : "hidden" }}
        >
          <Tile glyph={f.glyph} size={f.size} />
        </div>
      ))}
    </div>
  );
};
