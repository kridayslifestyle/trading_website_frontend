import { NextRequest, NextResponse } from "next/server";
import { ensureProductsTable, pool } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    await ensureProductsTable();

    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const currentId = Number(searchParams.get("currentId"));

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        slug,
        image,
        category,
        price,
        currency
      FROM products
      WHERE category = $1
      AND id != $2
      AND published = true
      ORDER BY created_at DESC
      LIMIT 4
      `,
      [category, currentId]
    );

    return NextResponse.json({
      products: result.rows,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}