"use client"

import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import { Code2, Palette, Gauge, Search, Database, Wrench, BarChart3, Shield } from "lucide-react"
import { GridPattern } from "@/components/ui/background-patterns"

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["React.js", "Next.js 16", "TypeScript", "JavaScript ES6+"],
  },
  {
    title: "Styling",
    icon: Palette,
    skills: ["Tailwind CSS 4", "CSS3", "Sass/SCSS", "Styled Components"],
  },
  {
    title: "Performance",
    icon: Gauge,
    skills: ["Lighthouse", "Core Web Vitals", "Bundle Optimization", "Lazy Loading"],
  },
  {
    title: "SEO & Analytics",
    icon: Search,
    skills: ["SEMrush", "Google Analytics (GA4)", "Google Tag Manager", "SEO Técnico"],
  },
  {
    title: "Backend & APIs",
    icon: Database,
    skills: ["Node.js", "REST APIs", "GraphQL", "Server Actions"],
  },
  {
    title: "Tools & Workflow",
    icon: Wrench,
    skills: ["Git", "pnpm", "Figma", "VS Code"],
  },
  {
    title: "Testing & Quality",
    icon: BarChart3,
    skills: ["Jest", "React Testing Library", "Playwright", "ESLint"],
  },
  {
    title: "Acessibilidade",
    icon: Shield,
    skills: ["WCAG 2.2 AA", "ARIA", "Screen Readers", "Keyboard Navigation"],
  },
]

export function Skills() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section id="habilidades" className="py-20 lg:py-32 bg-muted/30 relative" ref={ref}>
      <GridPattern />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Habilidades & Tecnologias</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stack completo para desenvolvimento de aplicações web modernas, performáticas e acessíveis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <category.icon className="text-primary" size={20} />
                </div>
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
