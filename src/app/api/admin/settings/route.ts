import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

async function ensureSettingsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS settings (

      id SERIAL PRIMARY KEY,

      company_name TEXT,

      tagline TEXT,

      about TEXT,

      email TEXT,

      phone TEXT,

      whatsapp TEXT,

      address TEXT,

      map_url TEXT,

      facebook TEXT,

      instagram TEXT,

      linkedin TEXT,

      youtube TEXT,

      twitter TEXT,

      meta_title TEXT,

      meta_description TEXT,

      meta_keywords TEXT,

      ga_id TEXT,

      gsc_verification TEXT,

      logo TEXT,

      favicon TEXT,

      og_image TEXT,

      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

export async function GET() {
  try {
    await ensureSettingsTable();

    const result = await pool.query(`
      SELECT *
      FROM settings
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      return NextResponse.json(null);
    }

    return NextResponse.json(result.rows[0]);

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      { error: "Failed to load settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureSettingsTable();

    const body = await req.json();

    const exists = await pool.query(`
      SELECT id
      FROM settings
      LIMIT 1
    `);

    if (exists.rows.length === 0) {

      const result = await pool.query(
        `
        INSERT INTO settings
        (
          company_name,
          tagline,
          about,
          email,
          phone,
          whatsapp,
          address,
          map_url,
          facebook,
          instagram,
          linkedin,
          youtube,
          twitter,
          meta_title,
          meta_description,
          meta_keywords,
          ga_id,
          gsc_verification,
          logo,
          favicon,
          og_image
        )

        VALUES
        (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
          $11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21
        )

        RETURNING *
        `,
        [
          body.company_name,
          body.tagline,
          body.about,
          body.email,
          body.phone,
          body.whatsapp,
          body.address,
          body.map_url,
          body.facebook,
          body.instagram,
          body.linkedin,
          body.youtube,
          body.twitter,
          body.meta_title,
          body.meta_description,
          body.meta_keywords,
          body.ga_id,
          body.gsc_verification,
          body.logo,
          body.favicon,
          body.og_image,
        ]
      );

      return NextResponse.json(result.rows[0]);
    }

    const result = await pool.query(
      `
      UPDATE settings

      SET

      company_name=$1,
      tagline=$2,
      about=$3,
      email=$4,
      phone=$5,
      whatsapp=$6,
      address=$7,
      map_url=$8,
      facebook=$9,
      instagram=$10,
      linkedin=$11,
      youtube=$12,
      twitter=$13,
      meta_title=$14,
      meta_description=$15,
      meta_keywords=$16,
      ga_id=$17,
      gsc_verification=$18,
      logo=$19,
      favicon=$20,
      og_image=$21,
      updated_at=NOW()

      WHERE id=$22

      RETURNING *
      `,
      [
        body.company_name,
        body.tagline,
        body.about,
        body.email,
        body.phone,
        body.whatsapp,
        body.address,
        body.map_url,
        body.facebook,
        body.instagram,
        body.linkedin,
        body.youtube,
        body.twitter,
        body.meta_title,
        body.meta_description,
        body.meta_keywords,
        body.ga_id,
        body.gsc_verification,
        body.logo,
        body.favicon,
        body.og_image,
        exists.rows[0].id,
      ]
    );

    return NextResponse.json(result.rows[0]);

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    );
  }
}