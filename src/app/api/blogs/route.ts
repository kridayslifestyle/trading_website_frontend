import { NextResponse } from "next/server";
import { pool, ensureBlogsTable } from "@/lib/db";

export async function GET() {
  try {
    await ensureBlogsTable();

    const result = await pool.query(`
      SELECT *
      FROM blogs
      WHERE status='Published'
      ORDER BY created_at DESC
    `);

    return NextResponse.json(result.rows);

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}