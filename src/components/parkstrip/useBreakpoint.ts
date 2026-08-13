import { useEffect, useState } from "react";

export type StripBreakpoint = "mobile" | "tablet" | "desktop";

const TABLET_QUERY = "(min-width: 768px)";
const DESKTOP_QUERY = "(min-width: 1024px)";

function readBreakpoint(): StripBreakpoint {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia(DESKTOP_QUERY).matches) return "desktop";
  if (window.matchMedia(TABLET_QUERY).matches) return "tablet";
  return "mobile";
}

/**
 * Drives which of the Park Strip's three structurally different layouts
 * mounts (§4: ten-in-a-row desktop, two-rows-of-five tablet, a snap
 * carousel on mobile). This is handled in JS rather than three parallel
 * `hidden md:block …` trees so only one breakpoint's worth of <img>
 * elements ever exists in the DOM at once — mounting all three would
 * triple the strip's images (10 parks × 3 layouts) for decode work that
 * pays for zero extra visible pixels, since only one tree is ever shown.
 */
export function useBreakpoint(): StripBreakpoint {
  const [breakpoint, setBreakpoint] = useState<StripBreakpoint>(readBreakpoint);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const tablet = window.matchMedia(TABLET_QUERY);
    const onChange = () => setBreakpoint(readBreakpoint());

    onChange();
    desktop.addEventListener("change", onChange);
    tablet.addEventListener("change", onChange);
    return () => {
      desktop.removeEventListener("change", onChange);
      tablet.removeEventListener("change", onChange);
    };
  }, []);

  return breakpoint;
}
