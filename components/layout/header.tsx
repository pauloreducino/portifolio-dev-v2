"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Moon,
  Sun,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/theme-provider";

const navItems = [
  { href: "#sobre", label: "Sobre" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#projetos", label: "Projetos" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

// --- Chip compacto da rádio (usa env NEXT_PUBLIC_RADIO_STREAM_URL) ---
function RadioChip() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState<number>(() => {
    if (typeof window === "undefined") return 0.9;
    const saved = localStorage.getItem("radio:volume");
    return saved ? Number(saved) : 0.9;
  });

  const stream = process.env.NEXT_PUBLIC_RADIO_STREAM_URL || "";

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    try {
      localStorage.setItem("radio:volume", String(volume));
    } catch {}
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
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
    } catch {}
  };

  return (
    <div className="relative">
      {/* Botão principal (não altera o layout porque ficará absolute no header) */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          inline-flex items-center gap-2 rounded-full
          border border-border/60 bg-white/70 text-foreground
          dark:bg-white/10 dark:border-white/10
          backdrop-blur px-2.5 py-1.5 text-xs font-medium
          shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10
          hover:bg-white/80 dark:hover:bg-white/15 transition
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
        "
        aria-expanded={open}
        aria-controls="radio-popover"
        aria-label={open ? "Fechar rádio" : "Abrir rádio"}
      >
        <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
        <span className="sm:hidden">Rádio</span>
        <span className="hidden sm:block truncate max-w-[10rem]">
          Atitude Gospel Rock
        </span>
      </button>

      {/* Popover */}
      <div
        id="radio-popover"
        className={`
          absolute left-0 mt-2 w-[min(88vw,280px)]
          overflow-hidden rounded-xl
          border border-border/60 bg-white/80 text-foreground
          dark:bg-white/5 dark:border-white/10
          backdrop-blur ring-1 ring-inset ring-black/5 dark:ring-white/10 shadow-lg
          transition-all duration-150
          ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}
        `}
      >
        <div className="p-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2.5 py-1.5 text-xs"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pausar rádio" : "Tocar rádio"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span className="ml-1">{isPlaying ? "Pausar" : "Tocar"}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2.5 py-1.5 text-xs"
              onClick={() => setIsMuted((m) => !m)}
              aria-label={isMuted ? "Ativar som" : "Mutar"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span className="ml-1 hidden sm:inline">
                {isMuted ? "Desmutar" : "Mutar"}
              </span>
            </Button>
          </div>

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
              className="w-40 accent-current"
              aria-label="Volume da rádio"
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

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();

  // refs para posicionar o chip sem alterar o fluxo
  const rowRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const [leftPx, setLeftPx] = useState<number>(0);

  // bloqueia scroll ao abrir menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  // sticky + scrollspy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navItems.map((i) => i.href.slice(1));
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 100 && r.bottom >= 100;
      });
      if (current) setActiveSection("#" + current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // posiciona o chip ENTRE a logo e o menu sem empurrar o layout
  useEffect(() => {
    const computeLeft = () => {
      const row = rowRef.current;
      const logo = logoRef.current;
      if (!row || !logo) return setLeftPx(0);
      const rowRect = row.getBoundingClientRect();
      const logoRect = logo.getBoundingClientRect();
      // left = fim da logo relativo ao container + um respiro
      const left = logoRect.right - rowRect.left + 12; // 12px de gap
      setLeftPx(Math.max(8, Math.round(left)));
    };

    computeLeft();

    let ro: ResizeObserver | null = null;
    if (typeof window !== "undefined" && "ResizeObserver" in window) {
      ro = new ResizeObserver(computeLeft);
      if (rowRef.current) ro.observe(rowRef.current);
      if (logoRef.current) ro.observe(logoRef.current);
    }
    window.addEventListener("resize", computeLeft);

    return () => {
      window.removeEventListener("resize", computeLeft);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/100 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* linha do header ORIGINAL: justify-between */}
        <div
          ref={rowRef}
          className="relative flex items-center justify-between h-16 lg:h-20"
        >
          {/* Logo */}
          <Link
            ref={logoRef}
            href="/"
            className="text-xl font-bold text-gradient"
          >
            &lt;PR /&gt;
          </Link>

          {/* === Rádio ABSOLUTA, não altera layout === */}
          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `${leftPx}px` }}
          >
            <RadioChip />
          </div>

          {/* Menu desktop */}
          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  aria-label={`Navegar para ${item.label}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Ações desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label={
                theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"
              }
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <Button variant="outline" size="sm" asChild>
              <a
                href="/Curriculo_Dev_Forntend_Paulo_Reducino.pdf"
                download
                aria-label="Baixar currículo em PDF"
              >
                <Download size={16} className="mr-2" />
                Download CV
              </a>
            </Button>

            <Button asChild>
              <a href="#contato">Fale Comigo</a>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label={
                theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"
              }
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            className="
              lg:hidden fixed inset-x-0 top-16 bottom-0
              bg-white dark:bg-[#0b0b0b]
              border-t border-border
              animate-in fade-in-0 slide-in-from-top-2 duration-200
              z-[60]
            "
            onKeyDown={(e) => e.key === "Escape" && setIsMobileMenuOpen(false)}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-accent/60 hover:text-primary ${
                        activeSection === item.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label={`Navegar para ${item.label}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <Button variant="outline" asChild className="w-full">
                    <a
                      href="/Curriculo_Dev_Forntend_Paulo_Reducino.pdf"
                      download
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label="Baixar currículo em PDF"
                    >
                      <Download size={16} className="mr-2" />
                      Download CV
                    </a>
                  </Button>
                </li>
                <li>
                  <Button asChild className="w-full">
                    <a
                      href="#contato"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Fale Comigo
                    </a>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
