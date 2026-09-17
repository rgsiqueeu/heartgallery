"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE, HeartSvg } from "./motion";
import { useLang } from "@/lib/hg-i18n";
import { STUDIO_IMAGES } from "@/lib/hg-works";

export default function Artists() {
  const { t, lang } = useLang();
  const roles = [t.artists.resident, t.artists.resident, t.artists.manager, t.artists.guests];

  return (
    <section id="artistas" className="relative px-5 md:px-10 py-24 md:py-40 bg-ink-2 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-grotesk text-[10px] md:text-xs tracking-[0.3em] uppercase text-heart">
            {t.artists.label}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-20">
          <h2 className="font-anton uppercase leading-[0.95] text-bone text-[12vw] md:text-[7vw]">
            {t.artists.headingA}{" "}
            <em className="font-serif italic normal-case text-heart">{t.artists.headingEm}</em>{" "}
            {t.artists.headingB}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-sm text-fog leading-relaxed"
          >
            {t.artists.intro}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.artists.members.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.09 }}
              className="group relative border border-line bg-ink hover:border-heart/60 transition-colors duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={STUDIO_IMAGES.artists[i]}
                  alt={m.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-all duration-700 group-hover:scale-[1.05] group-hover:grayscale-0 grayscale-[35%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <span className="absolute top-4 left-4 font-grotesk text-[9px] tracking-[0.25em] uppercase text-bone border border-line bg-ink/70 backdrop-blur px-3 py-1.5">
                  {roles[i]}
                </span>
                <HeartSvg className="absolute top-4 right-4 w-4 h-4 text-heart opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                <h3 className="absolute bottom-4 left-4 right-4 font-anton uppercase text-3xl text-bone leading-none">
                  {m.name}
                </h3>
              </div>
              <div className="p-5 md:p-6">
                <p className="font-grotesk text-[10px] tracking-[0.25em] uppercase text-heart mb-3">
                  {m.role}
                </p>
                <p className="text-fog text-sm leading-relaxed">{m.bio}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {m.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-grotesk text-[9px] tracking-[0.18em] uppercase text-fog border border-line px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.a
          href="https://www.instagram.com/heartgallerytattoopiercing/"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="inline-flex items-center gap-3 mt-12 font-grotesk text-[11px] tracking-[0.25em] uppercase text-fog hover:text-heart transition-colors link-line"
        >
          <HeartSvg className="w-3.5 h-3.5 text-heart" />
          {t.artists.cta}
        </motion.a>
      </div>
    </section>
  );
}
