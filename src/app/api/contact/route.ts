import { NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const globalForRateLimit = globalThis as typeof globalThis & {
  contactRateLimit?: Map<string, RateLimitEntry>;
};

const rateLimitStore =
  globalForRateLimit.contactRateLimit ??
  (globalForRateLimit.contactRateLimit = new Map<string, RateLimitEntry>());

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return false;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  const formData = await request.formData();
  const honeypot = String(formData.get("company") ?? "").trim();

  // Bots often fill hidden fields: silently accept and stop processing.
  if (honeypot.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  // Placeholder for email provider integration (Resend, Postmark, etc.).
  return NextResponse.json({ ok: true }, { status: 200 });
}
