"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { LangProvider } from "@/lib/hg-i18n";
import { WORKS } from "@/lib/hg-works";
import Cursor from "./cursor";
import Preloader from "./preloader";
import Navigation from "./navigation";
import Hero from "./hero";
import Manifesto from "./manifesto";
import Gallery from "./gallery";
import Artists from "./artists";
import Services from "./services";
import Faq from "./faq";
import Contact from "./contact";
import Footer from "./footer";

function ShellInner() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Preloader key="preloader" onComplete={handleLoaded} />}
      </AnimatePresence>

      <Cursor />
      <Navigation ready={loaded} />

      <main>
        <Hero ready={loaded} />
        <Manifesto />
        <Gallery />
        <Artists />
        <Services />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default function SiteShell() {
  return (
    <LangProvider>
      <ReactLenis
        root
        options={{
          lerp: 0.09,
          duration: 1.35,
          smoothWheel: true,
          wheelMultiplier: 0.95,
          touchMultiplier: 1.4,
        }}
      >
        <ShellInner />
      </ReactLenis>
    </LangProvider>
  );
}
