"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import type { Lang } from "@/lib/i18n";

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
    <section id="experience" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
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

        <div className="relative mt-14">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#f0a050]/40 via-white/10 to-transparent" />

          <div className="space-y-10">
            {items.map((item, i) => (
              <motion.div
                key={`${item.title}-${item.period}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="relative pl-12"
              >
                <div
                  className={`absolute left-2.5 top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${
                    item.type === "work"
                      ? "border-[#f0a050] bg-[#f0a050]/20"
                      : "border-[#19b1ba] bg-[#19b1ba]/20"
                  }`}
                >
                  {item.type === "work" ? (
                    <Briefcase size={9} className="text-[#f0a050]" />
                  ) : (
                    <GraduationCap size={9} className="text-[#19b1ba]" />
                  )}
                </div>

                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition hover:border-white/12">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-[#7e8ea6]">
                        {item.company}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[#a0b0c8]">
                      {item.period}
                    </span>
                  </div>

                  {item.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {item.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2 text-sm text-[#a0b0c8]"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#f0a050]/60" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.stack && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-1 text-[11px] text-[#7e8ea6]"
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
