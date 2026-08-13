import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

// Reads the user's OS-level motion preference and keeps it in sync if they
// change it while the page is open. Guarded for SSR since `window` and
// `matchMedia` don't exist during server rendering / build-time evaluation.
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(QUERY);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);

    setReduced(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", onChange);

    return () => mediaQueryList.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
