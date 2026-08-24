/**
 * Single source of truth for the digital business card (/carte).
 *
 * Privacy model — deliberate:
 *   - The phone number is NEVER rendered on the page: not as text, and not as a
 *     `tel:` href either, since an href is just as scrapable as body copy. It
 *     exists only inside the downloaded vCard, so getting it takes a human
 *     action rather than a crawler pass.
 *   - Everything else here is already public on the portfolio.
 */

export const CARD = {
  firstName: "Samuel",
  lastName: "Djommou Thengho",
  fullName: "Samuel Djommou Thengho",
  role: "Cloud & DevOps Engineer",
  city: "Hamburg",
  country: "Germany",
  location: "Hamburg, Germany",

  /** Human formatting — used for `aria-label`s and the vCard, never printed. */
  phone: "+49 152 19574804",
  /** RFC 3966 / tel: form. */
  phoneRaw: "+4915219574804",

  email: "contact@samueldt.com",
  site: "https://samueldt.com",
  siteLabel: "samueldt.com",
  linkedin:
    "https://www.linkedin.com/in/samuel-djommou-thengho-b57943400",
  github: "https://github.com/samueldev-del",

  photo: "/samuel.JPG",

  /** Canonical URL the QR code encodes. Must never change. */
  cardUrl: "https://samueldt.com/carte",
  /** Download path for the vCard. The `.vcf` suffix matters on Android. */
  vcardPath: "/carte/samuel-djommou-thengho.vcf",
} as const;

/**
 * When true, the vCard carries ONLY the name and the phone number — the
 * strictest reading of "they should get my number, nothing else".
 *
 * Left off by default: a saved contact with no email is very hard to
 * reactivate months later, and every other field here is already public.
 * Flip this single flag to go minimal.
 */
const MINIMAL_VCARD = false;

/** Bumped by hand whenever the card's contact details change. */
const REVISION = "2026-08-24T00:00:00Z";

/** Escapes a vCard text value per RFC 2426 §4. */
function escapeValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/**
 * Folds a content line to 75 octets, per RFC 2426 §2.6. Continuation lines are
 * prefixed with a single space. Matters most for the base64 PHOTO value, which
 * some Android parsers reject when delivered as one multi-kilobyte line.
 */
function fold(line: string): string[] {
  const bytes = Buffer.from(line, "utf8");
  if (bytes.length <= 75) return [line];

  const out: string[] = [];
  let offset = 0;
  let limit = 75;

  while (offset < bytes.length) {
    let end = Math.min(offset + limit, bytes.length);

    // Never split a multi-byte UTF-8 sequence: walk back off continuation bytes.
    while (end > offset && end < bytes.length && (bytes[end] & 0xc0) === 0x80) {
      end--;
    }

    out.push(
      (offset === 0 ? "" : " ") + bytes.subarray(offset, end).toString("utf8"),
    );
    offset = end;
    limit = 74; // continuation lines spend one octet on the leading space
  }

  return out;
}

export type VCardOptions = {
  /** Base64 JPEG, no data-URI prefix. Omitted when unavailable. */
  photoBase64?: string;
};

/**
 * Builds a vCard 3.0 payload.
 *
 * 3.0 rather than 4.0 on purpose: 4.0 is the newer spec but Android contact
 * importers still handle 3.0 far more reliably, and this file's whole job is to
 * import cleanly on a stranger's phone on the first try.
 */
export function buildVCard({ photoBase64 }: VCardOptions = {}): string {
  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    // Both N and FN: some Android importers ignore a lone FN and save a blank contact.
    `N:${escapeValue(CARD.lastName)};${escapeValue(CARD.firstName)};;;`,
    `FN:${escapeValue(CARD.fullName)}`,
    `TEL;TYPE=CELL,VOICE:${CARD.phoneRaw}`,
  ];

  if (!MINIMAL_VCARD) {
    lines.push(
      `TITLE:${escapeValue(CARD.role)}`,
      `EMAIL;TYPE=INTERNET,PREF:${CARD.email}`,
      `ADR;TYPE=WORK:;;;${escapeValue(CARD.city)};;;${escapeValue(CARD.country)}`,
      `URL:${CARD.site}`,
      // Item grouping is what makes iOS show a readable label next to each link.
      `item1.URL:${CARD.linkedin}`,
      "item1.X-ABLabel:LinkedIn",
      `item2.URL:${CARD.github}`,
      "item2.X-ABLabel:GitHub",
      `X-SOCIALPROFILE;TYPE=linkedin:${CARD.linkedin}`,
    );

    if (photoBase64) {
      lines.push(`PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}`);
    }
  }

  lines.push(`REV:${REVISION}`, "END:VCARD");

  // CRLF terminators are required by the spec; iOS is lenient, Android is not.
  return lines.flatMap(fold).join("\r\n") + "\r\n";
}
