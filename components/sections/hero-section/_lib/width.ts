export function estimateTextWidth(label: string, fontPx: number) {
  return Math.max(12, Math.ceil(label.length * fontPx * 0.62));
}
