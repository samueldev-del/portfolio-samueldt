"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

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
};

const projects: Project[] = [
  {
    id: "bolo237",
    title: "Bolo237",
    subtitle: "Secure Support & CRM System",
    description:
      "Full-featured CRM platform with AI-powered job matching, multilingual support, and enterprise-grade security. Live production system serving real users.",
    highlights: [
      "REST API with Node.js/Express, Prisma ORM, serverless PostgreSQL (Neon)",
      "Multi-layer security: granular rate limiting (per IP/user), Helmet, CORS, JWT",
      "Full Sentry integration (frontend, backend, admin) with custom ad-blocker tunneling",
      "PostgreSQL optimization with trigram indexes (pg_trgm) for ultra-fast search",
      "Automated workflows with n8n and Twilio API for WhatsApp alerts",
      "Monorepo CI/CD via Vercel and Render with secure environment management",
    ],
    stack: [
      "Node.js",
      "React/Next.js",
      "Prisma",
      "PostgreSQL",
      "n8n",
      "Vercel",
      "Render",
      "Twilio",
      "JWT",
      "Sentry",
    ],
    url: "https://bolo237.com",
    urlLabel: "bolo237.com",
    color: "#f0a050",
    status: "Live",
  },
  {
    id: "237go",
    title: "237Go",
    subtitle: "Intercity Travel Booking Platform",
    description:
      "Startup project (pre-launch) — complete system and product architecture for intercity bus travel booking in Cameroon.",
    highlights: [
      "4-layer platform: Mobile App (Flutter) — Agency Dashboard (React) — Admin Portal (React) — REST API (FastAPI)",
      "Agency dashboard for bus companies to manage departures, capacity, pricing, and bookings",
      "Data strategy: Firebase (Firestore, Storage) combined with PostgreSQL for structured business data",
      "AI roadmap: price optimization, demand forecasting, traveler chatbot",
      "Deployment collaboration with GDE Solution GmbH on Azure/Linux infrastructure",
    ],
    stack: [
      "Flutter",
      "React",
      "Python/FastAPI",
      "PostgreSQL",
      "Firebase",
      "Azure",
      "CinetPay",
      "AI/ML",
    ],
    url: "#",
    urlLabel: "Pre-launch",
    color: "#19b1ba",
    status: "In Development",
  },
  {
    id: "dtsfuture",
    title: "DTS Future",
    subtitle: "Portfolio Showcase with Interactive Case Studies",
    description:
      "Multilingual portfolio website with detailed case studies, optimized performance, and modern design patterns.",
    highlights: [
      "Multilingual website (FR/EN): homepage with hero, portfolio overview, case study detail pages",
      "Case studies: detailed requirements, architecture, features, and live demos",
      "SEO & Performance: Open Graph meta-tags, sitemap, optimized images, fast LCP (<2.5s), Vercel Edge Caching",
      "Responsive design with Tailwind CSS, dark mode support, accessible components (WCAG 2.1)",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "i18n",
      "Vercel",
      "Edge Caching",
    ],
    url: "https://dtsfuture.com",
    urlLabel: "dtsfuture.com",
    color: "#a78bfa",
    status: "Live",
  },
  {
    id: "schmidts",
    title: "Schmidts Zaunbau Nord",
    subtitle: "Professional Fence Construction Website",
    description:
      "Client project — responsive multipage website for a Hamburg-based fence construction company with rich interactive features.",
    highlights: [
      "Responsive multipage site (DE/EN): homepage, product catalog, imprint, privacy",
      "Before/after slider, project gallery with auto-scroll, lightbox modals",
      "GDPR-compliant Google Maps integration and cookie banner",
      "SEO optimization with meta tags, Open Graph, semantic HTML",
      "Customer reviews section with animated counters",
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
  },
  {
    id: "macarriere",
    title: "Ma Carrière",
    subtitle: "AI-Powered Career Management System",
    description:
      "Full career management app: applications, agenda, documents, certifications, portfolio — with an AI assistant.",
    highlights: [
      "AI assistant: organizes agenda, prioritizes tasks, structures application processes",
      "Authentication system with session management: private dashboard and public portfolio",
      "Bilingual UI (French / German), deployed on Streamlit Cloud",
    ],
    stack: [
      "Python",
      "Streamlit",
      "AI Integration",
      "Authentication",
      "Streamlit Cloud",
    ],
    url: "https://samueldt.streamlit.app",
    urlLabel: "samueldt.streamlit.app",
    color: "#fbbf24",
    status: "Live",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="group rounded-2xl border border-white/8 bg-white/[0.02] transition hover:border-white/15"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: `${project.color}20` }}
            >
              <span style={{ color: project.color }}>
                {project.title.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {project.title}
              </h3>
              <p className="text-xs text-[#7e8ea6]">{project.subtitle}</p>
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

        <p className="mt-4 text-sm leading-relaxed text-[#a0b0c8]">
          {project.description}
        </p>

        {/* Stack */}
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
              +{project.stack.length - 5} more
            </span>
          )}
        </div>

        {/* Expandable details */}
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

        {/* Actions */}
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-[#a0b0c8] transition hover:border-white/20 hover:text-white"
          >
            {expanded ? (
              <>
                Less details <ChevronUp size={13} />
              </>
            ) : (
              <>
                More details <ChevronDown size={13} />
              </>
            )}
          </button>
          {project.url !== "#" && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition hover:bg-white/5"
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

export default function Projects() {
  return (
    <section id="projects" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#f0a050]">
            Projects
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Things I&apos;ve built{" "}
            <span className="text-[#7e8ea6]">& shipped.</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-[#7e8ea6]">
            From production CRM systems to startup architectures — each project
            is live and testable.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
