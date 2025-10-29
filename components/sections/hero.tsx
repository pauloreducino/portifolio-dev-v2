"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

/* =========================
   CONFIG
========================== */

/** Lista de tags exibidas no fundo (pode adicionar à vontade) */
const TECH_TAGS: string[] = [
  "</>",
  "< />",
  "</ >", // variações visuais
  "HTML",
  "CSS",
  "JS",
  "TypeScript",
  "TS",
  "React",
  "Next.js",
  "Tailwind",
  "Node.js",
  "Vite",
  "SEO",
  "UX",
  "API",
  "REST",
  "JWT",
  "SSR",
  "ISR",
  "SPA",
  "PWA",
  "Zod",
  "Prisma",
  "Express",
  "Router",
  // WordPress stack
  "WordPress",
  "Elementor",
  "WooCommerce",
  "ACF",
  "Divi",
  // Analytics / SEO stack
  "GA4",
  "GTM",
  "GSC",
  "Schema",
  "Sitemap",
];

/** Paleta de cores por label (fallback para text-primary/40 se não mapeado) */
const COLOR_BY_TECH: Record<string, string> = {
  "</>": "text-zinc-300",
  "< />": "text-zinc-300",
  "</ >": "text-zinc-300",
  HTML: "text-orange-400",
  CSS: "text-sky-400",
  JS: "text-yellow-400",
  TypeScript: "text-blue-400",
  TS: "text-blue-400",
  React: "text-cyan-400",
  "Next.js": "text-zinc-300",
  Tailwind: "text-teal-400",
  "Node.js": "text-emerald-400",
  Vite: "text-fuchsia-400",
  SEO: "text-amber-300",
  UX: "text-pink-300",
  API: "text-indigo-300",
  REST: "text-indigo-300",
  JWT: "text-purple-300",
  Zod: "text-green-300",
  Prisma: "text-emerald-300",
  Express: "text-neutral-300",
  Router: "text-purple-300",
  SSR: "text-slate-300",
  ISR: "text-slate-300",
  SPA: "text-slate-300",
  PWA: "text-violet-300",
  WordPress: "text-blue-300",
  Elementor: "text-rose-300",
  WooCommerce: "text-fuchsia-300",
  ACF: "text-lime-300",
  Divi: "text-purple-300",
  GA4: "text-emerald-300",
  GTM: "text-cyan-300",
  GSC: "text-amber-300",
  Schema: "text-green-300",
  Sitemap: "text-sky-300",
};

/** Tamanhos fixos (não dinâmicos) para não serem podados pelo purge */
const SIZE_CLASSES = [
  "text-[12px]",
  "text-[14px]",
  "text-[16px]",
  "text-[18px]",
  "text-[20px]",
] as const;

type Layer = "back" | "mid" | "front";
type TagParticle = {
  label: string;
  left: string;
  top: string;
  delay: number;
  duration: number;
  sizeClass: (typeof SIZE_CLASSES)[number];
  layer: Layer;
  colorClass: string;
  rotate: number;
};

function getColor(label: string) {
  return COLOR_BY_TECH[label] ?? "text-primary/40";
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/** Gera N partículas distribuídas em camadas */
function generateTags(count = 56): TagParticle[] {
  const pick = <T,>(arr: readonly T[]) =>
    arr[Math.floor(Math.random() * arr.length)];
  const layers: Layer[] = ["back", "mid", "front"];

  return Array.from({ length: count }, () => {
    const layer = pick(layers);
    const baseDur = layer === "back" ? 9 : layer === "mid" ? 7 : 5;
    const label = pick(TECH_TAGS);
    return {
      label,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: baseDur + Math.random() * 4,
      sizeClass: pick(SIZE_CLASSES),
      layer,
      colorClass: getColor(label),
      rotate: -5 + Math.random() * 10,
    };
  });
}

function FloatingTechTagsBackground({
  count = 56,
  parallax = { back: 6, mid: 12, front: 18 },
  opacity = { back: 0.22, mid: 0.3, front: 0.4 },
  margin = 10, // margem mínima entre tags (px)
  useExclusionZone = true, // evita passar no centro do hero
}: {
  count?: number;
  parallax?: { back: number; mid: number; front: number };
  opacity?: { back: number; mid: number; front: number };
  margin?: number;
  useExclusionZone?: boolean;
}) {
  const reduced = usePrefersReducedMotion();

  // parallax do mouse
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

  // ====== geração sem overlap ======
  const tags = useMemo(() => {
    const W = typeof window !== "undefined" ? window.innerWidth : 1200;
    const H = typeof window !== "undefined" ? window.innerHeight : 800;

    // zona central a evitar (ajuste conforme seu layout)
    const exclusion = useExclusionZone
      ? { x: W * 0.2, y: H * 0.22, w: W * 0.6, h: H * 0.38 }
      : { x: -1, y: -1, w: 0, h: 0 };

    const pick = <T,>(arr: readonly T[]) =>
      arr[Math.floor(Math.random() * arr.length)];
    const layers: Layer[] = ["back", "mid", "front"];

    // helper: estima largura do texto (mono ~0.62 × fontSize)
    const estimateWidth = (label: string, fontPx: number) =>
      Math.max(12, Math.ceil(label.length * fontPx * 0.62));

    const rects: Array<{ x: number; y: number; w: number; h: number }> = [];
    const placed: TagParticle[] = [];

    for (let i = 0; i < count; i++) {
      const layer = pick(layers);
      const baseDur = layer === "back" ? 9 : layer === "mid" ? 7 : 5;
      const label = (TECH_TAGS as string[])[
        Math.floor(Math.random() * TECH_TAGS.length)
      ];
      const sizeClass = pick(SIZE_CLASSES);
      const fontPx = parseInt(sizeClass.match(/\d+/)?.[0] || "14", 10);
      const textW = estimateWidth(label, fontPx);
      const textH = Math.ceil(fontPx * 1.4); // altura aproximada da linha
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

        // checa colisão com exclusão central
        const hitExclusion =
          useExclusionZone &&
          !(
            candidate.x + candidate.w < exclusion.x ||
            candidate.x > exclusion.x + exclusion.w ||
            candidate.y + candidate.h < exclusion.y ||
            candidate.y > exclusion.y + exclusion.h
          );

        // checa colisão com já posicionadas
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
        // fallback: joga no fundo, opacidade menor (quase nunca acontece)
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
      {/* base */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      {/* camadas com parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: reduced ? 0 : smoothMouseX.get() * (parallax.back / 20),
          y: reduced ? 0 : smoothMouseY.get() * (parallax.back / 20),
        }}
      >
        {renderCloud(byLayer("back"), "back")}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          x: reduced ? 0 : smoothMouseX.get() * (parallax.mid / 15),
          y: reduced ? 0 : smoothMouseY.get() * (parallax.mid / 15),
        }}
      >
        {renderCloud(byLayer("mid"), "mid")}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          x: reduced ? 0 : smoothMouseX.get() * (parallax.front / 10),
          y: reduced ? 0 : smoothMouseY.get() * (parallax.front / 10),
        }}
      >
        {renderCloud(byLayer("front"), "front")}
      </motion.div>

      {/* vinheta */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/30 to-background" />
    </div>
  );
}

/* =========================
   HERO
========================== */

const skills = ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "SEO"];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Fundo animado com mais tags */}
      <FloatingTechTagsBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge com dot verdinho */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="secondary"
              className="mb-6 inline-flex items-center gap-2"
              aria-label="Status: disponível para novos projetos"
            >
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Disponível para novos projetos
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Desenvolvedor Frontend
            <br />
            <span className="text-gradient">Especialista em Performance</span>
          </motion.h1>

          {/* Avatar com leve "glitch" e anel pulsando */}
          <motion.div
            className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              initial={{
                x: 0,
                y: 0,
                scale: 1,
                filter: "hue-rotate(0deg) blur(0px)",
              }}
              animate={{
                x: [0, -5, 5, -3, 3, -2, 2, 0],
                y: [0, 3, -3, 2, -2, 1, -1, 0],
                scale: [1, 1.05, 0.95, 1.03, 0.97, 1.01, 0.99, 1],
                filter: [
                  "hue-rotate(0deg) blur(0px)",
                  "hue-rotate(90deg) blur(2px)",
                  "hue-rotate(-90deg) blur(2px)",
                  "hue-rotate(45deg) blur(1px)",
                  "hue-rotate(-45deg) blur(1px)",
                  "hue-rotate(20deg) blur(0.5px)",
                  "hue-rotate(-20deg) blur(0.5px)",
                  "hue-rotate(0deg) blur(0px)",
                ],
              }}
              transition={{
                duration: 2,
                times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/paulo-profile.webp"
                alt="Paulo Reducino"
                width={224}
                height={224}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.1, 1], opacity: [0, 0.5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
              }}
            />
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Mais de 5 anos criando interfaces modernas, acessíveis e de alta
            performance com React.js, Next.js e TypeScript. Especialista em SEO
            técnico e otimização de carregamento.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" asChild className="group">
              <a href="#contato">
                Fale Comigo
                <ArrowRight
                  className="ml-2 transition-transform group-hover:translate-x-1"
                  size={20}
                  aria-hidden="true"
                />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#projetos">Ver Projetos</a>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {["React.js", "Next.js", "TypeScript", "Tailwind CSS", "SEO"].map(
              (skill) => (
                <Badge key={skill} variant="outline" className="text-sm">
                  {skill}
                </Badge>
              )
            )}
          </motion.div>
        </div>
      </div>

      {/* indicador de scroll opcional */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
    </section>
  );
}
