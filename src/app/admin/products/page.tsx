"use client";

import { useEffect, useState } from "react";

import ProductToolbar from "@/components/admin/products/ProductToolbar";
import EmptyProducts from "@/components/admin/products/EmptyProducts";
import ProductTable from "@/components/admin/products/ProductTable";
import Drawer from "@/components/admin/ui/Drawer";
import Button from "@/components/admin/ui/Button";
import ProductDetails from "@/components/admin/products/ProductDetails";
import ProductForm from "@/components/admin/products/ProductForm";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState("");

  const handleDelete = async () => {
    if (!deleteProduct) return;

    setDeleteError("");
    setDeletingId(deleteProduct.id);

    try {
      const res = await fetch(`/api/products/${deleteProduct.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      setDeleteProduct(null);
      loadProducts();
    } catch (err) {
      console.error(err);
      setDeleteError("Something went wrong while deleting. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <ProductToolbar
        search={search}
        setSearch={setSearch}
        onAdd={() => setOpen(true)}
      />

      {products.length === 0 ? (
        <EmptyProducts onAdd={() => setOpen(true)} />
      ) : (
        <ProductTable
          products={products}
          onView={setSelectedProduct}
          onEdit={(product) => {
            setEditingProduct(product);
            setOpen(true);
          }}
          onDelete={setDeleteProduct}
        />
      )}

      <Drawer
        open={open}
        title={editingProduct ? "Edit Product" : "Add Product"}
        onClose={() => {
          setEditingProduct(null);
          setOpen(false);
        }}
      >
        <ProductForm
          product={editingProduct || undefined}
          onCancel={() => {
            setEditingProduct(null);
            setOpen(false);
          }}
          onSuccess={() => {
            setEditingProduct(null);
            setOpen(false);
            loadProducts();
          }}
        />
      </Drawer>

      <ProductDetails
        open={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {deleteProduct && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: 420,
              background: "#fff",
              borderRadius: 20,
              padding: "2rem",
            }}
          >
            <h2>Delete Product</h2>

            <p
              style={{
                marginTop: 10,
                color: "#64748b",
              }}
            >
              Are you sure you want to delete
              <b> {deleteProduct.name}</b>?
            </p>

            {deleteError && (
              <p
                style={{
                  marginTop: 10,
                  color: "#dc2626",
                  fontSize: ".875rem",
                }}
              >
                {deleteError}
              </p>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
                marginTop: 30,
              }}
            >
              <button
                onClick={() => {
                  setDeleteProduct(null);
                  setDeleteError("");
                }}
              >
                Cancel
              </button>

              <button
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: ".75rem 1.4rem",
                  borderRadius: 10,
                  cursor: deletingId ? "default" : "pointer",
                  opacity: deletingId ? 0.7 : 1,
                }}
                disabled={!!deletingId}
                onClick={handleDelete}
              >
                {deletingId ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}