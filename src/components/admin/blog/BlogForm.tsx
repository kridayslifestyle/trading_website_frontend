"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft, FileText } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import RichTextEditor from "@/components/admin/blog/RichTextEditor";

interface BlogFormProps {
  mode: "create" | "edit";
}

export default function BlogForm({ mode }: BlogFormProps) {
  const router = useRouter();

  const { id } = useParams();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    featured_image: "",
    excerpt: "",
    content: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    status: "Draft",
  });

  useEffect(() => {
    if (!form.title) return;

    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");

    setForm((prev) => ({
      ...prev,
      slug,
    }));
  }, [form.title]);

  async function saveBlog() {
    if (!form.title.trim()) {
      alert("Blog title is required.");
      return;
    }

    if (!form.content.trim()) {
      alert("Blog content is required.");
      return;
    }

    try {
      setSaving(true);

      const url =
        mode === "edit" ? `/api/admin/blogs/${id}` : "/api/admin/blogs";

      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error();
      }

      router.push("/admin/blog");
    } catch (err) {
      console.error(err);
      alert("Failed to create blog.");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    if (mode !== "edit") return;

    async function loadBlog() {
      const res = await fetch(`/api/admin/blogs/${id}`);

      if (!res.ok) {
        alert("Blog not found");
        router.push("/admin/blog");
        return;
      }

      const data = await res.json();

      setForm({
        title: data.title || "",
        slug: data.slug || "",
        category: data.category || "",
        featured_image: data.featured_image || "",
        excerpt: data.excerpt || "",
        content: data.content || "",
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        seo_keywords: data.seo_keywords || "",
        status: data.status || "Draft",
      });
    }

    loadBlog();
  }, [mode, id, router]);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
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
            {mode === "create" ? "Create Blog" : "Edit Blog"}
          </h1>

          <p
            style={{
              color: "#64748B",
              marginTop: 6,
            }}
          >
            {mode === "create"
              ? "Publish articles for your website."
              : "Update your blog article."}
          </p>
        </div>

        <Link
          href="/admin/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: "#0F172A",
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      {/* Main Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: "2rem",
          border: "1px solid #E5E7EB",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
          }}
        >
          <Input
            label="Blog Title"
            value={form.title}
            onChange={(v) => setForm({ ...form, title: v })}
          />

          <Input
            label="Slug"
            value={form.slug}
            onChange={(v) => setForm({ ...form, slug: v })}
          />

          <div
            style={{
              gridColumn: "1 / -1",
            }}
          >
            <label style={label}>Featured Image</label>

            <ImageUploader
              value={form.featured_image}
              onChange={(url) =>
                setForm({
                  ...form,
                  featured_image: url,
                })
              }
            />
          </div>
        </div>

        {/* Excerpt */}
        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <label style={label}>Short Description</label>

          <textarea
            rows={4}
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            style={textarea}
            placeholder="Short description shown on blog listing..."
          />
        </div>

        {/* Blog Content */}
        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              marginTop: "2rem",
            }}
          >
            <label style={label}>Blog Content</label>

            <RichTextEditor
              value={form.content}
              onChange={(html) =>
                setForm({
                  ...form,
                  content: html,
                })
              }
            />
          </div>
        </div>

        {/* SEO */}
        <h2
          style={{
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "#0F172A",
          }}
        >
          SEO Settings
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
          }}
        >
          <Input
            label="SEO Title"
            value={form.seo_title}
            onChange={(v) => setForm({ ...form, seo_title: v })}
          />

          <Input
            label="SEO Keywords"
            value={form.seo_keywords}
            onChange={(v) => setForm({ ...form, seo_keywords: v })}
          />
        </div>

        <div
          style={{
            marginTop: "1.5rem",
          }}
        >
          <label style={label}>SEO Description</label>

          <textarea
            rows={4}
            value={form.seo_description}
            onChange={(e) =>
              setForm({ ...form, seo_description: e.target.value })
            }
            style={textarea}
            placeholder="Meta description..."
          />
        </div>

        {/* Status */}
        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <label style={label}>Status</label>

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            style={input}
          >
            <option>Draft</option>
            <option>Published</option>
          </select>
        </div>

        {/* Buttons */}
        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          <Link
            href="/admin/blog"
            style={{
              padding: "14px 24px",
              borderRadius: 12,
              textDecoration: "none",
              border: "1px solid #E2E8F0",
              color: "#0F172A",
              fontWeight: 600,
            }}
          >
            Cancel
          </Link>

          <button
            onClick={saveBlog}
            disabled={saving}
            style={{
              background: "#2563EB",
              color: "#fff",
              border: "none",
              padding: "14px 28px",
              borderRadius: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 700,
            }}
          >
            <Save size={18} />
            {saving
              ? "Saving..."
              : mode === "create"
                ? "Publish Blog"
                : "Update Blog"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={input}
      />
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 600,
  marginBottom: 8,
  color: "#334155",
};

const label = labelStyle;

const input: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: 12,
  border: "1px solid #E2E8F0",
  fontSize: ".95rem",
};

const textarea: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: 12,
  border: "1px solid #E2E8F0",
  fontSize: ".95rem",
  resize: "vertical",
};
