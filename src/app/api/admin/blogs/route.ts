import { NextRequest, NextResponse } from "next/server";
import { pool, ensureBlogsTable } from "@/lib/db";

export async function GET() {
  try {
    await ensureBlogsTable();

    const result = await pool.query(`
      SELECT *
      FROM blogs
      ORDER BY created_at DESC
    `);

    return NextResponse.json({
      blogs: result.rows,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureBlogsTable();

    const body = await req.json();

    const result = await pool.query(
      `
      INSERT INTO blogs
      (
        title,
        slug,
        category,
        excerpt,
        content,
        featured_image,
        seo_title,
        seo_description,
        seo_keywords,
        status
      )

      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
      )

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
      ]
    );

    return NextResponse.json(result.rows[0]);

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}