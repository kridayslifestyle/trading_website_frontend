"use client";

interface Props {
  title: string;
  subtitle?: string;
}

export default function PageTitle({
  title,
  subtitle,
}: Props) {
  return (
    <>
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: 700,
          color: "#0F172A",
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            color: "#64748B",
            marginTop: 12,
            maxWidth: 650,
            lineHeight: 1.8,
          }}
        >
          {subtitle}
        </p>
      )}
    </>
  );
}