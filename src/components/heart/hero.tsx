"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASE, HeartSvg } from "./motion"; // HeartSvg stays for the CTA micro-icon
import { useLang } from "@/lib/hg-i18n";
import { STUDIO_IMAGES } from "@/lib/hg-works";
import Ticker from "./ticker";

export default function Hero({ ready }: { ready: boolean }) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const show = (delay: number) => ({
    initial: { y: "110%" },
    animate: ready ? { y: "0%" } : {},
    transition: { duration: 1.05, ease: EASE, delay },
  });

  return (
    <section ref={ref} id="topo" className="relative min-h-svh flex flex-col overflow-hidden">
      {/* background */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image
          src={STUDIO_IMAGES.hero}
          alt="HeartGallery studio — tattoo session"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/50" />
      </motion.div>

      {/* vertical side text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 font-grotesk text-[10px] tracking-[0.5em] uppercase text-fog/80 [writing-mode:vertical-rl]"
      >
        {t.hero.vertical}
      </motion.p>

      {/* content */}
      <motion.div
        style={{ opacity: fade }}
        className="relative flex-1 flex flex-col justify-center px-5 md:px-10 pt-28 pb-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="font-grotesk text-[10px] md:text-xs tracking-[0.35em] uppercase text-fog mb-6 md:mb-10"
        >
          {t.hero.label} <span className="text-heart">— {t.hero.city}</span>
        </motion.p>

        <h1 className="font-anton uppercase leading-[0.86] select-none">
          <span className="block overflow-hidden">
            <motion.span
              {...show(0.35)}
              className="block text-[19vw] md:text-[15.5vw] text-bone"
            >
              Heart
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              {...show(0.48)}
              className="flex items-center gap-[0.06em] text-[19vw] md:text-[15.5vw]"
            >
              <Image
                src="/images/hg/logo.png"
                alt="HeartGallery — emblema do estúdio"
                width={560}
                height={586}
                className="w-[14vw] md:w-[11vw] h-auto animate-heartbeat heart-glow shrink-0"
              />
              <span className="text-outline-heart">Gallery</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
          className="font-serif italic text-2xl md:text-4xl text-heart mt-2 md:mt-3"
        >
          {t.hero.since}
        </motion.p>

        <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end gap-8 md:gap-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
            className="max-w-md text-fog leading-relaxed md:text-lg"
          >
            {t.hero.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-3 bg-heart text-ink font-grotesk text-[11px] tracking-[0.25em] uppercase px-7 py-4 hover:bg-heart-2 transition-colors"
            >
              {t.hero.ctaPrimary}
              <HeartSvg className="w-3.5 h-3.5 group-hover:scale-125 transition-transform" />
            </a>
            <a
              href="#obras"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("obras")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-grotesk text-[11px] tracking-[0.25em] uppercase text-bone link-line px-1 py-4 hover:text-heart transition-colors"
            >
              {t.hero.ctaSecondary}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* bottom ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.15 }}
      >
        <Ticker items={t.ticker.items} duration={26} variant="red" />
      </motion.div>
    </section>
  );
}
