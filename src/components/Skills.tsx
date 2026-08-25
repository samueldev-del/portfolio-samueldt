"use client";

import { motion } from "framer-motion";
import type { Lang } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";

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
      color: "#c2410c",
      skills: ["GitHub Actions", "GitLab CI", "GHCR", "Rulesets & blockierende Prüfungen"],
    },
    {
      name: "Container",
      color: "#0e7490",
      skills: ["Docker", "Docker Compose", "ECS Fargate"],
    },
    {
      name: "Orchestrierung",
      color: "#1d4ed8",
      note: "Deklarative Manifeste, Ingress, Rolling Updates, Rollback",
      skills: ["Kubernetes", "kind", "kubectl", "ingress-nginx", "ConfigMaps & Secrets", "Probes"],
    },
    {
      name: "Infrastructure as Code",
      color: "#b45309",
      note: "Remote State, Module, kontrollierte Plan- und Apply-Läufe",
      skills: ["Terraform"],
    },
    {
      name: "Konfigurationsmanagement",
      color: "#6d28d9",
      note: "Wiederverwendbare Rollen, Handler, Variablen-Präzedenz",
      skills: ["Ansible", "Jinja2", "ansible-vault", "ansible-lint"],
    },
    {
      name: "AWS",
      color: "#a16207",
      note: "Im eigenen Projekt aufgebaut und betrieben",
      skills: ["IAM", "S3", "Lambda", "EventBridge", "SSM Parameter Store", "CloudWatch", "ECS", "VPC", "ALB"],
    },
    {
      name: "Observability",
      color: "#be185d",
      skills: ["CloudWatch (Metriken, Alarme, Logs)", "SNS", "Sentry"],
    },
    {
      name: "Sicherheit",
      color: "#047857",
      skills: ["gitleaks", "Secret Scanning", "Least Privilege", "Verschlüsselung at rest & in transit"],
    },
    {
      name: "Sprachen",
      color: "#4338ca",
      skills: ["JavaScript / TypeScript", "SQL / T-SQL", "Bash"],
    },
    {
      name: "Frameworks & Datenbanken",
      color: "#0f766e",
      skills: ["Node.js", "Express", "Next.js", "PostgreSQL", "Microsoft SQL Server"],
    },
    {
      name: "Qualitätssicherung",
      color: "#7e22ce",
      skills: ["Unit- & Integrationstests", "Smoke-Tests nach dem Deployment"],
    },
    {
      name: "Werkzeuge",
      color: "#475569",
      skills: ["Git", "GitHub CLI", "actionlint", "hadolint", "AWS CLI", "psql", "rsync over SSH"],
    },
  ],
  en: [
    {
      name: "CI/CD",
      color: "#c2410c",
      skills: ["GitHub Actions", "GitLab CI", "GHCR", "Rulesets & blocking checks"],
    },
    {
      name: "Containers",
      color: "#0e7490",
      skills: ["Docker", "Docker Compose", "ECS Fargate"],
    },
    {
      name: "Orchestration",
      color: "#1d4ed8",
      note: "Declarative manifests, ingress, rolling updates, rollback",
      skills: ["Kubernetes", "kind", "kubectl", "ingress-nginx", "ConfigMaps & Secrets", "probes"],
    },
    {
      name: "Infrastructure as Code",
      color: "#b45309",
      note: "Remote state, modules, controlled plan and apply runs",
      skills: ["Terraform"],
    },
    {
      name: "Configuration management",
      color: "#6d28d9",
      note: "Reusable roles, handlers, variable precedence",
      skills: ["Ansible", "Jinja2", "ansible-vault", "ansible-lint"],
    },
    {
      name: "AWS",
      color: "#a16207",
      note: "Built and operated on my own project",
      skills: ["IAM", "S3", "Lambda", "EventBridge", "SSM Parameter Store", "CloudWatch", "ECS", "VPC", "ALB"],
    },
    {
      name: "Observability",
      color: "#be185d",
      skills: ["CloudWatch (metrics, alarms, logs)", "SNS", "Sentry"],
    },
    {
      name: "Security",
      color: "#047857",
      skills: ["gitleaks", "Secret scanning", "Least privilege", "Encryption at rest & in transit"],
    },
    {
      name: "Languages",
      color: "#4338ca",
      skills: ["JavaScript / TypeScript", "SQL / T-SQL", "Bash"],
    },
    {
      name: "Frameworks & databases",
      color: "#0f766e",
      skills: ["Node.js", "Express", "Next.js", "PostgreSQL", "Microsoft SQL Server"],
    },
    {
      name: "Quality assurance",
      color: "#7e22ce",
      skills: ["Unit & integration tests", "Post-deployment smoke tests"],
    },
    {
      name: "Tooling",
      color: "#475569",
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
    <section
      id="skills"
      className="relative border-y border-line bg-paper-2 px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t.eyebrow}
          headingA={t.headingA}
          headingB={t.headingB}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoriesByLang[lang].map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.04 * i }}
              className="rounded-2xl border border-line bg-card p-6 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <h3 className="font-display text-lg text-ink">{cat.name}</h3>
              </div>
              {cat.note && (
                <p className="mt-1.5 text-xs leading-relaxed text-ink-3 italic">
                  {cat.note}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-line bg-paper px-2.5 py-1 text-xs text-ink-2"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16"
        >
          <h3 className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-7 bg-ember/45" />
            {t.certTitle}
          </h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.certs.map((cert) => (
              <li
                key={cert}
                className="flex gap-3 rounded-xl border border-line bg-card px-4 py-3.5 text-[13px] leading-relaxed text-ink-2 shadow-card"
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember"
                />
                {cert}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
