"use client";

import { useEffect, useState } from "react";
import { Sparkles, Save } from "lucide-react";

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  origin_country: string;
  short_description: string;
}

export default function SocialMediaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState("");

  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [hashtags, setHashtags] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const res = await fetch("/api/admin/social/products");

      const data = await res.json();

      console.log("Products:", data);

      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  }

  const product = products.find((p) => p.id === Number(selectedId));

  async function generateAI() {
    if (!selectedId) {
      alert("Please select a product.");
      return;
    }

    // We'll connect OpenRouter later

    alert("Next step: OpenRouter integration.");
  }

  async function saveDraft() {
    alert("Next step: Save to database.");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
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
          Social Media
        </h1>

        <p
          style={{
            color: "#64748B",
            marginTop: 6,
          }}
        >
          Generate Facebook & Instagram posts using AI.
        </p>
      </div>

      {/* Product */}

      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: 20,
          border: "1px solid #E5E7EB",
        }}
      >
        <label
          style={{
            fontWeight: 600,
            display: "block",
            marginBottom: 10,
          }}
        >
          Select Product
        </label>

        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          style={input}
        >
          <option value="">Choose Product</option>

          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        {product && (
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
              background: "#F8FAFC",
              padding: "1.5rem",
              borderRadius: 16,
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/120x120?text=No+Image";
              }}
              style={{
                width: 120,
                height: 120,
                objectFit: "cover",
                borderRadius: 14,
                border: "1px solid #E5E7EB",
              }}
            />

            <div style={{ flex: 1 }}>
              <h2
                style={{
                  marginBottom: ".5rem",
                  color: "#0F172A",
                  fontWeight: 700,
                }}
              >
                {product.name}
              </h2>

              <p
                style={{
                  color: "#64748B",
                  marginBottom: ".75rem",
                }}
              >
                {product.short_description}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: ".75rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    background: "#DBEAFE",
                    color: "#1D4ED8",
                    padding: "6px 12px",
                    borderRadius: 999,
                    fontWeight: 600,
                  }}
                >
                  {product.category}
                </span>

                <span
                  style={{
                    background: "#DCFCE7",
                    color: "#15803D",
                    padding: "6px 12px",
                    borderRadius: 999,
                    fontWeight: 600,
                  }}
                >
                  {product.origin_country}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Generate */}

      <button
        onClick={generateAI}
        disabled={loading}
        style={{
          background: "#2563EB",
          color: "#fff",
          border: "none",
          padding: "16px",
          borderRadius: 14,
          cursor: "pointer",
          fontWeight: 700,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Sparkles size={18} />
        Generate AI Content
      </button>

      {/* Facebook */}

      <Card title="Facebook Caption">
        <textarea
          rows={8}
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          style={textarea}
        />
      </Card>

      {/* Instagram */}

      <Card title="Instagram Caption">
        <textarea
          rows={8}
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          style={textarea}
        />
      </Card>

      {/* Hashtags */}

      <Card title="Hashtags">
        <textarea
          rows={4}
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          style={textarea}
        />
      </Card>

      <button
        onClick={saveDraft}
        style={{
          background: "#10B981",
          color: "#fff",
          border: "none",
          padding: "16px",
          borderRadius: 14,
          cursor: "pointer",
          fontWeight: 700,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Save size={18} />
        Save Draft
      </button>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "2rem",
        border: "1px solid #E5E7EB",
      }}
    >
      <h2
        style={{
          marginBottom: "1rem",
          color: "#0F172A",
        }}
      >
        {title}
      </h2>

      {children}
    </div>
  );
}

const input: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: 12,
  border: "1px solid #E2E8F0",
};

const textarea: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: 12,
  border: "1px solid #E2E8F0",
  resize: "vertical",
};
