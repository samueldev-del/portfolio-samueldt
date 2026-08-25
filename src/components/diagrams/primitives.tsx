"use client";

import type { ReactNode } from "react";

import type { Lang } from "@/lib/i18n";

export const BOX = {
  neutral: { fill: "#efe7db", stroke: "#d5c7b3" },
  blue: { fill: "#e3ecf8", stroke: "#8fb3da" },
  green: { fill: "#e3f0e7", stroke: "#93c2a7" },
  brown: { fill: "#f8e7d9", stroke: "#dfae8b" },
  purple: { fill: "#eae7f8", stroke: "#aea6dd" },
  maroon: { fill: "#f8e4ec", stroke: "#dda3bb" },
  merge: { fill: "#e7f1de", stroke: "#a6c894" },
} as const;

export type Tone = keyof typeof BOX;

export const ARROW_ID = "dc-arrow";

export function Defs() {
  return (
    <defs>
      <marker
        id={ARROW_ID}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#a08e79" />
      </marker>
    </defs>
  );
}

export function Node({
  x,
  y,
  w,
  h,
  tone,
  label,
  sub,
  mono = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone: Tone;
  label: string;
  sub?: string;
  mono?: boolean;
}) {
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
        fill="#211b16"
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
          fill="#5c5349"
          fontSize={10.5}
          fontFamily={mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : undefined}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

export function Arrow({ d, dashed = false }: { d: string; dashed?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="#a08e79"
      strokeWidth={1.4}
      strokeDasharray={dashed ? "5 4" : undefined}
      markerEnd={`url(#${ARROW_ID})`}
    />
  );
}

/**
 * A diagram is kept above `minWidth` so its labels stay readable, which means
 * it has to scroll sideways on a phone. The fade and the hint below only
 * appear at that size, so the sideways scroll is discoverable rather than
 * something the reader has to guess at.
 */
export function Figure({
  title,
  viewBox,
  minWidth,
  lang,
  children,
}: {
  title: string;
  viewBox: string;
  minWidth: number;
  lang: Lang;
  children: ReactNode;
}) {
  return (
    <figure className="m-0 min-w-0">
      <figcaption className="mb-3 font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">
        {title}
      </figcaption>
      <div className="relative min-w-0">
        <div className="overflow-x-auto rounded-xl border border-line bg-paper p-4">
          <svg
            viewBox={viewBox}
            role="img"
            aria-label={title}
            className="h-auto w-full"
            style={{ minWidth }}
          >
            <Defs />
            {children}
          </svg>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-px right-px w-12 rounded-r-xl bg-gradient-to-l from-paper to-transparent sm:hidden"
        />
      </div>
      <p className="mt-2 text-[11px] text-ink-3 sm:hidden">
        {lang === "de"
          ? "Zum Erkunden seitwärts wischen"
          : "Swipe sideways to explore"}
      </p>
    </figure>
  );
}
