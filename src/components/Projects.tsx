"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import type { Lang } from "@/lib/i18n";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  stack: string[];
  url: string;
  urlLabel: string;
  color: string;
  status: string;
  screenshot?: string;
};

type ProjectsProps = {
  lang: Lang;
};

const projectsByLang: Record<Lang, Project[]> = {
  de: [
    {
      id: "bolo237",
      title: "Bolo237",
      subtitle: "Jobbörse & Dienstleistungsplattform (Kamerun)",
      description:
        "Persönliches Projekt — Full-Stack-Plattform für Jobs und Dienstleistungen, deployed und in Betrieb. Code mit KI-Assistent (Claude Code) entwickelt; Deployment, Infrastruktur und Inbetriebnahme eigenständig umgesetzt.",
      highlights: [
        "REST-API mit Node.js/Express, Prisma ORM, serverless PostgreSQL (Neon)",
        "Mehrschichtige Sicherheit: Rate Limiting (pro IP/User), Helmet, CORS, JWT",
        "Sentry-Integration (Frontend + Backend) für Fehlertracking und Monitoring",
        "Kontinuierliches Deployment via Vercel (Frontend) und Render (Backend)",
        "Sichere Verwaltung von Umgebungsvariablen und Secrets über mehrere Dienste",
      ],
      stack: [
        "Node.js",
        "React/Next.js",
        "Prisma",
        "PostgreSQL (Neon)",
        "Vercel",
        "Render",
        "JWT",
        "Sentry",
      ],
      url: "https://bolo237.com",
      urlLabel: "bolo237.com",
      color: "#f0a050",
      status: "Live",
      screenshot: "/screenshots/bolo237-home.png",
    },
    {
      id: "mymifa",
      title: "MyMifa",
      subtitle: "Familiale Kommunikations-App (PWA)",
      description:
        "Progressive Web App für Familienkommunikation. Mehrere Cloud-Dienste eigenständig orchestriert und in Produktion deployed. Code mit KI-Assistent (Claude Code) entwickelt; Infrastruktur und Deployment eigenständig umgesetzt.",
      highlights: [
        "Deployment und Betrieb auf Vercel mit serverlosem PostgreSQL (Neon)",
        "Medien-Management mit Cloudinary (Upload und Transformation)",
        "Echtzeit-Kommunikation via Pusher",
        "Session-Caching mit Upstash Redis",
        "Fehlertracking mit Sentry",
        "Verwaltung von Secrets und Umgebungsvariablen über mehrere Cloud-Dienste",
      ],
      stack: [
        "Next.js",
        "Prisma",
        "PostgreSQL (Neon)",
        "Cloudinary",
        "Pusher",
        "Upstash Redis",
        "Sentry",
        "Vercel",
      ],
      url: "https://mymifa-app.vercel.app",
      urlLabel: "mymifa-app.vercel.app",
      color: "#818cf8",
      status: "Live",
      screenshot: "/screenshots/mymifa-home.png",
    },
    {
      id: "schmidts",
      title: "Schmidts Zaunbau Nord",
      subtitle: "Kundenprojekt — bezahlte Auftragsarbeit",
      description:
        "Responsive Mehrseiten-Website für ein Hamburger Zaunbauunternehmen. Vollständig von Hand codiert (HTML/Tailwind/JS), kontinuierliches Deployment über Git.",
      highlights: [
        "Responsive Mehrseiten-Website (DE/EN): Startseite, Produktkatalog, Impressum, Datenschutz",
        "Vorher/Nachher-Slider, Projektgalerie mit Auto-Scroll, Lightbox-Modals",
        "DSGVO-konforme Google Maps Integration und Cookie-Banner",
        "SEO-Optimierung mit Meta-Tags, Open Graph und semantischem HTML",
        "Kontinuierliches Deployment via Git/Netlify",
      ],
      stack: [
        "HTML5",
        "Tailwind CSS",
        "JavaScript",
        "Google Fonts",
        "FormSubmit",
        "Netlify",
      ],
      url: "https://schmidtszaunbaunord.com",
      urlLabel: "schmidtszaunbaunord.com",
      color: "#34d399",
      status: "Live",
      screenshot: "/screenshots/schmidts-home.png",
    },
    {
      id: "237go",
      title: "237Go / Carlite",
      subtitle: "Intercity-Busbuchungen — Kamerun (in Entwicklung)",
      description:
        "Startup-Projekt (Pre-Launch) — persönliches Architekturprojekt für Intercity-Busbuchungen in Kamerun. Aktuell in Entwicklung.",
      highlights: [
        "Geplante Plattform: Mobile App (Flutter), Agency Dashboard (React), REST API (FastAPI)",
        "Datenstrategie: Firebase (Firestore, Storage) und PostgreSQL",
        "Zahlungsintegration für den kamerunischen Markt (CinetPay)",
      ],
      stack: [
        "Flutter",
        "React",
        "Python/FastAPI",
        "PostgreSQL",
        "Firebase",
        "CinetPay",
      ],
      url: "#",
      urlLabel: "Pre-Launch",
      color: "#19b1ba",
      status: "In Entwicklung",
    },
    {
      id: "macarriere",
      title: "Ma Carrière",
      subtitle: "Karriereverwaltungs-App",
      description:
        "App zur persönlichen Karriereverwaltung: Bewerbungen, Agenda, Dokumente, Zertifikate — mit KI-Assistenzfunktionen. Deployed auf Streamlit Cloud.",
      highlights: [
        "Authentifizierung mit Session-Management: privates Dashboard und öffentliches Portfolio",
        "KI-Assistent für Aufgabenpriorisierung und Bewerbungsstrukturierung",
        "Bilinguale UI (Französisch / Deutsch), deployed auf Streamlit Cloud",
      ],
      stack: ["Python", "Streamlit", "KI-Integration", "Authentifizierung", "Streamlit Cloud"],
      url: "https://samueldt.streamlit.app",
      urlLabel: "samueldt.streamlit.app",
      color: "#fbbf24",
      status: "Live",
    },
  ],
  en: [
    {
      id: "bolo237",
      title: "Bolo237",
      subtitle: "Job Board & Services Platform (Cameroon)",
      description:
        "Personal project — full-stack platform for jobs and services, deployed and in operation. Code developed with AI assistance (Claude Code); deployment, infrastructure, and operations handled independently.",
      highlights: [
        "REST API with Node.js/Express, Prisma ORM, serverless PostgreSQL (Neon)",
        "Multi-layer security: rate limiting (per IP/user), Helmet, CORS, JWT",
        "Sentry integration (frontend + backend) for error tracking and monitoring",
        "Continuous deployment via Vercel (frontend) and Render (backend)",
        "Secure management of environment variables and secrets across multiple services",
      ],
      stack: [
        "Node.js",
        "React/Next.js",
        "Prisma",
        "PostgreSQL (Neon)",
        "Vercel",
        "Render",
        "JWT",
        "Sentry",
      ],
      url: "https://bolo237.com",
      urlLabel: "bolo237.com",
      color: "#f0a050",
      status: "Live",
      screenshot: "/screenshots/bolo237-home.png",
    },
    {
      id: "mymifa",
      title: "MyMifa",
      subtitle: "Family Communication App (PWA)",
      description:
        "Progressive web app for family communication. Multiple cloud services independently orchestrated and deployed to production. Code developed with AI assistance (Claude Code); infrastructure and deployment handled independently.",
      highlights: [
        "Deployed and operated on Vercel with serverless PostgreSQL (Neon)",
        "Media management with Cloudinary (upload and transformation)",
        "Real-time communication via Pusher",
        "Session caching with Upstash Redis",
        "Error tracking with Sentry",
        "Secrets and environment variable management across multiple cloud services",
      ],
      stack: [
        "Next.js",
        "Prisma",
        "PostgreSQL (Neon)",
        "Cloudinary",
        "Pusher",
        "Upstash Redis",
        "Sentry",
        "Vercel",
      ],
      url: "https://mymifa-app.vercel.app",
      urlLabel: "mymifa-app.vercel.app",
      color: "#818cf8",
      status: "Live",
      screenshot: "/screenshots/mymifa-home.png",
    },
    {
      id: "schmidts",
      title: "Schmidts Zaunbau Nord",
      subtitle: "Client project — paid work",
      description:
        "Responsive multipage website for a Hamburg-based fence construction company. Hand-coded from scratch (HTML/Tailwind/JS), with continuous deployment via Git.",
      highlights: [
        "Responsive multipage site (DE/EN): homepage, product catalog, imprint, privacy",
        "Before/after slider, project gallery with auto-scroll, lightbox modals",
        "GDPR-compliant Google Maps integration and cookie banner",
        "SEO optimization with meta tags, Open Graph, semantic HTML",
        "Continuous deployment via Git/Netlify",
      ],
      stack: [
        "HTML5",
        "Tailwind CSS",
        "JavaScript",
        "Google Fonts",
        "FormSubmit",
        "Netlify",
      ],
      url: "https://schmidtszaunbaunord.com",
      urlLabel: "schmidtszaunbaunord.com",
      color: "#34d399",
      status: "Live",
      screenshot: "/screenshots/schmidts-home.png",
    },
    {
      id: "237go",
      title: "237Go / Carlite",
      subtitle: "Intercity Bus Booking — Cameroon (in development)",
      description:
        "Startup project (pre-launch) — personal architecture project for intercity bus travel booking in Cameroon. Currently in development.",
      highlights: [
        "Planned platform: Mobile App (Flutter), Agency Dashboard (React), REST API (FastAPI)",
        "Data strategy: Firebase (Firestore, Storage) and PostgreSQL",
        "Payment integration for the Cameroonian market (CinetPay)",
      ],
      stack: [
        "Flutter",
        "React",
        "Python/FastAPI",
        "PostgreSQL",
        "Firebase",
        "CinetPay",
      ],
      url: "#",
      urlLabel: "Pre-launch",
      color: "#19b1ba",
      status: "In Development",
    },
    {
      id: "macarriere",
      title: "Ma Carrière",
      subtitle: "Career Management App",
      description:
        "Personal career management app: applications, agenda, documents, certifications — with AI assistance features. Deployed on Streamlit Cloud.",
      highlights: [
        "Authentication with session management: private dashboard and public portfolio",
        "AI assistant for task prioritization and application structuring",
        "Bilingual UI (French / German), deployed on Streamlit Cloud",
      ],
      stack: ["Python", "Streamlit", "AI Integration", "Authentication", "Streamlit Cloud"],
      url: "https://samueldt.streamlit.app",
      urlLabel: "samueldt.streamlit.app",
      color: "#fbbf24",
      status: "Live",
    },
  ],
};

const sectionCopy = {
  de: {
    eyebrow: "Projekte",
    headingA: "Was ich gebaut",
    headingB: "& deployed habe.",
    intro:
      "Selbst deployed und betrieben — jedes Projekt ist live und testbar. Code mit KI-Assistent entwickelt; Infrastruktur und Inbetriebnahme eigenständig.",
    less: "Weniger Details",
    more: "Mehr Details",
    moreCount: "mehr",
  },
  en: {
    eyebrow: "Projects",
    headingA: "Things I've built",
    headingB: "& deployed.",
    intro:
      "Self-deployed and operated — each project is live and testable. Code developed with AI assistance; infrastructure and operations handled independently.",
    less: "Less details",
    more: "More details",
    moreCount: "more",
  },
};

function ProjectCard({
  project,
  lang,
}: {
  project: Project;
  lang: Lang;
}) {
  const [expanded, setExpanded] = useState(false);
  const t = sectionCopy[lang];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="group rounded-2xl border border-white/8 bg-white/[0.02] transition hover:border-white/15"
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: `${project.color}20` }}
            >
              <span style={{ color: project.color }}>{project.title.charAt(0)}</span>
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-white break-words">{project.title}</h3>
              <p className="text-xs text-[#7e8ea6] break-words">{project.subtitle}</p>
            </div>
          </div>
          <span
            className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{
              backgroundColor: `${project.color}15`,
              color: project.color,
              border: `1px solid ${project.color}30`,
            }}
          >
            {project.status}
          </span>
        </div>

        {project.screenshot && (
          <div className="mt-4 overflow-hidden rounded-lg border border-white/8">
            <Image
              src={project.screenshot}
              alt={`Vorschau von ${project.title}`}
              width={1280}
              height={800}
              className="w-full object-cover object-top"
              loading="lazy"
            />
          </div>
        )}

        <p className="mt-4 text-sm leading-relaxed text-[#a0b0c8] break-words">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, expanded ? undefined : 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-1 text-[11px] text-[#7e8ea6]"
            >
              {tech}
            </span>
          ))}
          {!expanded && project.stack.length > 5 && (
            <span className="rounded-md px-2 py-1 text-[11px] text-[#5a6a82]">
              +{project.stack.length - 5} {t.moreCount}
            </span>
          )}
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <ul className="mt-5 space-y-2 border-t border-white/8 pt-5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-[#a0b0c8]">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-[#a0b0c8] transition hover:border-white/20 hover:text-white"
          >
            {expanded ? (
              <>
                {t.less} <ChevronUp size={13} />
              </>
            ) : (
              <>
                {t.more} <ChevronDown size={13} />
              </>
            )}
          </button>
          {project.url !== "#" && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="max-w-full break-all flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition hover:bg-white/5"
              style={{ color: project.color }}
            >
              <ExternalLink size={13} />
              {project.urlLabel}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ lang }: ProjectsProps) {
  const t = sectionCopy[lang];
  const projects = projectsByLang[lang];

  return (
    <section id="projects" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#f0a050]">{t.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {t.headingA} <span className="text-[#7e8ea6]">{t.headingB}</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-[#7e8ea6]">{t.intro}</p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
