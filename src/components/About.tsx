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
        "STACKIT (zertifiziert), Azure AZ-900 (in Vorbereitung) — zertifizierte Grundlagen, mehrere Live-Projekte deployed",
    },
    {
      icon: Server,
      title: "DevOps — Grundlagen",
      description:
        "Docker, Kubernetes, Terraform, Cloud Foundry — zertifizierte Grundlagen (STACKIT University); GitHub Actions in Weiterbildung",
    },
    {
      icon: Code,
      title: "Fullstack-Entwicklung",
      description:
        "Next.js, React, Node.js, TypeScript — Live-Projekte deployed auf Vercel und Render mit echten Nutzern",
    },
    {
      icon: Shield,
      title: "Services & Observability",
      description:
        "Sentry, Cloudinary, Pusher, Upstash Redis — integriert und in Produktion betrieben (Integrationslevel)",
    },
  ],
  en: [
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description:
        "STACKIT (certified), Azure AZ-900 (in progress) — certified fundamentals, multiple live projects deployed",
    },
    {
      icon: Server,
      title: "DevOps — Fundamentals",
      description:
        "Docker, Kubernetes, Terraform, Cloud Foundry — certified fundamentals (STACKIT University); GitHub Actions in training",
    },
    {
      icon: Code,
      title: "Fullstack Development",
      description:
        "Next.js, React, Node.js, TypeScript — live projects deployed on Vercel and Render serving real users",
    },
    {
      icon: Shield,
      title: "Services & Observability",
      description:
        "Sentry, Cloudinary, Pusher, Upstash Redis — integrated and operated in production (integration level)",
    },
  ],
};

const copy = {
  de: {
    eyebrow: "Über mich",
    headingA: "Auf dem Weg zum DevOps Engineer —",
    headingB: "ehrlich und nachvollziehbar.",
    p1: "Mein Weg in die IT führt über eine technische Ausbildung, internationale Freelance-Webprojekte und intensive Eigenweiterbildung im Cloud-/DevOps-Bereich.",
    p2: "Ich habe mehrere Live-Projekte eigenständig deployed und betrieben (Vercel, Render, Neon, Cloudinary, Pusher, Upstash Redis). Der Code entstand mit KI-Unterstützung (Claude Code); Infrastruktur, Deployment und Inbetriebnahme habe ich selbst umgesetzt. Zertifizierte Grundlagen in Docker, Kubernetes, Terraform und Cloud Foundry via STACKIT University.",
    p3: "Zertifizierter STACKIT Cloud Engineer (Schwarz Digits). Aktuell in Vorbereitung auf Azure AZ-900.",
  },
  en: {
    eyebrow: "About me",
    headingA: "Building toward a DevOps career —",
    headingB: "honest and verifiable.",
    p1: "My path into IT runs through technical training, international freelance web projects, and intensive self-directed learning in the cloud/DevOps space.",
    p2: "I have independently deployed and operated several live projects (Vercel, Render, Neon, Cloudinary, Pusher, Upstash Redis). Code developed with AI assistance (Claude Code); infrastructure, deployment, and operations handled by me. Certified fundamentals in Docker, Kubernetes, Terraform, and Cloud Foundry via STACKIT University.",
    p3: "Certified STACKIT Cloud Engineer (Schwarz Digits). Currently preparing Azure AZ-900.",
  },
};

export default function About({ lang }: AboutProps) {
  const t = copy[lang];

  return (
    <section id="about" className="px-5 py-24 sm:px-8">
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
