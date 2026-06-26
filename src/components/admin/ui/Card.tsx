"use client";

import { ReactNode } from "react";

export default function Card({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "1.5rem",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 16px rgba(15,23,42,.04)",
      }}
    >
      {children}
    </div>
  );
}