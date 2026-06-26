"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Plus,
  Mail,
  MessageCircle,
  Eye,
  X,
  Loader2,
  AlertTriangle,
} from "lucide-react";

const STAGES = [
  "All",
  "New",
  "Contacted",
  "Quoted",
  "Negotiating",
  "Closed Won",
  "Closed Lost",
];

// Shape returned by GET /api/leads, mapped to what this UI expects.
interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  status: string;
  source: string;
  date: string;
  company?: string;
  inquiryType?: string;
  quantity?: string;
  budget?: string;
  message?: string;
}

interface ApiLeadRow {
  id: number;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  country: string | null;
  inquiry_type: string | null;
  product: string | null;
  quantity: string | null;
  budget: string | null;
  message: string | null;
  status: string;
  source: string;
  created_at: string;
}

function mapLead(row: ApiLeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone || "",
    country: row.country || "—",
    product: row.product || "—",
    status: row.status,
    source: row.source,
    date: new Date(row.created_at).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    company: row.company || undefined,
    inquiryType: row.inquiry_type || undefined,
    quantity: row.quantity || undefined,
    budget: row.budget || undefined,
    message: row.message || undefined,
  };
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  New: { bg: "rgba(26,92,242,.10)", color: "#1a5cf2" },
  Contacted: { bg: "rgba(245,158,11,.10)", color: "#d97706" },
  Quoted: { bg: "rgba(139,92,246,.10)", color: "#7c3aed" },
  Negotiating: { bg: "rgba(6,182,212,.10)", color: "#0891b2" },
  "Closed Won": { bg: "rgba(16,185,129,.10)", color: "#059669" },
  "Closed Lost": { bg: "rgba(239,68,68,.10)", color: "#dc2626" },
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [stage, setStage] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchLeads = useCallback(async (signal?: AbortSignal) => {
    try {
      const res = await fetch("/api/leads", { signal });
      if (!res.ok) throw new Error("Failed to load leads");
      const data = await res.json();
      if (signal?.aborted) return;
      setLeads((data.leads as ApiLeadRow[]).map(mapLead));
      setLoadError("");
    } catch (err) {
      if (
        signal?.aborted ||
        (err instanceof DOMException && err.name === "AbortError")
      )
        return;
      setLoadError(
        "Couldn't load leads. Check your database connection and try again.",
      );
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  // Manual refresh (button click — a user event, not effect-driven):
  // OK to set loading state synchronously here since it's in response
  // to a discrete user action, not running inside a useEffect body.
  const loadLeads = useCallback(() => {
    setLoading(true);
    setLoadError("");
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    const controller = new AbortController();
    // Invoked via Promise chaining rather than calling the async
    // function directly — works around a known eslint-plugin-react-hooks
    // false positive (react/react#34743) where set-state-in-effect flags
    // any setState reachable from an effect-invoked async function, even
    // when every set call happens after an await.
    void Promise.resolve().then(() => fetchLeads(controller.signal));
    return () => controller.abort();
  }, [fetchLeads]);

  const updateStatus = async (leadId: number, status: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status } : l)),
      );
      setSelected((prev) =>
        prev && prev.id === leadId ? { ...prev, status } : prev,
      );
    } catch {
      // Keep it simple: surface via the loadError banner pattern
      setLoadError("Couldn't update status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const filtered = leads.filter((l) => {
    const matchStage = stage === "All" || l.status === stage;
    const q = search.toLowerCase();

    const matchSearch =
      l.name.toLowerCase().includes(q) ||
      l.company?.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q) ||
      l.country.toLowerCase().includes(q) ||
      l.product.toLowerCase().includes(q);
    return matchStage && matchSearch;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column" as const,
        gap: "1.5rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap" as const,
          gap: "1rem",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Clash Display',sans-serif",
              fontSize: "1.375rem",
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: ".25rem",
            }}
          >
            Lead Management
          </h2>
          <p style={{ fontSize: ".875rem", color: "#64748b" }}>
            {leads.length} total leads ·{" "}
            {leads.filter((l) => l.status === "New").length} new
          </p>
        </div>
        <button
          onClick={loadLeads}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: ".75rem 1.25rem",
            borderRadius: "1rem",
            background: "linear-gradient(135deg,#1a5cf2,#3d7cf5)",
            color: "#fff",
            fontWeight: 600,
            fontSize: ".875rem",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(26,92,242,.30)",
          }}
        >
          {loading ? (
            <Loader2
              style={{ width: 16, height: 16 }}
              className="animate-spin"
            />
          ) : (
            <Plus style={{ width: 16, height: 16 }} />
          )}{" "}
          Refresh
        </button>
      </div>

      {loadError && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: ".875rem 1rem",
            borderRadius: "1rem",
            background: "rgba(239,68,68,.08)",
            border: "1.5px solid rgba(239,68,68,.2)",
            color: "#b91c1c",
            fontSize: ".85rem",
          }}
        >
          <AlertTriangle style={{ width: 16, height: 16, flexShrink: 0 }} />{" "}
          {loadError}
        </div>
      )}

      {/* Search + filter */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap" as const,
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <Search
            style={{
              position: "absolute",
              left: 13,
              top: "50%",
              transform: "translateY(-50%)",
              width: 15,
              height: 15,
              color: "#94a3b8",
            }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads…"
            style={{
              width: "100%",
              padding: ".7rem 1rem .7rem 2.5rem",
              borderRadius: "1rem",
              border: "1.5px solid #e2e8f0",
              fontSize: ".875rem",
              background: "#fff",
              outline: "none",
            }}
          />
        </div>
        <span style={{ fontSize: ".85rem", color: "#64748b" }}>
          {filtered.length} results
        </span>
      </div>

      {/* Stage tabs */}
      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" as const }}>
        {STAGES.map((s) => {
          const count =
            s === "All"
              ? leads.length
              : leads.filter((l) => l.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setStage(s)}
              style={{
                padding: ".45rem 1rem",
                borderRadius: 99,
                fontSize: ".8rem",
                fontWeight: 600,
                border: "1.5px solid",
                cursor: "pointer",
                transition: "all .2s",
                background: stage === s ? "#1a5cf2" : "#fff",
                borderColor: stage === s ? "#1a5cf2" : "#e2e8f0",
                color: stage === s ? "#fff" : "#475569",
              }}
            >
              {s}{" "}
              {count > 0 && (
                <span style={{ marginLeft: 4, opacity: 0.7 }}>({count})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Leads table */}
      <div
        style={{
          background: "#fff",
          borderRadius: "1.5rem",
          border: "1.5px solid #f1f5f9",
          boxShadow: "0 2px 12px rgba(0,0,0,.05)",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" as const }}>
          <table style={{ width: "100%", borderCollapse: "collapse" as const }}>
            <thead>
              <tr
                style={{
                  background: "#f8faff",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {[
                  "Lead",
                  "Company",
                  "Country",
                  "Product",
                  "Status",
                  "Date",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: ".875rem 1rem",
                      textAlign: "left" as const,
                      fontSize: ".72rem",
                      fontWeight: 700,
                      color: "#94a3b8",
                      textTransform: "uppercase" as const,
                      letterSpacing: ".06em",
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      padding: "3rem 1rem",
                      textAlign: "center" as const,
                      color: "#94a3b8",
                      fontSize: ".875rem",
                    }}
                  >
                    <Loader2
                      style={{
                        width: 20,
                        height: 20,
                        margin: "0 auto 8px",
                        display: "block",
                      }}
                      className="animate-spin"
                    />
                    Loading leads…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      padding: "3rem 1rem",
                      textAlign: "center" as const,
                      color: "#94a3b8",
                      fontSize: ".875rem",
                    }}
                  >
                    {leads.length === 0
                      ? "No leads yet — they'll appear here as soon as someone submits the inquiry form."
                      : "No leads match your filters."}
                  </td>
                </tr>
              ) : (
                filtered.map((l, i) => {
                  const s = STATUS_STYLE[l.status] || STATUS_STYLE["New"];
                  const hasPhone = l.phone.trim().length > 0;
                  return (
                    <tr
                      key={l.id}
                      style={{
                        borderBottom:
                          i < filtered.length - 1
                            ? "1px solid #f1f5f9"
                            : "none",
                        transition: "background .15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#f8faff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td style={{ padding: ".875rem 1rem" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".75rem",
                          }}
                        >
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              background:
                                "linear-gradient(135deg,#1a5cf2,#3d7cf5)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontWeight: 700,
                              fontSize: ".8125rem",
                              flexShrink: 0,
                            }}
                          >
                            {l.name[0]?.toUpperCase() || "?"}
                          </div>
                          <div>
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: ".875rem",
                                color: "#0f172a",
                              }}
                            >
                              {l.name}
                            </div>
                            <div
                              style={{ fontSize: ".75rem", color: "#94a3b8" }}
                            >
                              {l.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        style={{
                          padding: ".875rem 1rem",
                          fontSize: ".875rem",
                          color: "#475569",
                          whiteSpace: "nowrap" as const,
                        }}
                      >
                        {l.country}
                      </td>
                      <td
                        style={{
                          padding: ".875rem 1rem",
                          fontSize: ".875rem",
                          color: "#475569",
                        }}
                      >
                        {l.product}
                      </td>
                      <td style={{ padding: ".875rem 1rem" }}>
                        <span
                          style={{
                            fontSize: ".72rem",
                            fontWeight: 700,
                            padding: "3px 10px",
                            borderRadius: 99,
                            background: s.bg,
                            color: s.color,
                            whiteSpace: "nowrap" as const,
                          }}
                        >
                          {l.status}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: ".875rem 1rem",
                          fontSize: ".8rem",
                          color: "#64748b",
                        }}
                      >
                        {l.source}
                      </td>
                      <td
                        style={{
                          padding: ".875rem 1rem",
                          fontSize: ".8rem",
                          color: "#94a3b8",
                          whiteSpace: "nowrap" as const,
                        }}
                      >
                        {l.date}
                      </td>
                      <td style={{ padding: ".875rem 1rem" }}>
                        <div style={{ display: "flex", gap: ".375rem" }}>
                          <button
                            onClick={() => setSelected(l)}
                            title="View"
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: ".5rem",
                              background: "rgba(26,92,242,.08)",
                              border: "none",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "background .2s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "rgba(26,92,242,.18)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background =
                                "rgba(26,92,242,.08)")
                            }
                          >
                            <Eye
                              style={{
                                width: 13,
                                height: 13,
                                color: "#1a5cf2",
                              }}
                            />
                          </button>
                          {hasPhone && (
                            <a
                              href={`https://wa.me/${l.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="WhatsApp"
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: ".5rem",
                                background: "rgba(37,211,102,.10)",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textDecoration: "none",
                              }}
                            >
                              <MessageCircle
                                style={{
                                  width: 13,
                                  height: 13,
                                  color: "#25D366",
                                }}
                              />
                            </a>
                          )}
                          <a
                            href={`mailto:${l.email}`}
                            title="Email"
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: ".5rem",
                              background: "rgba(245,158,11,.10)",
                              border: "none",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              textDecoration: "none",
                            }}
                          >
                            <Mail
                              style={{
                                width: 13,
                                height: 13,
                                color: "#d97706",
                              }}
                            />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead detail drawer */}
      {selected && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex" }}
        >
          <div
            onClick={() => setSelected(null)}
            style={{ flex: 1, background: "rgba(0,0,0,.4)" }}
          />
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              background: "#fff",
              boxShadow: "-4px 0 40px rgba(0,0,0,.12)",
              overflowY: "auto" as const,
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column" as const,
              gap: "1.25rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Clash Display',sans-serif",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                Lead Details
              </h3>
              <button
                onClick={() => setSelected(null)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#f1f5f9",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X style={{ width: 16, height: 16, color: "#475569" }} />
              </button>
            </div>

            {/* Avatar + name */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1.25rem",
                background: "#f8faff",
                borderRadius: "1.25rem",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#1a5cf2,#3d7cf5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                }}
              >
                {selected.name[0]}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Clash Display',sans-serif",
                    fontWeight: 700,
                    fontSize: "1.0625rem",
                    color: "#0f172a",
                  }}
                >
                  {selected.name}
                </div>
                <div
                  style={{
                    fontSize: ".8125rem",
                    color: "#64748b",
                    marginTop: 2,
                  }}
                >
                  {selected.country}
                </div>
              </div>
            </div>

            {/* Details */}
            {[
              ["🏢 Company", selected.company || "Not Provided"],
              ["📧 Email", selected.email],
              ["📞 Phone", selected.phone || "Not Provided"],
              ["🌍 Country", selected.country],
              ["📋 Inquiry Type", selected.inquiryType || "General Inquiry"],
              ["📦 Product", selected.product],
              ["📊 Quantity", selected.quantity || "Not Provided"],
              ["💰 Budget", selected.budget || "Not Provided"],
              ["🌐 Source", selected.source],
              ["📅 Created", selected.date],
              ...(selected.message ? [["📝 Message", selected.message]] : []),
            ].map(([l, v]) => (
              <div
                key={l}
                style={{
                  display: "flex",
                  gap: ".75rem",
                  padding: ".875rem",
                  background: "#f8faff",
                  borderRadius: ".875rem",
                  border: "1px solid #f1f5f9",
                }}
              >
                <span
                  style={{
                    fontSize: ".8rem",
                    color: "#94a3b8",
                    width: "90px",
                    flexShrink: 0,
                  }}
                >
                  {l}
                </span>
                <span
                  style={{
                    fontSize: ".875rem",
                    fontWeight: 500,
                    color: "#1e293b",
                  }}
                >
                  {v}
                </span>
              </div>
            ))}

            {/* Status update */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: ".75rem",
                  fontWeight: 600,
                  color: "#64748b",
                  marginBottom: 6,
                }}
              >
                Update Status
              </label>
              <select
                value={selected.status}
                disabled={updating}
                onChange={(e) => updateStatus(selected.id, e.target.value)}
                className="select-field"
              >
                {STAGES.filter((s) => s !== "All").map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: ".75rem" }}>
              {selected.phone && (
                <a
                  href={`https://wa.me/${selected.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: ".75rem",
                    borderRadius: "1rem",
                    background: "#25D366",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: ".875rem",
                    textDecoration: "none",
                  }}
                >
                  <MessageCircle style={{ width: 15, height: 15 }} /> WhatsApp
                </a>
              )}
              <a
                href={`mailto:${selected.email}`}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: ".75rem",
                  borderRadius: "1rem",
                  background: "linear-gradient(135deg,#1a5cf2,#3d7cf5)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: ".875rem",
                  textDecoration: "none",
                }}
              >
                <Mail style={{ width: 15, height: 15 }} /> Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
