"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060810]/80 backdrop-blur-xl border-b border-white/8 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#"
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-white"
        >
          <Image src="/logo.svg" alt="SDT Logo" width={32} height={32} />
          samuel<span className="text-[#f0a050]">DT</span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-[#b0bdd0] transition hover:text-white hover:bg-white/5"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a
              href="/Samuel_Djommou_ThenghoCV.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-[#f0a050]/50 bg-[#f0a050]/10 px-4 py-2 text-sm font-medium text-[#f8c882] transition hover:bg-[#f0a050]/20"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-[#b0bdd0] transition hover:text-white md:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/8 bg-[#060810]/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pb-5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-[#b0bdd0] transition hover:text-white hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="/Samuel_Djommou_ThenghoCV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border border-[#f0a050]/50 bg-[#f0a050]/10 px-4 py-2.5 text-center text-sm font-medium text-[#f8c882]"
                >
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
