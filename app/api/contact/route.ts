import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT_TO = "mujaddidahmedjami2025@gmail.com";
const DEFAULT_FROM = "onboarding@resend.dev";

function sanitize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const website = sanitize(payload.website);

  if (website) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitize(payload.name);
  const email = sanitize(payload.email);
  const subject = sanitize(payload.subject);
  const message = sanitize(payload.message);

  const errors: string[] = [];

  if (name.length < 2 || name.length > 100) {
    errors.push("Name must be between 2 and 100 characters.");
  }

  if (email.length > 200 || !EMAIL_PATTERN.test(email)) {
    errors.push("Please provide a valid email address.");
  }

  if (subject.length < 3 || subject.length > 200) {
    errors.push("Subject must be between 3 and 200 characters.");
  }

  if (message.length < 10 || message.length > 5000) {
    errors.push("Message must be between 10 and 5000 characters.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Contact form is not configured." },
      { status: 500 }
    );
  }

  const to = process.env.CONTACT_EMAIL || DEFAULT_TO;
  const from = process.env.CONTACT_FROM || DEFAULT_FROM;

  const title = escapeHtml(subject);
  const senderName = escapeHtml(name);
  const senderEmail = escapeHtml(email);
  const body = escapeHtml(message);

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#18181b">
<h2 style="margin:0 0 16px">New message from your portfolio</h2>
<table style="border-collapse:collapse;width:100%;max-width:560px;font-size:14px">
<tr><td style="padding:6px 12px;background:#f4f4f5;width:90px;font-weight:700;border:1px solid #e4e4e7">Name</td><td style="padding:6px 12px;border:1px solid #e4e4e7">${senderName}</td></tr>
<tr><td style="padding:6px 12px;background:#f4f4f5;font-weight:700;border:1px solid #e4e4e7">Email</td><td style="padding:6px 12px;border:1px solid #e4e4e7"><a href="mailto:${senderEmail}" style="color:#2563eb">${senderEmail}</a></td></tr>
<tr><td style="padding:6px 12px;background:#f4f4f5;font-weight:700;border:1px solid #e4e4e7">Subject</td><td style="padding:6px 12px;border:1px solid #e4e4e7">${title}</td></tr>
<tr><td style="padding:6px 12px;background:#f4f4f5;font-weight:700;border:1px solid #e4e4e7;vertical-align:top">Message</td><td style="padding:6px 12px;border:1px solid #e4e4e7;white-space:pre-wrap">${body}</td></tr>
</table>
<p style="font-size:12px;color:#71717a;margin-top:16px">Sent from your portfolio contact form.</p>
</div>`,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: "Failed to send your message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to send your message. Please try again." },
      { status: 500 }
    );
  }
}