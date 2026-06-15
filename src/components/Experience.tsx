"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import type { Lang } from "@/lib/i18n";

type TimelineItem = {
  type: "work" | "education";
  title: string;
  company: string;
  period: string;
  bullets: string[];
  stack?: string[];
};

const timelineByLang: Record<Lang, TimelineItem[]> = {
  de: [
    {
      type: "work",
      title: "Lagerist (Logistik)",
      company: "Unternehmen in Hamburg (über Randstad)",
      period: "Mai 2026 — heute",
      bullets: [
        "Aktuelle Anstellung, parallel zur laufenden Weiterqualifizierung im DevOps-/Cloud-Bereich.",
      ],
    },
    {
      type: "work",
      title: "Webentwickler (Freelance)",
      company: "Fiverr — internationale Kundschaft (Odessa, Ukraine)",
      period: "Juni 2021 — Jan. 2022",
      bullets: [
        "Websites und Landingpages für Dropshipping und E-Commerce — internationale Kunden",
        "Conversion-orientierte Interfaces: Produktseiten, Sales Funnels, Zahlungsintegration",
        "Eigenständige Projektabwicklung auf Fiverr mit globaler Kundschaft",
      ],
    },
    {
      type: "education",
      title: "Deutschkurs B1",
      company: "Anglo-German Institut — Stuttgart",
      period: "2022",
      bullets: [],
    },
    {
      type: "education",
      title: "Bachelor — Bank- & Finanzwesen",
      company: "Universität Dschang — Kamerun",
      period: "2017 — 2020",
      bullets: [],
    },
    {
      type: "education",
      title: "Technische Ausbildung — Informatik (Systemintegration)",
      company: "Collège de la Salle — Douala, Kamerun",
      period: "2014 — 2017",
      bullets: [],
    },
  ],
  en: [
    {
      type: "work",
      title: "Warehouse Operative (Logistics)",
      company: "Company in Hamburg (via Randstad)",
      period: "May 2026 — present",
      bullets: [
        "Current position held in parallel with ongoing DevOps / Cloud retraining.",
      ],
    },
    {
      type: "work",
      title: "Web Developer (Freelance)",
      company: "Fiverr — international clients (Odessa, Ukraine)",
      period: "Jun 2021 — Jan 2022",
      bullets: [
        "Websites and landing pages for dropshipping and e-commerce — international clients",
        "Conversion-oriented interfaces: product pages, sales funnels, payment integration",
        "Independent project delivery on Fiverr with global clientele",
      ],
    },
    {
      type: "education",
      title: "German Course B1",
      company: "Anglo-German Institut — Stuttgart",
      period: "2022",
      bullets: [],
    },
    {
      type: "education",
      title: "Bachelor — Banking & Finance",
      company: "University of Dschang — Cameroon",
      period: "2017 — 2020",
      bullets: [],
    },
    {
      type: "education",
      title: "Technical Training — IT (Systems Integration)",
      company: "Collège de la Salle — Douala, Cameroon",
      period: "2014 — 2017",
      bullets: [],
    },
  ],
};

const copy = {
  de: {
    eyebrow: "Erfahrung & Ausbildung",
    headingA: "Wo ich gearbeitet",
    headingB: "& gelernt habe.",
  },
  en: {
    eyebrow: "Experience & Education",
    headingA: "Where I’ve worked",
    headingB: "& learned.",
  },
};

type ExperienceProps = {
  lang: Lang;
};

export default function Experience({ lang }: ExperienceProps) {
  const t = copy[lang];
  const items = timelineByLang[lang];

  return (
    <section id="experience" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
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

        <div className="relative mt-14">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#f0a050]/40 via-white/10 to-transparent" />

          <div className="space-y-10">
            {items.map((item, i) => (
              <motion.div
                key={`${item.title}-${item.period}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="relative pl-12"
              >
                <div
                  className={`absolute left-2.5 top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${
                    item.type === "work"
                      ? "border-[#f0a050] bg-[#f0a050]/20"
                      : "border-[#19b1ba] bg-[#19b1ba]/20"
                  }`}
                >
                  {item.type === "work" ? (
                    <Briefcase size={9} className="text-[#f0a050]" />
                  ) : (
                    <GraduationCap size={9} className="text-[#19b1ba]" />
                  )}
                </div>

                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition hover:border-white/12">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-[#7e8ea6]">
                        {item.company}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[#a0b0c8]">
                      {item.period}
                    </span>
                  </div>

                  {item.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {item.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2 text-sm text-[#a0b0c8]"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#f0a050]/60" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.stack && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-1 text-[11px] text-[#7e8ea6]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
