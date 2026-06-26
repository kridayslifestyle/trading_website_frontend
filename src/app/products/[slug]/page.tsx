"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import ProductGallery from "@/components/product/ProductGallery";
import ProductHero from "@/components/product/ProductHero";
import ProductDescription from "@/components/product/ProductDescription";
import RelatedProducts from "@/components/product/RelatedProducts";

export default function ProductDetailsPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function loadProduct() {
      const res = await fetch(`/api/public/products/${slug}`);

      if (!res.ok) return;

      const data = await res.json();

      setProduct(data);
    }

    loadProduct();
  }, [slug]);

  if (!product) {
    return <h2 style={{ padding: 40 }}>Loading...</h2>;
  }

  return (
  <div
    style={{
      maxWidth: 1280,
      margin: "60px auto",
      padding: "0 20px",
    }}
  >
    <ProductBreadcrumb product={product} />

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "520px 1fr",
        gap: "4rem",
        alignItems: "start",
      }}
    >
      <ProductGallery
        image={product.image}
        name={product.name}
      />

      <ProductHero product={product} />
    </div>

    <ProductDescription product={product} />

    <RelatedProducts
      category={product.category}
      currentId={product.id}
    />
  </div>
);
}
