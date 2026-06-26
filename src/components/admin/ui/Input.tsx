"use client";

interface Props {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function Input({
  label,
  value,
  placeholder,
  onChange,
}: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontSize: ".8rem",
          color: "#475569",
          fontWeight: 600,
        }}
      >
        {label}
      </label>

      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: ".8rem 1rem",
          border: "1px solid #cbd5e1",
          borderRadius: "12px",
          outline: "none",
          fontSize: ".9rem",
        }}
      />
    </div>
  );
}