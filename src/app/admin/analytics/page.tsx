"use client";

import { useEffect, useState } from "react";
import { Package, FileText, Users, Eye } from "lucide-react";

import MonthlyCharts from "@/components/admin/analytics/MonthlyCharts";

interface AnalyticsData {
  overview: {
    products: number;
    blogs: number;
    leads: number;
    blogViews: number;
  };

  quickStats: {
    publishedProducts: number;
    draftBlogs: number;
    newLeads: number;
  };

  monthlyLeads: {
    month: string;
    total: number;
  }[];

  monthlyBlogs: {
    month: string;
    total: number;
  }[];

  recentBlogs: {
    id: number;
    title: string;
    status: string;
    created_at: string;
  }[];

  recentLeads: {
    id: number;
    name: string;
    company: string;
    status: string;
    created_at: string;
  }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const res = await fetch("/api/admin/analytics");

      const json = await res.json();

      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div
        style={{
          padding: "3rem",
          fontSize: "1.2rem",
        }}
      >
        Loading analytics...
      </div>
    );
  }

  const cards = [
    {
      title: "Products",
      value: data?.overview.products ?? 0,
      icon: <Package size={28} />,
      color: "#2563EB",
    },
    {
      title: "Blogs",
      value: data?.overview.blogs ?? 0,
      icon: <FileText size={28} />,
      color: "#10B981",
    },
    {
      title: "Leads",
      value: data?.overview.leads ?? 0,
      icon: <Users size={28} />,
      color: "#F59E0B",
    },
    {
      title: "Blog Views",
      value: data?.overview.blogViews ?? 0,
      icon: <Eye size={28} />,
      color: "#8B5CF6",
    },
  ];

  return (
    <div
      style={{
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
          Analytics
        </h1>

        <p
          style={{
            color: "#64748B",
            marginTop: 6,
          }}
        >
          Overview of your TradePro website.
        </p>
      </div>

      {/* Overview Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "1.5rem",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "1.5rem",
              border: "1px solid #E5E7EB",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: `${card.color}15`,
                color: card.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {card.icon}
            </div>

            <h2
              style={{
                marginTop: "1rem",
                color: "#64748B",
                fontSize: ".95rem",
                fontWeight: 600,
              }}
            >
              {card.title}
            </h2>

            <div
              style={{
                marginTop: ".5rem",
                fontSize: "2.2rem",
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}

      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "2rem",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2
          style={{
            marginBottom: "1.5rem",
            fontSize: "1.3rem",
            color: "#0F172A",
          }}
        >
          Quick Statistics
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "1rem",
          }}
        >
          <StatBox
            label="Published Products"
            value={data?.quickStats.publishedProducts ?? 0}
          />

          <StatBox
            label="Draft Blogs"
            value={data?.quickStats.draftBlogs ?? 0}
          />

          <StatBox label="New Leads" value={data?.quickStats.newLeads ?? 0} />
        </div>
      </div>
      <MonthlyCharts
        monthlyLeads={data?.monthlyLeads || []}
        monthlyBlogs={data?.monthlyBlogs || []}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
        }}
      >
        {/* Recent Blogs */}

        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "1.5rem",
            border: "1px solid #E5E7EB",
          }}
        >
          <h2
            style={{
              marginBottom: "1rem",
            }}
          >
            Recent Blogs
          </h2>

          {data?.recentBlogs.map((blog) => (
            <div
              key={blog.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: ".9rem 0",
                borderBottom: "1px solid #F1F5F9",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {blog.title}
                </div>

                <div
                  style={{
                    color: "#64748B",
                    fontSize: ".85rem",
                  }}
                >
                  {blog.status}
                </div>
              </div>

              <div
                style={{
                  color: "#94A3B8",
                  fontSize: ".8rem",
                }}
              >
                {new Date(blog.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Leads */}

        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "1.5rem",
            border: "1px solid #E5E7EB",
          }}
        >
          <h2
            style={{
              marginBottom: "1rem",
            }}
          >
            Recent Leads
          </h2>

          {data?.recentLeads.map((lead) => (
            <div
              key={lead.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: ".9rem 0",
                borderBottom: "1px solid #F1F5F9",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {lead.name}
                </div>

                <div
                  style={{
                    color: "#64748B",
                    fontSize: ".85rem",
                  }}
                >
                  {lead.company || "Individual"}
                </div>
              </div>

              <div
                style={{
                  color: "#94A3B8",
                  fontSize: ".8rem",
                }}
              >
                {lead.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        background: "#F8FAFC",
        borderRadius: 16,
        padding: "1.25rem",
      }}
    >
      <div
        style={{
          color: "#64748B",
          fontSize: ".9rem",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: ".5rem",
          fontSize: "1.8rem",
          fontWeight: 700,
          color: "#0F172A",
        }}
      >
        {value}
      </div>
    </div>
  );
}
