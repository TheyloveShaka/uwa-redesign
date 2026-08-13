import { EmptyPage } from "../components/pageparts/EmptyPage";
import { pages } from "../data/pages";

/**
 * Deliberately empty, mirroring the live site.
 *
 * UWA's own /conservation/ page publishes no body copy — confirmed against
 * their WordPress REST API, where content.rendered is an unfilled Brizy
 * container. An earlier version of this page assembled something out of the
 * mission and the About page's values; that was removed, because inventing a
 * conservation programme for a conservation authority is exactly the kind of
 * plausible-sounding fabrication this project refuses to ship.
 *
 * An empty page that says it is empty is honest. A full page of copy nobody at
 * UWA wrote is not.
 */
export function Conservation() {
  return (
    <EmptyPage
      kicker="Conservation"
      title="Conservation"
      sourceUrl={pages.conservation.sourceUrl}
      note="This page has no published content on ugandawildlife.org, so none has been written here in its place."
    />
  );
}
