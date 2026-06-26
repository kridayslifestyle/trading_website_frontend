"use client";

interface Props {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div
      style={{
        padding: "5rem",
        textAlign: "center",
      }}
    >
      <h2>{title}</h2>

      <p
        style={{
          color: "#64748B",
          marginTop: 10,
        }}
      >
        {description}
      </p>
    </div>
  );
}