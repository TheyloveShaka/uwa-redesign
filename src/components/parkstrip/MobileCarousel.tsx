import { useEffect, useRef, useState } from "react";
import { parks } from "../../data/parks";
import { ParkCard } from "./ParkCard";

const GAP_PX = 12; // must match the gap-3 utility on the scroller below

/**
 * Horizontal snap carousel, <768px (§4). Native CSS scroll-snap — no JS
 * carousel library, no scroll-jacking. The "01 / 10" counter is the only
 * bit of JS involved, and it only *reads* scroll position (rAF-throttled)
 * to know which card is currently snapped into view; it never drives the
 * scrolling itself, so this keeps working identically under
 * prefers-reduced-motion (the global stylesheet already forces
 * `scroll-behavior: auto`, so snapping stays instant rather than smooth —
 * still fully functional, just not eased).
 */
export function MobileCarousel() {
  const [current, setCurrent] = useState(0);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let ticking = false;
    function measure() {
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      const step = (card?.getBoundingClientRect().width ?? el.clientWidth) + GAP_PX;
      const index = Math.round(el.scrollLeft / step);
      setCurrent(Math.min(parks.length - 1, Math.max(0, index)));
      ticking = false;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    }

    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="parks" aria-labelledby="park-strip-heading" className="relative w-full bg-forest">
      <h2 id="park-strip-heading" className="sr-only">
        Uganda's National Parks
      </h2>

      <div className="relative" style={{ height: "80svh" }}>
        <ul
          ref={scrollerRef}
          role="list"
          className="absolute inset-0 m-0 flex list-none gap-3 overflow-x-auto p-0 pl-[7vw]"
          style={{ scrollSnapType: "x mandatory", scrollPaddingLeft: "7vw" }}
        >
          {parks.map((park, index) => (
            <ParkCard key={park.slug} park={park} eager={index === 0} />
          ))}
          {/* Trailing spacer so the last card can snap fully into view
              instead of being pinned flush against the scroller's edge. */}
          <li aria-hidden="true" className="shrink-0" style={{ width: "7vw" }} />
        </ul>

        {/* Swipe hint + position counter, pinned above the scroller with
            its own scrim so it stays legible over whichever photo is
            currently underneath. pointer-events-none so it never blocks
            the swipe gesture it's describing. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-16 items-start justify-between px-5 pt-4"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, color-mix(in oklab, var(--color-forest) 55%, transparent) 0%, transparent 100%)",
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-papyrus/80">
            Swipe →
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-papyrus">
            {String(current + 1).padStart(2, "0")} / {String(parks.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
