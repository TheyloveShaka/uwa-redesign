import { EmptyPage } from "../components/pageparts/EmptyPage";
import { pages } from "../data/pages";

/**
 * Deliberately empty, mirroring the live site.
 *
 * UWA's /visitor-guide/ publishes no body copy, and their booking-terms page
 * states verbatim that no terms are currently available. An earlier version of
 * this page assembled a permits-and-rates layout around the tariff PDF; it was
 * removed for the same reason as Conservation — the useful parts (the tariff,
 * the toll-free line, the address) already live in the footer, where they are
 * reachable from every page, and everything else would have been invented.
 */
export function PlanYourVisit() {
  return (
    <EmptyPage
      kicker="Plan your visit"
      title="Plan your visit"
      sourceUrl={pages.visitorGuide.sourceUrl}
      note="UWA's visitor guide publishes no content, and their booking-terms page states that no terms are currently available. Permit rates, the toll-free line and the head-office address are in the footer of every page."
    />
  );
}
