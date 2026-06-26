"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

interface DrawerProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  width?: number;
}

export default function Drawer({
  open,
  title,
  children,
  onClose,
  width = 520,
}: DrawerProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
      }}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          flex: 1,
          background: "rgba(15,23,42,.55)",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          width: "100%",
          maxWidth: width,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(0,0,0,.15)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: "none",
              background: "#f1f5f9",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1.5rem 1.5rem 120px",
          }}
        >
          {children}
        </div>

        
      </div>
    </div>
  );
}