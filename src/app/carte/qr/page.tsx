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
        <div className="absolute -left-32 -top-32 h-[440px] w-[440px] rounded-full bg-[#f0a050]/[0.17] blur-[110px]" />
      </div>

      <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#7e8ea6]">
        {CARD.role}
      </p>

      <h1 className="mt-3 text-center text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
        Samuel Djommou{" "}
        <span className="bg-gradient-to-r from-[#f0a050] via-[#f8c882] to-[#19b1ba] bg-clip-text pb-[0.08em] text-transparent">
          Thengho
        </span>
      </h1>

      <div className="mt-8 rounded-[28px] bg-white p-4 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.9)]">
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

      <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.28em] text-[#a0b0c8]">
        Scan to connect
      </p>
      <p className="mt-2 font-mono text-[11px] text-[#5a6a82]">samueldt.com/carte</p>

      <a
        href="/carte"
        className="mt-10 -m-2 flex items-center gap-1.5 p-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#7e8ea6]"
      >
        <ArrowLeft size={13} />
        Karte
      </a>
    </main>
  );
}
