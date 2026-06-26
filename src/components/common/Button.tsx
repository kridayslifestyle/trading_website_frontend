"use client";

import { colors, radius, transition } from "@/styles/design";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "success" | "danger" | "outline";
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  fullWidth = false,
  icon,
}: ButtonProps) {
  const styles = getVariant(variant);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles,
        width: fullWidth ? "100%" : "auto",

        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",

        gap: 8,

        padding: "14px 28px",

        borderRadius: radius.md,

        fontWeight: 600,

        fontSize: ".95rem",

        cursor: disabled ? "not-allowed" : "pointer",

        transition,

        opacity: disabled ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {icon}

      {children}
    </button>
  );
}

function getVariant(type: string): React.CSSProperties {
  switch (type) {
    case "secondary":
      return {
        background: colors.secondary,
        color: "#fff",
        border: "none",
      };

    case "success":
      return {
        background: colors.success,
        color: "#fff",
        border: "none",
      };

    case "danger":
      return {
        background: colors.danger,
        color: "#fff",
        border: "none",
      };

    case "outline":
      return {
        background: "#fff",
        color: colors.primary,
        border: `1px solid ${colors.primary}`,
      };

    default:
      return {
        background: colors.primary,
        color: "#fff",
        border: "none",
      };
  }
}