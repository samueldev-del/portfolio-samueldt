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
    role: "Junior DevOps / Cloud Engineer (Quereinsteiger)",
    role2: "Fullstack-Praxis",
    description:
      "Quereinsteiger im DevOps-Bereich mit zertifizierten Grundlagen (STACKIT) und mehreren selbst deployten Live-Projekten. Ich konzipiere, deploye und betreibe eigene Web-Anwendungen und entwickle mich gezielt zum DevOps Engineer weiter.",
    ctaProjects: "Projekte ansehen",
    ctaContact: "Kontakt aufnehmen",
  },
  en: {
    openToWork: "Open to work — Cloud / DevOps",
    role: "Junior DevOps / Cloud Engineer (Career Changer)",
    role2: "Fullstack Practice",
    description:
      "Career changer into DevOps with certified foundations (STACKIT) and several self-deployed live projects. I design, deploy, and operate my own web applications while actively growing into the DevOps Engineer role.",
    ctaProjects: "View Projects",
    ctaContact: "Get in Touch",
  },
};

export default function Hero({ lang }: HeroProps) {
  const t = copy[lang];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-20 sm:px-8">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-32 h-[500px] w-[500px] rounded-full bg-[#f0a050]/20 blur-[140px]" />
        <div className="absolute -right-32 top-[30%] h-[400px] w-[400px] rounded-full bg-[#19b1ba]/15 blur-[120px]" />
        <div className="absolute bottom-0 left-[30%] h-[350px] w-[350px] rounded-full bg-[#f0a050]/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-4xl text-center min-w-0">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8"
        >
          <div className="relative mx-auto h-32 w-32 sm:h-36 sm:w-36">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#f0a050] via-[#e8734a] to-[#19b1ba] opacity-70 blur-sm" />
            <Image
              src="/samuel.JPG"
              alt="Samuel Djommou Thengho"
              width={144}
              height={144}
              priority
              className="relative h-full w-full rounded-full object-cover border-2 border-white/10"
            />
          </div>
        </motion.div>

        {/* Name & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="mb-3 flex flex-wrap items-center justify-center gap-2 px-2 text-xs sm:text-sm text-[#19b1ba]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#19b1ba] animate-pulse" />
            {t.openToWork}
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Samuel Djommou
            <br />
            <span className="bg-gradient-to-r from-[#f0a050] via-[#f8c882] to-[#19b1ba] bg-clip-text text-transparent">
              Thengho
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-5 max-w-xl text-base font-medium text-[#a0b0c8] sm:text-xl"
        >
          {t.role} <span className="text-[#6b7a92]">|</span> {t.role2}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#7e8ea6]"
        >
          {t.description}
        </motion.p>

        {/* Location & Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm text-[#7e8ea6]"
        >
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-[#f0a050]" />
            Hamburg, Germany
          </span>
          <a
            href="mailto:contact@samueldt.com"
            className="flex items-center gap-1.5 transition hover:text-white"
          >
            <Mail size={14} className="text-[#f0a050]" />
            contact@samueldt.com
          </a>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="w-full rounded-xl bg-gradient-to-r from-[#f0a050] to-[#e8734a] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#f0a050]/20 transition hover:shadow-[#f0a050]/30 hover:brightness-110 sm:w-auto"
          >
            {t.ctaProjects}
          </a>
          <a
            href="#contact"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium text-[#d0daea] transition hover:bg-white/10 hover:text-white sm:w-auto"
          >
            {t.ctaContact}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-[#5a6a82] transition hover:text-[#a0b0c8]"
          >
            <ArrowDown size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
