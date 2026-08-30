"use client";

import { motion } from "framer-motion";
import type { Lang } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";

/**
 * One entry per category, each translated field carrying both languages. The
 * colour and the ordering then exist once instead of twice, so the two lists
 * cannot drift apart.
 */
type Localized<T> = Record<Lang, T>;

type SkillCategory = {
  name: Localized<string>;
  color: string;
  note?: Localized<string>;
  skills: Localized<string[]>;
};

const categories: SkillCategory[] = [
  {
    "color": "#c2410c",
    "name": {
      "de": "CI/CD & GitOps",
      "en": "CI/CD & GitOps"
    },
    "note": {
      "de": "Pipelines und deklaratives Deployment aus dem Repository",
      "en": "Pipelines and declarative deployment from the repository"
    },
    "skills": {
      "de": [
        "GitHub Actions",
        "GitLab CI",
        "GHCR",
        "ArgoCD",
        "Rulesets & blockierende Prüfungen"
      ],
      "en": [
        "GitHub Actions",
        "GitLab CI",
        "GHCR",
        "ArgoCD",
        "Rulesets & blocking checks"
      ]
    }
  },
  {
    "color": "#0e7490",
    "name": {
      "de": "Container",
      "en": "Containers"
    },
    "skills": {
      "de": [
        "Docker",
        "Docker Compose",
        "ECS Fargate"
      ],
      "en": [
        "Docker",
        "Docker Compose",
        "ECS Fargate"
      ]
    }
  },
  {
    "color": "#1d4ed8",
    "name": {
      "de": "Orchestrierung",
      "en": "Orchestration"
    },
    "note": {
      "de": "Deklarative Manifeste, Helm-Charts, Rolling Updates, Rollback",
      "en": "Declarative manifests, Helm charts, rolling updates, rollback"
    },
    "skills": {
      "de": [
        "Kubernetes",
        "kind",
        "kubectl",
        "Helm",
        "ingress-nginx",
        "ConfigMaps & Secrets",
        "StatefulSets & PVCs",
        "Probes"
      ],
      "en": [
        "Kubernetes",
        "kind",
        "kubectl",
        "Helm",
        "ingress-nginx",
        "ConfigMaps & Secrets",
        "StatefulSets & PVCs",
        "probes"
      ]
    }
  },
  {
    "color": "#b45309",
    "name": {
      "de": "Infrastructure as Code",
      "en": "Infrastructure as Code"
    },
    "note": {
      "de": "Remote State, Module, kontrollierte Plan- und Apply-Läufe",
      "en": "Remote state, modules, controlled plan and apply runs"
    },
    "skills": {
      "de": [
        "Terraform"
      ],
      "en": [
        "Terraform"
      ]
    }
  },
  {
    "color": "#6d28d9",
    "name": {
      "de": "Konfigurationsmanagement",
      "en": "Configuration management"
    },
    "note": {
      "de": "Wiederverwendbare Rollen, Handler, Variablen-Präzedenz",
      "en": "Reusable roles, handlers, variable precedence"
    },
    "skills": {
      "de": [
        "Ansible",
        "Jinja2",
        "ansible-vault",
        "ansible-lint"
      ],
      "en": [
        "Ansible",
        "Jinja2",
        "ansible-vault",
        "ansible-lint"
      ]
    }
  },
  {
    "color": "#a16207",
    "name": {
      "de": "AWS",
      "en": "AWS"
    },
    "note": {
      "de": "Im eigenen Projekt aufgebaut und betrieben",
      "en": "Built and operated on my own project"
    },
    "skills": {
      "de": [
        "IAM",
        "S3",
        "Lambda",
        "EventBridge",
        "SSM Parameter Store",
        "CloudWatch",
        "ECS",
        "VPC",
        "ALB"
      ],
      "en": [
        "IAM",
        "S3",
        "Lambda",
        "EventBridge",
        "SSM Parameter Store",
        "CloudWatch",
        "ECS",
        "VPC",
        "ALB"
      ]
    }
  },
  {
    "color": "#be185d",
    "name": {
      "de": "Observability",
      "en": "Observability"
    },
    "note": {
      "de": "Metriken abfragen und Alarme selbst definieren",
      "en": "Querying metrics and writing the alerting rules myself"
    },
    "skills": {
      "de": [
        "Prometheus",
        "Grafana",
        "PromQL",
        "Alerting Rules",
        "CloudWatch (Metriken, Alarme, Logs)",
        "SNS",
        "Sentry"
      ],
      "en": [
        "Prometheus",
        "Grafana",
        "PromQL",
        "Alerting rules",
        "CloudWatch (metrics, alarms, logs)",
        "SNS",
        "Sentry"
      ]
    }
  },
  {
    "color": "#047857",
    "name": {
      "de": "Sicherheit",
      "en": "Security"
    },
    "skills": {
      "de": [
        "gitleaks",
        "Secret Scanning",
        "Least Privilege",
        "Verschlüsselung at rest & in transit"
      ],
      "en": [
        "gitleaks",
        "Secret scanning",
        "Least privilege",
        "Encryption at rest & in transit"
      ]
    }
  },
  {
    "color": "#4338ca",
    "name": {
      "de": "Sprachen",
      "en": "Languages"
    },
    "skills": {
      "de": [
        "JavaScript / TypeScript",
        "SQL / T-SQL",
        "Bash"
      ],
      "en": [
        "JavaScript / TypeScript",
        "SQL / T-SQL",
        "Bash"
      ]
    }
  },
  {
    "color": "#0f766e",
    "name": {
      "de": "Frameworks & Datenbanken",
      "en": "Frameworks & databases"
    },
    "skills": {
      "de": [
        "Node.js",
        "Express",
        "Next.js",
        "PostgreSQL",
        "Microsoft SQL Server"
      ],
      "en": [
        "Node.js",
        "Express",
        "Next.js",
        "PostgreSQL",
        "Microsoft SQL Server"
      ]
    }
  },
  {
    "color": "#7e22ce",
    "name": {
      "de": "Qualitätssicherung",
      "en": "Quality assurance"
    },
    "skills": {
      "de": [
        "Unit- & Integrationstests",
        "Smoke-Tests nach dem Deployment"
      ],
      "en": [
        "Unit & integration tests",
        "Post-deployment smoke tests"
      ]
    }
  },
  {
    "color": "#475569",
    "name": {
      "de": "Werkzeuge",
      "en": "Tooling"
    },
    "skills": {
      "de": [
        "Git",
        "GitHub CLI",
        "actionlint",
        "hadolint",
        "AWS CLI",
        "psql",
        "rsync over SSH"
      ],
      "en": [
        "Git",
        "GitHub CLI",
        "actionlint",
        "hadolint",
        "AWS CLI",
        "psql",
        "rsync over SSH"
      ]
    }
  }
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
          {categories.map((cat, i) => (
            <motion.div
              key={cat.color}
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
                <h3 className="font-display text-lg text-ink">{cat.name[lang]}</h3>
              </div>
              {cat.note && (
                <p className="mt-1.5 text-xs leading-relaxed text-ink-3 italic">
                  {cat.note[lang]}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.skills[lang].map((skill) => (
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
