"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EASE, HeartSvg } from "./motion";
import { useLang } from "@/lib/hg-i18n";

export default function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative px-5 md:px-10 py-24 md:py-40 bg-ink-2 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-grotesk text-[10px] md:text-xs tracking-[0.3em] uppercase text-heart">
            {t.faq.label}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <h2 className="font-anton uppercase leading-[0.95] text-bone text-[12vw] md:text-[7vw] mb-14 md:mb-20">
          {t.faq.headingA}{" "}
          <em className="font-serif italic normal-case text-heart">{t.faq.headingEm}</em>
        </h2>

        <div className="border-t border-line">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-lg md:text-2xl leading-snug transition-colors duration-300 ${
                      isOpen ? "text-heart" : "text-bone group-hover:text-heart-2"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 transition-all duration-500 ${
                      isOpen ? "text-heart rotate-180" : "text-fog"
                    }`}
                  >
                    {isOpen ? (
                      <HeartSvg className="w-5 h-5" />
                    ) : (
                      <span className="font-grotesk text-xl">+</span>
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-8 text-fog leading-relaxed max-w-3xl">{item.a}</p>
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
