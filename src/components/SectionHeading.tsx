"use client";

import { motion } from "framer-motion";

/**
 * Every section opens the same way: a small ember eyebrow with a short rule,
 * then a serif heading whose second half is the quiet one. Keeping that in one
 * place is what makes five different sections read as one document.
 */
export default function SectionHeading({
  eyebrow,
  headingA,
  headingB,
  intro,
  centered = false,
}: {
  eyebrow: string;
  headingA: string;
  headingB?: string;
  intro?: string;
  centered?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={centered ? "text-center" : ""}
    >
      <p
        className={`eyebrow flex items-center gap-3 ${
          centered ? "justify-center" : ""
        }`}
      >
        <span aria-hidden className="h-px w-7 bg-ember/45" />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl leading-[1.15] tracking-[-0.015em] text-ink sm:text-[2.6rem]">
        {headingA}
        {headingB && <> <span className="text-ink-3">{headingB}</span></>}
      </h2>
      {intro && (
        <p
          className={`mt-4 max-w-xl text-[15px] leading-relaxed text-ink-2 ${
            centered ? "mx-auto" : ""
          }`}
        >
          {intro}
        </p>
      )}
    </motion.div>
  );
}
