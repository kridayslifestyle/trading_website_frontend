import { NextRequest, NextResponse } from "next/server";
import { pool, ensureBlogsTable } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await ensureBlogsTable();

  const { slug } = await params;

  const result = await pool.query(
    `
    SELECT *
    FROM blogs
    WHERE slug = $1
      AND status='Published'
    LIMIT 1
    `,
    [slug]
  );

  if (result.rows.length === 0) {
    return NextResponse.json(
      { error: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(result.rows[0]);
}