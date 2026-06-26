"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface RelatedProduct {
  id: number;
  name: string;
  slug: string;
  image: string;
  category: string;
  price: number;
  currency: string;
}

interface Props {
  category: string;
  currentId: number;
}

export default function RelatedProducts({
  category,
  currentId,
}: Props) {

  const [products, setProducts] = useState<RelatedProduct[]>([]);

  useEffect(() => {

    async function load() {

      const res = await fetch(
        `/api/public/products/related?category=${encodeURIComponent(category)}&currentId=${currentId}`
      );

      if (!res.ok) return;

      const data = await res.json();

      setProducts(data.products);

    }

    load();

  }, [category, currentId]);

  if (products.length === 0) return null;

  return (
    <section
      style={{
        marginTop: "5rem",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "2rem",
          color: "#0f172a",
        }}
      >
        Related Products
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: "2rem",
        }}
      >
        {products.map(product => (

          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >

            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid #e5e7eb",
                transition: ".25s",
                boxShadow: "0 8px 25px rgba(0,0,0,.05)",
              }}
            >

              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: "1.25rem",
                }}
              >

                <div
                  style={{
                    color: "#2563EB",
                    fontWeight: 600,
                    marginBottom: 8,
                    fontSize: ".85rem",
                  }}
                >
                  {product.category}
                </div>

                <h3
                  style={{
                    fontSize: "1.15rem",
                    marginBottom: 12,
                    color: "#0f172a",
                  }}
                >
                  {product.name}
                </h3>

                <div
                  style={{
                    fontWeight: 700,
                    color: "#2563EB",
                    fontSize: "1.15rem",
                  }}
                >
                  {product.currency}{" "}
                  {Number(product.price).toLocaleString()}
                </div>

              </div>

            </div>

          </Link>

        ))}
      </div>
    </section>
  );
}