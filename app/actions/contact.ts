"use server";

import nodemailer from "nodemailer";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RECEIVER_EMAIL = "mujaddidahmedjami2025@gmail.com";

export interface ContactActionResult {
  success: boolean;
  message: string;
}

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

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error(
      "SMTP configuration is missing. Check your environment variables.",
    );
  }

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  });
}

export async function sendEmail(
  formData: FormData,
): Promise<ContactActionResult> {
  const website = sanitize(formData.get("website"));
  if (website) {
    return { success: true, message: "Message sent successfully!" };
  }

  const name = sanitize(formData.get("name"));
  const email = sanitize(formData.get("email"));
  const subject = sanitize(formData.get("subject"));
  const message = sanitize(formData.get("message"));

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
    return { success: false, message: errors.join(" ") };
  }

  try {
    const transporter = createTransporter();

    const senderName = escapeHtml(name);
    const senderEmail = escapeHtml(email);
    const title = escapeHtml(subject);
    const body = escapeHtml(message);

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: RECEIVER_EMAIL,
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

    return {
      success: true,
      message: "Message sent successfully! I will get back to you soon.",
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "";

    if (msg.includes("Missing credentials") || msg.includes("Invalid login")) {
      return {
        success: false,
        message:
          "Email service authentication failed. Please verify SMTP credentials in .env.local.",
      };
    }

    if (msg.includes("SMTP configuration is missing")) {
      return {
        success: false,
        message:
          "Email service is not configured. Please set SMTP environment variables.",
      };
    }

    return {
      success: false,
      message: "Failed to send your message. Please try again later.",
    };
  }
}
