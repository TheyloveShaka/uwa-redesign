import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { EASE, DUR } from "../../lib/motion";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { identity, nav, cta } from "../../data/facts";

// Nav gains a solid ground once the hero footage has scrolled past roughly
// this many pixels — matches the point where the transparent-over-photo
// treatment stops being legible.
const SCROLL_THRESHOLD = 80;

const navReveal = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.fast, ease: EASE.out, delay: 0.76 },
  },
};

export function Nav() {
  const prefersReducedMotion = useReducedMotion();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  // Throttle the scroll listener to one measurement per animation frame so
  // it never runs more often than the browser can paint, and mark it
  // passive since it never calls preventDefault.
  useEffect(() => {
    let ticking = false;

    function measure() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel on every navigation, including hash-only moves
  // to an anchor on the same route (location.key changes for those too).
  useEffect(() => {
    setOpen(false);
  }, [location.key]);

  // While the panel is open: move focus in, trap Tab inside it, and close
  // on Escape. A full-screen overlay that lets focus leak to the page
  // behind it is a broken menu for keyboard and screen-reader users.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>(focusableSelector),
    );
    focusables[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Return focus to the trigger whenever the panel closes, so keyboard
  // users land back where they opened it instead of at the top of the page.
  useEffect(() => {
    if (wasOpenRef.current && !open) {
      triggerRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open]);

  const headerStyle = scrolled
    ? {
        backgroundColor:
          "color-mix(in oklab, var(--color-forest) 92%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom:
          "1px solid color-mix(in oklab, var(--color-mist) 25%, transparent)",
      }
    : {
        backgroundColor: "transparent",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        borderBottom: "1px solid transparent",
      };

  return (
    <header>
      <motion.nav
        aria-label="Primary"
        initial={prefersReducedMotion ? false : "hidden"}
        animate="visible"
        variants={navReveal}
        className="fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ease-out"
        style={headerStyle}
      >
        {/* Belt-and-braces, same rationale as the hero kicker: earns no
            WCAG 1.4.3 credit, but helps real legibility against cloud
            detail. Redundant once the bar has its own solid background. */}
        <div
          className="mx-auto grid max-w-[90rem] grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-5 md:px-6 lg:px-10"
          style={{ textShadow: scrolled ? "none" : "0 1px 10px rgba(6, 13, 10, 0.85)" }}
        >
          <Link
            to="/"
            // Must lead with the visible "UWA" (WCAG 2.5.3, Label in Name): an
            // accessible name of just "Uganda Wildlife Authority" contains none
            // of the text actually on screen, so voice control cannot reach the
            // wordmark by saying what it can see.
            aria-label={`UWA, ${identity.name}, home`}
            className="font-poster text-xl uppercase tracking-wide text-papyrus justify-self-start"
          >
            UWA
          </Link>

          <ul className="col-start-2 hidden items-center gap-4 lg:gap-8 md:flex">
            {nav.map((link) => (
              <li key={link.href} className="shrink-0">
                <Link
                  to={link.href}
                  className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-papyrus/90 transition-colors hover:text-papyrus focus-visible:text-papyrus"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="col-start-3 flex items-center justify-self-end gap-3">
            <Link
              to={cta.primary.href}
              className="whitespace-nowrap rounded-full border border-papyrus/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-papyrus transition-colors hover:border-crane hover:bg-crane hover:text-ink focus-visible:border-crane focus-visible:bg-crane focus-visible:text-ink sm:px-5"
            >
              {cta.primary.label}
            </Link>

            <button
              ref={triggerRef}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
              className="flex h-10 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span
                aria-hidden="true"
                className={`block h-[1.5px] w-6 bg-papyrus transition-transform duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
              />
              <span
                aria-hidden="true"
                className={`block h-[1.5px] w-6 bg-papyrus transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                aria-hidden="true"
                className={`block h-[1.5px] w-6 bg-papyrus transition-transform duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {open && (
        <div
          id={panelId}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-forest md:hidden"
        >
          {nav.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-[length:var(--step-3)] text-papyrus"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to={cta.primary.href}
            onClick={() => setOpen(false)}
            className="mt-4 whitespace-nowrap rounded-full border border-papyrus/60 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-papyrus"
          >
            {cta.primary.label}
          </Link>
        </div>
      )}
    </header>
  );
}
