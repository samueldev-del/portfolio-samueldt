import Image from "next/image";
import { ArrowUpRight, Globe, Mail, MapPin, QrCode, UserPlus } from "lucide-react";

import { CARD } from "@/lib/carte";
import { PORTRAIT_BLUR_DATA_URL } from "@/lib/carte-generated";

/**
 * The public digital business card.
 *
 * Deliberately a Server Component with no client JavaScript at all: the whole
 * page is prerendered HTML + CSS. Someone reaches this by scanning a QR code
 * while standing in front of Samuel, so a hydration delay — or a JS bundle that
 * never arrives on a weak connection — would break the only moment that counts.
 * Entrance animation lives in globals.css; the language switch is a real link,
 * not state.
 *
 * The card follows the portfolio's paper theme: a printed card handed over,
 * rather than a dark app screen. Same ink, same terracotta, same serif — so the
 * person who scans it and then opens the site recognises one hand behind both.
 *
 * lucide-react v1.8 dropped its brand icons, so the LinkedIn and GitHub marks
 * are inlined below. Recognisability beats icon-set purity on a business card.
 */

type Lang = "de" | "en";

/** Both languages per key, so the two versions cannot drift apart. */
const copy = {
  available: { de: "Verfügbar", en: "Available" },
  cta: { de: "Zu Kontakten hinzufügen", en: "Add to contacts" },
  ctaHint: {
    de: "Öffnet die Kontaktkarte auf deinem Telefon",
    en: "Opens the contact card on your phone",
  },
  email: { de: "E-Mail", en: "Email" },
  portfolio: { de: "Portfolio", en: "Portfolio" },
  qr: { de: "QR-Code", en: "QR code" },
  otherLang: { de: "English", en: "Deutsch" },
  srHeading: { de: "Digitale Visitenkarte", en: "Digital business card" },
} satisfies Record<string, Record<Lang, string>>;

function LinkedInMark({ className }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.16V9.75H2.4V21.5Zm7.9-11.75V21.5h5.16v-6.13c0-1.62.3-3.18 2.3-3.18 1.98 0 2 1.84 2 3.28v6.03H25v-7.06c0-4.02-.87-6.9-5.55-6.9-2.25 0-3.76 1.23-4.38 2.4h-.07V9.75H10.3Z" />
    </svg>
  );
}

function GitHubMark({ className }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.4-3.88-1.4-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.5 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

/** Four terracotta crop marks that snap in around the portrait. */
function CropMarks() {
  const corners = [
    "left-0 top-0 border-l border-t rounded-tl-[3px]",
    "right-0 top-0 border-r border-t rounded-tr-[3px]",
    "left-0 bottom-0 border-l border-b rounded-bl-[3px]",
    "right-0 bottom-0 border-r border-b rounded-br-[3px]",
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute -inset-[7px]">
      {corners.map((corner, i) => (
        <span
          key={corner}
          className={`carte-mark absolute h-[11px] w-[11px] border-ember ${corner}`}
          style={{ animationDelay: `${0.5 + i * 0.05}s` }}
        />
      ))}
    </div>
  );
}

type Tile = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export default function CarteCard({ lang }: Readonly<{ lang: Lang }>) {
  const otherLangHref = lang === "de" ? "/carte/en" : "/carte";

  const tiles: Tile[] = [
    { label: copy.email[lang], href: `mailto:${CARD.email}`, icon: <Mail size={15} /> },
    { label: "LinkedIn", href: CARD.linkedin, icon: <LinkedInMark className="h-[15px] w-[15px]" /> },
    { label: "GitHub", href: CARD.github, icon: <GitHubMark className="h-[15px] w-[15px]" /> },
    { label: copy.portfolio[lang], href: CARD.site, icon: <Globe size={15} /> },
  ];

  return (
    // The root layout owns <html lang="de">, so the English card declares its
    // own language here — otherwise a screen reader reads English copy with
    // German pronunciation rules.
    <main lang={lang} className="relative flex min-h-dvh items-center justify-center px-5 py-8">
      {/* Backdrop — two soft washes of warm light on the paper, and a faint
          ink grid that fades out before it reaches the edges. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-clip">
        <div className="absolute -top-40 -left-28 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(191,83,32,0.13),transparent_65%)]" />
        <div className="absolute -right-28 bottom-[-6rem] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(47,107,79,0.10),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(33,27,22,0.07)_1px,transparent_0)] bg-[size:22px_22px] [mask-image:radial-gradient(100%_65%_at_50%_35%,#000,transparent_75%)]" />
      </div>

      <article className="carte-slab relative w-full max-w-[26rem] overflow-clip rounded-[26px] border border-line bg-card p-5 shadow-photo sm:p-6">
        {/* A printed rule across the head of the card, heaviest in the middle. */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-ember/25 via-ember to-ember/25"
        />
        {/* One pass of light across the paper, timed to land as the eye arrives. */}
        <span
          aria-hidden
          className="carte-sheen absolute inset-y-0 -left-1/2 w-[65%] bg-gradient-to-r from-transparent via-ember/[0.07] to-transparent"
        />

        <h1 className="sr-only">
          {CARD.fullName} — {copy.srHeading[lang]}
        </h1>

        <div className="relative">
          {/* Identity row */}
          <div className="carte-rise flex items-start justify-between gap-3" style={{ animationDelay: "0.12s" }}>
            <div className="relative shrink-0">
              <CropMarks />
              <Image
                src="/carte-portrait.jpg"
                alt={CARD.fullName}
                width={264}
                height={264}
                priority
                placeholder="blur"
                blurDataURL={PORTRAIT_BLUR_DATA_URL}
                className="h-[88px] w-[88px] rounded-[22px] object-cover ring-1 ring-line ring-inset"
              />
            </div>

            <p className="mt-1.5 flex items-center gap-2 rounded-full border border-sage/25 bg-sage-wash px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-sage uppercase">
              <span className="carte-breathe inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-sage" />
              {copy.available[lang]}
            </p>
          </div>

          {/* Name */}
          <h2
            className="carte-rise mt-5 font-display text-[2rem] leading-[1.02] tracking-[-0.02em] text-ink min-[360px]:text-[2.2rem] min-[380px]:text-[2.45rem]"
            style={{ animationDelay: "0.18s" }}
          >
            Samuel Djommou
            <br />
            <span className="text-ember">Thengho</span>
          </h2>

          <p className="carte-rise mt-3 text-[13.5px] text-ink-2" style={{ animationDelay: "0.24s" }}>
            {CARD.role}
          </p>
          <p
            className="carte-rise mt-1.5 flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.16em] text-ink-3 uppercase"
            style={{ animationDelay: "0.28s" }}
          >
            <MapPin size={12} className="shrink-0" />
            {CARD.location}
          </p>

          <hr className="carte-rise my-5 h-px border-0 bg-line" style={{ animationDelay: "0.32s" }} />

          {/* The one thing this page exists for. No `download` attribute: paired
              with the route's `text/vcard` + `inline`, that is what makes iOS
              open the native Add-to-Contacts sheet instead of saving a file. */}
          <div className="carte-rise" style={{ animationDelay: "0.36s" }}>
            <a
              href={CARD.vcardPath}
              className="flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-ember text-[15px] font-semibold text-white shadow-card transition-transform duration-150 [touch-action:manipulation] active:scale-[0.98]"
            >
              <UserPlus size={18} strokeWidth={2.4} />
              {copy.cta[lang]}
            </a>
            <p className="mt-2.5 text-center text-[11.5px] text-ink-3">{copy.ctaHint[lang]}</p>
          </div>

          {/* Secondary links. Every tile is 64px tall — comfortably tappable
              one-handed, and no affordance depends on hover. */}
          <div className="carte-rise mt-5 grid grid-cols-2 gap-2.5" style={{ animationDelay: "0.42s" }}>
            {tiles.map((tile) => {
              const external = tile.href.startsWith("http");
              return (
                <a
                  key={tile.label}
                  href={tile.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="relative flex h-16 items-center gap-2 rounded-2xl border border-line bg-paper px-2.5 text-[12.5px] font-medium text-ink-2 transition-colors duration-150 [touch-action:manipulation] active:bg-paper-2 min-[360px]:gap-2.5 min-[360px]:px-3 min-[360px]:text-[13px]"
                >
                  <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] border border-line bg-card text-ember">
                    {tile.icon}
                  </span>
                  <span className="truncate">{tile.label}</span>
                  <ArrowUpRight
                    size={12}
                    aria-hidden
                    className="absolute top-2.5 right-2.5 text-line-2"
                  />
                </a>
              );
            })}
          </div>

          <div
            className="carte-rise mt-5 flex items-center justify-between text-[11px]"
            style={{ animationDelay: "0.48s" }}
          >
            <a
              href="/carte/qr"
              className="-m-3 flex items-center gap-1.5 p-3 font-mono tracking-[0.14em] text-ink-3 uppercase"
            >
              <QrCode size={13} />
              {copy.qr[lang]}
            </a>
            <a
              href={otherLangHref}
              hrefLang={lang === "de" ? "en" : "de"}
              className="-m-3 p-3 font-mono tracking-[0.14em] text-ink-3 uppercase"
            >
              {copy.otherLang[lang]}
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
