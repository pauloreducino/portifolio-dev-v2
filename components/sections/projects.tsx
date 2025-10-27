"use client"

import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { DotPattern } from "@/components/ui/background-patterns"

const projects = [
  {
    title: "EPSSO - Plataforma de Gestão",
    description:
      "Plataforma completa para gestão de processos seletivos com dashboard administrativo, sistema de autenticação e integração com banco de dados.",
    image: "/modern-dashboard.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    results: [
      "Redução de 40% no tempo de processamento de inscrições",
      "Interface responsiva com score Lighthouse > 95",
      "Sistema de autenticação seguro com Supabase Auth",
    ],
    links: {
      live: "https://epsso.vercel.app",
      github: "#",
    },
  },
  {
    title: "NEXTPM - Sistema de Gerenciamento",
    description:
      "Sistema de gerenciamento de projetos com funcionalidades de tracking, relatórios e colaboração em tempo real.",
    image: "/project-management-dashboard.png",
    tags: ["React.js", "Next.js", "TanStack Query", "Tailwind CSS"],
    results: [
      "Implementação de cache inteligente reduzindo requisições em 35%",
      "Dashboard interativo com visualizações em tempo real",
      "Otimização de performance com lazy loading e code splitting",
    ],
    links: {
      live: "https://nextpm.vercel.app",
      github: "#",
    },
  },
  {
    title: "E-commerce de Alta Performance",
    description:
      "Plataforma de e-commerce desenvolvida para suportar alto volume de acessos durante campanhas como Black Friday.",
    image: "/ecommerce-product-page.png",
    tags: ["Next.js", "TypeScript", "AWS", "Stripe"],
    results: [
      "Aumento de 25% na taxa de conversão",
      "Suporte a 10k+ usuários simultâneos sem degradação",
      "Integração completa com gateway de pagamento Stripe",
    ],
    links: {
      live: "#",
      github: "#",
    },
  },
]

export function Projects() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section id="projetos" className="py-20 lg:py-32 bg-muted/30 relative" ref={ref}>
      <DotPattern />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Projetos em Destaque</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções digitais que entregam resultados mensuráveis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-lg bg-card border border-border overflow-hidden hover:border-primary transition-all hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Resultados:</h4>
                  <ul className="space-y-1">
                    {project.results.map((result, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button size="sm" asChild>
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className="mr-2" />
                      Ver Projeto
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} className="mr-2" />
                      Código
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
