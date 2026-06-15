"use client";

import { motion } from "framer-motion";
import type { Lang } from "@/lib/i18n";

type SkillCategory = {
  name: string;
  color: string;
  skills: string[];
  note?: string;
};

const categories: SkillCategory[] = [
  {
    name: "Cloud",
    color: "#f0a050",
    skills: [
      "STACKIT (zertifiziert)",
      "Azure (AZ-900, in Vorbereitung)",
    ],
  },
  {
    name: "Container & IaC",
    color: "#19b1ba",
    note: "Grundlagen zertifiziert (STACKIT University)",
    skills: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "Cloud Foundry",
    ],
  },
  {
    name: "CI/CD & Git",
    color: "#e8734a",
    skills: [
      "Git / GitHub",
      "Vercel (Deploy)",
      "Render (Deploy)",
      "GitHub Actions (lernend)",
    ],
  },
  {
    name: "OS & Scripting",
    color: "#a78bfa",
    skills: [
      "Linux (Ubuntu)",
      "Windows",
      "Bash",
    ],
  },
  {
    name: "Development",
    color: "#34d399",
    skills: [
      "JavaScript / TypeScript",
      "Python (Grundlagen)",
      "HTML / CSS",
      "SQL",
    ],
  },
  {
    name: "Database",
    color: "#60a5fa",
    skills: [
      "PostgreSQL (Neon)",
      "Prisma ORM",
    ],
  },
  {
    name: "Services",
    color: "#fbbf24",
    note: "Integrationslevel — in eigenen Projekten eingesetzt",
    skills: [
      "Cloudinary",
      "Pusher",
      "Redis (Upstash)",
      "Sentry",
    ],
  },
  {
    name: "In Weiterbildung",
    color: "#f472b6",
    skills: [
      "GitHub Actions / CI/CD",
      "Ansible",
      "Terraform (Vertiefung)",
      "Linux Vertiefung",
      "KI / Prompt Engineering",
    ],
  },
];

type SkillsProps = {
  lang: Lang;
};

const copy = {
  de: {
    eyebrow: "Technische Skills",
    headingA: "Tools & Technologien",
    headingB: "mit denen ich arbeite.",
    certTitle: "Zertifikate & Weiterbildung",
    certs: [
      "Certified STACKIT Cloud Engineer — Schwarz Digits (März 2026)",
      "STACKIT Fundamentals — 7 Kurse abgeschlossen: Linux, Docker, Kubernetes, Terraform, DevOps, Cloud Foundry, STACKIT Products (März 2026)",
      "AI Fluency: Framework & Foundations — Anthropic (2026)",
      "Microsoft SQL Server Database Administration (2023)",
      "Azure AZ-900 — in Vorbereitung",
    ],
  },
  en: {
    eyebrow: "Technical Skills",
    headingA: "Tools & technologies",
    headingB: "I work with.",
    certTitle: "Certifications & Training",
    certs: [
      "Certified STACKIT Cloud Engineer — Schwarz Digits (March 2026)",
      "STACKIT Fundamentals — 7 courses completed: Linux, Docker, Kubernetes, Terraform, DevOps, Cloud Foundry, STACKIT Products (March 2026)",
      "AI Fluency: Framework & Foundations — Anthropic (2026)",
      "Microsoft SQL Server Database Administration (2023)",
      "Azure AZ-900 — in progress",
    ],
  },
};

export default function Skills({ lang }: SkillsProps) {
  const t = copy[lang];

  return (
    <section id="skills" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#f0a050]">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {t.headingA}{" "}
            <span className="text-[#7e8ea6]">{t.headingB}</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="group rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition hover:border-white/15"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <h3 className="text-sm font-semibold text-white">
                  {cat.name}
                </h3>
              </div>
              {cat.note && (
                <p className="mt-1.5 text-[10px] leading-relaxed text-[#5a6a82] italic">
                  {cat.note}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs text-[#a0b0c8] transition group-hover:border-white/12 group-hover:text-[#c0d0e8]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14"
        >
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7e8ea6]">
            {t.certTitle}
          </h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {t.certs.map((cert) => (
              <span
                key={cert}
                className="rounded-full border border-[#f0a050]/20 bg-[#f0a050]/5 px-4 py-2 text-xs text-[#f8c882]"
              >
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
