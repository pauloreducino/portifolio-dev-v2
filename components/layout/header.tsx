"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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

/* -------------------- Rádio -------------------- */
function RadioChip() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // para portal
  const [volume, setVolume] = useState<number>(() => {
    if (typeof window === "undefined") return 0.9;
    const saved = localStorage.getItem("radio:volume");
    return saved ? Number(saved) : 0.9;
  });

  const stream = process.env.NEXT_PUBLIC_RADIO_STREAM_URL || "";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    try {
      localStorage.setItem("radio:volume", String(volume));
    } catch {}
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  // trava scroll somente quando o modal mobile está aberto
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    if (!open || !isMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const togglePlay = async () => {
    if (!audioRef.current || !stream) return;
    try {
      if (audioRef.current.src !== stream) {
        audioRef.current.src = stream;
        audioRef.current.load();
      }
      audioRef.current.muted = false;
      if (!isPlaying) {
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("play() error:", err);
      alert(
        "Erro ao iniciar o áudio. Verifique a variável NEXT_PUBLIC_RADIO_STREAM_URL na Vercel (HTTPS) e faça redeploy."
      );
    }
  };

  /* ---- UI comum (conteúdo do painel) ---- */
  const Panel = (
    <div
      className="
        overflow-hidden rounded-2xl
        border border-border/60 bg-white/90 text-foreground
        dark:bg-white/5 dark:border-white/10
        backdrop-blur ring-1 ring-inset ring-black/5 dark:ring-white/10 shadow-xl
      "
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
          <h3 className="text-sm font-semibold truncate">
            Atitude Gospel Rock
          </h3>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-xs px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Fechar"
        >
          Fechar
        </button>
      </div>

      <div className="px-4">
        <div className="h-px w-full bg-border/70" />
      </div>

      {/* Ações */}
      <div className="px-4 py-3">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-10 justify-center text-sm"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar rádio" : "Tocar rádio"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            <span className="ml-2">{isPlaying ? "Pausar" : "Tocar"}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-10 justify-center text-sm"
            onClick={() => setIsMuted((m) => !m)}
            aria-label={isMuted ? "Ativar som" : "Mutar"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span className="ml-2">{isMuted ? "Desmutar" : "Mutar"}</span>
          </Button>
        </div>

        {/* Volume */}
        <div className="mt-4">
          <label className="mb-1 block text-xs opacity-70">Volume</label>
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
            className="w-full accent-current"
            aria-label="Volume da rádio"
          />
        </div>
      </div>

      <div className="px-4 pb-3 pt-1">
        <p className="text-[11px] text-muted-foreground/80">
          Streaming ao vivo • BRLogic
        </p>
      </div>

      <audio
        ref={audioRef}
        preload="none"
        crossOrigin="anonymous"
        onError={() => setIsPlaying(false)}
      >
        {stream ? <source src={stream} type="audio/mpeg" /> : null}
      </audio>
    </div>
  );

  /* ---- Render ---- */
  return (
    <>
      {/* botão do chip (sempre dentro do header) */}
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
        aria-controls="radio-panel"
        aria-label={open ? "Fechar rádio" : "Abrir rádio"}
      >
        <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
        <span className="sm:hidden">Rádio</span>
        <span className="hidden sm:block truncate max-w-[10rem]">
          Atitude Gospel Rock
        </span>
      </button>

      {/* Desktop: popover ancorado ao chip (sem mexer layout) */}
      <div
        id="radio-panel"
        className={`
          hidden sm:block
          absolute left-0 mt-2 w-[min(88vw,280px)]
          transition-all duration-150
          ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}
        `}
      >
        {Panel}
      </div>

      {/* Mobile: modal central por portal (NUNCA corta) */}
      {mounted &&
        createPortal(
          <div
            className={`sm:hidden fixed inset-0 z-[80] ${open ? "" : "pointer-events-none"}`}
            aria-hidden={!open}
          >
            {/* backdrop */}
            <div
              className={`absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity ${
                open ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setOpen(false)}
            />
            {/* card central */}
            <div
              className={`
                absolute left-0 right-0 mx-4
                top-[72px]  /* abaixo do header */
                transition-transform transition-opacity duration-150
                ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}
              `}
              style={{ maxWidth: 420 }}
            >
              <div className="max-h-[70vh] overflow-auto">{Panel}</div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

/* -------------------- Header -------------------- */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();

  // refs p/ posicionar o chip entre a logo e o menu no desktop
  const rowRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const [leftPx, setLeftPx] = useState<number>(0);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

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

  useEffect(() => {
    const computeLeft = () => {
      const row = rowRef.current;
      const logo = logoRef.current;
      if (!row || !logo) return setLeftPx(0);
      const rowRect = row.getBoundingClientRect();
      const logoRect = logo.getBoundingClientRect();
      const left = logoRect.right - rowRect.left + 12; // gap 12px
      setLeftPx(Math.max(8, Math.round(left)));
    };
    computeLeft();

    let ro: ResizeObserver | null = null;
    if (typeof window !== "undefined" && "ResizeObserver" in window) {
      ro = new ResizeObserver(computeLeft);
      rowRef.current && ro.observe(rowRef.current);
      logoRef.current && ro.observe(logoRef.current);
    }
    window.addEventListener("resize", computeLeft);
    return () => {
      window.removeEventListener("resize", computeLeft);
      ro && ro.disconnect();
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

          {/* Rádio (absoluta entre logo e menu no desktop) */}
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

          {/* Ações mobile */}
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

        {/* Menu Mobile */}
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
