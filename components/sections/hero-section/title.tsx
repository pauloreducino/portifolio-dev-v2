"use client";

import { motion } from "framer-motion";

export function HeroTitle() {
  return (
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
  );
}
