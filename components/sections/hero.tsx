"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const skills = ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "SEO"];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-6">
              Disponível para novos projetos
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Desenvolvedor Frontend
            <br />
            <span className="text-gradient">Especialista em Performance</span>
          </motion.h1>

          <motion.div
            className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            {/* Glitch effect layers */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              initial={{
                x: 0,
                y: 0,
                scale: 1,
                filter: "hue-rotate(0deg) blur(0px)",
              }}
              animate={{
                x: [0, -5, 5, -3, 3, -2, 2, 0],
                y: [0, 3, -3, 2, -2, 1, -1, 0],
                scale: [1, 1.05, 0.95, 1.03, 0.97, 1.01, 0.99, 1],
                filter: [
                  "hue-rotate(0deg) blur(0px)",
                  "hue-rotate(90deg) blur(2px)",
                  "hue-rotate(-90deg) blur(2px)",
                  "hue-rotate(45deg) blur(1px)",
                  "hue-rotate(-45deg) blur(1px)",
                  "hue-rotate(20deg) blur(0.5px)",
                  "hue-rotate(-20deg) blur(0.5px)",
                  "hue-rotate(0deg) blur(0px)",
                ],
              }}
              transition={{
                duration: 2,
                times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/paulo-profile.jpg"
                alt="Paulo Reducino"
                width={224}
                height={224}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>

            {/* Border ring with pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
              }}
            />
          </motion.div>

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
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#projetos">Ver Projetos</a>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {skills.map((skill, index) => (
              <Badge key={skill} variant="outline" className="text-sm">
                {skill}
              </Badge>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {/* <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </div> */}
      </motion.div>
    </section>
  );
}
