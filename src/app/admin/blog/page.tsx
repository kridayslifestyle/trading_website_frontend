"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Loader2,
  FileText,
} from "lucide-react";

interface Blog {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  featured_image: string;
  status: string;
  views: number;
  created_at: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch("/api/admin/blogs");

        const data = await res.json();

        setBlogs(data.blogs || []);
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  async function deleteBlog(id: number) {
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error();
      }

      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (err) {
      console.error(err);

      alert("Failed to delete blog.");
    }
  }

  const filtered = useMemo(() => {
    return blogs.filter((blog) => {
      const matchSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.category?.toLowerCase().includes(search.toLowerCase());

      const matchFilter = filter === "All" || blog.status === filter;

      return matchSearch && matchFilter;
    });
  }, [blogs, search, filter]);

  const totalBlogs = blogs.length;

  const published = blogs.filter((b) => b.status === "Published").length;

  const drafts = blogs.filter((b) => b.status === "Draft").length;

  const totalViews = blogs.reduce((sum, b) => sum + Number(b.views || 0), 0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#0F172A",
            }}
          >
            Blog Management
          </h1>

          <p
            style={{
              color: "#64748B",
              marginTop: 6,
            }}
          >
            Manage all blog posts from one place.
          </p>
        </div>

        <Link
          href="/admin/blog/create"
          style={{
            background: "#2563EB",
            color: "#fff",
            textDecoration: "none",
            padding: "14px 24px",
            borderRadius: 14,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Plus size={18} />
          Create Blog
        </Link>
      </div>

      {/* Stats */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "1rem",
        }}
      >
        <StatCard title="Total Blogs" value={totalBlogs} />

        <StatCard title="Published" value={published} />

        <StatCard title="Drafts" value={drafts} />

        <StatCard title="Total Views" value={totalViews} />
      </div>

      {/* Search */}

      <div
        style={{
          background: "#fff",
          padding: "1rem",
          borderRadius: 20,
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
          border: "1px solid #E5E7EB",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: 1,
            minWidth: 250,
          }}
        >
          <Search
            size={18}
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94A3B8",
            }}
          />

          <input
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 18px 14px 45px",
              borderRadius: 12,
              border: "1px solid #E2E8F0",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: ".75rem",
          }}
        >
          {["All", "Published", "Draft"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              style={{
                padding: "12px 18px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background: filter === item ? "#2563EB" : "#F1F5F9",
                color: filter === item ? "#fff" : "#334155",
                fontWeight: 600,
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}

      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "4rem",
          }}
        >
          <Loader2 className="animate-spin" size={40} />
        </div>
      )}

      {/* Empty */}

      {!loading && filtered.length === 0 && (
        <div
          style={{
            background: "#fff",
            padding: "5rem",
            borderRadius: 24,
            textAlign: "center",
            border: "1px solid #E5E7EB",
          }}
        >
          <FileText size={70} color="#94A3B8" />

          <h2
            style={{
              marginTop: "1rem",
            }}
          >
            No Blogs Found
          </h2>

          <p
            style={{
              color: "#64748B",
            }}
          >
            Create your first blog article.
          </p>
        </div>
      )}

      {/* Blog Cards */}

      {!loading && filtered.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(350px,1fr))",
            gap: "1.5rem",
          }}
        >
          {filtered.map((blog) => (
            <div
              key={blog.id}
              style={{
                background: "#fff",
                borderRadius: 24,
                overflow: "hidden",
                border: "1px solid #E5E7EB",
                boxShadow: "0 10px 30px rgba(15,23,42,.05)",
                transition: ".3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 18px 45px rgba(0,0,0,.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(15,23,42,.05)";
              }}
            >
              {/* Featured Image */}

              <div
                style={{
                  position: "relative",
                }}
              >
                <img
                  src={blog.featured_image || "/placeholder.png"}
                  alt={blog.title}
                  style={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                  }}
                />

                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background:
                      blog.status === "Published" ? "#16A34A" : "#F59E0B",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: 999,
                    fontSize: ".75rem",
                    fontWeight: 700,
                  }}
                >
                  {blog.status}
                </span>
              </div>

              {/* Body */}

              <div
                style={{
                  padding: "1.5rem",
                }}
              >
                {/* Category */}

                <span
                  style={{
                    display: "inline-block",
                    background: "#EEF4FF",
                    color: "#2563EB",
                    padding: "6px 12px",
                    borderRadius: 999,
                    fontSize: ".8rem",
                    fontWeight: 600,
                  }}
                >
                  {blog.category || "General"}
                </span>

                {/* Title */}

                <h2
                  style={{
                    marginTop: "1rem",
                    color: "#0F172A",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    lineHeight: 1.4,
                  }}
                >
                  {blog.title}
                </h2>

                {/* Excerpt */}

                <p
                  style={{
                    marginTop: ".75rem",
                    color: "#64748B",
                    lineHeight: 1.7,
                    minHeight: 70,
                  }}
                >
                  {blog.excerpt}
                </p>

                {/* Info */}

                <div
                  style={{
                    marginTop: "1.25rem",
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#64748B",
                    fontSize: ".85rem",
                  }}
                >
                  <span>👁 {blog.views} Views</span>

                  <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                </div>

                {/* Actions */}

                <div
                  style={{
                    display: "flex",
                    gap: ".75rem",
                    marginTop: "1.5rem",
                  }}
                >
                  <Link
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: "#EFF6FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#2563EB",
                      textDecoration: "none",
                    }}
                  >
                    <Eye size={16} />
                  </Link>

                  <Link
                    href={`/admin/blog/edit/${blog.id}`}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      padding: "12px",
                      borderRadius: 12,
                      background: "#2563EB",
                      color: "#fff",
                      textDecoration: "none",
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Pencil size={18} />
                    Edit
                  </Link>

                  <button
                    onClick={() => {
                      if (confirm("Delete this blog permanently?")) {
                        deleteBlog(blog.id);
                      }
                    }}
                    style={{
                      width: 50,
                      border: "none",
                      background: "#EF4444",
                      color: "#fff",
                      borderRadius: 12,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  function StatCard({ title, value }: { title: string; value: number }) {
    return (
      <div
        style={{
          background: "#fff",
          padding: "1.5rem",
          borderRadius: 20,
          border: "1px solid #E5E7EB",
        }}
      >
        <div
          style={{
            color: "#64748B",
            fontSize: ".9rem",
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: "2rem",
            fontWeight: 700,
            color: "#0F172A",
          }}
        >
          {value}
        </div>
      </div>
    );
  }
}
