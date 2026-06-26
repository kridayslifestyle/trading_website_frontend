"use client";

import { useEffect, useState } from "react";
import { X, Send } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    slug: string;
  };
}

export default function GetQuoteModal({ open, onClose, product }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    quantity: "",
    message: `Hello,

I am interested in ${product.name}.

Please send your quotation, delivery time and payment terms.

Thank you.`,
  });

  useEffect(() => {
    if (!open) {
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        quantity: "",
        message: `Hello,

I am interested in ${product.name}.

Please send your quotation, delivery time and payment terms.

Thank you.`,
      });
    }
  }, [open]);

  if (!open) return null;

  if (success) {
    return (
      <div style={overlay}>
        <div
          style={{
            ...modal,
            maxWidth: 500,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 70,
              marginBottom: 20,
            }}
          >
            ✅
          </div>

          <h2>Request Submitted</h2>

          <p
            style={{
              color: "#64748B",
              lineHeight: 1.8,
              marginTop: 15,
            }}
          >
            Thank you.
            <br />
            Our export team will contact you shortly.
          </p>
        </div>
      </div>
    );
  }

  async function submit() {
    if (!form.name || !form.email) {
      alert("Name and Email are required.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          country: form.country,
          type: "Product Inquiry",
          product: product.name,
          quantity: form.quantity,
          budget: "",
          message: form.message || `Interested in ${product.name}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit quotation");
      }

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={overlay}>
      <div style={modal}>
        <button onClick={onClose} style={closeButton}>
          <X size={22} />
        </button>

        <h2 style={{ marginBottom: 8 }}>Request Quotation</h2>

        <p
          style={{
            color: "#64748B",
            marginBottom: "2rem",
          }}
        >
          Product: <strong>{product.name}</strong>
        </p>

        <div style={grid}>
          <Input
            label="Full Name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />

          <Input
            label="Email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />

          <Input
            label="Phone"
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
          />

          <Input
            label="Company"
            value={form.company}
            onChange={(v) => setForm({ ...form, company: v })}
          />

          <Input
            label="Country"
            value={form.country}
            onChange={(v) => setForm({ ...form, country: v })}
          />

          <Input
            label="Required Quantity"
            value={form.quantity}
            onChange={(v) => setForm({ ...form, quantity: v })}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label style={label}>Message</label>

          <textarea
            rows={5}
            value={form.message}
            onChange={(e) =>
              setForm({
                ...form,
                message: e.target.value,
              })
            }
            style={textarea}
            placeholder="Please provide your requirements..."
          />
        </div>

        <button onClick={submit} disabled={loading} style={submitButton}>
          <Send size={18} />

          {loading ? "Submitting..." : "Request Quotation"}
        </button>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={input}
      />
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  padding: "1rem",
};

const modal: React.CSSProperties = {
  background: "#fff",
  width: "100%",
  maxWidth: 720,
  borderRadius: 24,
  padding: "2rem",
  position: "relative",
};

const closeButton: React.CSSProperties = {
  position: "absolute",
  right: 20,
  top: 20,
  border: "none",
  background: "transparent",
  cursor: "pointer",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  border: "1px solid #E2E8F0",
  borderRadius: 12,
  marginTop: 6,
};

const textarea: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  border: "1px solid #E2E8F0",
  borderRadius: 12,
  marginTop: 6,
};

const labelStyle: React.CSSProperties = {
  fontWeight: 600,
};

const label = labelStyle;

const submitButton: React.CSSProperties = {
  marginTop: "2rem",
  width: "100%",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  padding: "16px",
  borderRadius: 14,
  fontWeight: 700,
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
};
