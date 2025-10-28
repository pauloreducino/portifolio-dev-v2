"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useEffect, useState } from "react";

const skills = ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "SEO"];

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Gera posições das partículas apenas no cliente
  const [particles, setParticles] = useState<
    Array<{ left: string; top: string; duration: number; delay: number }>
  >([]);

  useEffect(() => {
    // Gera as posições apenas uma vez no cliente
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normaliza para -1 a 1
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      mouseX.set(x * 20); // Multiplica para aumentar o efeito
      mouseY.set(y * 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      {/* Animated Grid */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--primary) / 0.2) 1px, transparent 1px),
                             linear-gradient(to bottom, hsl(var(--primary) / 0.2) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0px 0px", "80px 80px"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: `linear-gradient(to right, hsl(var(--primary) / 0.15) 1px, transparent 1px),
                               linear-gradient(to bottom, hsl(var(--primary) / 0.15) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>
      </motion.div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-primary/50 rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/30 to-background pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge com dot verdinho */}
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

          {/* Avatar com leve "glitch" e anel pulsando */}
          <motion.div
            className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
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

            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.1, 1], opacity: [0, 0.5, 0] }}
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

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-sm">
                {skill}
              </Badge>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator (opcional) */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {/* 
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </div> 
        */}
      </motion.div>
    </section>
  );
}
