"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import type { Lang } from "@/lib/i18n";

const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="h-96" />,
});
const Skills = dynamic(() => import("@/components/Skills"), {
  loading: () => <div className="h-96" />,
});
const Experience = dynamic(() => import("@/components/Experience"), {
  loading: () => <div className="h-96" />,
});
const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <div className="h-96" />,
});
const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="h-96" />,
});

export default function PortfolioClient({
  initialLang = "de",
}: Readonly<{ initialLang?: Lang }>) {
  const [lang, setLang] = useState<Lang>(initialLang);

  // The toggle swaps every string on the page, so the document has to admit it.
  // Left alone, a screen reader reads the English version with German
  // pronunciation rules — the copy changes and nothing tells it.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      {/* First stop for a keyboard: past five nav links and the language
          buttons, straight to the content. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ember focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        {lang === "de" ? "Zum Inhalt springen" : "Skip to content"}
      </a>
      <Navbar lang={lang} onLangChange={setLang} />
      <main id="main-content">
        <Hero lang={lang} />
        <About lang={lang} />
        <Skills lang={lang} />
        <Experience lang={lang} />
        <Projects lang={lang} />
        <Contact lang={lang} />
      </main>
    </>
  );
}
