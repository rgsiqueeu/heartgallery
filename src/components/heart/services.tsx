"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EASE } from "./motion";
import { useLang } from "@/lib/hg-i18n";
import { STUDIO_IMAGES } from "@/lib/hg-works";

export default function Services() {
  const { t } = useLang();
  const [open, setOpen] = useState(0);

  return (
    <section id="servicos" className="relative px-5 md:px-10 py-24 md:py-40 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-grotesk text-[10px] md:text-xs tracking-[0.3em] uppercase text-heart">
            {t.services.label}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <h2 className="font-anton uppercase leading-[0.95] text-bone text-[12vw] md:text-[7vw] mb-14 md:mb-20">
          {t.services.headingA}{" "}
          <em className="font-serif italic normal-case text-heart">{t.services.headingEm}</em>
        </h2>

        <div className="border-t border-line">
          {t.services.items.map((s, i) => {
            const isOpen = open === i;
            return (
              <div key={s.n} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center gap-5 md:gap-10 py-6 md:py-8 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-grotesk text-[10px] tracking-[0.3em] text-heart">
                    {s.n}
                  </span>
                  <span
                    className={`flex-1 font-anton uppercase text-[7.5vw] md:text-[3.6vw] leading-none transition-all duration-500 ${
                      isOpen ? "text-heart translate-x-2" : "text-bone group-hover:translate-x-2"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span
                    className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full border flex items-center justify-center text-xl transition-all duration-500 ${
                      isOpen
                        ? "bg-heart border-heart text-ink rotate-45"
                        : "border-line text-bone group-hover:border-heart group-hover:text-heart"
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid md:grid-cols-12 gap-6 md:gap-10 pb-8 md:pb-10 pl-0 md:pl-[4.5rem]">
                        <p className="md:col-span-6 text-fog leading-relaxed md:text-lg">
                          {s.desc}
                        </p>
                        <div className="md:col-span-3 flex flex-wrap md:flex-col gap-2 content-start">
                          {s.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-grotesk text-[9px] tracking-[0.18em] uppercase text-bone border border-line px-3 py-1.5 w-fit"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="md:col-span-3 relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={STUDIO_IMAGES.services[i]}
                            alt={s.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
