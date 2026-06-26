import { NextRequest, NextResponse } from "next/server";
import { ensureProductsTable, pool } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await ensureProductsTable();

    const { slug } = await params;

    const result = await pool.query(
      `
      SELECT *
      FROM products
      WHERE slug = $1
      AND published = true
      LIMIT 1
      `,
      [slug]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}