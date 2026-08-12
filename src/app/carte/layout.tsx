import type { Metadata, Viewport } from "next";

import { CARD } from "@/lib/carte";

/** Matches the page background, so there is no light flash or seam on load. */
export const viewport: Viewport = {
  themeColor: "#060810",
};

/**
 * `noindex` is deliberate and applies to /carte, /carte/en and /carte/qr.
 *
 * The card is reached by scanning a QR code, never by search. Keeping it out of
 * the index avoids competing with the portfolio for the same name query, and
 * keeps the contact endpoint off crawler paths. Crawling is still *allowed* in
 * robots.txt on purpose — a blocked URL can be indexed without ever being read,
 * which would defeat the meta tag.
 */
export const metadata: Metadata = {
  title: `${CARD.fullName} — Kontakt`,
  description: `Digitale Visitenkarte von ${CARD.fullName}, ${CARD.role} in ${CARD.location}.`,
  alternates: { canonical: CARD.cardUrl },
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  // Samuel adds /carte/qr to his own home screen — that shortcut IS the card
  // until a Wallet pass exists. Two things have to be right for that to feel
  // like an app rather than a bookmark:
  //   - a PNG icon. iOS ignores SVG for apple-touch-icon and silently falls
  //     back to a screenshot of the page, so the root layout's favicon.svg
  //     would have produced a grey tile.
  //   - standalone mode, so tapping it opens straight to a full-bleed QR with
  //     no address bar and no tab strip in the way.
  icons: { apple: "/carte-icon.png" },
  appleWebApp: {
    capable: true,
    title: "Samuel DT",
    statusBarStyle: "black-translucent",
  },
};

export default function CarteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
