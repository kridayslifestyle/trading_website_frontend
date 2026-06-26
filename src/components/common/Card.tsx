"use client";

import { colors, radius, shadow } from "@/styles/design";

interface Props {
  children: React.ReactNode;
}

export default function Card({
  children,
}: Props) {
  return (
    <div
      style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        boxShadow: shadow.sm,
        padding: "2rem",
      }}
    >
      {children}
    </div>
  );
}