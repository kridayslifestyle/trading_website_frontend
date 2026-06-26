import { NextResponse } from "next/server";
import { pool, ensureProductsTable, ensureLeadsTable } from "@/lib/db";

export async function GET() {
  try {
    await ensureProductsTable();
    await ensureLeadsTable();

    // Lead counts
    const totalLeads = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM leads
    `);

    const newLeads = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM leads
      WHERE status='New'
    `);

    // Product counts
    const totalProducts = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM products
    `);

    const publishedProducts = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM products
      WHERE published=true
    `);

    // Recent Leads
    const recentLeads = await pool.query(`
      SELECT
        id,
        name,
        country,
        product,
        status,
        created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT 5
    `);

    return NextResponse.json({
      stats: {
        totalLeads: totalLeads.rows[0].count,
        newLeads: newLeads.rows[0].count,
        totalProducts: totalProducts.rows[0].count,
        publishedProducts: publishedProducts.rows[0].count,
      },

      recentLeads: recentLeads.rows,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Dashboard failed",
      },
      {
        status: 500,
      }
    );
  }
}