"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { EASE } from "./motion";
import { useLang } from "@/lib/hg-i18n";
import { WORKS, Work } from "@/lib/hg-works";

type Filter = "all" | "tattoo" | "piercing";

export default function Gallery() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<Filter>("all");
  const [styleFilter, setStyleFilter] = useState<string | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const styles = Array.from(new Set(WORKS.map((w) => w.style[lang]))).sort();

  const works = WORKS.filter(
    (w) =>
      (filter === "all" || w.cat === filter) &&
      (!styleFilter || w.style[lang] === styleFilter)
  );

  const open = (i: number) => setActive(i);
  const close = useCallback(() => setActive(null), []);

  const step = useCallback(
    (dir: number) => {
      setActive((cur) =>
        cur === null ? cur : (cur + dir + works.length) % works.length
      );
    },
    [works.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [active, close, step]);

  const current: Work | null = active !== null ? works[active] : null;

  return (
    <section id="obras" className="relative px-5 md:px-10 py-24 md:py-40 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-grotesk text-[10px] md:text-xs tracking-[0.3em] uppercase text-heart">
            {t.gallery.label}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <h2 className="font-anton uppercase leading-[0.95] text-bone text-[12vw] md:text-[7vw]">
            {t.gallery.headingA}{" "}
            <em className="font-serif italic normal-case text-heart">{t.gallery.headingEm}</em>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-sm text-fog leading-relaxed"
          >
            {t.gallery.intro}
          </motion.p>
        </div>

        {/* filters */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-10 md:mb-14">
          {(
            [
              ["all", t.gallery.filters.all],
              ["tattoo", t.gallery.filters.tattoo],
              ["piercing", t.gallery.filters.piercing],
            ] as [Filter, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setFilter(key);
                setActive(null);
              }}
              className={`font-grotesk text-[11px] tracking-[0.22em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                filter === key
                  ? "bg-heart text-ink border-heart"
                  : "border-line text-fog hover:text-bone hover:border-fog"
              }`}
            >
              {label}
              <span className="ml-2 opacity-60">
                {key === "all"
                  ? WORKS.length
                  : WORKS.filter((w) => w.cat === key).length}
              </span>
            </button>
          ))}
          <span className="hidden sm:inline-block w-px h-5 bg-line mx-1" />

          <label className="relative">
            <span className="sr-only">{t.gallery.styleLabel}</span>
            <select
              value={styleFilter ?? ""}
              onChange={(e) => {
                setStyleFilter(e.target.value || null);
                setActive(null);
              }}
              className="appearance-none bg-transparent border border-line text-fog hover:text-bone hover:border-fog focus:outline-none focus:border-heart transition-colors font-grotesk text-[11px] tracking-[0.22em] uppercase px-5 py-2.5 pr-9 cursor-pointer"
            >
              <option value="" className="bg-ink text-bone">
                {t.gallery.styleAll}
              </option>
              {styles.map((s) => (
                <option key={s} value={s} className="bg-ink text-bone">
                  {s}
                </option>
              ))}
            </select>
          </label>

          <span className="ml-auto font-grotesk text-[10px] tracking-[0.25em] uppercase text-fog/70">
            {works.length} {t.gallery.count}
          </span>
        </div>

        {/* masonry */}
        <motion.div layout className="columns-2 lg:columns-3 gap-4 md:gap-5 [column-fill:_balance]">
          <AnimatePresence mode="popLayout">
            {works.map((w, i) => (
              <motion.figure
                layout
                key={w.src}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 6) * 0.05 }}
                className="group relative mb-4 md:mb-5 break-inside-avoid cursor-pointer"
                data-cursor="view"
                onClick={() => open(i)}
              >
                <div
                  className="relative overflow-hidden bg-ink-2"
                  style={{ aspectRatio: `${w.w} / ${w.h}` }}
                >
                  <Image
                    src={w.src}
                    alt={w.title[lang]}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-3 left-3 font-grotesk text-[10px] tracking-[0.25em] text-bone/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`absolute top-3 right-3 w-2 h-2 rounded-full ${
                      w.cat === "piercing" ? "bg-heart" : "bg-bone/60"
                    }`}
                  />
                </div>
                <figcaption className="absolute bottom-0 inset-x-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="font-serif italic text-xl text-bone">{w.title[lang]}</p>
                  <p className="font-grotesk text-[10px] tracking-[0.22em] uppercase text-heart-2 mt-1">
                    {w.style[lang]}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[120] bg-ink/95 backdrop-blur-sm flex items-center justify-center"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={current.title[lang]}
          >
            <button
              onClick={close}
              className="absolute top-5 right-5 md:top-8 md:right-8 z-10 font-grotesk text-[11px] tracking-[0.3em] uppercase text-fog hover:text-heart transition-colors border border-line px-4 py-2"
              aria-label={t.gallery.lightboxClose}
            >
              {t.gallery.lightboxClose} ✕
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 md:left-8 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full border border-line flex items-center justify-center text-bone hover:border-heart hover:text-heart transition-colors"
              aria-label={t.gallery.lightboxPrev}
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 md:right-8 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full border border-line flex items-center justify-center text-bone hover:border-heart hover:text-heart transition-colors"
              aria-label={t.gallery.lightboxNext}
            >
              →
            </button>

            <motion.figure
              key={current.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative max-w-[82vw] md:max-w-[68vw] max-h-[76vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[76vh]">
                <Image
                  src={current.src}
                  alt={current.title[lang]}
                  fill
                  sizes="80vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                <div>
                  <p className="font-serif italic text-2xl text-bone">{current.title[lang]}</p>
                  <p className="font-grotesk text-[10px] tracking-[0.22em] uppercase text-heart mt-1">
                    {current.style[lang]} · {t.gallery.credit}
                  </p>
                </div>
                <p className="font-grotesk text-xs text-fog tabular-nums">
                  {String((active ?? 0) + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
