"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Code2, Zap, Users, Award } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Código Limpo",
    description: "Arquitetura escalável e manutenível",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Lighthouse score > 90",
  },
  {
    icon: Users,
    title: "Acessibilidade",
    description: "WCAG 2.2 AA compliant",
  },
  {
    icon: Award,
    title: "Boas Práticas",
    description: "SEO técnico e otimização",
  },
];

export function About() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="sobre" className="py-20 lg:py-32 relative" ref={ref}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Sobre Mim
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Olá, sou{" "}
            <span className="text-foreground font-semibold">
              Paulo Reducino
            </span>
            , desenvolvedor frontend com mais de 5 anos de experiência
            transformando ideias em experiências digitais memoráveis.
            Especializado em React.js, Next.js e TypeScript, dedico-me a criar
            aplicações web que não apenas funcionam perfeitamente, mas que
            encantam usuários e geram resultados reais para negócios.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-4">
            Atualmente na{" "}
            <span className="text-primary font-semibold">Vizuh</span>, trabalho
            com diagnóstico e correção de erros, otimização de performance, SEO
            técnico e ferramentas como SEMrush, Google Analytics (GA4) e Google
            Tag Manager. Minha abordagem combina excelência técnica com visão
            estratégica, sempre buscando o equilíbrio perfeito entre
            performance, acessibilidade e experiência do usuário.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-4">
            Acredito que um bom software é a harmonia entre código limpo, design
            intuitivo e uma experiência humana que faz a diferença. Cada projeto
            é uma oportunidade de elevar padrões e criar soluções que realmente
            importam.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
