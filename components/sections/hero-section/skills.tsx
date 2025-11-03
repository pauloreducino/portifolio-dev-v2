"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const SKILLS = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "SEO",
] as const;

export function HeroSkills() {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {SKILLS.map((skill) => (
        <Badge key={skill} variant="outline" className="text-sm">
          {skill}
        </Badge>
      ))}
    </motion.div>
  );
}
