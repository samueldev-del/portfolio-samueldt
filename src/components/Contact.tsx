"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Link2, Code2 } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";

const socials = [
  {
    icon: Mail,
    label: "contact@samueldt.com",
    href: "mailto:contact@samueldt.com",
  },
  {
    icon: Phone,
    label: "+49 152 19574804",
    href: "tel:+4915219574804",
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
      "Offen für Aufgaben in Cloud und DevOps. Schreib mir gerne — ich freue mich auf dein Team und eure Herausforderungen.",
    cta: "Hallo sagen",
    french: "Französisch",
    german: "Deutsch",
    english: "Englisch",
    native: "Muttersprache",
    levelDe: "B1-Zertifikat 2022, aktuelles Niveau B2",
    fluent: "Fließend",
    footer: "Entwickelt mit Next.js, Tailwind CSS & Framer Motion.",
    formTitle: "Oder sende mir direkt eine Nachricht",
    name: "Name",
    email: "E-Mail",
    message: "Nachricht",
    send: "Nachricht senden",
    sending: "Wird gesendet...",
    success: "Danke! Deine Nachricht wurde sicher übermittelt.",
    error: "Fehler beim Senden. Bitte versuche es erneut.",
  },
  en: {
    eyebrow: "Get in Touch",
    title: "Let's work together.",
    description:
      "Open to a junior position in Cloud/DevOps or full-stack development. Feel free to reach out — I'd love to hear about your team and challenges.",
    cta: "Say Hello",
    french: "French",
    german: "German",
    english: "English",
    native: "Native",
    levelDe: "B1 certificate 2022, current level B2",
    fluent: "Fluent",
    footer: "Built with Next.js, Tailwind CSS & Framer Motion.",
    formTitle: "Or send me a direct message",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send message",
    sending: "Sending...",
    success: "Thanks! Your message was submitted securely.",
    error: "Failed to send message. Please try again.",
  },
};

export default function Contact({ lang }: ContactProps) {
  const t = copy[lang];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow={t.eyebrow}
          headingA={t.title}
          intro={t.description}
          centered
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-8 text-center"
        >
          <a
            href="mailto:contact@samueldt.com"
            className="inline-flex rounded-full bg-ember px-8 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-ember-2 hover:shadow-lift"
          >
            {t.cta}
          </a>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mx-auto mt-12 max-w-2xl rounded-2xl border border-line bg-card p-6 shadow-card sm:p-7"
        >
          <h3 className="font-display text-xl text-ink">{t.formTitle}</h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-xs font-medium text-ink-3">
              {t.name}
              <input
                name="name"
                required
                autoComplete="name"
                className="rounded-lg border border-field bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-ember"
              />
            </label>
            <label className="grid gap-1.5 text-xs font-medium text-ink-3">
              {t.email}
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="rounded-lg border border-field bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-ember"
              />
            </label>
          </div>

          <label className="mt-4 grid gap-1.5 text-xs font-medium text-ink-3">
            {t.message}
            <textarea
              name="message"
              required
              rows={5}
              className="rounded-lg border border-field bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-ember"
            />
          </label>

          {/* Honeypot field: hidden from humans, traps automated bots. */}
          <input
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-ink-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? t.sending : t.send}
            </button>

            {/* The outcome is announced rather than only shown: the live region
                exists before the submit, so a screen reader reports the result
                instead of leaving the user waiting on a silent page. */}
            <p role="status" aria-live="polite" className="text-xs break-words">
              {status === "success" && <span className="text-sage">{t.success}</span>}
              {status === "error" && <span className="text-ember-2">{t.error}</span>}
            </p>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="flex items-center gap-3 rounded-xl border border-line bg-card p-4 text-sm break-all text-ink-2 shadow-card transition duration-300 hover:-translate-y-0.5 hover:text-ink hover:shadow-lift"
            >
              <item.icon size={16} className="shrink-0 text-ember" />
              {item.label}
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-12 flex flex-col items-center gap-2 text-sm text-ink-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6"
        >
          <span>
            <strong className="font-semibold text-ink">{t.french}</strong> - {t.native}
          </span>
          {/* Separators only make sense once the three sit on one line. */}
          <span className="hidden text-line-2 sm:inline">|</span>
          <span className="text-center">
            <strong className="font-semibold text-ink">{t.german}</strong> - {t.levelDe}
          </span>
          <span className="hidden text-line-2 sm:inline">|</span>
          <span>
            <strong className="font-semibold text-ink">{t.english}</strong> - {t.fluent}
          </span>
        </motion.div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl border-t border-line pt-8 text-center">
        <p className="text-xs text-ink-3" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} Samuel Djommou Thengho. {t.footer}
        </p>
      </div>
    </section>
  );
}
