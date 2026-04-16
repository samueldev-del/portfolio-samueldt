"use client";

import { motion } from "framer-motion";
import { Cloud, Server, Code, Shield } from "lucide-react";

const highlights = [
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description:
      "Azure, STACKIT (certified), AWS — AAD, RBAC, Monitor, Synapse Analytics",
  },
  {
    icon: Server,
    title: "DevOps & Automation",
    description:
      "Docker, Kubernetes, Terraform, Ansible, GitHub Actions, n8n, CI/CD pipelines",
  },
  {
    icon: Code,
    title: "Fullstack Development",
    description:
      "Next.js, React, Node.js, FastAPI, Flutter — from APIs to production UIs",
  },
  {
    icon: Shield,
    title: "Security & Observability",
    description:
      "Zero Trust, Rate Limiting, RBAC, Sentry full-stack, Zabbix, Azure Monitor",
  },
];

export default function About() {
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
            About me
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Building reliable systems,{" "}
            <span className="text-[#7e8ea6]">end to end.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 max-w-3xl space-y-4 text-[15px] leading-relaxed text-[#a0b0c8]"
        >
          <p>
            Cloud & DevOps Engineer and Fullstack Developer with 5+ years of IT
            experience — from technical training and international freelance
            projects to professional system and cloud administration.
          </p>
          <p>
            I combine solid infrastructure expertise (Ansible, Terraform,
            Kubernetes, Docker, Azure) with hands-on product development: three
            live projects — an AI-powered career platform, a CRM & support
            system, and a travel-tech startup architecture — demonstrate my
            ability to design, develop, and operate highly available end-to-end
            systems with strong focus on security and full-stack observability.
          </p>
          <p>
            Certified STACKIT Cloud Engineer, currently preparing Azure AZ-900,
            AWS CCP and CompTIA Security+.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
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
