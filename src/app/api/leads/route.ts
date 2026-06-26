import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { pool, ensureLeadsTable } from "@/lib/db";
import { sendLeadEmail, sendLeadTelegram } from "@/lib/notify";

// Route handlers are dynamic by default (not statically cached),
// which is what we want here since every request reads/writes
// live data. Being explicit avoids surprises if defaults change.
export const dynamic = "force-dynamic";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email").max(200),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  country: z.string().trim().max(100).optional().or(z.literal("")),
  type: z.string().trim().max(100).optional().or(z.literal("")),
  product: z.string().trim().max(200).optional().or(z.literal("")),
  quantity: z.string().trim().max(100).optional().or(z.literal("")),
  budget: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

// ── POST /api/leads — called by the public inquiry form ──
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }
  const data = parsed.data;

  try {
    await ensureLeadsTable();

    const result = await pool.query(
      `INSERT INTO leads
        (name, company, email, phone, country, inquiry_type, product, quantity, budget, message, status, source)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'New','Website')
       RETURNING id, name, company, email, phone, country, inquiry_type, product, quantity, budget, message, status, source, created_at`,
      [
        data.name,
        data.company || null,
        data.email,
        data.phone || null,
        data.country || null,
        data.type || null,
        data.product || null,
        data.quantity || null,
        data.budget || null,
        data.message,
      ],
    );

    const lead = result.rows[0];

    // Fire notifications in the background — don't make the visitor
    // wait on email/Telegram delivery, and don't fail the submission
    // if a notification provider is down or not yet configured.
    void Promise.allSettled([
      sendLeadEmail({
        id: lead.id,
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        country: lead.country,
        inquiryType: lead.inquiry_type,
        product: lead.product,
        quantity: lead.quantity,
        budget: lead.budget,
        message: lead.message,
      }),
      sendLeadTelegram({
        id: lead.id,
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        country: lead.country,
        inquiryType: lead.inquiry_type,
        product: lead.product,
        quantity: lead.quantity,
        budget: lead.budget,
        message: lead.message,
      }),
    ]);

    return NextResponse.json({ ok: true, lead }, { status: 201 });
  } catch (err) {
    console.error("[api/leads] POST failed:", err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}

// ── GET /api/leads — called by the admin dashboard ───────
export async function GET() {
  try {
    await ensureLeadsTable();
    const result = await pool.query(
      `SELECT id, name, company, email, phone, country, inquiry_type, product, quantity, budget, message, status, source, created_at
       FROM leads
       ORDER BY created_at DESC`,
    );
    return NextResponse.json({ leads: result.rows });
  } catch (error) {
    console.error("GET /api/leads error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch leads",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
