import Link from "next/link";
import { Github, Linkedin, Mail, Phone, Figma } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/pauloreducino", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/pauloreducino",
    label: "LinkedIn",
  },
  { icon: Figma, href: "#", label: "Figma" },
];

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#projetos", label: "Projetos" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-gradient inline-block mb-4"
            >
              &lt;PR /&gt;
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Desenvolvedor Frontend especializado em criar experiências web
              modernas, acessíveis e de alta performance.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:paulo.a.reducino@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail size={16} />
                  paulo.a.reducino@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://whatsa.me/5598970265510"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone size={16} />
                  (98) 97026-5510
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Paulo Reducino. Todos os direitos reservados.
          </p>
          <a
            href="/Curriculo_Dev_Forntend_Paulo_Reducino.pdf"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
            download
          >
            Download CV
          </a>
        </div>
      </div>
    </footer>
  );
}
