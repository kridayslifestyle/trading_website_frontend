"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

import type { Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
  onView: (product: any) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({
  products,
  onView,
  onEdit,
  onDelete,
}: ProductTableProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "1.5rem",
        border: "1px solid #e2e8f0",
        overflow: "hidden",
      }}
    >
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f8fafc",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              {[
                "Image",
                "Product",
                "Category",
                "Origin",
                "Price",
                "Status",
                "Created",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    fontSize: ".75rem",
                    color: "#64748b",
                    textTransform: "uppercase",
                  }}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                style={{
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <td style={{ padding: "1rem" }}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 8,
                        background: "#f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#94a3b8",
                        fontSize: ".75rem",
                      }}
                    >
                      <img
                        src={product.image || "/placeholder.png"}
                        alt={product.name}
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: "cover",
                          borderRadius: 12,
                          border: "1px solid #e5e7eb",
                        }}
                      />
                    </div>
                  )}
                </td>

                <td style={{ padding: "1rem" }}>
                  <div
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {product.name}
                  </div>
                </td>

                <td style={{ padding: "1rem" }}>{product.category}</td>

                <td style={{ padding: "1rem" }}>
                  {product.origin_country || "—"}
                </td>

                <td style={{ padding: "1rem" }}>
                  {product.price ? `${product.currency} ${product.price}` : "—"}
                </td>

                <td style={{ padding: "1rem" }}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      fontSize: ".75rem",
                      fontWeight: 600,
                      background: product.published ? "#DCFCE7" : "#FEE2E2",
                      color: product.published ? "#15803D" : "#DC2626",
                    }}
                  >
                    {product.published ? "Published" : "Draft"}
                  </span>
                </td>

                <td style={{ padding: "1rem" }}>
                  {new Date(product.created_at).toLocaleDateString()}
                </td>

                <td style={{ padding: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <button onClick={() => onView(product)}>
                      <Eye size={18} />
                    </button>

                    <button style={iconButton} onClick={() => onEdit(product)}>
                      <Pencil size={16} />
                    </button>

                    <button
                      style={deleteButton}
                      onClick={() => onDelete(product)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const iconButton: React.CSSProperties = {
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  border: "none",
  borderRadius: 10,
  cursor: "pointer",

  background: "#EFF6FF",
  color: "#2563EB",

  padding: 0,
};

const deleteButton: React.CSSProperties = {
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  border: "none",
  borderRadius: 10,
  cursor: "pointer",

  background: "#FEF2F2",
  color: "#EF4444",

  padding: 0,
};

const linkButton: React.CSSProperties = {
  width: 40,
  height: 40,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  borderRadius: 10,

  background: "#EFF6FF",
  color: "#2563EB",

  textDecoration: "none",

  padding: 0,
};
