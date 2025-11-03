"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { FloatingTechTagsBackground } from "./background";
import { HeroAvatar } from "./avatar";
import { HeroSkills } from "./skills";
import { HeroTitle } from "./title";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <FloatingTechTagsBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="secondary"
              className="mb-6 inline-flex items-center gap-2"
              aria-label="Status: disponível para novos projetos"
            >
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Disponível para novos projetos
            </Badge>
          </motion.div>

          <HeroTitle />
          <HeroAvatar />

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Mais de 5 anos criando interfaces modernas, acessíveis e de alta
            performance com React.js, Next.js e TypeScript. Especialista em SEO
            técnico e otimização de carregamento.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" asChild className="group">
              <a href="#contato">
                Fale Comigo
                <ArrowRight
                  className="ml-2 transition-transform group-hover:translate-x-1"
                  size={20}
                  aria-hidden="true"
                />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#projetos">Ver Projetos</a>
            </Button>
          </motion.div>

          <HeroSkills />
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
    </section>
  );
}
