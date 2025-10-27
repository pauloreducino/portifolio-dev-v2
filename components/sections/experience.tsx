"use client"

import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import { Calendar, MapPin, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    company: "Vizuh",
    role: "Desenvolvedor Frontend",
    period: "Out 2025 - Presente",
    location: "London, UK (Remoto)",
    achievements: [
      "Diagnóstico e correção de erros em sites existentes, melhorando performance e acessibilidade",
      "Implementação de SEO técnico com SEMrush, resolvendo problemas de indexação e links quebrados",
      "Configuração de Google Analytics (GA4), Google Tag Manager e Consent Mode",
      "Melhoria na pontuação Lighthouse, alcançando scores acima de 90 em múltiplos projetos",
      "Desenvolvimento com WordPress (Elementor e Gutenberg) e otimização de plugins",
    ],
    tags: ["WordPress", "SEMrush", "GA4", "GTM", "SEO", "Performance"],
  },
  {
    company: "SurtoCriativo | OficinaCriativa",
    role: "Desenvolvedor Frontend",
    period: "Ago 2025 - Presente",
    location: "São Luís, MA",
    achievements: [
      "Desenvolvimento de aplicações SPA com React.js, Vite e TypeScript",
      "Integração com APIs REST/WordPress usando TanStack Query, reduzindo tempo de carregamento em 35%",
      "Implementação de formulários com React Hook Form + Zod para validação robusta",
      "Criação de interfaces responsivas e acessíveis com Tailwind CSS",
      "Monitoramento de SEO e performance com Google Lighthouse (score > 90)",
    ],
    tags: ["React.js", "TypeScript", "Tailwind CSS", "TanStack Query", "Vite"],
  },
  {
    company: "Phooto",
    role: "Desenvolvedor Frontend Pleno",
    period: "Dez 2022 - Jul 2025",
    location: "São Paulo, SP",
    achievements: [
      "Desenvolvimento de landing pages de alta conversão, aumentando CTR em +25%",
      "Colaboração em grandes operações (Black Friday) garantindo estabilidade sob alto volume",
      "Redução de 30% no tempo de carregamento através de otimizações de performance",
      "Implementação de testes A/B e melhorias contínuas em design e acessibilidade",
      "Trabalho com React.js, Next.js, TypeScript e integração com AWS",
    ],
    tags: ["Next.js", "React.js", "TypeScript", "AWS", "E-commerce"],
  },
  {
    company: "SurtoCriativo | OficinaCriativa",
    role: "Desenvolvedor Frontend",
    period: "Mar 2020 - Nov 2022",
    location: "São Paulo, SP",
    achievements: [
      "Criação de sites institucionais e landing pages para diversos segmentos",
      "Desenvolvimento completo do layout no Figma até deploy em produção",
      "Entrega de sites com tempo de carregamento 40% mais rápido",
      "Aplicação de boas práticas de acessibilidade (WCAG 2.2 AA)",
      "Construção de landing pages que ampliaram captação de leads",
    ],
    tags: ["Next.js", "React.js", "Figma", "SEO", "Landing Pages"],
  },
]

export function Experience() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section id="experiencia" className="py-20 lg:py-32 relative" ref={ref}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Experiência Profissional</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais de 5 anos entregando soluções digitais de alta qualidade
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 lg:p-8 rounded-lg bg-card border border-border hover:border-primary transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                  <p className="text-lg text-primary font-semibold">{exp.company}</p>
                </div>
                <div className="flex flex-col gap-2 lg:text-right">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    {exp.period}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={16} />
                    {exp.location}
                  </div>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <TrendingUp className="text-success mt-1 flex-shrink-0" size={16} />
                    <span className="text-sm leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
