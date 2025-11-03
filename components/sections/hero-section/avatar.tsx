"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroAvatar() {
  return (
    <motion.div
      className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.15 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        initial={{ x: 0, y: 0, scale: 1, filter: "hue-rotate(0deg) blur(0px)" }}
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
          src="/images/paulo-profile-v2.webp"
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
  );
}
