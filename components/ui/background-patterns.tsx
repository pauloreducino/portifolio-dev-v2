export function GridPattern() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full stroke-muted-foreground/10" aria-hidden="true">
        <defs>
          <pattern id="grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M0 32V0h32" fill="none" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  )
}

export function DotPattern() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="dot-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" className="text-muted-foreground/20" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>
  )
}

export function GradientBlur() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
    </div>
  )
}
