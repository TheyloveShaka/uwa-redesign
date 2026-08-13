import { Routes, Route } from "react-router-dom";
import { Nav } from "./components/nav/Nav";
import { Home } from "./routes/Home";
import { ParkDetail } from "./routes/ParkDetail";
import { Conservation } from "./routes/Conservation";
import { PlanYourVisit } from "./routes/PlanYourVisit";
import { About } from "./routes/About";

// Nav renders its own <header>, which must be a sibling of <main> — never a
// descendant — for <header> to register as the ARIA banner landmark. Keeping
// it here, above the route switch, is what guarantees that on every route.
export function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parks/:slug" element={<ParkDetail />} />
          <Route path="/conservation" element={<Conservation />} />
          <Route path="/plan-your-visit" element={<PlanYourVisit />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}
