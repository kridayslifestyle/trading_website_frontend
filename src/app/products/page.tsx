"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ArrowRight,
  PackageSearch,
  Loader2,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  image: string;
  short_description: string;
  origin_country: string;
  price: string;
  currency: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/public/products");
        const data = await res.json();

        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const value = search.toLowerCase();

      return (
        product.name.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value) ||
        product.origin_country.toLowerCase().includes(value)
      );
    });
  }, [products, search]);

  return (
    <div
      style={{
        background: "#F8FAFC",
        minHeight: "100vh",
        padding: "60px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Header */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: "#EEF4FF",
              color: "#2563EB",
              padding: "8px 18px",
              borderRadius: 999,
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            Premium Export Products
          </span>

          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              color: "#0F172A",
              marginBottom: "1rem",
            }}
          >
            Explore Our Products
          </h1>

          <p
            style={{
              maxWidth: 700,
              margin: "0 auto",
              color: "#64748B",
              lineHeight: 1.8,
            }}
          >
            Discover premium quality export products manufactured for
            wholesalers, distributors, importers and global buyers.
          </p>
        </div>

        {/* Search */}

        <div
          style={{
            maxWidth: 500,
            margin: "0 auto 3rem",
            position: "relative",
          }}
        >
          <Search
            size={18}
            style={{
              position: "absolute",
              left: 18,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94A3B8",
            }}
          />

          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 20px 16px 48px",
              borderRadius: 14,
              border: "1px solid #E2E8F0",
              outline: "none",
              fontSize: ".95rem",
              background: "#fff",
            }}
          />
        </div>

        {/* Loading */}

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "5rem",
            }}
          >
            <Loader2
              size={34}
              className="animate-spin"
            />
          </div>
        )}

        {/* Empty */}

        {!loading && filteredProducts.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "6rem 2rem",
              background: "#fff",
              borderRadius: 24,
              border: "1px solid #E2E8F0",
            }}
          >
            <PackageSearch
              size={60}
              color="#94A3B8"
            />

            <h2
              style={{
                marginTop: "1rem",
              }}
            >
              No Products Found
            </h2>

            <p
              style={{
                color: "#64748B",
                marginTop: ".5rem",
              }}
            >
              Try searching with another keyword.
            </p>
          </div>
        )}

        {/* Products */}

        {!loading && filteredProducts.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",
              gap: "2rem",
            }}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  background: "#fff",
                  borderRadius: 24,
                  overflow: "hidden",
                  border: "1px solid #E2E8F0",
                  transition: ".3s",
                  boxShadow: "0 10px 25px rgba(15,23,42,.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 18px 45px rgba(0,0,0,.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(15,23,42,.05)";
                }}
              >
                {/* Image */}

                <div
                  style={{
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: 260,
                      objectFit: "cover",
                    }}
                  />

                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      background: "#fff",
                      padding: "8px 14px",
                      borderRadius: 999,
                      fontWeight: 600,
                      fontSize: ".8rem",
                      color: "#2563EB",
                    }}
                  >
                    Export Ready
                  </span>
                </div>

                {/* Body */}

                <div
                  style={{
                    padding: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      background: "#EEF4FF",
                      color: "#2563EB",
                      padding: "6px 12px",
                      borderRadius: 999,
                      fontWeight: 600,
                      fontSize: ".8rem",
                    }}
                  >
                    {product.category}
                  </span>

                  <h2
                    style={{
                      marginTop: "1rem",
                      fontSize: "1.35rem",
                      color: "#0F172A",
                    }}
                  >
                    {product.name}
                  </h2>

                  <p
                    style={{
                      marginTop: ".75rem",
                      color: "#64748B",
                      lineHeight: 1.7,
                      minHeight: 60,
                    }}
                  >
                    {product.short_description}
                  </p>

                  <div
                    style={{
                      marginTop: "1.5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "1.45rem",
                          fontWeight: 700,
                          color: "#2563EB",
                        }}
                      >
                        {product.currency}{" "}
                        {Number(product.price).toLocaleString()}
                      </div>

                      <div
                        style={{
                          color: "#64748B",
                          fontSize: ".85rem",
                          marginTop: 6,
                        }}
                      >
                        🌍 {product.origin_country}
                      </div>
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "#2563EB",
                        color: "#fff",
                        padding: "12px 18px",
                        borderRadius: 12,
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      Details

                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}