import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "./useReducedMotion";

interface LenisProviderProps {
  children: ReactNode;
}

// Drives Lenis's smooth-scroll interpolation off requestAnimationFrame.
// When the user has asked their OS for reduced motion, we skip mounting
// Lenis entirely rather than merely disabling it, so native scroll
// behavior (and scroll-behavior: auto from the reduced-motion CSS rule)
// takes over untouched.
export function LenisProvider({ children }: LenisProviderProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis();
    let frameId: number;

    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
