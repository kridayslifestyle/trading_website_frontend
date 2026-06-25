// ─────────────────────────────────────────────────────────
// Lead notifications: email (Resend) + Telegram
// Both are "fire and forget" with try/catch — a notification
// failure should never block saving the lead to the database.
// ─────────────────────────────────────────────────────────
import { Resend } from "resend";

export interface LeadNotification {
  id: number;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  inquiryType?: string;
  product?: string;
  quantity?: string;
  budget?: string;
  message?: string;
}

// ── Email via Resend ────────────────────────────────────
export async function sendLeadEmail(lead: LeadNotification): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ADMIN_EMAIL;

  if (!apiKey || !toEmail) {
    console.warn("[notify] Skipping email: RESEND_API_KEY or ADMIN_EMAIL not set");
    return;
  }

  const resend = new Resend(apiKey);

  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Company", lead.company],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Country", lead.country],
    ["Inquiry Type", lead.inquiryType],
    ["Product", lead.product],
    ["Quantity", lead.quantity],
    ["Budget", lead.budget],
    ["Message", lead.message],
  ];

  const htmlRows = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#64748b;font-size:13px;">${label}</td><td style="padding:6px 12px;color:#0f172a;font-size:13px;font-weight:600;">${escapeHtml(
          value!
        )}</td></tr>`
    )
    .join("");

  try {
    await resend.emails.send({
      // While using the free Resend tier without a verified domain,
      // this must stay "onboarding@resend.dev". Switch to your own
      // domain (e.g. "quotes@tradeproglobal.com") once it's verified.
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: toEmail,
      subject: `New Lead: ${lead.name}${lead.product ? ` — ${lead.product}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
          <h2 style="color:#0f172a;">New Trade Inquiry</h2>
          <table style="border-collapse:collapse;width:100%;">${htmlRows}</table>
          <p style="margin-top:16px;font-size:12px;color:#94a3b8;">Lead #${lead.id} · view in admin dashboard</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[notify] Resend email failed:", err);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── Telegram ─────────────────────────────────────────────
export async function sendLeadTelegram(lead: LeadNotification): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[notify] Skipping Telegram: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set");
    return;
  }

  const lines = [
    `📋 *New Trade Inquiry*`,
    `*Name:* ${lead.name}`,
    lead.company && `*Company:* ${lead.company}`,
    `*Email:* ${lead.email}`,
    lead.phone && `*Phone:* ${lead.phone}`,
    lead.country && `*Country:* ${lead.country}`,
    lead.product && `*Product:* ${lead.product}`,
    lead.inquiryType && `*Type:* ${lead.inquiryType}`,
    lead.quantity && `*Quantity:* ${lead.quantity}`,
    lead.budget && `*Budget:* ${lead.budget}`,
    lead.message && `*Message:* ${lead.message}`,
  ].filter(Boolean);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "Markdown",
      }),
    });
    if (!res.ok) {
      console.error("[notify] Telegram API error:", await res.text());
    }
  } catch (err) {
    console.error("[notify] Telegram send failed:", err);
  }
}