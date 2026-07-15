import { NextResponse } from "next/server";
import {
  pool,
  ensureProductsTable,
  ensureBlogsTable,
  ensureLeadsTable,
} from "@/lib/db";

export async function GET() {
  try {
    await ensureProductsTable();
    await ensureBlogsTable();
    await ensureLeadsTable();

    const [
      products,
      blogs,
      leads,
      blogViews,
      publishedProducts,
      draftBlogs,
      newLeads,
      monthlyLeads,
      monthlyBlogs,
      recentBlogs,
      recentLeads,
    ] = await Promise.all([
      pool.query(`SELECT COUNT(*) FROM products`),

      pool.query(`SELECT COUNT(*) FROM blogs`),

      pool.query(`SELECT COUNT(*) FROM leads`),

      pool.query(`
SELECT
TO_CHAR(created_at,'Mon') AS month,
COUNT(*)::int AS total
FROM leads
GROUP BY month, DATE_TRUNC('month',created_at)
ORDER BY DATE_TRUNC('month',created_at)
`),

      pool.query(`
SELECT
TO_CHAR(created_at,'Mon') AS month,
COUNT(*)::int AS total
FROM blogs
GROUP BY month, DATE_TRUNC('month',created_at)
ORDER BY DATE_TRUNC('month',created_at)
`),
      pool.query(`
SELECT
id,
title,
status,
created_at
FROM blogs
ORDER BY created_at DESC
LIMIT 5
`),

      pool.query(`
SELECT
id,
name,
company,
status,
created_at
FROM leads
ORDER BY created_at DESC
LIMIT 5
`),

      pool.query(`SELECT COALESCE(SUM(views),0) FROM blogs`),

      pool.query(`
        SELECT COUNT(*)
        FROM products
        WHERE published=true
      `),

      pool.query(`
        SELECT COUNT(*)
        FROM blogs
        WHERE status='Draft'
      `),

      pool.query(`
        SELECT COUNT(*)
        FROM leads
        WHERE status='New'
      `),
    ]);

    return NextResponse.json({
      overview: {
        products: Number(products.rows[0].count),
        blogs: Number(blogs.rows[0].count),
        leads: Number(leads.rows[0].count),
        blogViews: Number(blogViews.rows[0].coalesce),
      },

      quickStats: {
        publishedProducts: Number(publishedProducts.rows[0].count),

        draftBlogs: Number(draftBlogs.rows[0].count),

        newLeads: Number(newLeads.rows[0].count),
      },

      monthlyLeads: monthlyLeads.rows,

      monthlyBlogs: monthlyBlogs.rows,

      recentBlogs: recentBlogs.rows,
      
      recentLeads: recentLeads.rows,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Analytics failed",
      },
      {
        status: 500,
      },
    );
  }
}
