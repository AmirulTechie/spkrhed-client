import { Resend } from "resend";
import { buildContactNotificationEmail } from "@/lib/contact-email-template";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 3;

// In-memory per-instance limiter. Good enough to blunt a script hammering a
// single lambda instance on the free tier; it does not coordinate across
// instances, so it's a speed bump, not a hard cap. Swap for Upstash/Redis if
// abuse gets past this.
const submissionsByIp = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = submissionsByIp.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    submissionsByIp.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

async function verifyTurnstileToken(token, ip) {
  if (!process.env.TURNSTILE_SECRET_KEY) return true; // not configured yet

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip,
      }),
    },
  );

  const result = await response.json();
  if (!result.success) {
    console.error("Contact form: Turnstile verification failed.", result["error-codes"]);
  }
  return result.success === true;
}

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  const payload = await request.json();
  const { name, email, phone, message, website, turnstileToken } = payload;

  // Honeypot: real users never see or fill this field.
  if (website) {
    return Response.json({ ok: true });
  }

  if (!name || !email || !message) {
    return Response.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const isHuman = await verifyTurnstileToken(turnstileToken, ip);
  if (!isHuman) {
    return Response.json(
      { ok: false, error: "Verification failed. Please try again." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not configured.");
    return Response.json(
      { ok: false, error: "Email service is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { html, text } = buildContactNotificationEmail({ name, email, phone, message });
    const { error: sendError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "SPKRHED Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `🌱 New message from ${name}`,
      html,
      text,
    });

    if (sendError) {
      console.error("Contact form: Resend rejected the email.", sendError);
      return Response.json(
        { ok: false, error: "Failed to send message. Please try again later." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Contact form: failed to send email via Resend.", error);
    return Response.json(
      { ok: false, error: "Failed to send message. Please try again later." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
