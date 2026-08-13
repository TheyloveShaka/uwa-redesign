/**
 * Shared connection/viewport gating for autoplaying background video.
 * Originally lived only in Hero.tsx; pulled out here once a second section
 * (the mandate area's video background) needed the exact same rule rather
 * than a copy that could quietly drift out of sync with it.
 */

interface NetworkInformationLike {
  effectiveType?: string;
}
interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformationLike;
}

const SLOW_CONNECTION_TYPES = new Set(["slow-2g", "2g", "3g"]);

/**
 * Video only earns its bytes on a wide viewport, a connection that isn't
 * visibly metered, and a visitor who hasn't asked for less motion. Any one
 * of those failing means the page's still fallback stays the whole show.
 */
export function canAutoplayVideo(prefersReducedMotion: boolean): boolean {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion) return false;
  if (window.innerWidth < 768) return false;

  const { connection } = navigator as NavigatorWithConnection;
  const effectiveType = connection?.effectiveType;
  if (effectiveType && SLOW_CONNECTION_TYPES.has(effectiveType)) return false;

  return true;
}
