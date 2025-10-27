"use client"

import { useEffect, useRef, useState } from "react"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
}

export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px" } = options
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold, rootMargin },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin])

  return [ref, isInView] as const
}
