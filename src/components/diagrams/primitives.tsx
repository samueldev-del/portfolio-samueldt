"use client";

import type { ReactNode } from "react";

export const BOX = {
  neutral: { fill: "#2b2f38", stroke: "#4a5160" },
  blue: { fill: "#123a63", stroke: "#2f6ba8" },
  green: { fill: "#12453a", stroke: "#2f8a6d" },
  brown: { fill: "#5a2a18", stroke: "#9c4c2a" },
  purple: { fill: "#332f7a", stroke: "#5f59c7" },
  maroon: { fill: "#5c1f3c", stroke: "#a8386b" },
  merge: { fill: "#1e4a1c", stroke: "#3f8a3a" },
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
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#7e8ea6" />
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
      stroke="#7e8ea6"
      strokeWidth={1.4}
      strokeDasharray={dashed ? "5 4" : undefined}
      markerEnd={`url(#${ARROW_ID})`}
    />
  );
}

export function Figure({
  title,
  viewBox,
  minWidth,
  children,
}: {
  title: string;
  viewBox: string;
  minWidth: number;
  children: ReactNode;
}) {
  return (
    <figure className="m-0">
      <figcaption className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#7e8ea6]">
        {title}
      </figcaption>
      <div className="overflow-x-auto rounded-xl border border-white/8 bg-[#0b0e17] p-4">
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
    </figure>
  );
}
