import { NextResponse } from "next/server";
import {
  pool,
  ensureProductsTable,
} from "@/lib/db";

export async function GET() {
  try {
    await ensureProductsTable();

    const result = await pool.query(`
      SELECT
        id,
        name,
        category,
        origin_country,
        short_description,
        image
      FROM products
      WHERE published = true
      ORDER BY created_at DESC
    `);

    return NextResponse.json(result.rows);

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}