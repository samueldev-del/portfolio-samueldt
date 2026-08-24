"use client";

import { motion } from "framer-motion";
import { Cloud, Server, Code, Shield } from "lucide-react";
import type { Lang } from "@/lib/i18n";

type AboutProps = {
  lang: Lang;
};

const highlights = {
  de: [
    {
      icon: Cloud,
      title: "Cloud-Infrastruktur",
      description:
        "AWS (IAM, S3, Lambda, EventBridge, ECS, VPC, ALB) und STACKIT — eigenverantwortlich aufgebaut und betrieben",
    },
    {
      icon: Server,
      title: "CI/CD & Infrastructure as Code",
      description:
        "GitHub Actions und Terraform im eigenen Projekt eingesetzt: sechs blockierende Prüfungen pro PR, AWS-Infrastruktur vollständig in Code",
    },
    {
      icon: Code,
      title: "Fullstack-Praxis",
      description:
        "Next.js, React, Node.js, TypeScript — drei Projekte live auf Vercel, Render und Netlify",
    },
    {
      icon: Shield,
      title: "Betrieb & Monitoring",
      description:
        "CloudWatch-Alarme, Sentry, Budget-Alerts — ich will von Problemen erfahren, bevor jemand anderes sie meldet",
    },
  ],
  en: [
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description:
        "AWS (IAM, S3, Lambda, EventBridge, ECS, VPC, ALB) and STACKIT — built and operated on my own responsibility",
    },
    {
      icon: Server,
      title: "CI/CD & Infrastructure as Code",
      description:
        "GitHub Actions and Terraform used on my own project: six blocking checks per PR, AWS infrastructure fully described in code",
    },
    {
      icon: Code,
      title: "Fullstack practice",
      description:
        "Next.js, React, Node.js, TypeScript — three projects live on Vercel, Render and Netlify",
    },
    {
      icon: Shield,
      title: "Operations & Monitoring",
      description:
        "CloudWatch alarms, Sentry, budget alerts — I want to hear about problems before anyone else reports them",
    },
  ],
};

const copy = {
  de: {
    eyebrow: "Über mich",
    headingA: "Messen statt vermuten —",
    headingB: "und jede Änderung umkehrbar.",
    p1: "Ausgebildet in der Systemintegration, automatisiere ich heute die Softwareauslieferung vom Commit bis zum Alarm. Zwei Jahre, in denen ich Verfügbarkeit und Wiederherstellbarkeit von SQL-Server-Datenbanken im Produktivbetrieb sicherzustellen hatte, haben mich gelehrt, zuerst in Fehlerbildern zu denken.",
    p2: "Eine vollständige AWS-Umgebung mit Terraform, ECS Fargate, Lambda und CloudWatch habe ich eigenverantwortlich aufgebaut und betrieben. MyMifa nutze ich täglich selbst — und genau deshalb liegen dort eine CI-Pipeline, Infrastruktur als Code und Alarme drumherum: weil es weh tut, wenn es kaputt geht.",
    p3: "Zertifizierter STACKIT Cloud Engineer bei Schwarz Digits. Meine Arbeitsweise: messen statt vermuten, und jede Änderung reproduzierbar und umkehrbar machen.",
  },
  en: {
    eyebrow: "About me",
    headingA: "Measure, don\u2019t assume —",
    headingB: "and keep every change reversible.",
    p1: "Trained in systems integration, I now automate software delivery from the commit to the alarm. Two years spent guaranteeing the availability and recoverability of production SQL Server databases taught me to think in failure modes first.",
    p2: "A complete AWS environment with Terraform, ECS Fargate, Lambda and CloudWatch, built and operated on my own responsibility. I use MyMifa every day myself — which is exactly why it has a CI pipeline, infrastructure as code and alarms around it: because it hurts when it breaks.",
    p3: "Certified STACKIT Cloud Engineer at Schwarz Digits. The way I work: measure instead of assume, and make every change reproducible and reversible.",
  },
};

export default function About({ lang }: AboutProps) {
  const t = copy[lang];

  return (
    <section id="about" className="px-5 py-16 sm:px-8 sm:py-24">
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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 max-w-3xl space-y-4 text-[15px] leading-relaxed text-[#a0b0c8]"
        >
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights[lang].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="group rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition hover:border-[#f0a050]/30 hover:bg-white/[0.04]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0a050]/10 text-[#f0a050] transition group-hover:bg-[#f0a050]/20">
                <item.icon size={20} />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#7e8ea6]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
