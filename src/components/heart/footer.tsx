"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { useLang } from "@/lib/hg-i18n";
import { HeartSvg } from "./motion";
import Ticker from "./ticker";

export default function Footer() {
  const lenis = useLenis();
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line overflow-hidden">
      {/* big typographic marquee */}
      <div className="py-10 md:py-14 overflow-hidden select-none" aria-hidden>
        <div
          className="flex w-max animate-marquee"
          style={{ ["--marquee-duration" as string]: "32s" }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0">
              {t.footer.marquee.map((txt, i) => (
                <span
                  key={`${copy}-${i}`}
                  className={`whitespace-nowrap px-4 md:px-6 ${
                    txt === "♥"
                      ? "text-heart text-[6vw] md:text-[3.5vw] animate-heartbeat"
                      : "font-anton text-[10vw] md:text-[5.5vw] leading-none uppercase text-bone"
                  }`}
                >
                  {txt}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Ticker items={t.ticker.items2} duration={34} variant="ghost" reverse />

      {/* studio seal */}
      <div className="flex justify-center pb-10 md:pb-14 -mt-2" aria-hidden>
        <Image
          src="/images/hg/logo.png"
          alt=""
          width={560}
          height={586}
          className="w-16 md:w-20 h-auto opacity-90"
        />
      </div>

      <div className="px-5 md:px-10 py-8 border-t border-line flex flex-col md:flex-row items-center justify-between gap-5 font-grotesk text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-fog">
        <p className="flex items-center gap-2">
          © {year} {t.footer.rights}
          <HeartSvg className="w-3 h-3 text-heart" />
        </p>
        <p className="font-serif italic normal-case tracking-normal text-fog text-sm">
          {t.footer.tagline}
        </p>
        <a
          href="https://sik-lab.com/"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 hover:text-bone transition-colors"
          aria-label="SIK-LAB"
        >
          {t.footer.madeBy} —{" "}
          <span className="text-bone/80 group-hover:text-heart transition-colors">SIK—LAB</span>
          <ArrowUpRight
            className="w-3.5 h-3.5 opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:text-heart group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.5}
          />
        </a>
        <button
          onClick={() => lenis?.scrollTo(0, { duration: 1.8 })}
          className="group flex items-center gap-3 hover:text-bone transition-colors"
          aria-label={t.footer.backToTop}
        >
          {t.footer.backToTop}
          <span className="flex items-center justify-center w-9 h-9 rounded-full border border-line group-hover:border-heart group-hover:bg-heart group-hover:text-ink transition-all duration-300">
            <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.5} />
          </span>
        </button>
      </div>
    </footer>
  );
}
