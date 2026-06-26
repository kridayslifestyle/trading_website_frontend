"use client";

interface Props {
  text: string;
  color: string;
  background: string;
}

export default function Badge({
  text,
  color,
  background,
}: Props) {
  return (
    <span
      style={{
        background,
        color,
        padding: "8px 16px",
        borderRadius: 999,
        fontWeight: 600,
        fontSize: ".85rem",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {text}
    </span>
  );
}