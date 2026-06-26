"use client";

import { ReactNode } from "react";

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div
      style={{
        padding: "4rem",
        background: "#fff",
        borderRadius: "24px",
        border: "1px solid #e2e8f0",
        textAlign: "center",
      }}
    >
      <div>{icon}</div>

      <h2
        style={{
          marginTop: 20,
          fontSize: "1.5rem",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: "#64748b",
          marginTop: 10,
        }}
      >
        {description}
      </p>

      <div style={{ marginTop: 30 }}>{action}</div>
    </div>
  );
}