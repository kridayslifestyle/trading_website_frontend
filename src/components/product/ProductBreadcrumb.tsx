"use client";

import Link from "next/link";
import { Product } from "./types";

export default function ProductBreadcrumb({
  product,
}: {
  product: Product;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: "2rem",
        color: "#64748b",
        fontSize: ".9rem",
        flexWrap: "wrap",
      }}
    >
      <Link
        href="/"
        style={{
          color: "#64748b",
          textDecoration: "none",
        }}
      >
        Home
      </Link>

      <span>›</span>

      <Link
        href="/products"
        style={{
          color: "#64748b",
          textDecoration: "none",
        }}
      >
        Products
      </Link>

      <span>›</span>

      <span>{product.category}</span>

      <span>›</span>

      <strong
        style={{
          color: "#0f172a",
          textTransform: "capitalize",
        }}
      >
        {product.name}
      </strong>
    </div>
  );
}