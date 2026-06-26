"use client";

interface Props {
  children: React.ReactNode;
}

export default function Container({
  children,
}: Props) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 24px",
      }}
    >
      {children}
    </div>
  );
}