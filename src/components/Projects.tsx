"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";
import {
  ArchitectureDiagram,
  PipelineDiagram,
} from "@/components/diagrams/MyMifaDiagrams";
import {
  PrecedenceDiagram,
  RoleRunDiagram,
} from "@/components/diagrams/AnsibleDiagrams";
import {
  ClusterDiagram,
  DeclaredStateDiagram,
} from "@/components/diagrams/K8sDiagrams";

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
  note?: string;
  diagrams?: "mymifa" | "ansible" | "k8s";
};

type ProjectsProps = {
  lang: Lang;
};

const projectsByLang: Record<Lang, Project[]> = {
  de: [
    {
      id: "mymifa",
      title: "MyMifa",
      subtitle: "Bewerbungs-Tracker — und meine DevOps-Werkstatt",
      description:
        "Ein Tool, mit dem ich meine eigenen Bewerbungen verwalte: Übersicht, Interview-Vorbereitung, automatische Erkennung von Recruiter-Antworten. Die App lief bereits. Interessant wurde es danach — als ich anfing, ihren Betrieb nachweisbar zu machen: Pipeline, Infrastruktur als Code, Alarme.",
      highlights: [
        "Sechs blockierende Prüfungen pro Pull Request: Lint, Unit-Tests, Image-Build, Neuaufbau des Schemas, Validierung der Workflows und des Terraform-Codes. Kein direkter Push auf main — auch nicht für mich selbst",
        "Das Datenbankschema wird bei jedem PR auf einer leeren Datenbank neu aufgebaut. Dabei kam heraus: fünf von neun Produktionstabellen waren nie versioniert",
        "Drei echte Bugs hat dieses Tooling gefunden, keinen davon das Code-Review. Der schönste: eine Regex, die Interview-Einladungen als Absagen einsortierte",
        "Fehlerhaften GitHub-Actions-Cron durch Messung diagnostiziert: 19 statt der konfigurierten 96 täglichen Ausführungen. Ersatzkette aus EventBridge Scheduler und Lambda war nach 15 Minuten in Betrieb",
        "Terraform auf AWS: verschlüsselter und gesperrter Remote State in S3, IAM-Rollen nach Least Privilege, Secrets isoliert im SSM Parameter Store. Die Konfiguration ist die Wahrheit, nicht die Konsole",
        "API containerisiert als Non-Root-Benutzer, reproduzierbare lokale Umgebung über Docker Compose und PostgreSQL 18",
        "Kurzlebige Umgebung auf ECS Fargate hinter einem ALB — VPC, Subnetze in zwei Availability Zones, Security Groups über Kreuzreferenzen — per Terraform aufgebaut, validiert, dokumentiert und wieder abgebaut",
        "Zwei CloudWatch-Alarme aus zwei Blickwinkeln: einer, wenn die Funktion scheitert — einer, wenn sie gar nicht mehr startet",
      ],
      stack: [
        "GitHub Actions",
        "Terraform",
        "AWS Lambda",
        "EventBridge",
        "CloudWatch",
        "S3",
        "Docker",
        "Next.js 16",
        "Express / Node 20",
        "PostgreSQL 18 (Neon)",
      ],
      url: "https://github.com/samueldev-del/mymifa",
      urlLabel: "Repository ansehen",
      color: "#4338ca",
      status: "Live",
      diagrams: "mymifa",
      note: "Was ich daraus mitnehme: einem System erst trauen, wenn ich es gemessen habe. Jede Annahme — der Cron, die Migrationen, das Deployment — hat sich irgendwann als falsch erwiesen.",
    },
    {
      id: "ansible",
      title: "Konfigurationsmanagement mit Ansible",
      subtitle: "Ansible, Jinja2, ansible-vault, Linux",
      description:
        "Eine Handvoll Linux-VMs, auf denen ich Zustand deklarativ beschreibe statt ihn von Hand herzustellen. Läuft seit März 2026 parallel zu allem anderen.",
      highlights: [
        "Wiederverwendbare Rolle im kanonischen Layout (defaults, vars, tasks, handlers, templates, meta), die nginx idempotent auf zwei Hosts der Gruppe web ausrollt",
        "Erster Task ist ein assert auf os_family — die Rolle bricht auf einem nicht unterstützten System sauber ab, statt auf halbem Weg zu scheitern",
        "Paketliste über eine Schleife auf webserver_packages, Landing Page als Jinja2-Template mit Hostname und IPv4 aus den Facts",
        "Handler Restart nginx wird per notify nur bei tatsächlicher Änderung am Template ausgelöst, nicht bei jedem Lauf",
        "Variablen-Präzedenz bewusst beherrscht: defaults liefert [nginx], group_vars überschreibt auf [nginx, curl, git] — das war der Teil, an dem ich am längsten gesessen habe",
        "Secrets verschlüsselt über ansible-vault, mit nicht-interaktiver Ausführung für automatisierten Betrieb",
        "Vor jeder Anwendung erst Check-Modus mit Diff. Der Code ist konform zu ansible-lint im Production-Profil",
      ],
      stack: ["Ansible", "ansible-vault", "ansible-lint", "Jinja2", "Linux", "SSH"],
      url: "https://github.com/samueldev-del/ansible-lab",
      urlLabel: "Repository ansehen",
      color: "#6d28d9",
      status: "Laufend",
      diagrams: "ansible",
      note: "Ich will erst sicher sein, dass ich verstehe, was passiert, bevor ich das auf etwas Echtes loslasse.",
    },
    {
      id: "k8s-lab",
      title: "Kubernetes-Lab",
      subtitle: "Multi-Node-Cluster mit kind, Ingress, ConfigMaps",
      description:
        "Ein lokaler Cluster aus drei Nodes, auf dem ich die Kernobjekte von Kubernetes nicht nachlese, sondern anwende: Scheduling über mehrere Nodes, Erreichbarkeit von außen, Konfiguration getrennt vom Image. Alles als Manifest im Repository, nichts per kubectl edit.",
      highlights: [
        "Cluster aus einer Control Plane und zwei Workern über kind, damit Pod-Scheduling über mehrere Nodes tatsächlich beobachtbar ist statt nur behauptet",
        "Deployment mit drei Replicas und topologySpreadConstraints (maxSkew 1 über kubernetes.io/hostname) — die Verteilung über die Nodes ist gewollt, nicht zufällig",
        "Erreichbarkeit von außen auf zwei Wegen: ingress-nginx auf dem Node mit dem Label ingress-ready über hostPort 8080, zusätzlich ein NodePort auf 30080",
        "Pfadbasiertes Routing im Ingress: / geht an web-svc, /api(/|$)(.*) mit rewrite-target an ein zweites Deployment — zwei Anwendungen hinter einem Host",
        "Jeder Pod liefert seinen eigenen Namen über die Downward API aus, damit sich an wiederholten Requests nachweisen lässt, dass der Service wirklich verteilt",
        "Konfiguration aus dem Image gelöst: index.html als Volume aus einer ConfigMap, APP_ENV als Umgebungsvariable, DB_PASSWORD aus einem Secret — die Secret-Datei ist per .gitignore ausgeschlossen, im Repository liegt nur ein Beispiel",
        "Readiness- und Liveness-Probe getrennt gedacht: die eine entscheidet über Traffic, die andere über den Neustart",
        "Resource Requests und Limits auf jedem Container, damit Scheduling und Begrenzung nicht dem Zufall überlassen sind",
        "Rolling Update und Rollback auf eine frühere Revision durchgespielt — inklusive der Frage, was dabei mit den alten ReplicaSets passiert",
      ],
      stack: ["Kubernetes", "kind", "kubectl", "ingress-nginx", "ConfigMaps & Secrets", "YAML", "Docker"],
      url: "https://github.com/samueldev-del/k8s-lab",
      urlLabel: "Repository ansehen",
      color: "#1d4ed8",
      status: "Laufend",
      diagrams: "k8s",
      note: "Ein Cluster auf dem Laptop kostet nichts und verzeiht alles. Genau deshalb kaputtmache ich ihn dort, und nicht anderswo.",
    },
    {
      id: "bolo237",
      title: "Bolo237",
      subtitle: "Jobbörse & Dienstleistungen (Kamerun)",
      description:
        "Eine Plattform, auf der Menschen in Kamerun Jobs und Dienstleistungen finden. Persönliches Projekt, live und in Betrieb. Deployment, Infrastruktur und Betrieb habe ich selbst gemacht.",
      highlights: [
        "REST-API mit Node.js/Express, Prisma ORM, serverless PostgreSQL bei Neon",
        "Mehrschichtige Absicherung: Rate Limiting pro IP und User, Helmet, CORS, JWT",
        "Sentry im Frontend und Backend — damit ich von Fehlern erfahre, bevor Nutzer sie melden",
        "Kontinuierliches Deployment über Vercel (Frontend) und Render (Backend)",
        "Secrets und Umgebungsvariablen sauber über mehrere Dienste verteilt verwaltet",
      ],
      stack: ["Node.js", "React/Next.js", "Prisma", "PostgreSQL (Neon)", "Vercel", "Render", "JWT", "Sentry"],
      url: "https://bolo237.com",
      urlLabel: "bolo237.com",
      color: "#b45309",
      status: "Live",
      screenshot: "/screenshots/bolo237-home.png",
    },
    {
      id: "schmidts",
      title: "Schmidts Zaunbau Nord",
      subtitle: "Kundenprojekt — Relaunch und Deployment-Automatisierung",
      description:
        "Eine Zaunbau-Website in Hamburg, die auf einer undokumentierten Legacy-Infrastruktur lag und per FTP von Hand aktualisiert wurde. Die sichtbare Arbeit war der Relaunch. Die eigentliche Arbeit war herauszufinden, welches Verzeichnis überhaupt ausgeliefert wird.",
      highlights: [
        "Vier duplizierte Verzeichnisse, keine Dokumentation — das tatsächlich ausgelieferte Docroot durch Abgleich der HTTP-Header Last-Modified mit den mtimes auf dem Server identifiziert und die Umgebung in einem Runbook festgehalten",
        "Manuelles FTP-Deployment durch eine Bash-Pipeline mit rsync over SSH abgelöst: Dry-Run-Modus, Konfiguration über Umgebungsvariablen, Einbindung des SSH-Schlüssels",
        "curl-Smoke-Tests nach jedem Livegang: Kontrolle der produktiv ausgelieferten Inhalte auf Deutsch und Englisch sowie des HTTP-Status des API-Endpunkts, mit eindeutigem Fehlschlag bei Regression",
        "Externen Formulardienst durch ein selbst gehostetes PHP-Backend ersetzt: Eingabevalidierung, Schutz vor SMTP-Header-Injection, Honeypot gegen Spam, Fallback beim Versand, Protokollierung der Fehlversuche",
        "Zeitgestempelte Backups vor jeder Änderung im Produktivbetrieb, damit ein sofortiges Rollback möglich bleibt",
      ],
      stack: ["Bash", "rsync over SSH", "PHP", "curl", "STRATO-Hosting", "Tailwind CSS", "JavaScript"],
      url: "https://schmidtszaunbaunord.com",
      urlLabel: "schmidtszaunbaunord.com",
      color: "#047857",
      status: "Live",
      screenshot: "/screenshots/schmidts-home.png",
    },
  ],
  en: [
    {
      id: "mymifa",
      title: "MyMifa",
      subtitle: "Job application tracker — and my DevOps workshop",
      description:
        "A tool I use to manage my own job search: applications, interview prep, automatic detection of recruiter replies. The app already worked. What came next is the interesting part — making its operation something I can actually prove: a pipeline, infrastructure as code, alarms.",
      highlights: [
        "Six blocking checks per pull request: lint, unit tests, image build, schema rebuild, workflow validation and Terraform validation. No direct push to main — not even for me",
        "The database schema is rebuilt from scratch on an empty database on every PR. That's how I found out five of nine production tables had never been versioned",
        "Three real bugs came out of this tooling, none of them from code review. My favourite: a regex that filed interview invitations as rejections",
        "Diagnosed a broken GitHub Actions cron by measuring it: 19 daily runs instead of the 96 configured. The replacement chain — EventBridge Scheduler plus Lambda — was live 15 minutes later",
        "Terraform on AWS: encrypted and locked remote state in S3, least-privilege IAM roles, secrets isolated in SSM Parameter Store. The config is the truth, not the console",
        "API containerised as a non-root user, reproducible local environment via Docker Compose and PostgreSQL 18",
        "Ephemeral environment on ECS Fargate behind an ALB — VPC, subnets across two availability zones, cross-referenced security groups — stood up, validated, documented and torn down again with Terraform",
        "Two CloudWatch alarms from two angles: one if the function fails — one if it simply stops firing",
      ],
      stack: [
        "GitHub Actions",
        "Terraform",
        "AWS Lambda",
        "EventBridge",
        "CloudWatch",
        "S3",
        "Docker",
        "Next.js 16",
        "Express / Node 20",
        "PostgreSQL 18 (Neon)",
      ],
      url: "https://github.com/samueldev-del/mymifa",
      urlLabel: "View the repository",
      color: "#4338ca",
      status: "Live",
      diagrams: "mymifa",
      note: "What I took away: don't trust a system until you've measured it. Every assumption — the cron, the migrations, the deployment — turned out to be wrong at some point.",
    },
    {
      id: "ansible",
      title: "Configuration management with Ansible",
      subtitle: "Ansible, Jinja2, ansible-vault, Linux",
      description:
        "A handful of Linux VMs where I describe state declaratively instead of producing it by hand. Running since March 2026 alongside everything else.",
      highlights: [
        "Reusable role in the canonical layout (defaults, vars, tasks, handlers, templates, meta) that rolls nginx out idempotently across two hosts in the web group",
        "The first task is an assert on os_family — the role aborts cleanly on an unsupported system instead of failing halfway through",
        "Package list driven by a loop over webserver_packages, landing page as a Jinja2 template carrying the hostname and IPv4 from the facts",
        "The Restart nginx handler fires through notify only when the template actually changes, not on every run",
        "Variable precedence properly understood: defaults ships [nginx], group_vars overrides it to [nginx, curl, git] — that's the part I spent longest on",
        "Secrets encrypted with ansible-vault, with non-interactive execution for automated runs",
        "Check mode with diff before every apply. The code passes ansible-lint on the production profile",
      ],
      stack: ["Ansible", "ansible-vault", "ansible-lint", "Jinja2", "Linux", "SSH"],
      url: "https://github.com/samueldev-del/ansible-lab",
      urlLabel: "View the repository",
      color: "#6d28d9",
      status: "Ongoing",
      diagrams: "ansible",
      note: "I want to be sure I understand what happens before I point this at something real.",
    },
    {
      id: "k8s-lab",
      title: "Kubernetes lab",
      subtitle: "Multi-node cluster with kind, ingress, ConfigMaps",
      description:
        "A local three-node cluster where I use the core Kubernetes objects instead of reading about them: scheduling across nodes, reachability from outside, configuration kept out of the image. Everything is a manifest in the repository, nothing done through kubectl edit.",
      highlights: [
        "One control plane and two workers through kind, so scheduling across nodes is something I can actually observe rather than assert",
        "Deployment of three replicas with topologySpreadConstraints (maxSkew 1 over kubernetes.io/hostname) — the spread across nodes is intended, not incidental",
        "Two ways in from the host: ingress-nginx on the node labelled ingress-ready via hostPort 8080, plus a NodePort on 30080",
        "Path-based routing in the Ingress: / goes to web-svc, /api(/|$)(.*) with a rewrite-target to a second deployment — two applications behind one host",
        "Every pod serves its own name through the Downward API, so repeated requests prove the service really does distribute traffic",
        "Configuration lifted out of the image: index.html mounted as a volume from a ConfigMap, APP_ENV as an environment variable, DB_PASSWORD from a Secret — the secret file is gitignored, only an example ships in the repository",
        "Readiness and liveness kept conceptually apart: one decides about traffic, the other about a restart",
        "Resource requests and limits on every container, so scheduling and capping aren't left to chance",
        "Rolling update and rollback to a previous revision worked through — including what happens to the old ReplicaSets along the way",
      ],
      stack: ["Kubernetes", "kind", "kubectl", "ingress-nginx", "ConfigMaps & Secrets", "YAML", "Docker"],
      url: "https://github.com/samueldev-del/k8s-lab",
      urlLabel: "View the repository",
      color: "#1d4ed8",
      status: "Ongoing",
      diagrams: "k8s",
      note: "A cluster on a laptop costs nothing and forgives everything. That is exactly why I break it there and not somewhere else.",
    },
    {
      id: "bolo237",
      title: "Bolo237",
      subtitle: "Job board & services platform (Cameroon)",
      description:
        "A platform where people in Cameroon find jobs and services. Personal project, live and running. Deployment, infrastructure and operations are mine.",
      highlights: [
        "REST API with Node.js/Express, Prisma ORM, serverless PostgreSQL on Neon",
        "Layered protection: rate limiting per IP and user, Helmet, CORS, JWT",
        "Sentry on frontend and backend — so I hear about errors before users report them",
        "Continuous deployment via Vercel (frontend) and Render (backend)",
        "Secrets and environment variables managed cleanly across several services",
      ],
      stack: ["Node.js", "React/Next.js", "Prisma", "PostgreSQL (Neon)", "Vercel", "Render", "JWT", "Sentry"],
      url: "https://bolo237.com",
      urlLabel: "bolo237.com",
      color: "#b45309",
      status: "Live",
      screenshot: "/screenshots/bolo237-home.png",
    },
    {
      id: "schmidts",
      title: "Schmidts Zaunbau Nord",
      subtitle: "Client project — relaunch and deployment automation",
      description:
        "A fence-construction site in Hamburg, sitting on undocumented legacy infrastructure and updated by hand over FTP. The visible work was the relaunch. The real work was finding out which directory was actually being served.",
      highlights: [
        "Four duplicated directories, no documentation — identified the genuinely served docroot by matching Last-Modified HTTP headers against file mtimes on the server, then captured the environment in a runbook",
        "Replaced manual FTP deployment with a Bash pipeline using rsync over SSH: dry-run mode, configuration through environment variables, SSH key handling",
        "curl smoke tests after every release: verifies the live German and English content and the API endpoint's HTTP status, failing loudly on regression",
        "Swapped the external form service for a self-hosted PHP backend: input validation, SMTP header injection protection, honeypot against spam, send fallback, logging of failed attempts",
        "Timestamped backups before every production change, so an immediate rollback stays possible",
      ],
      stack: ["Bash", "rsync over SSH", "PHP", "curl", "STRATO hosting", "Tailwind CSS", "JavaScript"],
      url: "https://schmidtszaunbaunord.com",
      urlLabel: "schmidtszaunbaunord.com",
      color: "#047857",
      status: "Live",
      screenshot: "/screenshots/schmidts-home.png",
    },
  ],
};

const sectionCopy = {
  de: {
    eyebrow: "Projekte",
    headingA: "Fünf Projekte,",
    headingB: "an denen ich wirklich arbeite.",
    intro:
      "Drei davon sind live und lassen sich anklicken, zwei liegen als Repository offen. Kein Mockup — deployed und betrieben von mir.",
    less: "Weniger zeigen",
    more: "Mehr dazu",
    moreCount: "mehr",
  },
  en: {
    eyebrow: "Projects",
    headingA: "Five projects,",
    headingB: "I actually work on.",
    intro:
      "Three of them are live and clickable, two are open as repositories. No mockups — deployed and operated by me.",
    less: "Show less",
    more: "Read more",
    moreCount: "more",
  },
};

function ProjectCard({
  project,
  lang,
  featured = false,
}: {
  project: Project;
  lang: Lang;
  featured?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const t = sectionCopy[lang];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
      className={`min-w-0 overflow-hidden rounded-2xl border border-line bg-card shadow-card transition duration-300 hover:shadow-lift ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* A hairline in the project's own colour, so the cards are told apart
          before a word is read. */}
      <div aria-hidden className="h-1" style={{ backgroundColor: project.color }} />

      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3.5">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-lg"
              style={{ backgroundColor: `${project.color}14`, color: project.color }}
            >
              {project.title.charAt(0)}
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-xl leading-tight break-words text-ink">
                {project.title}
              </h3>
              <p className="mt-0.5 text-[13px] break-words text-ink-3">
                {project.subtitle}
              </p>
            </div>
          </div>
          <span
            className="shrink-0 rounded-full px-3 py-1 text-[11px] font-medium"
            style={{
              backgroundColor: `${project.color}12`,
              color: project.color,
              border: `1px solid ${project.color}2e`,
            }}
          >
            {project.status}
          </span>
        </div>

        {project.screenshot && (
          <div
            className={`mt-5 overflow-hidden rounded-xl border border-line ${
              featured ? "max-h-[340px]" : ""
            }`}
          >
            <Image
              src={project.screenshot}
              alt={lang === "de" ? `Vorschau von ${project.title}` : `Preview of ${project.title}`}
              width={1280}
              height={800}
              className="w-full object-cover object-top"
              loading="lazy"
            />
          </div>
        )}

        <p className="mt-5 text-[15px] leading-[1.75] break-words text-ink-2">
          {project.description}
        </p>

        {project.diagrams === "mymifa" && (
          <div className={`mt-7 space-y-8 ${expanded ? "" : "hidden sm:block"}`}>
            <ArchitectureDiagram lang={lang} />
            <PipelineDiagram lang={lang} />
          </div>
        )}

        {project.diagrams === "k8s" && (
          <div className={`mt-7 space-y-8 ${expanded ? "" : "hidden sm:block"}`}>
            <ClusterDiagram lang={lang} />
            <DeclaredStateDiagram lang={lang} />
          </div>
        )}

        {project.diagrams === "ansible" && (
          <div className={`mt-7 space-y-8 ${expanded ? "" : "hidden sm:block"}`}>
            <RoleRunDiagram lang={lang} />
            <PrecedenceDiagram lang={lang} />
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, expanded ? undefined : 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-paper-2 px-2 py-1 font-mono text-[11px] text-ink-3"
            >
              {tech}
            </span>
          ))}
          {!expanded && project.stack.length > 5 && (
            <span className="px-1 py-1 font-mono text-[11px] text-ink-3">
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
              <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: `${project.color}80` }}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {project.note && (
          <p className="mt-6 rounded-r-lg border-l-2 border-ember/50 bg-paper-2/70 py-3 pr-4 pl-4 font-display text-[15px] leading-relaxed text-ink-2 italic">
            {project.note}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 rounded-full border border-line bg-paper px-4 py-2 text-xs font-medium text-ink-2 transition hover:border-line-2 hover:text-ink"
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
              className="flex max-w-full items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold break-all transition hover:underline"
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
    <section
      id="projects"
      className="relative border-y border-line bg-paper-2 px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t.eyebrow}
          headingA={t.headingA}
          headingB={t.headingB}
          intro={t.intro}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              featured={Boolean(project.diagrams)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
