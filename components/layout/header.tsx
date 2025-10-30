"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
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

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();

  // 🔒 Impede scroll da página quando o menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobileMenuOpen]);

  // 🧭 Scroll Spy + efeito sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.slice(1));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(`#${current}`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gradient">
            &lt;PR /&gt;
          </Link>

          {/* Desktop Navigation */}
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

          {/* Desktop Actions */}
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

        {/* 🧱 MOBILE MENU — fundo sólido */}
        {isMobileMenuOpen && (
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            className="
              lg:hidden
              fixed inset-x-0 top-16 bottom-0
              bg-white dark:bg-[#0b0b0b]   /* ← fundo sólido para claro/escuro */
              border-t border-border
              animate-in fade-in-0 slide-in-from-top-2 duration-200
              z-[60]
            "
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsMobileMenuOpen(false);
            }}
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
