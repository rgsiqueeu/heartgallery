"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { EASE } from "./motion";
import { useLang } from "@/lib/hg-i18n";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const { t } = useLang();
  const [n, setN] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-ink"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-7"
      >
        <Image
          src="/images/hg/logo.png"
          alt="HeartGallery Tattoo & Piercing"
          width={560}
          height={586}
          priority
          className="w-20 md:w-24 h-auto animate-heartbeat heart-glow"
        />
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="font-anton text-3xl md:text-4xl tracking-[0.08em] text-bone uppercase"
          >
            Heart<span className="text-heart">Gallery</span>
          </motion.p>
        </div>
        <p className="font-grotesk text-[10px] tracking-[0.4em] uppercase text-fog">
          {t.preloader.tagline}
        </p>
        <div className="w-40 h-px bg-line relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-heart transition-[width] duration-100"
            style={{ width: `${n}%` }}
          />
        </div>
        <p className="font-grotesk text-xs text-fog tabular-nums">{n}%</p>
      </motion.div>
    </motion.div>
  );
}
