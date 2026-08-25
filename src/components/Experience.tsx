"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";

type TimelineItem = {
  type: "work" | "education";
  title: string;
  company: string;
  period: string;
  bullets: string[];
  stack?: string[];
};

const timelineByLang: Record<Lang, TimelineItem[]> = {
  de: [
    {
      type: "work",
      title: "Website-Relaunch und Deployment-Automatisierung",
      company: "Schmidszaunbau, Freelance-Projekt, Hamburg",
      period: "März 2026",
      bullets: [
        "Tatsächlich ausgeliefertes Docroot unter vier duplizierten Verzeichnissen einer undokumentierten Legacy-Infrastruktur identifiziert, durch Abgleich der HTTP-Header Last-Modified mit den mtimes auf dem Server. Umgebung in einem Runbook dokumentiert.",
        "Manuelles FTP-Deployment durch eine Bash-Pipeline mit rsync over SSH abgelöst: Dry-Run-Modus, Konfiguration über Umgebungsvariablen, Einbindung des SSH-Schlüssels.",
        "Automatisierte Prüfung nach jedem Livegang durch curl-Smoke-Tests: Kontrolle der produktiv ausgelieferten Inhalte auf Deutsch und Englisch sowie des HTTP-Status des API-Endpunkts, mit eindeutigem Fehlschlag bei Regression.",
        "Externen Formulardienst durch ein selbst gehostetes PHP-Backend ersetzt: Eingabevalidierung, Schutz vor SMTP-Header-Injection, Honeypot gegen Spam, Fallback beim Versand und Protokollierung der Fehlversuche.",
        "Konsequente zeitgestempelte Backups vor jeder Änderung im Produktivbetrieb, wodurch ein sofortiges Rollback möglich bleibt.",
      ],
      stack: ["Bash", "rsync over SSH", "PHP", "curl", "STRATO-Hosting"],
    },
    {
      type: "work",
      title: "Datenbankadministrator SQL Server",
      company: "GDE Solution GmbH, Freelance-Tätigkeit, Eberdingen",
      period: "Mai 2023 — Februar 2025",
      bullets: [
        "Sicherung und Wiederherstellung: automatisierte Strategien für Full-, Differential- und Transaction-Log-Backups, regelmäßig getestete Wiederherstellungsverfahren zur Prüfung der Datenkonsistenz sowie der RTO- und RPO-Ziele, Hochverfügbarkeit über AlwaysOn Availability Groups, Failover Cluster Instances und Log Shipping.",
        "Sicherheit und Zugriff: Konten, Rollen und Berechtigungen nach dem Least-Privilege-Prinzip verwaltet, Verschlüsselung der Daten im Ruhezustand über TDE und bei der Übertragung, Compliance-Audits und Erkennung unberechtigter Zugriffe.",
        "Performance-Optimierung: Auswertung der Systemmetriken (CPU, Arbeitsspeicher, Festplatten-I/O, Sperren und Deadlocks), Identifikation und Optimierung langsamer T-SQL-Abfragen durch Indizierung, Umschreiben und Aktualisierung der Statistiken, automatisierte präventive Wartung über Indexneuaufbau und DBCC CHECKDB.",
        "Installation und Wartung: Bereitstellung und Konfiguration von Instanzen On-Premises wie auch auf virtuellen Cloud-Maschinen, Einspielen von Cumulative Updates und Service Packs, Versionswechsel und Migrationen, Capacity Planning zur Vorbereitung auf wachsende Datenmengen.",
      ],
      stack: ["Microsoft SQL Server", "T-SQL", "AlwaysOn AG", "TDE", "Log Shipping"],
    },
    {
      type: "work",
      title: "DevOps Engineer, Industrieanlagen und IoT",
      company: "High Tech Industry, Odessa, Ukraine",
      period: "Juli 2021 — Februar 2022",
      bullets: [
        "Continuous-Delivery-Pipelines mit GitLab CI und GitHub Actions, die Code sicher auf lokale Server, IoT-Gateways und speicherprogrammierbare Steuerungen ausliefern.",
        "Automatische Alarmierung bei Verbindungsverlust eines Netzwerk-Gateways oder bei Anzeichen für den Ausfall eines industriellen Steuerungssystems.",
        "Infrastructure as Code mit Terraform für Server, Datenbanken und Netzwerke, auf denen Industrieberichte und Verbrauchshistorien der Energiedaten liegen.",
        "Schnittstelle zwischen Entwicklung und Anlage: Automatisierung der Softwaretests gemeinsam mit Elektroingenieuren und SPS-Programmierern, vor dem physischen Einbau in die Schaltschränke.",
      ],
      stack: ["GitLab CI", "GitHub Actions", "Terraform", "IoT-Gateways", "SPS"],
    },
    {
      type: "education",
      title: "Bachelor in Bank- und Finanzwesen",
      company: "Universität Dschang, Kamerun",
      period: "Erworben 2020",
      bullets: [],
    },
    {
      type: "education",
      title: "Fachinformatiker Systemintegration",
      company: "Collège de la Salle, Douala, Kamerun",
      period: "Erworben 2019",
      bullets: [],
    },
  ],
  en: [
    {
      type: "work",
      title: "Website relaunch and deployment automation",
      company: "Schmidszaunbau, freelance project, Hamburg",
      period: "March 2026",
      bullets: [
        "Identified the genuinely served docroot among four duplicated directories of an undocumented legacy infrastructure, by matching Last-Modified HTTP headers against file mtimes on the server. Environment documented in a runbook.",
        "Replaced manual FTP deployment with a Bash pipeline using rsync over SSH: dry-run mode, configuration through environment variables, SSH key handling.",
        "Automated verification after every release through curl smoke tests: checks the live German and English content and the API endpoint's HTTP status, failing unambiguously on regression.",
        "Replaced the external form service with a self-hosted PHP backend: input validation, SMTP header injection protection, honeypot against spam, send fallback and logging of failed attempts.",
        "Consistent timestamped backups before every production change, keeping an immediate rollback possible.",
      ],
      stack: ["Bash", "rsync over SSH", "PHP", "curl", "STRATO hosting"],
    },
    {
      type: "work",
      title: "SQL Server Database Administrator",
      company: "GDE Solution GmbH, freelance, Eberdingen",
      period: "May 2023 — February 2025",
      bullets: [
        "Backup and recovery: automated strategies for full, differential and transaction log backups, regularly tested restore procedures verifying data consistency and RTO/RPO targets, high availability through AlwaysOn Availability Groups, Failover Cluster Instances and log shipping.",
        "Security and access: accounts, roles and permissions managed on least-privilege principles, encryption at rest through TDE and in transit, compliance audits and detection of unauthorised access.",
        "Performance tuning: analysis of system metrics (CPU, memory, disk I/O, locks and deadlocks), identification and optimisation of slow T-SQL queries through indexing, rewriting and statistics updates, automated preventive maintenance via index rebuilds and DBCC CHECKDB.",
        "Installation and maintenance: provisioning and configuration of instances both on-premises and on cloud virtual machines, applying cumulative updates and service packs, version upgrades and migrations, capacity planning for growing data volumes.",
      ],
      stack: ["Microsoft SQL Server", "T-SQL", "AlwaysOn AG", "TDE", "Log shipping"],
    },
    {
      type: "work",
      title: "DevOps Engineer, industrial systems and IoT",
      company: "High Tech Industry, Odessa, Ukraine",
      period: "July 2021 — February 2022",
      bullets: [
        "Continuous delivery pipelines with GitLab CI and GitHub Actions, shipping code safely to local servers, IoT gateways and programmable logic controllers.",
        "Automatic alerting on loss of connection to a network gateway or on signs of an industrial control system failing.",
        "Infrastructure as code with Terraform for the servers, databases and networks holding industrial reports and energy consumption history.",
        "Interface between development and the plant floor: automating software tests together with electrical engineers and PLC programmers, ahead of physical installation into the control cabinets.",
      ],
      stack: ["GitLab CI", "GitHub Actions", "Terraform", "IoT gateways", "PLC"],
    },
    {
      type: "education",
      title: "Bachelor in Banking and Finance",
      company: "University of Dschang, Cameroon",
      period: "Awarded 2020",
      bullets: [],
    },
    {
      type: "education",
      title: "Fachinformatiker Systemintegration",
      company: "Collège de la Salle, Douala, Cameroon",
      period: "Awarded 2019",
      bullets: [],
    },
  ],
};

const copy = {
  de: {
    eyebrow: "Erfahrung & Ausbildung",
    headingA: "Wo ich gearbeitet",
    headingB: "& gelernt habe.",
  },
  en: {
    eyebrow: "Experience & Education",
    headingA: "Where I’ve worked",
    headingB: "& learned.",
  },
};

type ExperienceProps = {
  lang: Lang;
};

export default function Experience({ lang }: ExperienceProps) {
  const t = copy[lang];
  const items = timelineByLang[lang];

  return (
    <section id="experience" className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow={t.eyebrow}
          headingA={t.headingA}
          headingB={t.headingB}
        />

        <div className="relative mt-14">
          {/* The spine fades out at the bottom rather than stopping dead. */}
          <div
            aria-hidden
            className="absolute top-3 bottom-3 left-[13px] w-px bg-gradient-to-b from-ember/50 via-line-2 to-transparent"
          />

          <div className="space-y-8">
            {items.map((item, i) => (
              <motion.div
                key={`${item.title}-${item.period}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: 0.05 * i }}
                className="relative pl-10 sm:pl-14"
              >
                <span
                  className={`absolute top-5 left-0 flex h-7 w-7 items-center justify-center rounded-full border bg-card shadow-card ${
                    item.type === "work"
                      ? "border-ember/40 text-ember"
                      : "border-sage/40 text-sage"
                  }`}
                >
                  {item.type === "work" ? (
                    <Briefcase size={12} />
                  ) : (
                    <GraduationCap size={12} />
                  )}
                </span>

                <div className="rounded-2xl border border-line bg-card p-6 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-display text-xl leading-snug text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink-3">{item.company}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-line bg-paper-2 px-3 py-1 font-mono text-[11px] tracking-wide text-ink-2">
                      {item.period}
                    </span>
                  </div>

                  {item.bullets.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {item.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-sm leading-relaxed text-ink-2"
                        >
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember/50"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.stack && (
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-paper-2 px-2 py-1 font-mono text-[11px] text-ink-3"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
