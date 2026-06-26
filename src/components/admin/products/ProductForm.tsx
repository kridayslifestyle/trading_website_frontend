"use client";

import { useEffect, useState } from "react";
import { ProductFormData } from "./types";

import type { Product } from "@/types/product";

// export interface ProductFormData {
//   name: string;
//   slug: string;
//   category: string;
//   origin_country: string;
//   price: string;
//   currency: string;
//   moq: string;
//   unit: string;
//   image: string;
//   short_description: string;
//   description: string;
//   featured: boolean;
//   published: boolean;
// }

interface ProductFormProps {
  product?: Product;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ProductForm({
  product,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>({
    name: product?.name || "",
    slug: product?.slug || "",
    category: product?.category || "",
    origin_country: product?.origin_country || "",

    price: product?.price || "",
    currency: product?.currency || "USD",

    moq: product?.moq || "",
    unit: product?.unit || "",

    image: product?.image || "",

    short_description: product?.short_description || "",
    description: product?.description || "",

    featured: product?.featured || false,
    published: product?.published ?? true,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      slug: prev.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),
    }));
  }, [form.name]);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: ".8rem 1rem",
    border: "1px solid #dbe4ee",
    borderRadius: "12px",
    outline: "none",
    fontSize: ".9rem",
    marginTop: 6,
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: 600,
    color: "#334155",
    fontSize: ".85rem",
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    const data = new FormData();

    data.append("file", file);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        },
      );

      const json = await res.json();

      setForm((prev) => ({
        ...prev,
        image: json.secure_url,
      }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);

    try {
      const isEditing = !!product;

      const url = isEditing ? `/api/products/${product.id}` : "/api/products";

      const method = isEditing ? "PATCH" : "POST";
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

      onSuccess?.();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      {/* Product Name */}

      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Product Name *</label>

          <input
            style={inputStyle}
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
        </div>

        {/* Slug */}

        <div>
          <label style={labelStyle}>Slug</label>

          <input
            style={{
              ...inputStyle,
              background: "#f8fafc",
            }}
            value={form.slug}
            readOnly
          />
        </div>

        {/* Category */}

        <div>
          <label style={labelStyle}>Category *</label>

          <select
            style={inputStyle}
            value={form.category}
            onChange={(e) => {
              console.log("Selected:", e.target.value);

              setForm({
                ...form,
                category: e.target.value,
              });
            }}
          >
            <option value="">Select Category</option>

            <option>Agriculture</option>
            <option>Textiles</option>
            <option>Furniture</option>
            <option>Machinery</option>
            <option>Chemicals</option>
            <option>Metals</option>
            <option>Electronics</option>
            <option>Food</option>
            <option>Home Products</option>
            <option>Others</option>
          </select>
        </div>

        {/* Country */}

        <div>
          <label style={labelStyle}>Country of Origin</label>

          <input
            style={inputStyle}
            value={form.origin_country}
            onChange={(e) =>
              setForm({
                ...form,
                origin_country: e.target.value,
              })
            }
          />
        </div>

        {/* Price */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 140px",
            gap: "1rem",
          }}
        >
          <div>
            <label style={labelStyle}>Price</label>

            <input
              type="number"
              style={inputStyle}
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label style={labelStyle}>Currency</label>

            <select
              style={inputStyle}
              value={form.currency}
              onChange={(e) =>
                setForm({
                  ...form,
                  currency: e.target.value,
                })
              }
            >
              <option>USD</option>
              <option>EUR</option>
              <option>INR</option>
              <option>AED</option>
              <option>GBP</option>
            </select>
          </div>
        </div>

        {/* MOQ */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 160px",
            gap: "1rem",
          }}
        >
          <div>
            <label style={labelStyle}>MOQ</label>

            <input
              style={inputStyle}
              value={form.moq}
              onChange={(e) =>
                setForm({
                  ...form,
                  moq: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label style={labelStyle}>Unit</label>

            <select
              style={inputStyle}
              value={form.unit}
              onChange={(e) =>
                setForm({
                  ...form,
                  unit: e.target.value,
                })
              }
            >
              <option value="">Select</option>

              <option>Kg</option>
              <option>Ton</option>
              <option>Piece</option>
              <option>Set</option>
              <option>Box</option>
              <option>Container</option>
              <option>Meter</option>
            </select>
          </div>
        </div>

        {/* Image */}

        <div>
          <label style={labelStyle}>Product Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            style={{
              marginTop: 8,
              width: "100%",
            }}
          />

          {form.image && (
            <div
              style={{
                marginTop: 16,
              }}
            >
              <img
                src={form.image}
                alt="Preview"
                style={{
                  width: 180,
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                }}
              />
            </div>
          )}
        </div>

        {/* Short Description */}

        <div>
          <label style={labelStyle}>Short Description</label>

          <textarea
            style={{
              ...inputStyle,
              minHeight: 90,
            }}
            value={form.short_description}
            onChange={(e) =>
              setForm({
                ...form,
                short_description: e.target.value,
              })
            }
          />
        </div>

        {/* Description */}

        <div>
          <label style={labelStyle}>Description</label>

          <textarea
            style={{
              ...inputStyle,
              minHeight: 180,
            }}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
        </div>

        {/* Toggles */}

        <div
          style={{
            display: "flex",
            gap: "2rem",
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) =>
                setForm({
                  ...form,
                  published: e.target.checked,
                })
              }
            />{" "}
            Published
          </label>

          <label>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm({
                  ...form,
                  featured: e.target.checked,
                })
              }
            />{" "}
            Featured
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <button type="button" onClick={onCancel}>
            Cancel
          </button>

          <button type="submit">{saving ? "Saving..." : "Save Product"}</button>
        </div>
      </form>
    </div>
  );
}
