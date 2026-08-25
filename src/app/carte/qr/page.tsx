import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import { CARD } from "@/lib/carte";

export const metadata: Metadata = {
  title: `${CARD.fullName} — QR`,
};

/**
 * The side of the card Samuel shows, not the side the other person reads.
 *
 * Open this, hand the phone over, they scan it with the camera app. The QR
 * encodes CARD.cardUrl and nothing else, so the phone number, the links and the
 * layout can all change forever without invalidating a single printed or
 * screenshotted code.
 *
 * The panel is a large white field on purpose: on a phone at partial screen
 * brightness, white area is what a camera actually has to work with.
 */
export default function CarteQrPage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-10">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-clip">
        <div className="absolute -top-40 -left-28 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(191,83,32,0.13),transparent_65%)]" />
        <div className="absolute -right-28 bottom-[-6rem] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(47,107,79,0.10),transparent_65%)]" />
      </div>

      <p className="font-mono text-[10.5px] tracking-[0.22em] text-ink-3 uppercase">
        {CARD.role}
      </p>

      <h1 className="mt-3 text-center font-display text-[2rem] leading-[1.08] tracking-[-0.02em] text-ink">
        Samuel Djommou <span className="text-ember">Thengho</span>
      </h1>

      {/* The panel stays a large white field: on a phone at partial screen
          brightness, white area is what a camera actually has to work with. */}
      <div className="mt-8 rounded-[28px] border border-line bg-white p-4 shadow-photo">
        <Image
          src="/carte-qr.svg"
          alt={`QR code linking to ${CARD.cardUrl}`}
          width={288}
          height={288}
          priority
          unoptimized
          className="h-[clamp(232px,64vw,288px)] w-[clamp(232px,64vw,288px)]"
        />
      </div>

      <p className="mt-7 font-mono text-[11px] tracking-[0.28em] text-ink-2 uppercase">
        Scan to connect
      </p>
      <p className="mt-2 font-mono text-[11px] text-ink-3">samueldt.com/carte</p>

      <a
        href="/carte"
        className="-m-2 mt-10 flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2.5 font-mono text-[11px] tracking-[0.14em] text-ink-2 uppercase shadow-card"
      >
        <ArrowLeft size={13} />
        Karte
      </a>
    </main>
  );
}
