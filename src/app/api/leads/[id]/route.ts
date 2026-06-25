import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { pool, ensureLeadsTable } from "@/lib/db";

export const dynamic = "force-dynamic";

const STATUSES = ["New", "Contacted", "Quoted", "Negotiating", "Closed Won", "Closed Lost"] as const;

const updateSchema = z.object({
  status: z.enum(STATUSES),
});

// ── PATCH /api/leads/[id] — admin updates a lead's stage ──
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leadId = Number(id);
  if (!Number.isInteger(leadId)) {
    return NextResponse.json({ error: "Invalid lead id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    await ensureLeadsTable();
    const result = await pool.query(
      `UPDATE leads SET status = $1 WHERE id = $2
       RETURNING id, name, company, email, phone, country, inquiry_type, product, quantity, budget, message, status, source, created_at`,
      [parsed.data.status, leadId]
    );
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, lead: result.rows[0] });
  } catch (err) {
    console.error("[api/leads/[id]] PATCH failed:", err);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}