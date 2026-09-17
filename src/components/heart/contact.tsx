"use client";

import { motion } from "framer-motion";
import { Instagram, Mail, MapPin, Facebook, Clock, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { EASE, HeartSvg } from "./motion";
import { useLang } from "@/lib/hg-i18n";

export default function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "error");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "error");
    }
  }

  const field =
    "w-full bg-transparent border-b border-line py-3.5 text-bone placeholder:text-fog/50 focus:outline-none focus:border-heart transition-colors";

  return (
    <section id="contacto" className="relative px-5 md:px-10 py-24 md:py-40 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-grotesk text-[10px] md:text-xs tracking-[0.3em] uppercase text-heart">
            {t.contact.label}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-anton uppercase leading-[0.95] text-bone text-[13vw] md:text-[8vw] mb-6 md:mb-8"
        >
          {t.contact.headingA}{" "}
          <em className="font-serif italic normal-case text-heart">{t.contact.headingEm}</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="max-w-xl text-fog leading-relaxed md:text-lg mb-16 md:mb-24"
        >
          {t.contact.sub}
        </motion.p>

        <div className="grid md:grid-cols-12 gap-14 md:gap-16">
          {/* form */}
          <div className="md:col-span-7">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="border border-line bg-ink-2 px-8 py-14 flex flex-col items-center text-center gap-5"
                role="status"
              >
                <span className="flex items-center justify-center w-14 h-14 rounded-full bg-heart text-ink">
                  <HeartSvg className="w-6 h-6" />
                </span>
                <p className="font-anton text-3xl text-bone uppercase">{t.contact.successTitle}</p>
                <p className="text-fog max-w-sm leading-relaxed">{t.contact.successText}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 font-grotesk text-[11px] tracking-[0.25em] uppercase text-heart hover:text-heart-2 transition-colors link-line"
                >
                  {t.contact.sendAnother}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-9" noValidate>
                <div className="grid sm:grid-cols-2 gap-9">
                  <div>
                    <label htmlFor="hg-name" className="block font-grotesk text-[10px] tracking-[0.25em] uppercase text-fog mb-1">
                      {t.contact.name}
                    </label>
                    <input id="hg-name" name="name" type="text" required placeholder={t.contact.namePh} className={field} />
                  </div>
                  <div>
                    <label htmlFor="hg-email" className="block font-grotesk text-[10px] tracking-[0.25em] uppercase text-fog mb-1">
                      {t.contact.email}
                    </label>
                    <input id="hg-email" name="email" type="email" required placeholder={t.contact.emailPh} className={field} />
                  </div>
                </div>
                <div>
                  <label htmlFor="hg-message" className="block font-grotesk text-[10px] tracking-[0.25em] uppercase text-fog mb-1">
                    {t.contact.message}
                  </label>
                  <textarea id="hg-message" name="message" required rows={5} placeholder={t.contact.messagePh} className={`${field} resize-none`} />
                </div>
                {status === "error" && (
                  <p className="text-heart text-sm" role="alert">
                    {error} {t.contact.tryAgain}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-3 bg-heart text-ink font-grotesk text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-heart-2 transition-colors disabled:opacity-60"
                >
                  {status === "sending" ? t.contact.sending : t.contact.send}
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.75} />
                </button>
              </form>
            )}
          </div>

          {/* info */}
          <div className="md:col-span-5 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <Image
                src="/images/hg/logo.png"
                alt="HeartGallery Tattoo & Piercing — logótipo"
                width={560}
                height={586}
                className="w-20 md:w-24 h-auto"
              />
            </motion.div>

            <motion.a
              href="https://www.instagram.com/heartgallerytattoopiercing/"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="group flex items-center justify-between gap-5 border border-heart/50 bg-heart/10 hover:bg-heart transition-colors duration-300 px-6 py-5"
            >
              <span>
                <span className="block font-grotesk text-[10px] tracking-[0.3em] uppercase text-heart group-hover:text-ink transition-colors">
                  {t.contact.igCtaLabel}
                </span>
                <span className="block font-anton uppercase text-xl md:text-2xl text-bone group-hover:text-ink transition-colors mt-1">
                  {t.contact.igCtaTitle}
                </span>
                <span className="block text-fog group-hover:text-ink/80 transition-colors text-sm mt-1 max-w-xs">
                  {t.contact.igCtaText}
                </span>
              </span>
              <Instagram
                className="w-6 h-6 shrink-0 text-heart group-hover:text-ink group-hover:scale-110 transition-all"
                strokeWidth={1.75}
              />
            </motion.a>

            <div>
              <p className="font-grotesk text-[10px] tracking-[0.3em] uppercase text-heart mb-4 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" strokeWidth={1.75} /> {t.contact.infoTitle}
              </p>
              <p className="text-bone text-lg leading-snug">{t.contact.address}</p>
              <p className="text-fog">{t.contact.addressCity}</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rua+M%C3%A1rtires+da+Liberdade+132A%2C+4050-359+Porto%2C+Portugal"
                target="_blank"
                rel="noreferrer"
                className="block mt-4 border border-line hover:border-heart/60 transition-colors overflow-hidden group"
                aria-label={t.contact.mapTitle}
              >
                <iframe
                  title={t.contact.mapTitle}
                  src="https://www.google.com/maps?q=Rua+M%C3%A1rtires+da+Liberdade+132A%2C+4050-359+Porto%2C+Portugal&output=embed"
                  width="100%"
                  height="220"
                  loading="lazy"
                  className="grayscale-[60%] contrast-125 group-hover:grayscale-0 transition-all duration-500 pointer-events-none"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </a>
            </div>
            <div>
              <p className="font-grotesk text-[10px] tracking-[0.3em] uppercase text-heart mb-4 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" strokeWidth={1.75} /> {t.contact.hoursTitle}
              </p>
              <p className="text-bone text-lg">{t.contact.hoursValue}</p>
              <p className="text-fog">{t.contact.hoursNote}</p>
            </div>
            <div>
              <p className="font-grotesk text-[10px] tracking-[0.3em] uppercase text-heart mb-4 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" strokeWidth={1.75} /> {t.contact.booking}
              </p>
              <p className="text-fog mb-4">{t.contact.bookingVia}</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:heartgallerytattoo@gmail.com"
                    className="group inline-flex items-center gap-3 text-bone hover:text-heart transition-colors"
                  >
                    <Mail className="w-4 h-4 text-fog group-hover:text-heart transition-colors" strokeWidth={1.75} />
                    <span className="link-line">heartgallerytattoo@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/heartgallerytattoopiercing/"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 text-bone hover:text-heart transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-fog group-hover:text-heart transition-colors" strokeWidth={1.75} />
                    <span className="link-line">@heartgallerytattoopiercing</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/heartgallerytattoo/"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 text-bone hover:text-heart transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-fog group-hover:text-heart transition-colors" strokeWidth={1.75} />
                    <span className="link-line">/heartgallerytattoo</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
