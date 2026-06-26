"use client";

interface Props {
  text: string;
  color?: string;
  background?: string;
}

export default function Badge({
  text,
  color = "#1a5cf2",
  background = "#e8f0ff",
}: Props) {
  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        background,
        color,
        fontWeight: 600,
        fontSize: ".75rem",
      }}
    >
      {text}
    </span>
  );
}