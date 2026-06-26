"use client";

import { PackagePlus } from "lucide-react";

interface EmptyProductsProps {
  onAdd: () => void;
}

export default function EmptyProducts({
  onAdd,
}: EmptyProductsProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "1.5rem",
        padding: "4rem 2rem",
        textAlign: "center",
        border: "1px solid #e2e8f0",
      }}
    >
      <PackagePlus
        size={64}
        color="#94a3b8"
      />

      <h2
        style={{
          marginTop: "1rem",
          fontSize: "1.4rem",
          color: "#0f172a",
        }}
      >
        No Products Found
      </h2>

      <p
        style={{
          color: "#64748b",
          marginTop: ".5rem",
          marginBottom: "2rem",
        }}
      >
        Start by adding your first product.
      </p>

      <button
        onClick={onAdd}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: ".8rem 1.3rem",
          borderRadius: "1rem",
          background: "#1a5cf2",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Add Product
      </button>
    </div>
  );
}