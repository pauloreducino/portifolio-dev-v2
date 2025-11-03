"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo } from "react";
import { COLOR_BY_TECH, SIZE_CLASSES, TECH_TAGS } from "./_lib/tech-constants";
import { usePrefersReducedMotion } from "./_lib/use-prefers-reduced-motion";
import type { Layer, TagParticle } from "./_lib/types";
import { estimateTextWidth } from "./_lib/width";

function getColor(label: string) {
  return COLOR_BY_TECH[label] ?? "text-primary/40";
}

export function FloatingTechTagsBackground({
  count = 56,
  parallax = { back: 6, mid: 12, front: 18 },
  opacity = { back: 0.22, mid: 0.3, front: 0.4 },
  margin = 10,
  useExclusionZone = true,
}: {
  count?: number;
  parallax?: { back: number; mid: number; front: number };
  opacity?: { back: number; mid: number; front: number };
  margin?: number;
  useExclusionZone?: boolean;
}) {
  const reduced = usePrefersReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;
      mouseX.set(nx * 20);
      mouseY.set(ny * 20);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY, reduced]);

  const tags = useMemo(() => {
    const W = typeof window !== "undefined" ? window.innerWidth : 1200;
    const H = typeof window !== "undefined" ? window.innerHeight : 800;

    const exclusion = useExclusionZone
      ? { x: W * 0.2, y: H * 0.22, w: W * 0.6, h: H * 0.38 }
      : { x: -1, y: -1, w: 0, h: 0 };

    const pick = <T,>(arr: readonly T[]) =>
      arr[Math.floor(Math.random() * arr.length)];
    const layers: Layer[] = ["back", "mid", "front"];

    const rects: Array<{ x: number; y: number; w: number; h: number }> = [];
    const placed: TagParticle[] = [];

    for (let i = 0; i < count; i++) {
      const layer = pick(layers);
      const baseDur = layer === "back" ? 9 : layer === "mid" ? 7 : 5;
      const label = TECH_TAGS[Math.floor(Math.random() * TECH_TAGS.length)];
      const sizeClass = pick(SIZE_CLASSES);
      const fontPx = parseInt(sizeClass.match(/\d+/)?.[0] || "14", 10);
      const textW = estimateTextWidth(label, fontPx);
      const textH = Math.ceil(fontPx * 1.4);
      const pad = margin;

      let tries = 0;
      let ok = false;
      let px = 0,
        py = 0;

      while (tries < 25 && !ok) {
        px = Math.random() * (W - textW - pad * 2) + pad;
        py = Math.random() * (H - textH - pad * 2) + pad;
        const candidate = {
          x: px - pad,
          y: py - pad,
          w: textW + pad * 2,
          h: textH + pad * 2,
        };

        const hitExclusion =
          useExclusionZone &&
          !(
            candidate.x + candidate.w < exclusion.x ||
            candidate.x > exclusion.x + exclusion.w ||
            candidate.y + candidate.h < exclusion.y ||
            candidate.y > exclusion.y + exclusion.h
          );

        let collide = false;
        if (!hitExclusion) {
          for (let r of rects) {
            if (
              !(
                candidate.x + candidate.w < r.x ||
                candidate.x > r.x + r.w ||
                candidate.y + candidate.h < r.y ||
                candidate.y > r.y + r.h
              )
            ) {
              collide = true;
              break;
            }
          }
        }

        ok = !hitExclusion && !collide;
        tries++;
      }

      if (ok) {
        rects.push({
          x: px - pad,
          y: py - pad,
          w: textW + pad * 2,
          h: textH + pad * 2,
        });
        placed.push({
          label,
          left: `${(px / W) * 100}%`,
          top: `${(py / H) * 100}%`,
          delay: Math.random() * 5,
          duration: baseDur + Math.random() * 4,
          sizeClass,
          layer,
          colorClass: getColor(label),
          rotate: -5 + Math.random() * 10,
        });
      } else {
        placed.push({
          label,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          delay: Math.random() * 5,
          duration: baseDur + Math.random() * 4,
          sizeClass,
          layer: "back",
          colorClass: getColor(label),
          rotate: -3 + Math.random() * 6,
        });
      }
    }
    return placed;
  }, [count, margin, useExclusionZone]);

  const byLayer = (l: Layer) => tags.filter((t) => t.layer === l);

  const renderCloud = (data: TagParticle[], layer: Layer) =>
    data.map((t, i) => (
      <motion.span
        key={`${layer}-${i}-${t.left}-${t.top}`}
        className={[
          "absolute select-none font-mono font-semibold whitespace-nowrap",
          t.sizeClass,
          t.colorClass,
        ].join(" ")}
        style={{
          left: t.left,
          top: t.top,
          opacity: opacity[layer],
          filter: "drop-shadow(0 1px 0.5px rgba(0,0,0,0.15))",
        }}
        initial={
          reduced ? { opacity: opacity[layer] } : { opacity: 0, rotate: 0 }
        }
        animate={
          reduced
            ? { opacity: opacity[layer] }
            : {
                y: [0, -20, 0],
                opacity: [
                  0,
                  opacity[layer],
                  opacity[layer] * 0.8,
                  opacity[layer],
                ],
                rotate: [0, t.rotate, -t.rotate, 0],
              }
        }
        transition={
          reduced
            ? { duration: 0 }
            : {
                duration: t.duration,
                delay: t.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        aria-hidden="true"
      >
        {t.label}
      </motion.span>
    ));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      <motion.div
        className="absolute inset-0"
        style={{
          x: reduced
            ? 0
            : (smoothMouseX.get() as number) * (parallax.back / 20),
          y: reduced
            ? 0
            : (smoothMouseY.get() as number) * (parallax.back / 20),
        }}
      >
        {renderCloud(byLayer("back"), "back")}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          x: reduced ? 0 : (smoothMouseX.get() as number) * (parallax.mid / 15),
          y: reduced ? 0 : (smoothMouseY.get() as number) * (parallax.mid / 15),
        }}
      >
        {renderCloud(byLayer("mid"), "mid")}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          x: reduced
            ? 0
            : (smoothMouseX.get() as number) * (parallax.front / 10),
          y: reduced
            ? 0
            : (smoothMouseY.get() as number) * (parallax.front / 10),
        }}
      >
        {renderCloud(byLayer("front"), "front")}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/30 to-background" />
    </div>
  );
}
