import { buildVCard, CARD } from "@/lib/carte";
import { AVATAR_BASE64 } from "@/lib/carte-generated";

/**
 * Serves the downloadable contact file for /carte.
 *
 * The route segment keeps the literal `.vcf` suffix because Chrome on Android
 * derives the saved filename from the URL path, not from Content-Disposition.
 *
 * Prerendered at build time — the payload is constant, so this never touches a
 * server at request time.
 */
export const dynamic = "force-static";

export function GET() {
  const vcard = buildVCard({ photoBase64: AVATAR_BASE64 });

  return new Response(vcard, {
    headers: {
      // `text/vcard` is what makes iOS offer "Add to Contacts" rather than
      // dumping the file into Files. `text/x-vcard` is the legacy alias and is
      // handled worse by modern Android.
      "Content-Type": "text/vcard; charset=utf-8",
      // `inline`, deliberately, NOT `attachment`. On iOS 13+ an attachment
      // disposition forces a download into Files, so the contact sheet only
      // appears after the reader hunts down the file — the one interaction this
      // page exists for, failing silently. `inline` opens the native "Add to
      // Contacts" sheet in place. Android Chrome has no vCard viewer so it
      // downloads either way, taking the filename from the `.vcf` path segment;
      // the filename here is a hint for the browsers that do honour it.
      "Content-Disposition": `inline; filename="${CARD.fullName}.vcf"`,
      // Short shared cache: contact details change rarely, but when the phone
      // number changes a stale vCard is actively harmful.
      "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate",
      "X-Robots-Tag": "noindex",
    },
  });
}
