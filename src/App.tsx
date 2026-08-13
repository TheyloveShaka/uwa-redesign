import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Nav } from "./components/nav/Nav";
import { Footer } from "./components/footer/Footer";
import { Home } from "./routes/Home";
import { ParkDetail } from "./routes/ParkDetail";
import { Conservation } from "./routes/Conservation";
import { PlanYourVisit } from "./routes/PlanYourVisit";
import { About } from "./routes/About";
import { Media, NotFound } from "./routes/Media";

// Nav renders its own <header>, which must be a sibling of <main> — never a
// descendant — for <header> to register as the ARIA banner landmark. Keeping
// it here, above the route switch, is what guarantees that on every route.
/**
 * Router keeps the scroll position when the path changes, which lands you
 * halfway down a page you have never seen. Reset on every navigation — but not
 * on hash links, which are asking to move within the current page.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parks/:slug" element={<ParkDetail />} />
          <Route path="/conservation" element={<Conservation />} />
          <Route path="/plan-your-visit" element={<PlanYourVisit />} />
          <Route path="/about" element={<About />} />
          <Route path="/media" element={<Media />} />
          {/* Without this, an unknown URL matches nothing and <main> renders
              empty — which looks like a broken build rather than a bad link. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
