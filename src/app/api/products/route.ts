import { NextRequest, NextResponse } from "next/server";
import { ensureProductsTable, pool } from "@/lib/db";

export async function GET() {
  try {
    await ensureProductsTable();

    const result = await pool.query(`
      SELECT *
      FROM products
      ORDER BY created_at DESC
    `);

    return NextResponse.json({
      products: result.rows,
    });

  } catch (error) {

    console.error("GET /api/products", error);

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

export async function POST(request: NextRequest) {
  try {

    await ensureProductsTable();

    const body = await request.json();

    const {
      name,
      slug,
      category,
      origin_country,
      price,
      currency,
      moq,
      unit,
      image,
      short_description,
      description,
      featured,
      published,
    } = body;

    if (!name || !slug) {
      return NextResponse.json(
        {
          error: "Name and slug are required",
        },
        {
          status: 400,
        }
      );
    }

    const result = await pool.query(
      `
      INSERT INTO products
      (
        name,
        slug,
        category,
        origin_country,
        price,
        currency,
        moq,
        unit,
        image,
        short_description,
        description,
        featured,
        published
      )

      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
      )

      RETURNING *;
      `,
      [
        name,
        slug,
        category,
        origin_country,
        price,
        currency,
        moq,
        unit,
        image,
        short_description,
        description,
        featured,
        published,
      ]
    );

    return NextResponse.json({
      product: result.rows[0],
    });

  } catch (error) {

    console.error("POST /api/products", error);

    return NextResponse.json(
      {
        error: "Failed to create product",
      },
      {
        status: 500,
      }
    );
  }
}