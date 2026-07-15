import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { pool, ensureBlogsTable } from "@/lib/db";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {

  await ensureBlogsTable();

  const { slug } = await params;

  const result = await pool.query(
    `
    SELECT *
    FROM blogs
    WHERE slug=$1
    LIMIT 1
    `,
    [slug]
  );

  if (result.rows.length === 0) {
    return {};
  }

  const blog = result.rows[0];

  return {
    title: blog.seo_title || blog.title,

    description:
      blog.seo_description || blog.excerpt,

    keywords:
      blog.seo_keywords?.split(",") || [],

    openGraph: {
      title: blog.seo_title || blog.title,

      description:
        blog.seo_description || blog.excerpt,

      images: [
        {
          url: blog.featured_image,
        },
      ],
    },
  };
}

export default async function BlogDetailsPage({ params }: Props) {
  await ensureBlogsTable();

  const { slug } = await params;

  const result = await pool.query(
    `
  SELECT *
  FROM blogs
  WHERE slug=$1
  AND status='Published'
  LIMIT 1
  `,
    [slug],
  );

  if (result.rows.length === 0) {
    notFound();
  }

  const blog = result.rows[0];

  // 👇 ADD IT HERE
  const relatedPosts = await pool.query(
    `
  SELECT
    id,
    title,
    slug,
    featured_image,
    category
  FROM blogs
  WHERE
    status='Published'
    AND id <> $1
  ORDER BY created_at DESC
  LIMIT 3
  `,
    [blog.id],
  );

  const readingTime = Math.max(
    1,
    Math.ceil(blog.content.replace(/<[^>]+>/g, "").split(" ").length / 200),
  );

  return (
    <div
      style={{
        paddingTop: "80px",
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      {/* Hero */}

      <section
        style={{
          background: "linear-gradient(135deg,#020E47,#0E37B0,#1A5CF2)",
          color: "#fff",
          padding: "5rem 0",
        }}
      >
        <div
          className="container-custom"
          style={{
            maxWidth: 900,
          }}
        >
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#BFDBFE",
              textDecoration: "none",
              marginBottom: "2rem",
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={18} />
            Back to Blogs
          </Link>

          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,.15)",
              padding: "6px 14px",
              borderRadius: 999,
              fontSize: ".8rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            {blog.category || "General"}
          </div>

          <h1
            style={{
              fontFamily: "'Clash Display',sans-serif",
              fontSize: "clamp(2rem,5vw,3.5rem)",
              lineHeight: 1.2,
              marginBottom: "1.5rem",
            }}
          >
            {blog.title}
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              color: "#BFDBFE",
              fontSize: ".9rem",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Calendar size={16} />

              {new Date(blog.created_at).toLocaleDateString()}
            </span>

            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Clock size={16} />
              {readingTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}

      <div
        className="container-custom"
        style={{
          maxWidth: 1100,
          marginTop: "-60px",
        }}
      >
        <Image
          src={blog.featured_image}
          alt={blog.title}
          width={1200}
          height={700}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 24,
            objectFit: "cover",
            boxShadow: "0 20px 60px rgba(15,23,42,.15)",
          }}
        />
      </div>
      {/* Article */}

      <section
        className="container-custom"
        style={{
          maxWidth: 900,
          margin: "4rem auto",
        }}
      >
        <article
          className="blog-content"
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
          style={{
            background: "#fff",
            padding: "3rem",
            borderRadius: 24,
            boxShadow: "0 8px 30px rgba(15,23,42,.05)",
            lineHeight: 1.9,
            fontSize: "1.05rem",
            color: "#334155",
          }}
        />
      </section>

      {/* Related Blogs */}

      {relatedPosts.rows.length > 0 && (
        <section
          className="container-custom"
          style={{
            marginBottom: "5rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Clash Display',sans-serif",
              fontSize: "2rem",
              marginBottom: "2rem",
              color: "#0F172A",
            }}
          >
            Related Articles
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: "1.5rem",
            }}
          >
            {relatedPosts.rows.map((item: any) => (
              <Link
                key={item.id}
                href={`/blog/${item.slug}`}
                style={{
                  textDecoration: "none",
                  background: "#fff",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 6px 24px rgba(15,23,42,.05)",
                  transition: ".25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(37,99,235,.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 24px rgba(15,23,42,.05)";
                }}
              >
                <Image
                  src={item.featured_image}
                  alt={item.title}
                  width={500}
                  height={300}
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                  }}
                />

                <div
                  style={{
                    padding: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      color: "#2563EB",
                      fontWeight: 700,
                      fontSize: ".8rem",
                      marginBottom: ".5rem",
                    }}
                  >
                    {item.category || "General"}
                  </div>

                  <h3
                    style={{
                      color: "#0F172A",
                      lineHeight: 1.5,
                      fontSize: "1.05rem",
                      marginBottom: ".75rem",
                    }}
                  >
                    {item.title}
                  </h3>

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: "#2563EB",
                      fontWeight: 600,
                      fontSize: ".9rem",
                    }}
                  >
                    Read Article →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}

      <section
        style={{
          background: "#020E47",
          color: "#fff",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Clash Display',sans-serif",
            fontSize: "2rem",
            marginBottom: "1rem",
          }}
        >
          Ready to Start Trading Globally?
        </h2>

        <p
          style={{
            color: "#CBD5E1",
            marginBottom: "2rem",
            maxWidth: 600,
            marginInline: "auto",
          }}
        >
          Connect with TradePro Global and discover reliable sourcing and export
          solutions for your business.
        </p>

        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            padding: "14px 28px",
            borderRadius: 12,
            background: "#2563EB",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
