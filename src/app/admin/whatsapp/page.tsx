"use client";

import { useEffect, useState } from "react";

interface Lead {
  id: number;
  name: string;
  company: string;
  phone: string;
  country: string;
  status: string;
}

interface WhatsAppData {
  connected: boolean;
  templates: number;
  totalLeads: number;
  recentLeads: Lead[];
}

export default function WhatsAppPage() {
  const [data, setData] = useState<WhatsAppData | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await fetch("/api/admin/whatsapp");
    const json = await res.json();
    setData(json);
  }

  if (!data) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  function openWhatsApp(lead: Lead) {
    if (!lead.phone) {
      alert("Phone number not available.");
      return;
    }

    const message = encodeURIComponent(
      `Hello ${lead.name},

Thank you for contacting TradePro Global.

How can we help you today?`,
    );

    const phone = lead.phone.replace(/\D/g, "");

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "2rem",
        }}
      >
        WhatsApp Manager
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "1rem",
        }}
      >
        <Card title="Total Leads" value={data.totalLeads} />

        <Card title="Templates" value={data.templates} />

        <Card
          title="Cloud API"
          value={data.connected ? "Connected" : "Not Connected"}
        />
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          border: "1px solid #E5E7EB",
          padding: "2rem",
          marginTop: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "#0F172A",
            marginBottom: "1.5rem",
          }}
        >
          Quick Message Templates
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "1rem",
          }}
        >
          {[
            {
              title: "Welcome",
              message:
                "Hello {{name}}, thank you for contacting TradePro Global. Our team will get back to you shortly.",
            },
            {
              title: "Product Inquiry",
              message:
                "Hello {{name}}, thank you for your interest. Could you please share your required quantity and destination country?",
            },
            {
              title: "Quotation",
              message:
                "Hello {{name}}, we are preparing your quotation. We'll send it as soon as possible.",
            },
            {
              title: "Thank You",
              message:
                "Thank you for choosing TradePro Global. We appreciate your business.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                padding: "1.25rem",
                background: "#F8FAFC",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: "#2563EB",
                  marginBottom: ".75rem",
                }}
              >
                {item.title}
              </div>

              <p
                style={{
                  color: "#475569",
                  fontSize: ".9rem",
                  lineHeight: 1.7,
                  marginBottom: "1rem",
                }}
              >
                {item.message}
              </p>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(item.message);
                  alert("Template copied.");
                }}
                style={{
                  background: "#25D366",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: ".6rem 1rem",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Copy Template
              </button>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          marginTop: "2rem",
          background: "#fff",
          borderRadius: 20,
          border: "1px solid #E5E7EB",
          padding: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
            color: "#0F172A",
          }}
        >
          Recent Leads
        </h2>

        {data.recentLeads.length === 0 ? (
          <div
            style={{
              color: "#64748B",
            }}
          >
            No leads available.
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {data.recentLeads.map((lead) => (
              <div
                key={lead.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem",
                  border: "1px solid #E5E7EB",
                  borderRadius: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#0F172A",
                    }}
                  >
                    {lead.name}
                  </div>

                  <div
                    style={{
                      color: "#64748B",
                      marginTop: 4,
                    }}
                  >
                    {lead.company || "Individual"}
                  </div>

                  <div
                    style={{
                      color: "#94A3B8",
                      fontSize: ".9rem",
                      marginTop: 4,
                    }}
                  >
                    {lead.phone || "No Phone"}
                  </div>
                </div>

                <button
                  onClick={() => openWhatsApp(lead)}
                  style={{
                    background: "#25D366",
                    color: "#fff",
                    border: "none",
                    padding: ".8rem 1.2rem",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Open WhatsApp
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "1.5rem",
        borderRadius: 18,
        border: "1px solid #E5E7EB",
      }}
    >
      <div
        style={{
          color: "#64748B",
          marginBottom: ".5rem",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "2rem",
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}
