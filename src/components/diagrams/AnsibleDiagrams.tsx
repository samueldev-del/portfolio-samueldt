"use client";

import type { Lang } from "@/lib/i18n";
import { Arrow, Figure, Node } from "./primitives";

const copy = {
  de: {
    runTitle: "site.yml — ein Lauf gegen die Gruppe web",
    inventory: "Inventar",
    inventorySub: "inventory.ini",
    play: "Play: Configure web servers",
    playSub: "hosts: web · become: true",
    role: "Rolle webserver",
    t1: "assert",
    t1Sub: "os_family == Debian, sonst Abbruch",
    t2: "apt",
    t2Sub: "loop: webserver_packages · when: Debian",
    t3: "template",
    t3Sub: "index.html.j2 → /var/www/html/index.html",
    t4: "service",
    t4Sub: "nginx started · enabled at boot",
    t5: "debug",
    t5Sub: "Hostname und IPv4 aus den Facts",
    handler: "Handler: Restart nginx",
    handlerSub: "am Ende des Plays",
    notify: "notify — nur bei\ntatsächlicher Änderung",

    varTitle: "Variablen-Präzedenz — was am Ende wirklich gilt",
    v1: "roles/webserver/defaults/main.yml",
    v1Sub: "webserver_packages: [nginx]",
    v2: "group_vars/web/vars.yml",
    v2Sub: "[nginx, curl, git]",
    v3: "group_vars/web/vault.yml",
    v3Sub: "ansible-vault, verschlüsselt",
    v4: "roles/webserver/vars/main.yml",
    v4Sub: "hohe Präzedenz, nicht zum Überschreiben",
    v5: "-e / --extra-vars",
    v5Sub: "höchste Präzedenz",
    result: "Effektiv angewendet",
    resultSub: "nginx, curl, git",
    overrides: "überschreibt",
    low: "niedrig",
    high: "hoch",
  },
  en: {
    runTitle: "site.yml — one run against the web group",
    inventory: "Inventory",
    inventorySub: "inventory.ini",
    play: "Play: Configure web servers",
    playSub: "hosts: web · become: true",
    role: "webserver role",
    t1: "assert",
    t1Sub: "os_family == Debian, otherwise abort",
    t2: "apt",
    t2Sub: "loop: webserver_packages · when: Debian",
    t3: "template",
    t3Sub: "index.html.j2 → /var/www/html/index.html",
    t4: "service",
    t4Sub: "nginx started · enabled at boot",
    t5: "debug",
    t5Sub: "hostname and IPv4 from the facts",
    handler: "Handler: Restart nginx",
    handlerSub: "at the end of the play",
    notify: "notify — only on\nan actual change",

    varTitle: "Variable precedence — what actually applies",
    v1: "roles/webserver/defaults/main.yml",
    v1Sub: "webserver_packages: [nginx]",
    v2: "group_vars/web/vars.yml",
    v2Sub: "[nginx, curl, git]",
    v3: "group_vars/web/vault.yml",
    v3Sub: "ansible-vault, encrypted",
    v4: "roles/webserver/vars/main.yml",
    v4Sub: "high precedence, not meant to be overridden",
    v5: "-e / --extra-vars",
    v5Sub: "highest precedence",
    result: "Effectively applied",
    resultSub: "nginx, curl, git",
    overrides: "overrides",
    low: "low",
    high: "high",
  },
};

export function RoleRunDiagram({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const tasks: Array<[string, string]> = [
    [t.t1, t.t1Sub],
    [t.t2, t.t2Sub],
    [t.t3, t.t3Sub],
    [t.t4, t.t4Sub],
    [t.t5, t.t5Sub],
  ];

  return (
    <Figure title={t.runTitle} viewBox="0 0 760 520" minWidth={640} lang={lang}>
      {/* inventory */}
      <rect
        x={16}
        y={20}
        width={214}
        height={104}
        rx={12}
        fill="#f7f2ea"
        stroke="#e0d4c2"
        strokeWidth={1.5}
      />
      <text x={34} y={42} fill="#211b16" fontSize={13} fontWeight={700}>
        {t.inventory}
      </text>
      <text
        x={34}
        y={58}
        fill="#7a7066"
        fontSize={10}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        {t.inventorySub}
      </text>
      {["web1 · 192.168.252.4", "web2 · 192.168.252.5"].map((host, i) => (
        <g key={host}>
          <rect
            x={34}
            y={68 + i * 24}
            width={178}
            height={20}
            rx={6}
            fill="#efe7db"
            stroke="#d5c7b3"
            strokeWidth={1.2}
          />
          <text
            x={123}
            y={82 + i * 24}
            textAnchor="middle"
            fill="#5c5349"
            fontSize={10}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            {host}
          </text>
        </g>
      ))}

      <Node x={286} y={34} w={300} h={62} tone="blue" label={t.play} sub={t.playSub} />
      <Arrow d="M 230 72 L 280 72" />
      <Arrow d="M 436 96 L 436 132" />

      {/* role container */}
      <rect
        x={16}
        y={140}
        width={520}
        height={364}
        rx={14}
        fill="#f7f2ea"
        stroke="#e0d4c2"
        strokeWidth={1.5}
      />
      <text x={38} y={168} fill="#211b16" fontSize={14} fontWeight={700}>
        {t.role}
      </text>

      {tasks.map(([label, sub], i) => {
        const y = 186 + i * 62;
        return (
          <g key={label}>
            <Node
              x={38}
              y={y}
              w={476}
              h={50}
              tone={i === 2 ? "purple" : "neutral"}
              label={label}
              sub={sub}
            />
            {i < tasks.length - 1 && <Arrow d={`M 276 ${y + 50} L 276 ${y + 60}`} />}
          </g>
        );
      })}

      {/* handler */}
      <Node x={568} y={286} w={176} h={56} tone="maroon" label={t.handler} sub={t.handlerSub} />
      <Arrow d="M 514 335 L 545 335 L 545 314 L 562 314" dashed />
      {t.notify.split("\n").map((line, i) => (
        <text key={line} x={654} y={366 + i * 14} textAnchor="middle" fill="#7a7066" fontSize={10}>
          {line}
        </text>
      ))}
    </Figure>
  );
}

export function PrecedenceDiagram({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const layers: Array<[string, string]> = [
    [t.v5, t.v5Sub],
    [t.v4, t.v4Sub],
    [t.v3, t.v3Sub],
    [t.v2, t.v2Sub],
    [t.v1, t.v1Sub],
  ];

  return (
    <Figure title={t.varTitle} viewBox="0 0 760 400" minWidth={640} lang={lang}>
      {/* precedence axis */}
      <line x1={40} y1={40} x2={40} y2={330} stroke="#d5c7b3" strokeWidth={1.4} />
      <text x={40} y={30} textAnchor="middle" fill="#7a7066" fontSize={10}>
        {t.high}
      </text>
      <text x={40} y={348} textAnchor="middle" fill="#7a7066" fontSize={10}>
        {t.low}
      </text>

      {layers.map(([label, sub], i) => {
        const y = 40 + i * 58;
        const isWinner = label === t.v2;
        return (
          <g key={label}>
            <Node
              x={70}
              y={y}
              w={420}
              h={48}
              tone={isWinner ? "green" : "neutral"}
              label={label}
              sub={sub}
              mono
            />
            {i < layers.length - 1 && <Arrow d={`M 280 ${y + 58} L 280 ${y + 50}`} />}
          </g>
        );
      })}

      <text x={296} y={362} textAnchor="middle" fill="#7a7066" fontSize={10}>
        {t.overrides} ↑
      </text>

      <Node x={534} y={207} w={200} h={62} tone="green" label={t.result} sub={t.resultSub} mono />
      <Arrow d="M 490 238 L 528 238" />
    </Figure>
  );
}
