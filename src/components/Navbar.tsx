"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { Lang } from "@/lib/i18n";

const links = {
  de: [
    { label: "Über mich", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Erfahrung", href: "#experience" },
    { label: "Projekte", href: "#projects" },
    { label: "Kontakt", href: "#contact" },
  ],
  en: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
};

type NavbarProps = {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
};

export default function Navbar({ lang, onLangChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const resumeHref =
    lang === "de"
      ? "/CV_Samuel_Djommou_Thengho_DE.pdf"
      : "/CV_Samuel_Djommou_Thengho_EN.pdf";
  const resumeOpenLabel = lang === "de" ? "Lebenslauf" : "Resume";
  const resumeDownloadLabel = "Download";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8 sm:py-4">
        <a
          href="#"
          className="flex min-w-0 items-center gap-2.5 text-ink"
        >
          <Image src="/logo.svg" alt="" width={30} height={30} aria-hidden />
          <span className="truncate font-display text-lg tracking-tight sm:text-xl">
            samuel<span className="text-ember">DT</span>
          </span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {links[lang].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link rounded-lg px-3 py-2 text-sm text-ink-2 transition hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mx-3 flex items-center rounded-full border border-line bg-card p-0.5">
            <button
              type="button"
              onClick={() => onLangChange("de")}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                lang === "de"
                  ? "bg-ember-wash text-ember-2"
                  : "text-ink-3 hover:text-ink"
              }`}
            >
              DE
            </button>
            <button
              type="button"
              onClick={() => onLangChange("en")}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                lang === "en"
                  ? "bg-sage-wash text-sage"
                  : "text-ink-3 hover:text-ink"
              }`}
            >
              EN
            </button>
          </li>
          <li className="flex items-center gap-2">
            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-ember px-4 py-2 text-sm font-medium text-white shadow-card transition hover:bg-ember-2"
            >
              {resumeOpenLabel}
            </a>
            <a
              href={resumeHref}
              download
              className="rounded-full border border-line bg-card px-3.5 py-2 text-sm font-medium text-ink-2 transition hover:border-line-2 hover:text-ink"
            >
              {resumeDownloadLabel}
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={
            lang === "de"
              ? mobileOpen
                ? "Menü schließen"
                : "Menü öffnen"
              : mobileOpen
                ? "Close menu"
                : "Open menu"
          }
          aria-expanded={mobileOpen}
          className="rounded-lg border border-line bg-card p-2 text-ink-2 transition hover:text-ink md:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-line bg-paper/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-0.5 px-5 pb-5">
              {links[lang].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-ink-2 transition hover:bg-paper-2 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-3 flex items-center gap-2 rounded-full border border-line bg-card p-1">
                <button
                  type="button"
                  onClick={() => {
                    onLangChange("de");
                    setMobileOpen(false);
                  }}
                  className={`flex-1 rounded-full px-3 py-2 text-xs font-medium transition ${
                    lang === "de" ? "bg-ember-wash text-ember-2" : "text-ink-3"
                  }`}
                >
                  Deutsch
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLangChange("en");
                    setMobileOpen(false);
                  }}
                  className={`flex-1 rounded-full px-3 py-2 text-xs font-medium transition ${
                    lang === "en" ? "bg-sage-wash text-sage" : "text-ink-3"
                  }`}
                >
                  English
                </button>
              </li>
              <li className="mt-2 grid gap-2">
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-full bg-ember px-4 py-2.5 text-center text-sm font-medium text-white"
                >
                  {resumeOpenLabel}
                </a>
                <a
                  href={resumeHref}
                  download
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-full border border-line bg-card px-4 py-2.5 text-center text-sm font-medium text-ink-2"
                >
                  {resumeDownloadLabel}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
