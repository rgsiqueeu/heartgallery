"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { EASE, HeartSvg } from "./motion";
import { useLang } from "@/lib/hg-i18n";

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1 font-grotesk text-[11px] tracking-[0.2em]">
      {(["pt", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-fog/50 mx-1">/</span>}
          <button
            onClick={() => setLang(l)}
            className={`uppercase px-1 py-0.5 transition-colors ${
              lang === l ? "text-heart" : "text-fog hover:text-bone"
            }`}
            aria-label={l === "pt" ? "Português" : "English"}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}

export default function Navigation({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const lenis = useLenis();

  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 450);
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className="fixed top-0 inset-x-0 z-[100] mix-blend-difference"
      >
        <div className="flex items-center justify-between px-5 md:px-10 py-5">
          <button
            onClick={() => go("topo")}
            className="flex items-center gap-2 group"
            aria-label="HeartGallery — topo"
          >
            <Image
              src="/images/hg/logo.png"
              alt=""
              width={560}
              height={586}
              className="h-9 md:h-10 w-auto group-hover:scale-110 transition-transform"
            />
            <span className="font-anton text-lg tracking-[0.08em] text-bone uppercase">
              Heart<span className="text-heart">Gallery</span>
            </span>
          </button>
          <div className="flex items-center gap-5 md:gap-7">
            <LangToggle />
            <button
              onClick={() => setOpen(!open)}
              className="font-grotesk text-[11px] tracking-[0.3em] uppercase text-bone hover:text-heart transition-colors"
              aria-expanded={open}
            >
              {open ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[95] bg-ink-2 flex flex-col"
            data-lenis-prevent
          >
            <div className="flex-1 flex flex-col justify-center px-6 md:px-16 pt-20">
              {t.nav.links.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.07 }}
                  onClick={() => go(l.id)}
                  className="group flex items-baseline gap-4 md:gap-6 text-left py-1.5 border-b border-line/60 last:border-0"
                >
                  <span className="font-grotesk text-[10px] tracking-[0.3em] text-heart">
                    0{i + 1}
                  </span>
                  <span className="font-anton text-[13vw] md:text-[7.5vw] leading-[1.02] uppercase text-bone group-hover:text-heart group-hover:translate-x-3 transition-all duration-500">
                    {l.label}
                  </span>
                  <HeartSvg className="w-5 h-5 md:w-7 md:h-7 text-heart opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.button>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="px-6 md:px-16 pb-8 flex flex-col md:flex-row gap-3 md:gap-10 font-grotesk text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-fog"
            >
              <a href="mailto:heartgallerytattoo@gmail.com" className="hover:text-heart transition-colors">
                heartgallerytattoo@gmail.com
              </a>
              <a
                href="https://www.instagram.com/heartgallerytattoopiercing/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-heart transition-colors"
              >
                @heartgallerytattoopiercing
              </a>
              <span>{t.nav.tagline}</span>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
