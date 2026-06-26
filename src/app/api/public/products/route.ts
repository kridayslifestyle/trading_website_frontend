import { NextRequest, NextResponse } from "next/server";
import { ensureProductsTable, pool } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    await ensureProductsTable();

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "12");

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "All";
    const sort = searchParams.get("sort") || "newest";

    const offset = (page - 1) * limit;

    const values: any[] = [];
    const where: string[] = ["published = true"];

    if (search) {
      values.push(`%${search}%`);
      where.push(
        `(name ILIKE $${values.length}
        OR short_description ILIKE $${values.length}
        OR category ILIKE $${values.length})`
      );
    }

    if (category !== "All") {
      values.push(category);
      where.push(`category = $${values.length}`);
    }

    let orderBy = "created_at DESC";

    switch (sort) {
      case "oldest":
        orderBy = "created_at ASC";
        break;

      case "price_low":
        orderBy = "price ASC";
        break;

      case "price_high":
        orderBy = "price DESC";
        break;
    }

    const whereClause =
      where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

    // Total Count
    const countResult = await pool.query(
      `
      SELECT COUNT(*) AS total
      FROM products
      ${whereClause}
      `,
      values
    );

    const total = Number(countResult.rows[0].total);

    values.push(limit);
    values.push(offset);

    const products = await pool.query(
      `
      SELECT
        id,
        name,
        slug,
        category,
        image,
        short_description,
        origin_country,
        price,
        currency
      FROM products
      ${whereClause}
      ORDER BY ${orderBy}
      LIMIT $${values.length - 1}
      OFFSET $${values.length}
      `,
      values
    );

    return NextResponse.json({
      products: products.rows,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Failed to fetch products",
      },
      {
        status: 500,
      }
    );
  }
}