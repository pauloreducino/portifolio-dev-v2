export type Layer = "back" | "mid" | "front";

export type TagParticle = {
  label: string;
  left: string;
  top: string;
  delay: number;
  duration: number;
  sizeClass: (typeof import("./tech-constants").SIZE_CLASSES)[number];
  layer: Layer;
  colorClass: string;
  rotate: number;
};
