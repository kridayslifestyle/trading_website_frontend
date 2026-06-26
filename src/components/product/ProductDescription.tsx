"use client";

import { Product } from "./types";
import {
  CheckCircle,
  Globe,
  Package,
  ShieldCheck,
  Truck,
  Boxes,
  Clock3,
} from "lucide-react";

interface Props {
  product: Product;
}

export default function ProductDescription({ product }: Props) {
  return (
    <section
      style={{
        marginTop: "5rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* LEFT */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* About */}

          <div
            style={card}
          >
            <h2 style={heading}>
              About this Product
            </h2>

            <p
              style={{
                lineHeight: 1.9,
                color: "#475569",
              }}
            >
              {product.description ||
                "No description available."}
            </p>
          </div>

          {/* Specifications */}

          <div style={card}>
            <h2 style={heading}>
              Product Specifications
            </h2>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <tbody>

                <Spec
                  title="Category"
                  value={product.category}
                />

                <Spec
                  title="Country of Origin"
                  value={product.origin_country}
                />

                <Spec
                  title="MOQ"
                  value={`${product.moq} ${product.unit}`}
                />

                <Spec
                  title="Currency"
                  value={product.currency}
                />

                <Spec
                  title="Availability"
                  value={
                    product.published
                      ? "In Stock"
                      : "Unavailable"
                  }
                />

                <Spec
                  title="Packaging"
                  value="Export Standard"
                />

                <Spec
                  title="Delivery"
                  value="15-30 Business Days"
                />

              </tbody>
            </table>
          </div>

          {/* Export Features */}

          <div style={card}>
            <h2 style={heading}>
              Export Advantages
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              <FeatureCard
                icon={<ShieldCheck size={24} />}
                title="Premium Quality"
                text="Manufactured using international quality standards."
              />

              <FeatureCard
                icon={<Truck size={24} />}
                title="Worldwide Shipping"
                text="Safe export packaging with global logistics."
              />

              <FeatureCard
                icon={<Boxes size={24} />}
                title="Bulk Orders"
                text="Suitable for wholesalers and distributors."
              />

              <FeatureCard
                icon={<Globe size={24} />}
                title="Global Export"
                text="Exporting products across multiple countries."
              />
            </div>
          </div>

          {/* CTA */}

          <div
            style={{
              background:
                "linear-gradient(135deg,#2563EB,#1D4ED8)",
              borderRadius: 24,
              color: "#fff",
              padding: "2rem",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
              }}
            >
              Looking for Bulk Orders?
            </h2>

            <p
              style={{
                opacity: .9,
                lineHeight: 1.8,
              }}
            >
              Contact our export team for pricing,
              shipping details and customized quotations.
            </p>

            <button
              style={{
                marginTop: "2rem",
                background: "#fff",
                color: "#2563EB",
                border: "none",
                padding: "14px 28px",
                borderRadius: 12,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Request Quotation
            </button>
          </div>
        </div>

        {/* RIGHT */}

        <div style={card}>
          <h3
            style={{
              marginBottom: "1.5rem",
            }}
          >
            Why Choose This Product?
          </h3>

          <Bullet text="Premium export quality" />

          <Bullet text="Competitive wholesale pricing" />

          <Bullet text="Reliable manufacturing standards" />

          <Bullet text="Worldwide shipping support" />

          <Bullet text="OEM / Private Label available" />

          <Bullet text="Dedicated export assistance" />

          <Bullet text="Fast response within 24 hours" />

          <hr
            style={{
              margin: "2rem 0",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
            }}
          >
            <Clock3 color="#2563EB" />

            <div>
              <strong>
                Delivery Time
              </strong>

              <div
                style={{
                  color: "#64748B",
                }}
              >
                15-30 Business Days
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <tr>
      <td
        style={{
          padding: "14px 0",
          color: "#64748B",
          borderBottom:
            "1px solid #E5E7EB",
          width: "45%",
        }}
      >
        {title}
      </td>

      <td
        style={{
          padding: "14px 0",
          fontWeight: 600,
          borderBottom:
            "1px solid #E5E7EB",
        }}
      >
        {value || "-"}
      </td>
    </tr>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        background: "#F8FAFC",
        padding: "1.5rem",
        borderRadius: 18,
      }}
    >
      <div
        style={{
          color: "#2563EB",
          marginBottom: 12,
        }}
      >
        {icon}
      </div>

      <h4>{title}</h4>

      <p
        style={{
          color: "#64748B",
          lineHeight: 1.7,
          marginTop: 8,
        }}
      >
        {text}
      </p>
    </div>
  );
}

function Bullet({
  text,
}: {
  text: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        marginBottom: "1rem",
      }}
    >
      <CheckCircle
        size={18}
        color="#22C55E"
      />

      <span>{text}</span>
    </div>
  );
}

const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #E5E7EB",
  borderRadius: 24,
  padding: "2rem",
};

const heading: React.CSSProperties = {
  fontSize: "2rem",
  color: "#0F172A",
  marginBottom: "1.5rem",
};