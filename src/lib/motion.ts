// Shared motion constants and variants.
// Centralizing these keeps easing curves, durations, and spring physics
// consistent across every animated component instead of each one
// inventing its own numbers.

export const EASE = { out: [0.16, 1, 0.3, 1], inOut: [0.65, 0, 0.35, 1] } as const;

export const DUR = { fast: 0.4, base: 0.8, slow: 1.2 } as const;

export const SPRING = { type: "spring", stiffness: 220, damping: 32, mass: 0.9 } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE.out },
  },
} as const;

// Clip-path inset reveal, for line-by-line headline reveals.
export const maskReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: DUR.slow, ease: EASE.out },
  },
} as const;

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
} as const;
