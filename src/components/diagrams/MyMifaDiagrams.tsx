"use client";

import type { Lang } from "@/lib/i18n";

const copy = {
  de: {
    archTitle: "Architektur — vom Commit bis zum Alarm",
    frontend: "Frontend",
    frontendSub: "Next.js, Vercel",
    api: "API",
    apiSub: "Express, Vercel",
    db: "Datenbank",
    dbSub: "PostgreSQL, Neon",
    aws: "AWS",
    awsSub: "Infrastruktur in Terraform beschrieben",
    s3: "S3",
    s3Sub: "Dokumente, Lebenslauf",
    eb: "EventBridge",
    ebSub: "Planung, alle 15 Min.",
    lambda: "Lambda",
    lambdaSub: "Node.js",
    cw: "CloudWatch",
    cwSub: "Zwei getrennte Fehlerbilder",
    sns: "SNS",
    snsSub: "E-Mail-Benachrichtigung",
    ciTitle: "CI — sechs blockierende Prüfungen pro Pull Request",
    pr: "Pull Request",
    c1: "Lint & Build",
    c2: "Unit-Tests",
    c3: "Image-Build",
    c4: "Schema neu aufgebaut",
    c5: "Workflow-Lint",
    c6: "Terraform validiert",
    merge: "Merge erlaubt",
  },
  en: {
    archTitle: "Architecture — from commit to alarm",
    frontend: "Frontend",
    frontendSub: "Next.js, Vercel",
    api: "API",
    apiSub: "Express, Vercel",
    db: "Database",
    dbSub: "PostgreSQL, Neon",
    aws: "AWS",
    awsSub: "Infrastructure described in Terraform",
    s3: "S3",
    s3Sub: "Documents, CV",
    eb: "EventBridge",
    ebSub: "Scheduling, every 15 min",
    lambda: "Lambda",
    lambdaSub: "Node.js",
    cw: "CloudWatch",
    cwSub: "Two distinct failure modes",
    sns: "SNS",
    snsSub: "Email notification",
    ciTitle: "CI — six blocking checks per pull request",
    pr: "Pull request",
    c1: "Lint & build",
    c2: "Unit tests",
    c3: "Image build",
    c4: "Schema rebuilt",
    c5: "Workflow lint",
    c6: "Terraform validated",
    merge: "Merge allowed",
  },
};

const BOX = {
  neutral: { fill: "#2b2f38", stroke: "#4a5160" },
  blue: { fill: "#123a63", stroke: "#2f6ba8" },
  green: { fill: "#12453a", stroke: "#2f8a6d" },
  brown: { fill: "#5a2a18", stroke: "#9c4c2a" },
  purple: { fill: "#332f7a", stroke: "#5f59c7" },
  maroon: { fill: "#5c1f3c", stroke: "#a8386b" },
  merge: { fill: "#1e4a1c", stroke: "#3f8a3a" },
};

type NodeProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  tone: keyof typeof BOX;
  label: string;
  sub?: string;
};

function Node({ x, y, w, h, tone, label, sub }: NodeProps) {
  const c = BOX[tone];
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={c.fill}
        stroke={c.stroke}
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        fill="#ffffff"
        fontSize={13}
        fontWeight={600}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 14}
          textAnchor="middle"
          fill="#b9c4d6"
          fontSize={10.5}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({ d }: { d: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="#7e8ea6"
      strokeWidth={1.4}
      markerEnd="url(#mymifa-arrow)"
    />
  );
}

function Defs() {
  return (
    <defs>
      <marker
        id="mymifa-arrow"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#7e8ea6" />
      </marker>
    </defs>
  );
}

export function ArchitectureDiagram({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <figure className="m-0">
      <figcaption className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#7e8ea6]">
        {t.archTitle}
      </figcaption>
      <div className="overflow-x-auto rounded-xl border border-white/8 bg-[#0b0e17] p-4">
        <svg
          viewBox="0 0 740 470"
          role="img"
          aria-label={t.archTitle}
          className="h-auto w-full min-w-[620px]"
        >
          <Defs />

          <Node x={20} y={20} w={200} h={62} tone="neutral" label={t.frontend} sub={t.frontendSub} />
          <Node x={262} y={20} w={200} h={62} tone="blue" label={t.api} sub={t.apiSub} />
          <Node x={504} y={20} w={216} h={62} tone="green" label={t.db} sub={t.dbSub} />

          <Arrow d="M 220 51 L 256 51" />
          <Arrow d="M 462 51 L 498 51" />
          <Arrow d="M 362 82 L 362 130" />

          <rect
            x={20}
            y={140}
            width={700}
            height={310}
            rx={14}
            fill="#22262e"
            stroke="#3d434f"
            strokeWidth={1.5}
          />
          <text x={48} y={176} fill="#ffffff" fontSize={15} fontWeight={700}>
            {t.aws}
          </text>
          <text x={48} y={196} fill="#b9c4d6" fontSize={11}>
            {t.awsSub}
          </text>

          <Node x={48} y={222} w={188} h={70} tone="brown" label={t.s3} sub={t.s3Sub} />
          <Node x={268} y={222} w={196} h={70} tone="purple" label={t.eb} sub={t.ebSub} />
          <Node x={496} y={222} w={188} h={70} tone="purple" label={t.lambda} sub={t.lambdaSub} />

          <Arrow d="M 464 257 L 490 257" />

          <Node x={48} y={342} w={244} h={70} tone="maroon" label={t.cw} sub={t.cwSub} />
          <Node x={340} y={342} w={230} h={70} tone="maroon" label={t.sns} sub={t.snsSub} />

          <Arrow d="M 142 292 L 142 336" />
          <Arrow d="M 590 292 L 590 320 L 455 320 L 455 336" />
          <Arrow d="M 292 377 L 334 377" />
        </svg>
      </div>
    </figure>
  );
}

export function PipelineDiagram({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const lanes = [
    [t.c1, t.c4],
    [t.c2, t.c5],
    [t.c3, t.c6],
  ];

  return (
    <figure className="m-0">
      <figcaption className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#7e8ea6]">
        {t.ciTitle}
      </figcaption>
      <div className="overflow-x-auto rounded-xl border border-white/8 bg-[#0b0e17] p-4">
        <svg
          viewBox="0 0 740 250"
          role="img"
          aria-label={t.ciTitle}
          className="h-auto w-full min-w-[620px]"
        >
          <Defs />

          <Node x={12} y={92} w={132} h={56} tone="neutral" label={t.pr} />

          {lanes.map((lane, i) => {
            const y = 26 + i * 76;
            return (
              <g key={lane[0]}>
                <Node x={176} y={y} w={186} h={52} tone="blue" label={lane[0]} />
                <Node x={396} y={y} w={186} h={52} tone="blue" label={lane[1]} />
                <Arrow d={`M 362 ${y + 26} L 390 ${y + 26}`} />
                <Arrow d={`M 144 120 L 160 120 L 160 ${y + 26} L 170 ${y + 26}`} />
                <path
                  d={`M 582 ${y + 26} L 636 ${y + 26} L 636 120`}
                  fill="none"
                  stroke="#7e8ea6"
                  strokeWidth={1.4}
                />
              </g>
            );
          })}

          <Arrow d="M 636 120 L 660 120" />
          <Node x={604} y={92} w={124} h={56} tone="merge" label={t.merge} />
        </svg>
      </div>
    </figure>
  );
}
