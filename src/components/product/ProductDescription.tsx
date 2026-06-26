"use client";

import { Product } from "./types";
import {
  CheckCircle,
  Globe,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

interface Props {
  product: Product;
}

export default function ProductDescription({ product }: Props) {
  return (
    <section
      style={{
        marginTop: "4rem",
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
        {/* Left */}

        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: "2rem",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              color: "#0f172a",
            }}
          >
            About this Product
          </h2>

          <p
            style={{
              lineHeight: 1.9,
              color: "#475569",
              fontSize: "1rem",
            }}
          >
            {product.description ||
              "No detailed description available."}
          </p>

          <div
            style={{
              marginTop: "2rem",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "1rem",
            }}
          >
            <FeatureCard
              icon={<ShieldCheck size={22} />}
              title="Premium Quality"
              text="Manufactured using international quality standards."
            />

            <FeatureCard
              icon={<Truck size={22} />}
              title="Worldwide Shipping"
              text="Export-ready packaging and logistics support."
            />

            <FeatureCard
              icon={<Package size={22} />}
              title="Bulk Orders"
              text="Ideal for wholesalers, importers and distributors."
            />

            <FeatureCard
              icon={<Globe size={22} />}
              title="Global Export"
              text="Serving buyers across multiple countries."
            />
          </div>
        </div>

        {/* Right */}

        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: "2rem",
            border: "1px solid #e5e7eb",
          }}
        >
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

          <Bullet text="International shipping available" />

          <Bullet text="Bulk order support" />

          <Bullet text="OEM / Private Label available" />
        </div>
      </div>
    </section>
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
        borderRadius: 18,
        padding: "1.25rem",
      }}
    >
      <div
        style={{
          color: "#2563EB",
          marginBottom: ".75rem",
        }}
      >
        {icon}
      </div>

      <h4
        style={{
          marginBottom: ".5rem",
          color: "#0f172a",
        }}
      >
        {title}
      </h4>

      <p
        style={{
          color: "#64748b",
          lineHeight: 1.7,
          fontSize: ".9rem",
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
        alignItems: "center",
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