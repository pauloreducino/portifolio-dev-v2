"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientBlur } from "@/components/ui/background-patterns"

const testimonials = [
  {
    name: "Maria Silva",
    role: "Product Manager",
    company: "Tech Solutions",
    content:
      "Paulo é um desenvolvedor excepcional. Sua atenção aos detalhes e compromisso com a qualidade resultaram em um produto final que superou nossas expectativas. A performance do site melhorou drasticamente.",
    avatar: "/professional-woman-avatar.png",
  },
  {
    name: "João Santos",
    role: "CEO",
    company: "StartupXYZ",
    content:
      "Trabalhar com Paulo foi uma experiência incrível. Ele não apenas entregou um código limpo e bem estruturado, mas também trouxe insights valiosos sobre UX e performance que fizeram toda a diferença no nosso produto.",
    avatar: "/professional-man-avatar.png",
  },
  {
    name: "Ana Costa",
    role: "Design Lead",
    company: "Creative Agency",
    content:
      "A colaboração com Paulo foi perfeita. Ele transformou nossos designs em código pixel-perfect, sempre respeitando as diretrizes de acessibilidade e performance. Recomendo fortemente!",
    avatar: "/professional-woman-avatar-2.png",
  },
]

export function Testimonials() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section id="depoimentos" className="py-20 lg:py-32 bg-muted/20 relative" ref={ref}>
      <GradientBlur />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Depoimentos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            O que clientes e colegas dizem sobre o trabalho
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 lg:p-12 rounded-lg bg-card border border-border"
              >
                <Quote className="text-primary mb-6" size={48} />

                <p className="text-lg lg:text-xl text-foreground mb-8 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-muted overflow-hidden">
                    <img
                      src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role} • {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Button variant="outline" size="icon" onClick={handlePrevious} aria-label="Depoimento anterior">
                <ChevronLeft size={20} />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false)
                      setCurrentIndex(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-primary w-8" : "bg-muted"
                    }`}
                    aria-label={`Ir para depoimento ${index + 1}`}
                  />
                ))}
              </div>

              <Button variant="outline" size="icon" onClick={handleNext} aria-label="Próximo depoimento">
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
