import { Hero } from "../components/hero/Hero";
import { ParkStrip } from "../components/parkstrip/ParkStrip";
import { Stats } from "../components/stats/Stats";
import { Experiences } from "../components/experiences/Experiences";
import { ConservationBlock } from "../components/conservation/ConservationBlock";

// Section composition only — every section besides Hero is currently an
// empty stub, owned by other slices of this rebuild. Nav now lives in App.tsx
// as a sibling of <main> (see Fix 5 in the design-critique pass) so it renders
// on every route, not just Home.
//
// The three poster panels (Bwindi, Murchison, Kidepo) no longer mount here.
// The Park Strip is now the homepage's centrepiece on its own, tall enough
// that it does not need the panels underneath it to carry the page. The
// panel component itself still exists and is reachable from other routes;
// see the note at the top of ParkPanel.tsx.
export function Home() {
  return (
    <>
      <Hero />
      <ParkStrip />
      <Stats />
      <Experiences />
      <ConservationBlock />
    </>
  );
}
