import { Resend } from "resend";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isValidPayload = (body: unknown): body is ContactPayload => {
  if (!body || typeof body !== "object") return false;
  const candidate = body as Record<string, unknown>;
  return (
    typeof candidate.name === "string" &&
    candidate.name.trim().length > 0 &&
    candidate.name.trim().length <= 100 &&
    typeof candidate.email === "string" &&
    candidate.email.trim().length > 0 &&
    candidate.email.trim().length <= 255 &&
    typeof candidate.message === "string" &&
    candidate.message.trim().length > 0 &&
    candidate.message.trim().length <= 1000
  );
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing RESEND_API_KEY" });
  }

  if (!isValidPayload(req.body)) {
    return res.status(400).json({ error: "Invalid form data" });
  }

  const payload = {
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    message: req.body.message.trim(),
  };

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL || "bhanu.prakash1708@gmail.com",
      replyTo: payload.email,
      subject: `Portfolio Contact: ${payload.name}`,
      html: `
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend send failed", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
