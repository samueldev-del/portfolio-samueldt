"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import type { Lang } from "@/lib/i18n";

export default function Home() {
  const [lang, setLang] = useState<Lang>("de");

  return (
    <>
      <Navbar lang={lang} onLangChange={setLang} />
      <main>
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
