import { Link } from "react-router-dom";
import { contact } from "../data/facts";

/**
 * Deliberately a stub, and honest about it. The live site's media section spans
 * a newsroom, press releases, publications, UWA TV and a free-media library —
 * none of which was in scope for this redesign, and none of which is invented
 * here. Linking to the real thing beats faking a newsroom.
 */
export function Media() {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
        Media
      </p>
      <h1 className="mt-4 max-w-[18ch] font-display text-[length:var(--step-5)] font-light leading-[1.02]">
        Newsroom and press
      </h1>

      <section
        aria-labelledby="media-pending"
        className="mt-16 max-w-[70ch] border border-mist/25 p-6 md:p-8"
      >
        <h2
          id="media-pending"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
        >
          Out of scope for this redesign
        </h2>
        <p className="mt-4 font-body leading-relaxed text-papyrus/85">
          UWA&rsquo;s media section covers the newsroom, press releases,
          publications, UWA TV and a free-media library. This redesign focused on
          the front page, the parks and the pages the primary navigation reaches,
          so nothing has been written here in place of the real material.
        </p>
        <ul className="mt-6 space-y-2 font-body text-papyrus/85">
          <li>
            <a
              href="https://ugandawildlife.org/media-center/"
              className="underline underline-offset-4 transition-colors hover:text-crane focus-visible:text-crane"
            >
              Media centre on ugandawildlife.org
            </a>
          </li>
          <li>
            <a
              href="https://ugandawildlife.org/press-releases/"
              className="underline underline-offset-4 transition-colors hover:text-crane focus-visible:text-crane"
            >
              Press releases
            </a>
          </li>
          <li>
            <a
              href="https://ugandawildlife.org/publications/"
              className="underline underline-offset-4 transition-colors hover:text-crane focus-visible:text-crane"
            >
              Publications
            </a>
          </li>
        </ul>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-mist">
          Press enquiries · {contact.email}
        </p>
      </section>

      <Link
        to="/"
        className="mt-14 inline-block rounded-full border border-papyrus/60 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-papyrus transition-colors hover:border-crane hover:bg-crane hover:text-ink focus-visible:border-crane focus-visible:bg-crane focus-visible:text-ink"
      >
        Back to the parks
      </Link>
    </div>
  );
}

/** Catch-all, so an unknown URL never renders an empty <main>. */
export function NotFound() {
  return (
    <div className="mx-auto max-w-[60rem] px-6 py-40 md:px-10">
      <h1 className="font-display text-[length:var(--step-4)] font-light">
        That page isn&rsquo;t here
      </h1>
      <p className="mt-6 max-w-[46ch] font-body text-lg leading-relaxed text-papyrus/85">
        The link may be out of date.
      </p>
      <Link
        to="/"
        className="mt-10 inline-block rounded-full border border-papyrus/60 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-papyrus transition-colors hover:border-crane hover:bg-crane hover:text-ink focus-visible:border-crane focus-visible:bg-crane focus-visible:text-ink"
      >
        Back to the parks
      </Link>
    </div>
  );
}
