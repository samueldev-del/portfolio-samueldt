"use client";

import { motion } from "framer-motion";
import type { Lang } from "@/lib/i18n";

type SkillCategory = {
  name: string;
  color: string;
  skills: string[];
};

const categories: SkillCategory[] = [
  {
    name: "Cloud",
    color: "#f0a050",
    skills: [
      "Azure (AAD, RBAC, Monitor, Synapse)",
      "STACKIT (certified)",
      "AWS",
    ],
  },
  {
    name: "Container & IaC",
    color: "#19b1ba",
    skills: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "Ansible",
      "Cloud Foundry",
    ],
  },
  {
    name: "Automation",
    color: "#e8734a",
    skills: ["n8n", "Jenkins", "GitHub Actions", "CI/CD", "GitOps"],
  },
  {
    name: "OS & Virtualization",
    color: "#a78bfa",
    skills: [
      "Linux (Ubuntu, RHEL)",
      "Windows Server (AD, GPO)",
      "VMware",
    ],
  },
  {
    name: "Networking & Security",
    color: "#f472b6",
    skills: [
      "VLANs",
      "VPN",
      "Cisco Routing/Switching",
      "Firewall",
      "Zero Trust",
    ],
  },
  {
    name: "Development",
    color: "#34d399",
    skills: [
      "Python",
      "Bash",
      "PowerShell",
      "JavaScript/TypeScript",
      "SQL",
      "Flutter/Dart",
    ],
  },
  {
    name: "Monitoring",
    color: "#fbbf24",
    skills: [
      "Sentry (Full-Stack)",
      "Zabbix",
      "Azure Monitor",
      "Power BI",
    ],
  },
  {
    name: "Database",
    color: "#60a5fa",
    skills: [
      "PostgreSQL",
      "Serverless SQL (Neon)",
      "Prisma ORM",
      "Firebase / Firestore",
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
    more: "mehr",
    certs: [
      "Certified STACKIT Cloud Engineer — Schwarz Digits",
      "AI Fluency: Framework & Foundations — Anthropic",
      "Azure AZ-900 (in Vorbereitung)",
      "AWS Cloud Practitioner (in Vorbereitung)",
      "CompTIA Security+ (in Vorbereitung)",
    ],
  },
  en: {
    eyebrow: "Technical Skills",
    headingA: "Tools & technologies",
    headingB: "I work with.",
    certTitle: "Certifications & Training",
    more: "more",
    certs: [
      "Certified STACKIT Cloud Engineer — Schwarz Digits",
      "AI Fluency: Framework & Foundations — Anthropic",
      "Azure AZ-900 (in progress)",
      "AWS Cloud Practitioner (in progress)",
      "CompTIA Security+ (in progress)",
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
