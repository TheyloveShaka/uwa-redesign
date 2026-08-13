import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent, FocusEvent } from "react";
import { useNavigate } from "react-router-dom";
import { parks } from "../../data/parks";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { useBreakpoint } from "./useBreakpoint";
import { ParkSliver } from "./ParkSliver";
import { MobileCarousel } from "./MobileCarousel";

const TOTAL = parks.length;

/**
 * PARK STRIP — the signature element of the homepage (§4).
 *
 * Desktop: ten vertical slivers in one row, hover/focus expands one to
 * flex: 5.5 while the rest compress to flex: 1, each layered for occlusion
 * (see ParkSliver). Tablet: the same interaction model split into two rows
 * of five. Mobile: a native scroll-snap carousel with no expand state at
 * all (MobileCarousel). Which of the three mounts is decided in JS
 * (useBreakpoint) rather than by hiding all three with CSS, so the DOM
 * only ever holds one layout's worth of <img> elements.
 *
 * Keyboard model (non-negotiable, §4): roving tabindex — exactly one
 * sliver is a Tab stop at a time. ArrowLeft/Right move and expand the
 * focused park; Home/End jump to the first/last. Enter/Space navigates
 * (native <button> behaviour — no extra key handling needed for that part).
 */
export function ParkStrip() {
  const breakpoint = useBreakpoint();
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  // `activeIndex` is set directly by BOTH hover and focus, so whichever
  // modality the visitor used most recently always wins — this deliberately
  // replaces an earlier `hoverIndex ?? focusIndex` version that looked
  // reasonable but had a real bug: if the mouse was merely resting over
  // sliver 0 (e.g. left there from an earlier click) and the visitor then
  // arrowed to sliver 4 with the keyboard, hover's stale claim on 0 out-
  // ranked the fresh keyboard focus and sliver 4 never visually expanded,
  // even though it was correctly focused and correctly the roving tab
  // stop. Caught by actually driving the keyboard against a live build
  // rather than reasoning about the state shape on paper.
  //
  // The two refs track whether each modality is *currently* engaged, so
  // leaving by one doesn't collapse the strip out from under the other:
  // moving the mouse off a sliver while it's still keyboard-focused
  // shouldn't collapse it, and blurring out of the list while the mouse
  // still sits over a sliver should fall back to showing that hover.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [tabbableIndex, setTabbableIndex] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hoveredRef = useRef<number | null>(null);
  const focusedWithinRef = useRef(false);

  const handleHoverStart = useCallback((index: number) => {
    hoveredRef.current = index;
    setActiveIndex(index);
  }, []);

  const handleRowMouseLeave = useCallback(() => {
    hoveredRef.current = null;
    if (!focusedWithinRef.current) setActiveIndex(null);
  }, []);

  const handleFocusIndex = useCallback((index: number) => {
    focusedWithinRef.current = true;
    setTabbableIndex(index);
    setActiveIndex(index);
  }, []);

  const moveFocusTo = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(TOTAL - 1, next));
    buttonRefs.current[clamped]?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          moveFocusTo(index + 1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          moveFocusTo(index - 1);
          break;
        case "Home":
          event.preventDefault();
          moveFocusTo(0);
          break;
        case "End":
          event.preventDefault();
          moveFocusTo(TOTAL - 1);
          break;
        default:
          break;
      }
    },
    [moveFocusTo],
  );

  // Fires when focus leaves the row entirely (not just moving between
  // buttons inside it). Collapses back down, unless the mouse is still
  // sitting over a sliver — then that hover takes over instead of
  // snapping to nothing.
  const handleRowBlur = useCallback((event: FocusEvent<HTMLUListElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      focusedWithinRef.current = false;
      setActiveIndex(hoveredRef.current);
    }
  }, []);

  if (breakpoint === "mobile") {
    return <MobileCarousel />;
  }

  const renderSliver = (index: number) => {
    const park = parks[index];
    return (
      <ParkSliver
        key={park.slug}
        ref={(el) => {
          buttonRefs.current[index] = el;
        }}
        park={park}
        isActive={activeIndex === index}
        isTabbable={tabbableIndex === index}
        eager={index === 0}
        prefersReducedMotion={prefersReducedMotion}
        onHoverStart={() => handleHoverStart(index)}
        onFocusIndex={() => handleFocusIndex(index)}
        onKeyDown={(event) => handleKeyDown(event, index)}
        onNavigate={() => navigate(`/parks/${park.slug}`)}
      />
    );
  };

  if (breakpoint === "tablet") {
    return (
      <section id="parks" aria-labelledby="park-strip-heading" className="relative w-full bg-forest">
        <h2 id="park-strip-heading" className="sr-only">
          Uganda's National Parks
        </h2>
        <div className="flex flex-col">
          {[0, 1].map((row) => (
            <ul
              key={row}
              role="list"
              className="m-0 flex list-none p-0"
              style={{ height: "40svh" }}
              onMouseLeave={handleRowMouseLeave}
              onBlur={handleRowBlur}
            >
              {Array.from({ length: 5 }, (_, i) => renderSliver(row * 5 + i))}
            </ul>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="parks" aria-labelledby="park-strip-heading" className="relative w-full bg-forest">
      <h2 id="park-strip-heading" className="sr-only">
        Uganda's National Parks
      </h2>
      <ul
        role="list"
        className="m-0 flex list-none p-0"
        style={{ height: "88svh" }}
        onMouseLeave={handleRowMouseLeave}
        onBlur={handleRowBlur}
      >
        {Array.from({ length: TOTAL }, (_, i) => renderSliver(i))}
      </ul>
    </section>
  );
}
