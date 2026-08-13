import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Self-hosted fonts (fontsource). Each import is a side-effect import that
// injects the font's @font-face rules — no external Google Fonts request,
// so first paint isn't blocked on a third-party network round trip.
import "@fontsource-variable/fraunces";
import "@fontsource/anton";
import "@fontsource-variable/public-sans";
import "@fontsource/ibm-plex-mono";

import "./index.css";
import { App } from "./App.tsx";
import { LenisProvider } from "./lib/LenisProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <LenisProvider>
        <App />
      </LenisProvider>
    </BrowserRouter>
  </StrictMode>,
);
