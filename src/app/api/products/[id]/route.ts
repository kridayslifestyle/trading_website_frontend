import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  const result = await pool.query(
    "SELECT * FROM products WHERE id=$1",
    [id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(result.rows[0]);
}

export async function PATCH(
  request: NextRequest,
  { params }: Params
) {
  const { id } = await params;

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

  const result = await pool.query(
    `
    UPDATE products

    SET

    name=$1,
    slug=$2,
    category=$3,
    origin_country=$4,
    price=$5,
    currency=$6,
    moq=$7,
    unit=$8,
    image=$9,
    short_description=$10,
    description=$11,
    featured=$12,
    published=$13

    WHERE id=$14

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
      id,
    ]
  );

  return NextResponse.json(result.rows[0]);
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    await pool.query(
      "DELETE FROM products WHERE id=$1",
      [id]
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to delete product",
      },
      {
        status: 500,
      }
    );
  }
}