"use client";

interface Props {
  title: string;
  value: string;
}

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 20,
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          fontWeight: 700,
        }}
      >
        {value}
      </div>

      <div
        style={{
          color: "#64748B",
          marginTop: 8,
        }}
      >
        {title}
      </div>
    </div>
  );
}