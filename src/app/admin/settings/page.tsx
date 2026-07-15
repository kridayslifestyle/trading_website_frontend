"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    company_name: "",
    tagline: "",
    about: "",

    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    map_url: "",

    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    twitter: "",

    meta_title: "",
    meta_description: "",
    meta_keywords: "",

    ga_id: "",
    gsc_verification: "",

    logo: "",
    favicon: "",
    og_image: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await fetch("/api/admin/settings");

      if (!res.ok) return;

      const data = await res.json();

      if (!data) return;

      setForm({
        company_name: data.company_name || "",
        tagline: data.tagline || "",
        about: data.about || "",

        email: data.email || "",
        phone: data.phone || "",
        whatsapp: data.whatsapp || "",
        address: data.address || "",
        map_url: data.map_url || "",

        facebook: data.facebook || "",
        instagram: data.instagram || "",
        linkedin: data.linkedin || "",
        youtube: data.youtube || "",
        twitter: data.twitter || "",

        meta_title: data.meta_title || "",
        meta_description: data.meta_description || "",
        meta_keywords: data.meta_keywords || "",

        ga_id: data.ga_id || "",
        gsc_verification: data.gsc_verification || "",

        logo: data.logo || "",
        favicon: data.favicon || "",
        og_image: data.og_image || "",
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function saveSettings() {
    try {
      setSaving(true);

      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error();
      }

      alert("Settings saved successfully.");
    } catch (err) {
      console.error(err);

      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  function Section({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 20,
          padding: "2rem",
        }}
      >
        <h2
          style={{
            marginBottom: "1.5rem",
            color: "#0F172A",
            fontSize: "1.35rem",
            fontWeight: 700,
          }}
        >
          {title}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "1.5rem",
          }}
        >
          {children}
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
          style={inputStyle}
        />
      </div>
    );
  }

  function TextArea({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
  }) {
    return (
      <div
        style={{
          gridColumn: "1 / -1",
        }}
      >
        <label style={labelStyle}>{label}</label>

        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={textareaStyle}
        />
      </div>
    );
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: 8,
    fontWeight: 600,
    color: "#334155",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px",
    borderRadius: 12,
    border: "1px solid #E2E8F0",
    fontSize: ".95rem",
  };

  const textareaStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px",
    borderRadius: 12,
    border: "1px solid #E2E8F0",
    fontSize: ".95rem",
    resize: "vertical",
  };

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#0F172A",
          }}
        >
          Website Settings
        </h1>

        <p
          style={{
            color: "#64748B",
            marginTop: 6,
          }}
        >
          Manage your website configuration.
        </p>
      </div>

      <>
        {/* Company Information */}

        <Section title="Company Information">
          <Input
            label="Company Name"
            value={form.company_name}
            onChange={(v) =>
              setForm({
                ...form,
                company_name: v,
              })
            }
          />

          <Input
            label="Tagline"
            value={form.tagline}
            onChange={(v) =>
              setForm({
                ...form,
                tagline: v,
              })
            }
          />

          <TextArea
            label="About Company"
            value={form.about}
            onChange={(v) =>
              setForm({
                ...form,
                about: v,
              })
            }
          />
        </Section>

        {/* Contact */}

        <Section title="Contact Information">
          <Input
            label="Email"
            value={form.email}
            onChange={(v) =>
              setForm({
                ...form,
                email: v,
              })
            }
          />

          <Input
            label="Phone"
            value={form.phone}
            onChange={(v) =>
              setForm({
                ...form,
                phone: v,
              })
            }
          />

          <Input
            label="WhatsApp"
            value={form.whatsapp}
            onChange={(v) =>
              setForm({
                ...form,
                whatsapp: v,
              })
            }
          />

          <TextArea
            label="Address"
            value={form.address}
            onChange={(v) =>
              setForm({
                ...form,
                address: v,
              })
            }
          />

          <Input
            label="Google Maps URL"
            value={form.map_url}
            onChange={(v) =>
              setForm({
                ...form,
                map_url: v,
              })
            }
          />
        </Section>

        {/* Social */}

        <Section title="Social Media">
          <Input
            label="Facebook"
            value={form.facebook}
            onChange={(v) =>
              setForm({
                ...form,
                facebook: v,
              })
            }
          />

          <Input
            label="Instagram"
            value={form.instagram}
            onChange={(v) =>
              setForm({
                ...form,
                instagram: v,
              })
            }
          />

          <Input
            label="LinkedIn"
            value={form.linkedin}
            onChange={(v) =>
              setForm({
                ...form,
                linkedin: v,
              })
            }
          />

          <Input
            label="YouTube"
            value={form.youtube}
            onChange={(v) =>
              setForm({
                ...form,
                youtube: v,
              })
            }
          />

          <Input
            label="Twitter / X"
            value={form.twitter}
            onChange={(v) =>
              setForm({
                ...form,
                twitter: v,
              })
            }
          />
        </Section>

        {/* SEO */}

        <Section title="SEO Settings">
          <Input
            label="Meta Title"
            value={form.meta_title}
            onChange={(v) =>
              setForm({
                ...form,
                meta_title: v,
              })
            }
          />

          <Input
            label="Meta Keywords"
            value={form.meta_keywords}
            onChange={(v) =>
              setForm({
                ...form,
                meta_keywords: v,
              })
            }
          />

          <Input
            label="Google Analytics ID"
            value={form.ga_id}
            onChange={(v) =>
              setForm({
                ...form,
                ga_id: v,
              })
            }
          />

          <Input
            label="Google Search Console Verification"
            value={form.gsc_verification}
            onChange={(v) =>
              setForm({
                ...form,
                gsc_verification: v,
              })
            }
          />

          <TextArea
            label="Meta Description"
            value={form.meta_description}
            onChange={(v) =>
              setForm({
                ...form,
                meta_description: v,
              })
            }
          />
        </Section>

        {/* Brand Assets */}

        <Section title="Brand Assets">
          <div
            style={{
              gridColumn: "1 / -1",
            }}
          >
            <label style={labelStyle}>Company Logo</label>

            <ImageUploader
              value={form.logo}
              onChange={(url) =>
                setForm({
                  ...form,
                  logo: url,
                })
              }
            />
          </div>

          <div
            style={{
              gridColumn: "1 / -1",
            }}
          >
            <label style={labelStyle}>Favicon</label>

            <ImageUploader
              value={form.favicon}
              onChange={(url) =>
                setForm({
                  ...form,
                  favicon: url,
                })
              }
            />
          </div>

          <div
            style={{
              gridColumn: "1 / -1",
            }}
          >
            <label style={labelStyle}>Open Graph Image</label>

            <ImageUploader
              value={form.og_image}
              onChange={(url) =>
                setForm({
                  ...form,
                  og_image: url,
                })
              }
            />
          </div>
        </Section>

        {/* Save */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "4rem",
          }}
        >
          <button
            onClick={saveSettings}
            disabled={saving}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#2563EB",
              color: "#fff",
              border: "none",
              padding: "14px 26px",
              borderRadius: 12,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: ".95rem",
            }}
          >
            <Save size={18} />

            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </>
    </div>
  );
}
