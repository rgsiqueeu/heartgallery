"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASE } from "./motion";
import { useLang } from "@/lib/hg-i18n";
import { STUDIO_IMAGES } from "@/lib/hg-works";

export default function Manifesto() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const reveal = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.9, ease: EASE },
  };

  return (
    <section ref={ref} className="relative px-5 md:px-10 py-24 md:py-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-grotesk text-[10px] md:text-xs tracking-[0.3em] uppercase text-heart">
            {t.manifesto.label}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <h2 className="font-anton uppercase leading-[0.95] text-bone max-w-5xl">
          <motion.span {...reveal} className="block text-[9.5vw] md:text-[5.5vw]">
            {t.manifesto.statementA}{" "}
            <em className="font-serif italic normal-case text-heart">{t.manifesto.statementEm}</em>
          </motion.span>
          <motion.span
            {...reveal}
            transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
            className="block text-[9.5vw] md:text-[5.5vw] text-outline"
          >
            {t.manifesto.statementB}
          </motion.span>
        </h2>

        <div className="grid md:grid-cols-12 gap-12 md:gap-16 mt-14 md:mt-24 items-start">
          <div className="md:col-span-5 space-y-6 text-fog leading-relaxed md:text-lg">
            <motion.p {...reveal}>{t.manifesto.p1}</motion.p>
            <motion.p {...reveal} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}>
              {t.manifesto.p2}
            </motion.p>
            <motion.div
              {...reveal}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              className="grid grid-cols-2 gap-px bg-line border border-line pt-0"
            >
              {t.manifesto.stats.map((s) => (
                <div key={s.label} className="bg-ink p-6 md:p-7">
                  <p className="font-anton text-4xl md:text-5xl text-heart">{s.n}</p>
                  <p className="font-grotesk text-[10px] tracking-[0.2em] uppercase text-fog mt-2">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.figure
            {...reveal}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="md:col-span-7 relative"
          >
            <div className="relative overflow-hidden aspect-[5/4]">
              <motion.div className="absolute inset-[-10%]" style={{ y: imgY }}>
                <Image
                  src={STUDIO_IMAGES.manifesto}
                  alt="Interior do estúdio HeartGallery"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 font-grotesk text-[10px] tracking-[0.25em] uppercase text-fog">
              <span className="w-2 h-2 rounded-full bg-heart animate-pulse" />
              {t.manifesto.imageCaption}
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
