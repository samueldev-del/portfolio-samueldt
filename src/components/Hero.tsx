"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Mail } from "lucide-react";
import type { Lang } from "@/lib/i18n";

type HeroProps = {
  lang: Lang;
};

const copy = {
  de: {
    openToWork: "Offen für neue Aufgaben — Cloud / DevOps",
    role: "Cloud & DevOps Engineer",
    role2: "Hamburg",
    description:
      "Ich automatisiere die Softwareauslieferung vom Commit bis zum Alarm. Ausgebildet in der Systemintegration, fast drei Jahre Verantwortung für Verfügbarkeit und Wiederherstellbarkeit von SQL-Server-Datenbanken im Produktivbetrieb — das lehrt einen, zuerst in Fehlerbildern zu denken.",
    ctaProjects: "Projekte ansehen",
    ctaContact: "Kontakt aufnehmen",
  },
  en: {
    openToWork: "Open to work — Cloud / DevOps",
    role: "Cloud & DevOps Engineer",
    role2: "Hamburg",
    description:
      "I automate software delivery from the commit to the alarm. Trained in systems integration, then nearly three years responsible for the availability and recoverability of production SQL Server databases — that teaches you to think in failure modes first.",
    ctaProjects: "View Projects",
    ctaContact: "Get in Touch",
  },
};

export default function Hero({ lang }: HeroProps) {
  const t = copy[lang];

  return (
    <section className="relative overflow-hidden px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-24">
      {/* Two soft washes of warm light, nothing that glows. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-24 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(191,83,32,0.10),transparent_65%)]" />
        <div className="absolute top-24 -right-32 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(47,107,79,0.09),transparent_65%)]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        {/* Left column — the words */}
        <div className="min-w-0">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-sage-wash px-3.5 py-1.5 text-xs font-medium text-sage"
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-sage" />
            {t.openToWork}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-[2.6rem] leading-[1.04] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[4.2rem]"
          >
            Samuel Djommou
            <br />
            <span className="marked">Thengho</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg text-ink sm:text-xl"
          >
            {t.role}
            <span className="mx-2.5 text-line-2">·</span>
            <span className="text-ink-2">{t.role2}</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 max-w-xl text-[15px] leading-[1.75] text-ink-2"
          >
            {t.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-3"
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-ember" />
              Hamburg, Germany
            </span>
            <a
              href="mailto:contact@samueldt.com"
              className="flex items-center gap-1.5 transition hover:text-ink"
            >
              <Mail size={14} className="text-ember" />
              contact@samueldt.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="w-full rounded-full bg-ember px-7 py-3.5 text-center text-sm font-semibold text-white shadow-card transition hover:bg-ember-2 hover:shadow-lift sm:w-auto"
            >
              {t.ctaProjects}
            </a>
            <a
              href="#contact"
              className="w-full rounded-full border border-line-2 bg-card px-7 py-3.5 text-center text-sm font-medium text-ink transition hover:bg-paper-2 sm:w-auto"
            >
              {t.ctaContact}
            </a>
          </motion.div>
        </div>

        {/* Right column — the photograph, pinned to the page like a print */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -2.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-[19rem] md:max-w-[21rem]"
        >
          <div className="rounded-[4px] border border-line bg-card p-3 pb-5 shadow-photo">
            <Image
              src="/samuel.JPG"
              alt="Samuel Djommou Thengho"
              width={640}
              height={800}
              priority
              className="aspect-[4/5] w-full rounded-[2px] object-cover"
            />
            <p className="mt-4 text-center font-display text-sm text-ink-3">
              {t.role} — {t.role2}
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="mt-16 flex justify-center"
      >
        <motion.a
          href="#about"
          aria-label={lang === "de" ? "Weiter" : "Continue"}
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="rounded-full border border-line bg-card p-2.5 text-ink-3 shadow-card transition hover:text-ember"
        >
          <ArrowDown size={18} />
        </motion.a>
      </motion.div>
    </section>
  );
}
