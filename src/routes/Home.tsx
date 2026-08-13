import { Hero } from "../components/hero/Hero";
import { ParkStrip } from "../components/parkstrip/ParkStrip";
import { ParkPanel } from "../components/panels/ParkPanel";
import { posterParks } from "../data/parks";
import { Stats } from "../components/stats/Stats";
import { Experiences } from "../components/experiences/Experiences";
import { ConservationBlock } from "../components/conservation/ConservationBlock";

// Section composition only — every section besides Hero is currently an
// empty stub, owned by other slices of this rebuild. Nav now lives in App.tsx
// as a sibling of <main> (see Fix 5 in the design-critique pass) so it renders
// on every route, not just Home.
export function Home() {
  return (
    <>
      <Hero />
      <ParkStrip />
      {/* Only three parks get a full poster panel — forest, water and savanna,
          enough to prove the system generalises. The other seven are reachable
          from the strip and render via the same component's plain variant. */}
      {posterParks.map((park) => (
        <ParkPanel key={park.slug} park={park} />
      ))}
      <Stats />
      <Experiences />
      <ConservationBlock />
    </>
  );
}
