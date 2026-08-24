"use client";

import { motion } from "framer-motion";
import type { Lang } from "@/lib/i18n";

type SkillCategory = {
  name: string;
  color: string;
  skills: string[];
  note?: string;
};

type SkillCategoryByLang = Record<Lang, SkillCategory[]>;

const categoriesByLang: SkillCategoryByLang = {
  de: [
    {
      name: "CI/CD",
      color: "#e8734a",
      skills: ["GitHub Actions", "GitLab CI", "GHCR", "Rulesets & blockierende Prüfungen"],
    },
    {
      name: "Container",
      color: "#19b1ba",
      skills: ["Docker", "Docker Compose", "ECS Fargate"],
    },
    {
      name: "Orchestrierung",
      color: "#60a5fa",
      note: "Deklarative Manifeste, Rolling Updates, Rollback",
      skills: ["Kubernetes", "kind", "kubectl"],
    },
    {
      name: "Infrastructure as Code",
      color: "#f0a050",
      note: "Remote State, Module, kontrollierte Plan- und Apply-Läufe",
      skills: ["Terraform"],
    },
    {
      name: "Konfigurationsmanagement",
      color: "#a78bfa",
      note: "Wiederverwendbare Rollen, Handler, Variablen-Präzedenz",
      skills: ["Ansible", "Jinja2", "ansible-vault", "ansible-lint"],
    },
    {
      name: "AWS",
      color: "#fbbf24",
      note: "Im eigenen Projekt aufgebaut und betrieben",
      skills: ["IAM", "S3", "Lambda", "EventBridge", "SSM Parameter Store", "CloudWatch", "ECS", "VPC", "ALB"],
    },
    {
      name: "Observability",
      color: "#f472b6",
      skills: ["CloudWatch (Metriken, Alarme, Logs)", "SNS", "Sentry"],
    },
    {
      name: "Sicherheit",
      color: "#34d399",
      skills: ["gitleaks", "Secret Scanning", "Least Privilege", "Verschlüsselung at rest & in transit"],
    },
    {
      name: "Sprachen",
      color: "#818cf8",
      skills: ["JavaScript / TypeScript", "SQL / T-SQL", "Bash"],
    },
    {
      name: "Frameworks & Datenbanken",
      color: "#2dd4bf",
      skills: ["Node.js", "Express", "Next.js", "PostgreSQL", "Microsoft SQL Server"],
    },
    {
      name: "Qualitätssicherung",
      color: "#c084fc",
      skills: ["Unit- & Integrationstests", "Smoke-Tests nach dem Deployment"],
    },
    {
      name: "Werkzeuge",
      color: "#94a3b8",
      skills: ["Git", "GitHub CLI", "actionlint", "hadolint", "AWS CLI", "psql", "rsync over SSH"],
    },
  ],
  en: [
    {
      name: "CI/CD",
      color: "#e8734a",
      skills: ["GitHub Actions", "GitLab CI", "GHCR", "Rulesets & blocking checks"],
    },
    {
      name: "Containers",
      color: "#19b1ba",
      skills: ["Docker", "Docker Compose", "ECS Fargate"],
    },
    {
      name: "Orchestration",
      color: "#60a5fa",
      note: "Declarative manifests, rolling updates, rollback",
      skills: ["Kubernetes", "kind", "kubectl"],
    },
    {
      name: "Infrastructure as Code",
      color: "#f0a050",
      note: "Remote state, modules, controlled plan and apply runs",
      skills: ["Terraform"],
    },
    {
      name: "Configuration management",
      color: "#a78bfa",
      note: "Reusable roles, handlers, variable precedence",
      skills: ["Ansible", "Jinja2", "ansible-vault", "ansible-lint"],
    },
    {
      name: "AWS",
      color: "#fbbf24",
      note: "Built and operated on my own project",
      skills: ["IAM", "S3", "Lambda", "EventBridge", "SSM Parameter Store", "CloudWatch", "ECS", "VPC", "ALB"],
    },
    {
      name: "Observability",
      color: "#f472b6",
      skills: ["CloudWatch (metrics, alarms, logs)", "SNS", "Sentry"],
    },
    {
      name: "Security",
      color: "#34d399",
      skills: ["gitleaks", "Secret scanning", "Least privilege", "Encryption at rest & in transit"],
    },
    {
      name: "Languages",
      color: "#818cf8",
      skills: ["JavaScript / TypeScript", "SQL / T-SQL", "Bash"],
    },
    {
      name: "Frameworks & databases",
      color: "#2dd4bf",
      skills: ["Node.js", "Express", "Next.js", "PostgreSQL", "Microsoft SQL Server"],
    },
    {
      name: "Quality assurance",
      color: "#c084fc",
      skills: ["Unit & integration tests", "Post-deployment smoke tests"],
    },
    {
      name: "Tooling",
      color: "#94a3b8",
      skills: ["Git", "GitHub CLI", "actionlint", "hadolint", "AWS CLI", "psql", "rsync over SSH"],
    },
  ],
};

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
      "Certified STACKIT Cloud Engineer — STACKIT University, Schwarz Digits, Neckarsulm (März 2026)",
      "STACKIT University — STACKIT Product Fundamentals, DevOps Fundamentals, Terraform Fundamentals, Cloud Foundry Fundamentals, Deploying an Application with STACKIT Kubernetes Engine, Kubernetes Fundamentals, Docker Fundamentals, Linux Fundamentals (März 2026)",
      "AI Fluency: Framework and Foundations — Anthropic, in Partnerschaft mit University College Cork (2026)",
      "Microsoft SQL Server Administration — KiawiTechIT Academy, über 600 Stunden (Okt. 2022 — Jan. 2023)",
      "Deutschzertifikat Niveau B1 — Anglo-German Institut, Stuttgart (2022); aktuelles Niveau B2",
    ],
  },
  en: {
    eyebrow: "Technical Skills",
    headingA: "Tools & technologies",
    headingB: "I work with.",
    certTitle: "Certifications & Training",
    certs: [
      "Certified STACKIT Cloud Engineer — STACKIT University, Schwarz Digits, Neckarsulm (March 2026)",
      "STACKIT University — STACKIT Product Fundamentals, DevOps Fundamentals, Terraform Fundamentals, Cloud Foundry Fundamentals, Deploying an Application with STACKIT Kubernetes Engine, Kubernetes Fundamentals, Docker Fundamentals, Linux Fundamentals (March 2026)",
      "AI Fluency: Framework and Foundations — Anthropic, in partnership with University College Cork (2026)",
      "Microsoft SQL Server Administration — KiawiTechIT Academy, over 600 hours (Oct 2022 — Jan 2023)",
      "German language certificate level B1 — Anglo-German Institut, Stuttgart (2022); current level B2",
    ],
  },
};

export default function Skills({ lang }: SkillsProps) {
  const t = copy[lang];

  return (
    <section id="skills" className="px-5 py-16 sm:px-8 sm:py-24">
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
          {categoriesByLang[lang].map((cat, i) => (
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
