"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, User, Search } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  featured_image: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  status: string;
  views: number;
  created_at: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  General: "#2563EB",
  Furniture: "#F59E0B",
  Agriculture: "#10B981",
  Textile: "#8B5CF6",
  Machinery: "#EF4444",
  Electronics: "#06B6D4",
  Chemicals: "#0EA5E9",
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = [
  "All",
  ...new Set(
    (blogs ?? [])
      .map((blog) => blog.category || "General")
      .filter(Boolean)
  ),
];

  const [currentPage, setCurrentPage] = useState(1);

  const filteredBlogs = blogs.filter((blog) => {
    const query = search.toLowerCase();

    const matchesSearch =
      blog.title.toLowerCase().includes(query) ||
      blog.excerpt.toLowerCase().includes(query) ||
      (blog.category || "").toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const BLOGS_PER_PAGE = 9;

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE,
  );

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  async function loadBlogs() {
    try {
      const res = await fetch("/api/blogs");

      if (!res.ok) throw new Error();

      const data = await res.json();

      setBlogs(Array.isArray(data) ? data : data.blogs ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const featured = currentPage === 1 ? filteredBlogs[0] : null;

  return (
    <div
      style={{
        paddingTop: "80px",
        background: "#f8faff",
        minHeight: "100vh",
      }}
    >
      {/* Hero */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#020e47 0%,#0e37b0 55%,#1a5cf2 100%)",
          padding: "4rem 0 3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />

        <div
          className="container-custom"
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 14px",
              borderRadius: 99,
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.15)",
              color: "#BFDBFE",
              fontSize: ".72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            📝 Trade Blog
          </span>

          <h1
            style={{
              fontFamily: "'Clash Display',sans-serif",
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: ".75rem",
            }}
          >
            Trade Insights & Guides
          </h1>

          <p
            style={{
              color: "#BFDBFE",
              fontSize: "1.05rem",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Practical guides, market insights and expert tips for global
            importers and exporters.
          </p>
        </div>
      </div>

      <div
        className="container-custom"
        style={{
          marginTop: "-25px",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            position: "relative",
          }}
        >
          <Search
            size={20}
            style={{
              position: "absolute",
              left: 18,
              top: 16,
              color: "#94A3B8",
            }}
          />

          <input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "15px 20px 15px 52px",
              borderRadius: 14,
              border: "1px solid #E2E8F0",
              background: "#fff",
              fontSize: "1rem",
              outline: "none",
              boxShadow: "0 8px 20px rgba(15,23,42,.04)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
          marginBottom: "3rem",
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border:
                selectedCategory === category ? "none" : "1px solid #E2E8F0",
              background: selectedCategory === category ? "#2563EB" : "#fff",
              color: selectedCategory === category ? "#fff" : "#334155",
              cursor: "pointer",
              fontWeight: 600,
              transition: ".2s",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div
        className="container-custom"
        style={{
          padding: "4rem 1.25rem",
        }}
      >
        {/* Loading */}
        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "5rem",
              color: "#64748B",
              fontSize: "1rem",
            }}
          >
            Loading blogs...
          </div>
        )}

        {/* Empty */}
        {!loading && blogs.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "5rem",
            }}
          >
            <h2>No blogs published yet.</h2>

            <p
              style={{
                color: "#64748B",
                marginTop: 12,
              }}
            >
              Check back soon for new articles.
            </p>
          </div>
        )}

        {/* Featured Blog */}
        {!loading && featured && (
          <>
            <div
              style={{
                background: "#fff",
                borderRadius: "2rem",
                padding: "2rem",
                border: "1px solid #E2E8F0",
                boxShadow: "0 8px 25px rgba(15,23,42,.05)",
                marginBottom: "3rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-flex",
                    padding: "6px 14px",
                    borderRadius: 999,
                    background: "#EFF6FF",
                    color: "#2563EB",
                    fontWeight: 700,
                    fontSize: ".75rem",
                    marginBottom: "1rem",
                  }}
                >
                  ⭐ Featured Post
                </span>

                <h2
                  style={{
                    fontFamily: "'Clash Display',sans-serif",
                    fontSize: "2rem",
                    marginBottom: "1rem",
                    color: "#0F172A",
                  }}
                >
                  {featured.title}
                </h2>

                <p
                  style={{
                    color: "#64748B",
                    lineHeight: 1.8,
                    marginBottom: "1.5rem",
                  }}
                >
                  {featured.excerpt}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "1.25rem",
                    color: "#94A3B8",
                    fontSize: ".85rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Clock size={15} />
                    {new Date(featured.created_at).toLocaleDateString()}
                  </span>

                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <User size={15} />
                    TradePro
                  </span>
                </div>

                <Link
                  href={`/blog/${featured.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#2563EB",
                    color: "#fff",
                    padding: "14px 22px",
                    borderRadius: 12,
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  Read Article
                  <ArrowRight size={18} />
                </Link>
              </div>

              <img
                src={featured.featured_image}
                alt={featured.title}
                style={{
                  width: "100%",
                  height: 340,
                  objectFit: "cover",
                  borderRadius: 20,
                }}
              />
            </div>
          </>
        )}

        {!loading && filteredBlogs.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem",
            }}
          >
            <h2>No blogs found.</h2>

            <p
              style={{
                color: "#64748B",
                marginTop: 10,
              }}
            >
              Try another keyword.
            </p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && blogs.length > 1 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
              gap: "1.5rem",
            }}
          >
            {(currentPage === 1 ? paginatedBlogs.slice(1) : paginatedBlogs).map(
              (blog) => {
                const color = CATEGORY_COLORS[blog.category] || "#2563EB";

                return (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.slug}`}
                    style={{
                      display: "block",
                      background: "#fff",
                      borderRadius: "1.5rem",
                      overflow: "hidden",
                      textDecoration: "none",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 4px 20px rgba(15,23,42,.05)",
                      transition: ".25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 30px rgba(37,99,235,.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 20px rgba(15,23,42,.05)";
                    }}
                  >
                    {/* Image */}
                    <img
                      src={blog.featured_image}
                      alt={blog.title}
                      style={{
                        width: "100%",
                        height: 220,
                        objectFit: "cover",
                      }}
                    />

                    <div
                      style={{
                        padding: "1.4rem",
                      }}
                    >
                      {/* Category */}
                      <span
                        style={{
                          display: "inline-block",
                          background: `${color}15`,
                          color,
                          padding: "5px 12px",
                          borderRadius: 999,
                          fontSize: ".72rem",
                          fontWeight: 700,
                          marginBottom: "1rem",
                        }}
                      >
                        {blog.category || "General"}
                      </span>

                      {/* Title */}
                      <h3
                        style={{
                          fontFamily: "'Clash Display',sans-serif",
                          fontSize: "1.25rem",
                          color: "#0F172A",
                          lineHeight: 1.4,
                          marginBottom: ".75rem",
                        }}
                      >
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p
                        style={{
                          color: "#64748B",
                          fontSize: ".92rem",
                          lineHeight: 1.7,
                          marginBottom: "1.25rem",
                        }}
                      >
                        {blog.excerpt}
                      </p>

                      {/* Footer */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderTop: "1px solid #E2E8F0",
                          paddingTop: "1rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                            color: "#94A3B8",
                            fontSize: ".78rem",
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                            }}
                          >
                            <Clock size={14} />
                            {Math.max(
                              1,
                              Math.ceil(
                                blog.content.replace(/<[^>]*>/g, "").split(" ")
                                  .length / 200,
                              ),
                            )}{" "}
                            min
                          </span>

                          <span>
                            {new Date(blog.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        <ArrowRight size={18} color="#2563EB" />
                      </div>
                    </div>
                  </Link>
                );
              },
            )}
          </div>
        )}

        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
              marginTop: "4rem",
              flexWrap: "wrap",
            }}
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                border: "1px solid #E2E8F0",
                background: "#fff",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  background: currentPage === i + 1 ? "#2563EB" : "#fff",
                  color: currentPage === i + 1 ? "#fff" : "#0F172A",
                  boxShadow: "0 2px 8px rgba(15,23,42,.08)",
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                border: "1px solid #E2E8F0",
                background: "#fff",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
