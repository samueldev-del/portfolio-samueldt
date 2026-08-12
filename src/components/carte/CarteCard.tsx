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
 * lucide-react v1.8 dropped its brand icons, so the LinkedIn and GitHub marks
 * are inlined below. Recognisability beats icon-set purity on a business card.
 */

type Lang = "de" | "en";

const copy = {
  de: {
    available: "Verfügbar",
    cta: "Zu Kontakten hinzufügen",
    ctaHint: "Öffnet die Kontaktkarte auf deinem Telefon",
    email: "E-Mail",
    portfolio: "Portfolio",
    qr: "QR-Code",
    otherLang: "English",
    srHeading: "Digitale Visitenkarte",
  },
  en: {
    available: "Available",
    cta: "Add to contacts",
    ctaHint: "Opens the contact card on your phone",
    email: "Email",
    portfolio: "Portfolio",
    qr: "QR code",
    otherLang: "Deutsch",
    srHeading: "Digital business card",
  },
} satisfies Record<Lang, Record<string, string>>;

/** ~280 bytes of inline noise. Kills the plastic flatness of big blurred fills. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.16V9.75H2.4V21.5Zm7.9-11.75V21.5h5.16v-6.13c0-1.62.3-3.18 2.3-3.18 1.98 0 2 1.84 2 3.28v6.03H25v-7.06c0-4.02-.87-6.9-5.55-6.9-2.25 0-3.76 1.23-4.38 2.4h-.07V9.75H10.3Z" />
    </svg>
  );
}

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.4-3.88-1.4-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.5 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

/** Four amber crop marks that snap in around the portrait. */
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
          className={`carte-mark absolute h-[11px] w-[11px] border-[#f0a050] ${corner}`}
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

export default function CarteCard({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const otherLangHref = lang === "de" ? "/carte/en" : "/carte";

  const tiles: Tile[] = [
    { label: t.email, href: `mailto:${CARD.email}`, icon: <Mail size={15} /> },
    { label: "LinkedIn", href: CARD.linkedin, icon: <LinkedInMark className="h-[15px] w-[15px]" /> },
    { label: "GitHub", href: CARD.github, icon: <GitHubMark className="h-[15px] w-[15px]" /> },
    { label: t.portfolio, href: CARD.site, icon: <Globe size={15} /> },
  ];

  return (
    // The root layout owns <html lang="de">, so the English card declares its
    // own language here — otherwise a screen reader reads English copy with
    // German pronunciation rules.
    <main lang={lang} className="relative flex min-h-dvh items-center justify-center px-5 py-6">
      {/* Backdrop — one warm blob and a baseline dot grid. A second blurred blob
          costs another full-viewport composite and buys nothing here. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-clip">
        <div className="absolute -left-32 -top-32 h-[440px] w-[440px] rounded-full bg-[#f0a050]/[0.17] blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_75%_at_50%_0%,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.055)_1px,transparent_0)] bg-[size:22px_22px] [mask-image:radial-gradient(100%_65%_at_50%_35%,#000,transparent_75%)]" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.16] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "180px 180px" }}
      />

      <article className="carte-slab relative w-full max-w-[26rem] overflow-clip rounded-[28px] border border-white/[0.12] bg-[#0b0e18]/85 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_1px_2px_0_rgba(0,0,0,0.6),0_44px_90px_-36px_rgba(0,0,0,0.95)] backdrop-blur-md sm:p-6">
        {/* Light landing on one part of the edge, rather than a uniform hairline. */}
        <span
          aria-hidden
          className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
        {/* Inner sheen, so the slab reads as a lit surface and not a flat fill. */}
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.055),transparent_55%)]"
        />
        {/* One specular pass across the whole face, timed to land as the eye arrives. */}
        <span
          aria-hidden
          className="carte-sheen absolute inset-y-0 -left-1/2 w-[65%] bg-gradient-to-r from-transparent via-white/[0.13] to-transparent"
        />

        <h1 className="sr-only">
          {CARD.fullName} — {t.srHeading}
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
                className="h-[88px] w-[88px] rounded-[22px] object-cover ring-1 ring-inset ring-white/[0.14]"
              />
            </div>

            <p className="mt-1.5 flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#a0b0c8]">
              <span className="carte-breathe inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-[#19b1ba]" />
              {t.available}
            </p>
          </div>

          {/* Name */}
          <h2
            className="carte-rise mt-5 text-[1.85rem] font-semibold leading-[0.95] tracking-[-0.035em] text-white min-[360px]:text-[2.05rem] min-[380px]:text-[2.35rem]"
            style={{ animationDelay: "0.18s" }}
          >
            Samuel Djommou
            <br />
            <span className="bg-gradient-to-r from-[#f0a050] via-[#f8c882] to-[#19b1ba] bg-clip-text pb-[0.08em] text-transparent">
              Thengho
            </span>
          </h2>

          <p className="carte-rise mt-3 text-[13px] text-[#a0b0c8]" style={{ animationDelay: "0.24s" }}>
            {CARD.role}
          </p>
          <p
            className="carte-rise mt-1.5 flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#7e8ea6]"
            style={{ animationDelay: "0.28s" }}
          >
            <MapPin size={12} className="shrink-0" />
            {CARD.location}
          </p>

          <hr className="carte-rise my-5 h-px border-0 bg-white/[0.12]" style={{ animationDelay: "0.32s" }} />

          {/* The one thing this page exists for. No `download` attribute: paired
              with the route's `text/vcard` + `inline`, that is what makes iOS
              open the native Add-to-Contacts sheet instead of saving a file. */}
          <div className="carte-rise" style={{ animationDelay: "0.36s" }}>
            <a
              href={CARD.vcardPath}
              className="flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#f0a050] to-[#e8734a] text-[15px] font-semibold text-[#1a0d04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_10px_28px_-10px_rgba(240,160,80,0.55)] transition-transform duration-150 active:scale-[0.98] [touch-action:manipulation]"
            >
              <UserPlus size={18} strokeWidth={2.4} />
              {t.cta}
            </a>
            <p className="mt-2.5 text-center text-[11.5px] text-[#7e8ea6]">{t.ctaHint}</p>
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
                  className="relative flex h-16 items-center gap-2 rounded-2xl border border-white/[0.10] bg-white/[0.03] px-2.5 text-[12.5px] font-medium text-[#d0daea] transition-colors duration-150 active:bg-white/[0.07] min-[360px]:gap-2.5 min-[360px]:px-3 min-[360px]:text-[13px] [touch-action:manipulation]"
                >
                  <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] border border-white/[0.10] bg-white/[0.05] text-[#a0b0c8]">
                    {tile.icon}
                  </span>
                  <span className="truncate">{tile.label}</span>
                  <ArrowUpRight
                    size={12}
                    aria-hidden
                    className="absolute right-2.5 top-2.5 text-[#5a6a82]"
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
              className="-m-3 flex items-center gap-1.5 p-3 font-mono uppercase tracking-[0.14em] text-[#7e8ea6]"
            >
              <QrCode size={13} />
              {t.qr}
            </a>
            <a
              href={otherLangHref}
              hrefLang={lang === "de" ? "en" : "de"}
              className="-m-3 p-3 font-mono uppercase tracking-[0.14em] text-[#7e8ea6]"
            >
              {t.otherLang}
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
