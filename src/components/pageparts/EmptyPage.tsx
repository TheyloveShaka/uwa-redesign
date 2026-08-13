import { Link } from "react-router-dom";
import { contact } from "../../data/facts";

/**
 * A page with nothing on it, presented deliberately rather than accidentally.
 *
 * Used where the live UWA site publishes no content. The visual language is a
 * lot of air and one quiet bordered note — the same treatment the footer's
 * fraud notice gets. It should read as "this is pending", never as "this is
 * broken", and never as filler standing in for real copy.
 */
export function EmptyPage({
  kicker,
  title,
  note,
  sourceUrl,
}: {
  kicker: string;
  title: string;
  note: string;
  sourceUrl?: string | null;
}) {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-[90rem] flex-col justify-center px-6 py-32 md:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
        {kicker}
      </p>
      <h1 className="mt-4 max-w-[14ch] font-display text-[length:var(--step-5)] font-light leading-[1.02]">
        {title}
      </h1>

      <div className="mt-14 max-w-[62ch] border border-mist/25 p-6 md:p-8">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
          Content pending
        </h2>
        <p className="mt-4 font-body leading-relaxed text-papyrus/85">{note}</p>
        {sourceUrl && (
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-mist">
            Source:{" "}
            <a
              href={sourceUrl}
              className="underline underline-offset-4 transition-colors hover:text-papyrus"
            >
              ugandawildlife.org
            </a>
          </p>
        )}
      </div>

      <p className="mt-10 max-w-[52ch] font-body leading-relaxed text-papyrus/85">
        For anything urgent, UWA answers on{" "}
        <a
          href={`tel:${contact.tollFree.replace(/\s/g, "")}`}
          className="font-mono text-papyrus underline underline-offset-4 transition-colors hover:text-crane focus-visible:text-crane"
        >
          {contact.tollFree}
        </a>{" "}
        or{" "}
        <a
          href={`mailto:${contact.email}`}
          className="underline underline-offset-4 transition-colors hover:text-crane focus-visible:text-crane"
        >
          {contact.email}
        </a>
        .
      </p>

      <Link
        to="/"
        className="mt-12 inline-block w-fit rounded-full border border-papyrus/60 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-papyrus transition-colors hover:border-crane hover:bg-crane hover:text-ink focus-visible:border-crane focus-visible:bg-crane focus-visible:text-ink"
      >
        Back to the parks
      </Link>
    </div>
  );
}
