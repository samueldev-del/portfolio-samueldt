"use client";

import { motion } from "framer-motion";
import { Cloud, Server, Code, Shield } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";

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
    <section id="about" className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t.eyebrow}
          headingA={t.headingA}
          headingB={t.headingB}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 max-w-2xl space-y-5 text-[16px] leading-[1.8] text-ink-2"
        >
          {/* The opening paragraph gets a drop cap — one small typographic
              flourish that says a person laid this page out. */}
          <p className="first-letter:float-left first-letter:mt-1 first-letter:mr-2.5 first-letter:font-display first-letter:text-[3.4rem] first-letter:leading-[0.8] first-letter:text-ember">
            {t.p1}
          </p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights[lang].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className="group rounded-2xl border border-line bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-wash text-ember transition group-hover:bg-ember group-hover:text-white">
                <item.icon size={20} />
              </div>
              <h3 className="mt-5 font-display text-lg text-ink">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-3">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
