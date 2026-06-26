"use client";

import type { Product } from "@/types/product";

interface Props {
  product: Product | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteProductDialog({
  product,
  onCancel,
  onConfirm,
}: Props) {
  if (!product) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: 420,
          background: "#fff",
          borderRadius: 16,
          padding: "2rem",
        }}
      >
        <h2>Delete Product</h2>

        <p style={{ marginTop: 12 }}>
          Are you sure you want to delete
          <strong> {product.name}</strong>?
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 30,
          }}
        >
          <button onClick={onCancel}>
            Cancel
          </button>

          <button
            onClick={onConfirm}
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              padding: ".75rem 1.25rem",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}