"use client";

import { Product } from "./types";
import {
  BadgeCheck,
  Globe,
  Package,
  DollarSign,
  MessageCircle,
  Send,
  Star,
} from "lucide-react";

interface Props {
  product: Product;
}

export default function ProductHero({ product }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
      }}
    >
      {/* Top badges */}

      <div
        style={{
          display: "flex",
          gap: ".75rem",
          flexWrap: "wrap",
        }}
      >
        <Badge text={product.category} color="#2563EB" bg="#EEF4FF" />

        {product.featured && (
          <Badge
            text="Featured"
            color="#B45309"
            bg="#FEF3C7"
            icon={<Star size={14} />}
          />
        )}

        <Badge
          text="Export Quality"
          color="#059669"
          bg="#ECFDF5"
          icon={<BadgeCheck size={14} />}
        />
      </div>

      {/* Product Name */}

      <h1
        style={{
          fontSize: "3rem",
          lineHeight: 1.1,
          fontWeight: 700,
          color: "#0f172a",
          textTransform: "capitalize",
        }}
      >
        {product.name}
      </h1>

      {/* Short Description */}

      {product.short_description && (
        <p
          style={{
            color: "#64748b",
            lineHeight: 1.8,
            fontSize: "1rem",
          }}
        >
          {product.short_description}
        </p>
      )}

      {/* Price Card */}

      <div
        style={{
          background: "#F8FAFC",
          border: "1px solid #E2E8F0",
          borderRadius: 20,
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            color: "#64748B",
            fontSize: ".9rem",
            marginBottom: ".5rem",
          }}
        >
          Starting Price
        </div>

        <div
          style={{
            fontSize: "2.7rem",
            fontWeight: 700,
            color: "#2563EB",
          }}
        >
          {product.currency} {Number(product.price).toLocaleString()}
        </div>
      </div>

      {/* Information */}

      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 20,
          padding: "1.5rem",
        }}
      >
        <InfoRow
          icon={<Globe size={18} />}
          label="Origin"
          value={product.origin_country}
        />

        <InfoRow
          icon={<Package size={18} />}
          label="MOQ"
          value={`${product.moq} ${product.unit}`}
        />

        <InfoRow
          icon={<DollarSign size={18} />}
          label="Currency"
          value={product.currency}
        />

        <InfoRow
          icon={<BadgeCheck size={18} />}
          label="Availability"
          value={product.published ? "In Stock" : "Unavailable"}
        />
      </div>

      {/* Buttons */}

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <button style={primaryButton}>
          <Send size={18} />
          Get Quote
        </button>

        <button style={whatsappButton}>
          <MessageCircle size={18} />
          WhatsApp
        </button>
      </div>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          marginTop: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <TrustItem title="Secure Export" value="100%" />

        <TrustItem title="Bulk Orders" value="Available" />

        <TrustItem title="Global Shipping" value="Worldwide" />
      </div>
    </div>
  );
}

function TrustItem({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>
      <div
        style={{
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "#0F172A",
        }}
      >
        {value}
      </div>

      <div
        style={{
          color: "#64748B",
          fontSize: ".85rem",
        }}
      >
        {title}
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 0",
        borderBottom: "1px solid #F1F5F9",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          color: "#64748B",
        }}
      >
        {icon}

        {label}
      </div>

      <strong>{value}</strong>
    </div>
  );
}

function Badge({
  text,
  color,
  bg,
  icon,
}: {
  text: string;
  color: string;
  bg: string;
  icon?: React.ReactNode;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: bg,
        color,
        padding: "8px 14px",
        borderRadius: 999,
        fontWeight: 600,
        fontSize: ".82rem",
      }}
    >
      {icon}

      {text}
    </span>
  );
}

const primaryButton: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: "#2563EB",
  color: "#fff",
  border: "none",
  padding: "16px 28px",
  borderRadius: 14,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(37,99,235,.25)",
};

const whatsappButton: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: "#22C55E",
  color: "#fff",
  border: "none",
  padding: "16px 28px",
  borderRadius: 14,
  fontWeight: 700,
  cursor: "pointer",
};
