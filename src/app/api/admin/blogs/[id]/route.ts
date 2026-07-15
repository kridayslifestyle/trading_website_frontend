import { NextRequest, NextResponse } from "next/server";
import { pool, ensureBlogsTable } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await ensureBlogsTable();

  const { id } = await params;

  const result = await pool.query(
    `
    SELECT *
    FROM blogs
    WHERE id=$1
    `,
    [id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json(
      { error: "Not Found" },
      { status: 404 }
    );
  }

  return NextResponse.json(result.rows[0]);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await ensureBlogsTable();

  const { id } = await params;

  const body = await req.json();

  const result = await pool.query(
    `
    UPDATE blogs

    SET

      title=$1,
      slug=$2,
      category=$3,
      excerpt=$4,
      content=$5,
      featured_image=$6,
      seo_title=$7,
      seo_description=$8,
      seo_keywords=$9,
      status=$10,
      updated_at=NOW()

    WHERE id=$11

    RETURNING *
    `,
    [
      body.title,
      body.slug,
      body.category,
      body.excerpt,
      body.content,
      body.featured_image,
      body.seo_title,
      body.seo_description,
      body.seo_keywords,
      body.status,
      id,
    ]
  );

  return NextResponse.json(result.rows[0]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await ensureBlogsTable();

  const { id } = await params;

  await pool.query(
    `
    DELETE FROM blogs
    WHERE id=$1
    `,
    [id]
  );

  return NextResponse.json({
    success: true,
  });
}