"use client";

// import Link from "next/link";
import { Plus, Search } from "lucide-react";

interface ProductToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  onAdd: () => void;
}

export default function ProductToolbar({
  search,
  setSearch,
  onAdd,
}: ProductToolbarProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <div>
        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#0f172a",
          }}
        >
          Products
        </h2>

        <p
          style={{
            marginTop: 4,
            color: "#64748b",
            fontSize: ".9rem",
          }}
        >
          Manage your import & export products
        </p>
      </div>

      <button
        onClick={onAdd}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: ".8rem 1.3rem",
          borderRadius: "1rem",
          background: "linear-gradient(135deg,#1a5cf2,#3d7cf5)",
          color: "#fff",
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(26,92,242,.25)",
        }}
      >
        <Plus size={18} />
        Add Product
      </button>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "380px",
        }}
      >
        <Search
          size={18}
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#94a3b8",
          }}
        />

        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: ".8rem 1rem .8rem 2.6rem",
            borderRadius: "1rem",
            border: "1px solid #e2e8f0",
            outline: "none",
            fontSize: ".9rem",
          }}
        />
      </div>
    </div>
  );
}
