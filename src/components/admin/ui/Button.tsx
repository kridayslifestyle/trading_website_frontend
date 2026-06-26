"use client";

import { CSSProperties, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const styles: Record<string, CSSProperties> = {
    primary: {
      background: "linear-gradient(135deg,#1a5cf2,#3d7cf5)",
      color: "#fff",
    },
    secondary: {
      background: "#fff",
      color: "#334155",
      border: "1px solid #cbd5e1",
    },
    danger: {
      background: "#ef4444",
      color: "#fff",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: ".8rem 1.4rem",
        borderRadius: "12px",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 600,
        fontSize: ".9rem",
        transition: ".2s",
        opacity: disabled ? 0.6 : 1,
        ...styles[variant],
      }}
    >
      {children}
    </button>
  );
}