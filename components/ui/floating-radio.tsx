"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";

/**
 * Botão flutuante que se ancora abaixo de um elemento (por padrão, <header>).
 * Evita sobreposição com o logo no mobile e ajusta ao redimensionar.
 */
type Props = {
  name?: string;
  src?: string; // opcional — senão usa a env
  anchorSelector?: string; // seletor do elemento que define a "altura do topo" (default: 'header')
  anchorOffset?: number; // px extras abaixo do anchor (default: 8)
  className?: string;
};

export default function FloatingRadio({
  name = "Atitude Gospel Rock",
  src,
  anchorSelector = "header",
  anchorOffset = 8,
  className = "",
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState<number>(() => {
    if (typeof window === "undefined") return 0.9;
    const saved = localStorage.getItem("radio:volume");
    return saved ? Number(saved) : 0.9;
  });

  // Top dinâmico (em px) baseado na altura do header
  const [topPx, setTopPx] = useState<number>(16);

  const stream = src || process.env.NEXT_PUBLIC_RADIO_STREAM_URL || "";

  // ====== posicionamento automático abaixo do Header ======
  useEffect(() => {
    if (typeof window === "undefined") return;

    const computeTop = () => {
      const anchor = document.querySelector<HTMLElement>(anchorSelector);
      if (!anchor) {
        setTopPx(16); // fallback
        return;
      }
      const rect = anchor.getBoundingClientRect();
      // Se header é fixed no topo, o “bottom” dele é a altura.
      const h = rect.bottom;
      setTopPx(Math.max(0, Math.round(h + anchorOffset)));
    };

    computeTop();

    const anchor = document.querySelector<HTMLElement>(anchorSelector);
    let ro: ResizeObserver | null = null;
    if (anchor && "ResizeObserver" in window) {
      ro = new ResizeObserver(() => computeTop());
      ro.observe(anchor);
    }

    // Recalcula em mudanças de viewport/orientação
    const onResize = () => computeTop();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (ro && anchor) ro.unobserve(anchor);
    };
  }, [anchorSelector, anchorOffset]);

  // ====== áudio ======
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    try {
      localStorage.setItem("radio:volume", String(volume));
    } catch {}
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (!isPlaying) {
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch {
      // autoplay é bloqueado até interação — o botão já é interação
    }
  };

  return (
    <div
      className={[
        "fixed z-[70] select-none", // acima do header e do menu
        className,
      ].join(" ")}
      style={{
        // respeita o notch/safe-area e fica colado à esquerda
        left: "max(0.5rem, env(safe-area-inset-left))",
        // top = altura do header + offset + safe-area-top
        top: `calc(${topPx}px + env(safe-area-inset-top))`,
      }}
    >
      {/* Botão compacto — sempre visível */}
      <div className="pointer-events-auto">
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="
            inline-flex items-center gap-2 rounded-full
            border border-white/10 bg-white/10 backdrop-blur
            px-3 py-2 text-xs font-medium text-foreground
            shadow-md ring-1 ring-inset ring-white/10
            hover:bg-white/15 transition
            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
          "
          aria-expanded={isOpen}
          aria-controls="floating-radio-panel"
          aria-label={
            isOpen ? "Fechar controles da rádio" : "Abrir controles da rádio"
          }
        >
          <span
            className="h-2 w-2 rounded-full bg-emerald-400/90"
            aria-hidden
          />
          {/* No mobile fica curto: só “Rádio”; no >=sm mostra o nome */}
          <span className="hidden sm:inline truncate max-w-[10rem] opacity-90">
            {name}
          </span>
          <span className="sm:hidden">Rádio</span>
        </button>
      </div>

      {/* Painel expansível */}
      <div
        id="floating-radio-panel"
        className={`
          mt-2 overflow-hidden rounded-xl
          border border-white/10 bg-white/5 backdrop-blur
          ring-1 ring-inset ring-white/10 shadow-lg
          transition-[max-height,opacity] duration-200
          ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
        `}
        aria-hidden={!isOpen}
      >
        <div className="p-3">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-xs font-medium ring-1 ring-white/15 hover:bg-white/10 transition"
              aria-label={isPlaying ? "Pausar rádio" : "Tocar rádio"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? "Pausar" : "Tocar"}
            </button>

            <button
              onClick={() => setIsMuted((m) => !m)}
              className="inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-xs ring-1 ring-white/15 hover:bg-white/10 transition"
              aria-label={isMuted ? "Ativar som" : "Mutar"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span className="hidden sm:inline">
                {isMuted ? "Desmutar" : "Mutar"}
              </span>
            </button>
          </div>

          {/* Slider de volume (aparece >= sm) */}
          <div className="mt-3 hidden sm:flex items-center gap-3">
            <span className="text-[11px] opacity-70 w-10">Volume</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const v = Number(e.target.value);
                setVolume(v);
                if (v > 0 && isMuted) setIsMuted(false);
              }}
              className="w-40 accent-white/80"
              aria-label="Volume"
            />
          </div>

          <audio
            ref={audioRef}
            preload="none"
            crossOrigin="anonymous"
            onError={() => setIsPlaying(false)}
          >
            {stream ? <source src={stream} /> : null}
          </audio>
        </div>
      </div>
    </div>
  );
}
