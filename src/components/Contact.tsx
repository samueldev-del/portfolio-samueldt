"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Link2, Code2 } from "lucide-react";
import type { Lang } from "@/lib/i18n";

const socials = [
  {
    icon: Mail,
    label: "contact@samueldt.com",
    href: "mailto:contact@samueldt.com",
  },
  {
    icon: Phone,
    label: "+49 151 24862693",
    href: "tel:+4915124862693",
  },
  {
    icon: MapPin,
    label: "Hamburg, Germany",
    href: "#",
  },
  {
    icon: Globe,
    label: "dtsfuture.com",
    href: "https://dtsfuture.com",
  },
  {
    icon: Code2,
    label: "GitHub",
    href: "https://github.com/samueldev-del",
  },
  {
    icon: Link2,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samuel-djommou-thengho-b57943400",
  },
];

type ContactProps = {
  lang: Lang;
};

const copy = {
  de: {
    eyebrow: "Kontakt",
    title: "Lass uns zusammenarbeiten.",
    description:
      "Offen fur feste Positionen in Cloud/DevOps oder Fullstack-Entwicklung. Schreib mir gerne - ich freue mich auf dein Team und eure Herausforderungen.",
    cta: "Hallo sagen",
    french: "Franzosisch",
    german: "Deutsch",
    english: "Englisch",
    native: "Muttersprache",
    levelDe: "B1 Beruflich",
    fluent: "Flieend",
    footer: "Entwickelt mit Next.js, Tailwind CSS & Framer Motion.",
  },
  en: {
    eyebrow: "Get in Touch",
    title: "Let's work together.",
    description:
      "Open for permanent roles in Cloud/DevOps or fullstack development. Feel free to reach out - I'd love to hear about your team and challenges.",
    cta: "Say Hello",
    french: "French",
    german: "German",
    english: "English",
    native: "Native",
    levelDe: "B1 Professional",
    fluent: "Fluent",
    footer: "Built with Next.js, Tailwind CSS & Framer Motion.",
  },
};

export default function Contact({ lang }: ContactProps) {
  const t = copy[lang];

  return (
    <section id="contact" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#f0a050]">{t.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{t.title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#7e8ea6]">{t.description}</p>

          <motion.a
            href="mailto:contact@samueldt.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-[#f0a050] to-[#e8734a] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#f0a050]/20 transition hover:shadow-[#f0a050]/30"
          >
            {t.cta}
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4 text-sm text-[#a0b0c8] transition hover:border-white/15 hover:text-white"
            >
              <item.icon size={16} className="shrink-0 text-[#f0a050]" />
              {item.label}
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[#7e8ea6]"
        >
          <span>
            <strong className="text-white">{t.french}</strong> - {t.native}
          </span>
          <span className="text-white/20">|</span>
          <span>
            <strong className="text-white">{t.german}</strong> - {t.levelDe}
          </span>
          <span className="text-white/20">|</span>
          <span>
            <strong className="text-white">{t.english}</strong> - {t.fluent}
          </span>
        </motion.div>
      </div>

      <div className="mx-auto mt-24 max-w-6xl border-t border-white/8 pt-8 text-center">
        <p className="text-xs text-[#5a6a82]">
          &copy; {new Date().getFullYear()} Samuel Djommou Thengho. {t.footer}
        </p>
      </div>
    </section>
  );
}
