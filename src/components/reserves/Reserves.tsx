import { Link } from "react-router-dom";
import { reserves, reserveCountDiscrepancy } from "../../data/reserves";

/**
 * The eleven Wildlife Reserves, as a dense index rather than a second Park
 * Strip. UWA's own copy treats reserves as a real but explicitly smaller,
 * secondary tier below the ten National Parks — so this section deliberately
 * avoids the Park Strip's device (tall full-bleed slivers with a name
 * occlusion effect): a compact horizontal scroll of small cards signals
 * "related, but a tier down" through scale and density alone, without
 * needing to say so. `bg-forest-deep` (a real design token, darker than the
 * `bg-forest` Park Strip above and Experiences below) gives it its own
 * ground rather than reading as "more Park Strip" or blending into either
 * neighbour.
 *
 * Card fields are exactly what reserves.ts actually has for all eleven:
 * name, region, and a photo where one exists. Toro Semliki has no
 * reserve-specific photo (its own og:image resolves to a sitewide generic
 * placeholder — see reserves.ts) so its card simply omits the image slot,
 * same rule Experiences.tsx already applies to missing body copy: render
 * what is real, omit what is not, never fake it.
 */
export function Reserves() {
  return (
    <section
      id="reserves"
      aria-labelledby="reserves-heading"
      className="bg-forest-deep px-6 py-24 text-papyrus md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[90rem]">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
          Wildlife Reserves
        </p>
        <h2
          id="reserves-heading"
          className="mt-4 max-w-[28ch] font-display text-[length:var(--step-4)] font-light leading-[1.05]"
        >
          The eleven Wildlife Reserves
        </h2>
        <p className="mt-4 max-w-[60ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.15em] text-mist">
          A smaller, secondary tier alongside the ten National Parks above.
        </p>

        {/* Dense horizontal index, not a grid of full cards — deliberately
            closer to Experiences' card scale than to a Park Strip sliver.
            Native scroll-snap, same technique already proven in
            MobileCarousel, so this reads as a continuation of an existing
            device rather than a fourth new interaction pattern on the page. */}
        <ul
          role="list"
          className="m-0 mt-14 flex list-none gap-4 overflow-x-auto p-0 pb-4"
          style={{ scrollSnapType: "x proximity" }}
        >
          {reserves.map((reserve, index) => (
            <li
              key={reserve.slug}
              className="shrink-0"
              style={{ width: "14rem", scrollSnapAlign: "start" }}
            >
              <Link to={`/reserves/${reserve.slug}`} className="group block">
                {reserve.image ? (
                  <img
                    src={reserve.image}
                    alt=""
                    width={480}
                    height={360}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                    className="aspect-[4/3] w-full rounded-sm object-cover transition-opacity duration-200 group-hover:opacity-85"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="aspect-[4/3] w-full rounded-sm border border-mist/15 bg-forest/60"
                  />
                )}
                <h3 className="mt-4 font-display text-[length:var(--step-1)] font-light leading-tight text-papyrus transition-colors group-hover:text-crane">
                  {reserve.name}
                </h3>
                {reserve.region && (
                  <p className="mt-1.5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-mist">
                    {reserve.region}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Same "12 vs 11" conflict recorded in reserves.ts as
            `reserveCountDiscrepancy`, surfaced here rather than hidden:
            UWA's own homepage states 12, its own mega-menu only ever names
            and links 11 — the eleven actually listed above. Quiet footnote
            treatment, matching how Stats handles its own source conflicts:
            small, factual, deprioritised by size and colour, not an alert. */}
        <div className="mt-14 max-w-[70ch]">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
            A note on this count
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-mist">
            {reserveCountDiscrepancy.note}
          </p>
        </div>
      </div>
    </section>
  );
}
