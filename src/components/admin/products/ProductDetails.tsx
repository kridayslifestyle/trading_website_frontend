"use client";

import { X } from "lucide-react";

interface Props {
  product: any;
  open: boolean;
  onClose: () => void;
}

export default function ProductDetails({
  product,
  open,
  onClose,
}: Props) {
  if (!open || !product) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,.45)",
        zIndex: 100,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          width: 520,
          maxWidth: "100%",
          background: "#fff",
          height: "100vh",
          overflowY: "auto",
          boxShadow: "-8px 0 30px rgba(0,0,0,.15)",
        }}
      >
        {/* Header */}

        <div
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.35rem",
              fontWeight: 700,
            }}
          >
            Product Details
          </h2>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "#f1f5f9",
              borderRadius: 12,
              padding: 8,
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            style={{
              width: "100%",
              height: 260,
              objectFit: "cover",
              borderRadius: 16,
              background: "#f8fafc",
            }}
          />

          <Info title="Name" value={product.name} />
          <Info title="Slug" value={product.slug} />
          <Info title="Category" value={product.category} />
          <Info title="Origin" value={product.origin_country} />
          <Info
            title="Price"
            value={`${product.currency} ${product.price}`}
          />
          <Info
            title="MOQ"
            value={`${product.moq} ${product.unit}`}
          />
          <Info
            title="Short Description"
            value={product.short_description}
          />
          <Info
            title="Description"
            value={product.description}
          />
          <Info
            title="Published"
            value={product.published ? "Yes" : "No"}
          />
          <Info
            title="Featured"
            value={product.featured ? "Yes" : "No"}
          />
        </div>
      </div>
    </div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: ".8rem",
          color: "#64748b",
          marginBottom: 6,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontWeight: 600,
          color: "#0f172a",
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}