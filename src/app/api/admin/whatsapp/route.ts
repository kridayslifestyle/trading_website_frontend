import { NextResponse } from "next/server";
import { pool, ensureLeadsTable } from "@/lib/db";

export async function GET() {
  try {
    await ensureLeadsTable();

    const [leadCount, recentLeads] = await Promise.all([
      pool.query(`
        SELECT COUNT(*)::int AS total
        FROM leads
      `),

      pool.query(`
        SELECT
          id,
          name,
          company,
          phone,
          country,
          status,
          created_at
        FROM leads
        ORDER BY created_at DESC
        LIMIT 5
      `),
    ]);

    return NextResponse.json({
      connected: false,

      templates: 4,

      totalLeads: leadCount.rows[0].total,

      recentLeads: recentLeads.rows,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        error: "Failed",
      },
      {
        status: 500,
      }
    );
  }
}