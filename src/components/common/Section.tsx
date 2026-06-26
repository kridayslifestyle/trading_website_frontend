"use client";

interface Props {
  children: React.ReactNode;
}

export default function Section({
  children,
}: Props) {
  return (
    <section
      style={{
        marginTop: "5rem",
      }}
    >
      {children}
    </section>
  );
}