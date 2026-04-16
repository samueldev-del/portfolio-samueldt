"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Link2, Code2 } from "lucide-react";

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

export default function Contact() {
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
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#f0a050]">
            Get in Touch
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Let&apos;s work together.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#7e8ea6]">
            Open for permanent positions in Cloud/DevOps or fullstack
            development. Feel free to reach out — I&apos;d love to hear about
            your team and challenges.
          </p>

          <motion.a
            href="mailto:contact@samueldt.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-[#f0a050] to-[#e8734a] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#f0a050]/20 transition hover:shadow-[#f0a050]/30"
          >
            Say Hello
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

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[#7e8ea6]"
        >
          <span>
            <strong className="text-white">French</strong> — Native
          </span>
          <span className="text-white/20">|</span>
          <span>
            <strong className="text-white">German</strong> — B1 Professional
          </span>
          <span className="text-white/20">|</span>
          <span>
            <strong className="text-white">English</strong> — Fluent
          </span>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mx-auto mt-24 max-w-6xl border-t border-white/8 pt-8 text-center">
        <p className="text-xs text-[#5a6a82]">
          &copy; {new Date().getFullYear()} Samuel Djommou Thengho. Built with
          Next.js, Tailwind CSS & Framer Motion.
        </p>
      </div>
    </section>
  );
}
