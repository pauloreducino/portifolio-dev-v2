"use client";

import { motion } from "framer-motion";
import { Code2, Zap, Users, Award } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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

// Mock hook for demo - com tipos corretos
function useInView({ threshold }: { threshold: number }) {
  const [isInView, setIsInView] = useState(true);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

export function About() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section
      id="sobre"
      className="py-20 lg:py-32 relative bg-background"
      ref={ref}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Olá, sou{" "}
            <span className="text-gray-900 dark:text-white font-semibold">
              Paulo Reducino
            </span>
            , desenvolvedor frontend com mais de 5 anos de experiência
            transformando ideias em experiências digitais memoráveis.
            Especializado em React.js, Next.js e TypeScript, dedico-me a criar
            aplicações web que não apenas funcionam perfeitamente, mas que
            encantam usuários e geram resultados reais para negócios.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
            Atualmente na{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              Vizuh
            </span>
            , trabalho com diagnóstico e correção de erros, otimização de
            performance, SEO técnico e ferramentas como SEMrush, Google
            Analytics (GA4) e Google Tag Manager. Minha abordagem combina
            excelência técnica com visão estratégica, sempre buscando o
            equilíbrio perfeito entre performance, acessibilidade e experiência
            do usuário.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
            Acredito que um bom software é a harmonia entre código limpo, design
            intuitivo e uma experiência humana que faz a diferença. Cada projeto
            é uma oportunidade de elevar padrões e criar soluções que realmente
            importam.
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 transition-all hover:shadow-lg hover:shadow-blue-600/20"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4">
                  <Icon
                    className="text-blue-600 dark:text-blue-400"
                    size={24}
                  />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative overflow-hidden">
          <motion.div
            className="flex"
            drag="x"
            dragConstraints={{ left: -(highlights.length - 1) * 100, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000) {
                setCurrentSlide(
                  Math.min(currentSlide + 1, highlights.length - 1)
                );
              } else if (swipe > 10000) {
                setCurrentSlide(Math.max(currentSlide - 1, 0));
              }
            }}
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="min-w-full px-4 sm:min-w-[50%] sm:px-3"
                >
                  <div className="p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 transition-all hover:shadow-lg hover:shadow-blue-600/20">
                    <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4">
                      <Icon
                        className="text-blue-600 dark:text-blue-400"
                        size={24}
                      />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {highlights.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-blue-600 dark:bg-blue-400 w-8"
                    : "bg-gray-300 dark:bg-gray-600 w-2"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
