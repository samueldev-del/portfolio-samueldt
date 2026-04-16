"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Role = "Cloud" | "DevOps" | "Fullstack" | "Security";
type ProjectType = "Professional" | "Personal";

type Skill = {
  id: string;
  label: string;
  focus: string;
  position: { x: number; y: number };
};

type Project = {
  id: string;
  title: string;
  summary: string;
  role: Role[];
  type: ProjectType;
  linkedSkills: string[];
  architecture: string;
  stack: string[];
  securityHighlights: string[];
  link: string;
};

const skills: Skill[] = [
  {
    id: "kubernetes",
    label: "Kubernetes",
    focus: "Platform orchestration",
    position: { x: 22, y: 26 },
  },
  {
    id: "terraform",
    label: "Terraform",
    focus: "Infrastructure as code",
    position: { x: 46, y: 14 },
  },
  {
    id: "nextjs",
    label: "Next.js",
    focus: "Product interface",
    position: { x: 76, y: 24 },
  },
  {
    id: "fastapi",
    label: "FastAPI",
    focus: "Backend services",
    position: { x: 26, y: 64 },
  },
  {
    id: "observability",
    label: "Observability",
    focus: "Reliability and SRE",
    position: { x: 54, y: 56 },
  },
  {
    id: "security",
    label: "Zero Trust",
    focus: "Defense in depth",
    position: { x: 80, y: 68 },
  },
];

const projects: Project[] = [
  {
    id: "cloud-ops-center",
    title: "Cloud Ops Control Center",
    summary:
      "Unified operations cockpit for multi-cloud workloads with live SLO health and cost signals.",
    role: ["Cloud", "DevOps"],
    type: "Professional",
    linkedSkills: ["kubernetes", "terraform", "observability", "security"],
    architecture:
      "Event-driven control plane with queue-based workers, policy engine, and autoscaled API tier.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Kubernetes", "Terraform"],
    securityHighlights: [
      "OIDC SSO with role-scoped workspaces",
      "End-to-end audit logs with immutable retention",
      "Per-tenant network segmentation and mTLS",
    ],
    link: "https://example.com/cloud-ops",
  },
  {
    id: "secure-pipeline-studio",
    title: "Secure Pipeline Studio",
    summary:
      "CI/CD and artifact governance platform with policy gates and cryptographic provenance.",
    role: ["DevOps", "Security"],
    type: "Professional",
    linkedSkills: ["terraform", "security", "observability"],
    architecture:
      "Pipeline orchestrator, signed artifact registry, and compliance API connected through async workers.",
    stack: [
      "TypeScript",
      "Go",
      "Open Policy Agent",
      "Vault",
      "Prometheus",
      "GitHub Actions",
    ],
    securityHighlights: [
      "Supply-chain signatures and SBOM verification",
      "Secret rotation through dynamic credentials",
      "Policy-as-code checks before deployment",
    ],
    link: "https://example.com/pipeline-studio",
  },
  {
    id: "edge-commerce-suite",
    title: "Edge Commerce Suite",
    summary:
      "Fullstack commerce product with resilient checkout and low-latency edge delivery.",
    role: ["Fullstack", "Cloud"],
    type: "Personal",
    linkedSkills: ["nextjs", "fastapi", "kubernetes", "observability"],
    architecture:
      "Hybrid SSR and API gateway model with queue-backed order processing and edge cache invalidation.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Kafka", "Docker", "Grafana"],
    securityHighlights: [
      "Rate limiting on checkout workflows",
      "Tokenized payment boundary and PCI-safe separation",
      "Bot mitigation with adaptive challenge rules",
    ],
    link: "https://example.com/edge-commerce",
  },
  {
    id: "identity-mesh-lab",
    title: "Identity Mesh Lab",
    summary:
      "Personal R&D playground for identity federation patterns across apps and clusters.",
    role: ["Security", "Fullstack"],
    type: "Personal",
    linkedSkills: ["security", "nextjs", "fastapi"],
    architecture:
      "Identity broker with short-lived tokens, scoped claims, and session introspection endpoints.",
    stack: ["Next.js", "Node.js", "Keycloak", "Nginx", "Docker Compose"],
    securityHighlights: [
      "Fine-grained RBAC mapped to domain actions",
      "Short TTL access tokens and rotating refresh tokens",
      "Continuous anomaly detection on auth events",
    ],
    link: "https://example.com/identity-mesh",
  },
];

export default function Home() {
  const [activeRole, setActiveRole] = useState<Role | "All">("All");
  const [activeType, setActiveType] = useState<ProjectType | "All">("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(projects[0].id);

  const visibleProjects = useMemo(() => {
    return projects.filter((project) => {
      const roleMatch = activeRole === "All" || project.role.includes(activeRole);
      const typeMatch = activeType === "All" || project.type === activeType;
      return roleMatch && typeMatch;
    });
  }, [activeRole, activeType]);

  const roleFilters: Array<Role | "All"> = [
    "All",
    "Cloud",
    "DevOps",
    "Fullstack",
    "Security",
  ];
  const typeFilters: Array<ProjectType | "All"> = ["All", "Professional", "Personal"];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050608] text-[#f4f6fa] selection:bg-[#f9b872]/40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-48 h-112 w-md rounded-full bg-[#ee7f4b]/25 blur-[120px]" />
        <div className="absolute -right-32 top-[20%] h-88 w-88 rounded-full bg-[#19b1ba]/20 blur-[110px]" />
        <div className="absolute -bottom-48 left-[35%] h-104 w-104 rounded-full bg-[#ffcb6b]/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_44%),linear-gradient(to_bottom,rgba(8,10,16,0.7),rgba(5,6,8,1))]" />
      </div>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-24 pt-16 sm:px-8">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-3xl border border-white/10 bg-white/4 p-6 backdrop-blur-xl md:p-8"
          id="dynamic-profile"
        >
          <div className="grid gap-8 md:grid-cols-[1fr_1.5fr]">
            <motion.div
              whileHover={{ rotate: -1.5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 170, damping: 16 }}
              className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0d1220] p-6"
            >
              <div className="absolute right-5 top-5 rounded-full border border-white/20 px-2 py-1 text-[11px] uppercase tracking-[0.18em] text-[#a6f0f5]">
                Online
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-[#f07d4a] to-[#f6c66a] text-lg font-semibold text-[#140f0d]">
                  SD
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#9da8ba]">
                    Samuel Djommou Thengho
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold leading-tight text-[#f6f8fc] sm:text-3xl">
                    Cloud + DevOps + Fullstack
                  </h1>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[#bdc7d9]">
                I build secure, production-grade platforms where software delivery,
                infrastructure reliability, and product velocity reinforce each other.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["DE/EN", "SRE mindset", "Security first", "Platform engineering"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-[#dbe2ef]"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </motion.div>

            <div className="grid content-start gap-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[#96a1b4]">
                Exploration Method
              </p>
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-[#f8fafc] md:text-4xl">
                Interactive portfolio widget with linked discovery paths
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-[#c3ccdc]">
                Start from skills, filter by role or project type, then expand a project
                card to inspect architecture, full stack, and security posture without
                leaving the page.
              </p>
            </div>
          </div>
        </motion.header>

        <motion.section
          id="skill-map"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl md:p-8"
        >
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#96a1b4]">Skill Map</p>
              <h3 className="mt-2 text-2xl font-semibold text-[#f8fafc]">
                Hover a competency to spotlight related projects
              </h3>
            </div>
            <p className="text-sm text-[#c0cbdd]">
              Active signal:{" "}
              <span className="font-medium text-[#ffd18a]">
                {hoveredSkill
                  ? skills.find((skill) => skill.id === hoveredSkill)?.label
                  : "All projects"}
              </span>
            </p>
          </div>

          <div className="relative mt-6 h-80 overflow-hidden rounded-2xl border border-white/10 bg-[#090f1a] sm:h-90">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(240,125,74,0.18),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(25,177,186,0.18),transparent_45%)]" />
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
              {Array.from({ length: 36 }).map((_, index) => (
                <div key={index} className="border border-white/10" />
              ))}
            </div>

            {skills.map((skill) => {
              const isActive = hoveredSkill === null || hoveredSkill === skill.id;
              return (
                <motion.button
                  key={skill.id}
                  type="button"
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onFocus={() => setHoveredSkill(skill.id)}
                  onBlur={() => setHoveredSkill(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border px-3 py-2 text-left transition-all"
                  style={{
                    left: `${skill.position.x}%`,
                    top: `${skill.position.y}%`,
                    borderColor: isActive
                      ? "rgba(255, 208, 138, 0.85)"
                      : "rgba(181, 196, 220, 0.3)",
                    background: isActive
                      ? "rgba(24, 28, 39, 0.9)"
                      : "rgba(13, 17, 25, 0.82)",
                    boxShadow: isActive
                      ? "0 0 0 1px rgba(255,208,138,0.35), 0 10px 34px rgba(5,6,8,0.46)"
                      : "none",
                  }}
                >
                  <p className="text-sm font-medium text-[#edf3ff]">{skill.label}</p>
                  <p className="text-[11px] text-[#aebad0]">{skill.focus}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          id="project-grid"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl md:p-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#96a1b4]">
                Reactive Project Grid
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[#f8fafc]">
                Filter by role or project type
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-wrap gap-2">
                {roleFilters.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setActiveRole(role)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${
                      activeRole === role
                        ? "border-[#f4c17a] bg-[#f4c17a]/20 text-[#ffe7be]"
                        : "border-white/20 bg-white/3 text-[#c4cee0] hover:border-white/40"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {typeFilters.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setActiveType(type)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${
                      activeType === type
                        ? "border-[#90f0f5] bg-[#90f0f5]/20 text-[#dcfdff]"
                        : "border-white/20 bg-white/3 text-[#c4cee0] hover:border-white/40"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <motion.div layout className="mt-7 grid gap-4 md:grid-cols-2">
            <AnimatePresence>
              {visibleProjects.map((project) => {
                const skillLinked = hoveredSkill
                  ? project.linkedSkills.includes(hoveredSkill)
                  : false;
                const isExpanded = expandedProject === project.id;

                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.24 }}
                    className={`rounded-2xl border p-4 sm:p-5 ${
                      skillLinked
                        ? "border-[#f8c57f] bg-linear-to-br from-[#2f2616] to-[#17161a]"
                        : "border-white/12 bg-[#0c111b]"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-[#92a0b8]">
                          {project.type}
                        </p>
                        <h4 className="mt-1 text-xl font-semibold text-[#f7f9fd]">
                          {project.title}
                        </h4>
                        <p className="mt-2 max-w-[52ch] text-sm text-[#bfcae0]">
                          {project.summary}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                        className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-[#dbe4f5] transition hover:border-white/45"
                      >
                        {isExpanded ? "Collapse" : "Expand details"}
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.role.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/18 bg-white/4 px-2.5 py-1 text-[11px] text-[#d1daea]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key={`${project.id}-details`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 border-t border-white/12 pt-4 text-sm text-[#c4d0e5]">
                            <p>
                              <span className="font-medium text-[#edf3ff]">
                                Architecture:
                              </span>{" "}
                              {project.architecture}
                            </p>
                            <p className="mt-3 font-medium text-[#edf3ff]">Full stack</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {project.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-md border border-white/16 bg-white/4 px-2 py-1 text-xs text-[#d7e0ef]"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <p className="mt-3 font-medium text-[#edf3ff]">
                              Security highlights
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-[#c8d3e8]">
                              {project.securityHighlights.map((item) => (
                                <li key={item}>- {item}</li>
                              ))}
                            </ul>
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-4 inline-flex rounded-lg border border-[#8edbe2]/55 bg-[#8edbe2]/14 px-3 py-2 text-xs font-medium tracking-[0.08em] text-[#d4fbff] transition hover:bg-[#8edbe2]/24"
                            >
                              Try project
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {visibleProjects.length === 0 && (
            <div className="mt-8 rounded-2xl border border-dashed border-white/20 p-8 text-center text-sm text-[#c6d2e7]">
              No project matches this combination yet. Try broadening role/type
              filters.
            </div>
          )}
        </motion.section>
      </section>
    </main>
  );
}
