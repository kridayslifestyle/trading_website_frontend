"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  MessageSquare,
  BarChart3,
  Share2,
  MessageCircle,
  Settings,
  LogOut,
  Globe,
  Menu,
  X,
  Bell,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

const BASE_NAV = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
    badge: null,
  },
  {
    icon: Users,
    label: "Leads",
    href: "/admin/leads",
    badge: null,
  },
  {
    icon: Package,
    label: "Products",
    href: "/admin/products",
    badge: null,
  },
  {
    icon: FileText,
    label: "Blog",
    href: "/admin/blog",
    badge: null,
  },
  {
    icon: BarChart3,
    label: "Analytics",
    href: "/admin/analytics",
    badge: null,
  },
  {
    icon: Share2,
    label: "Social Media",
    href: "/admin/social",
    badge: null,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "/admin/whatsapp",
    badge: null,
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
    badge: null,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [leadCount, setLeadCount] = useState(0);

  // Simple auth check
  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_auth") === "true";
    setAuth(isAuth);
    setChecking(false);
  }, []);

  useEffect(() => {
    async function loadLeadCount() {
      try {
        const res = await fetch("/api/leads");

        const data = await res.json();

        setLeadCount(data.leads?.length || 0);
      } catch (err) {
        console.error(err);
      }
    }

    loadLeadCount();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password — change this to your own
    if (password === "admin@tradepro123") {
      sessionStorage.setItem("admin_auth", "true");
      setAuth(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuth(false);
  };

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  // Loading
  if (checking)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8faff",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: "3px solid #e2e8f0",
              borderTopColor: "#1a5cf2",
              borderRadius: "50%",
              animation: "spin .8s linear infinite",
              margin: "0 auto 1rem",
            }}
          />
          <p style={{ color: "#64748b", fontSize: ".875rem" }}>Loading...</p>
        </div>
      </div>
    );

  // Login gate
  if (!auth)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#020e47,#0e37b0,#1a5cf2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            background: "rgba(255,255,255,.08)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,.15)",
            borderRadius: "1.75rem",
            padding: "3rem 2.5rem",
            width: "100%",
            maxWidth: "420px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "1.25rem",
                background: "#1a5cf2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                boxShadow: "0 0 24px rgba(26,92,242,.45)",
              }}
            >
              <Globe style={{ width: 28, height: 28, color: "#fff" }} />
            </div>
            <h1
              style={{
                fontFamily: "'Clash Display',sans-serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: ".25rem",
              }}
            >
              TradePro Admin
            </h1>
            <p style={{ color: "rgba(147,197,253,.8)", fontSize: ".875rem" }}>
              Sign in to your dashboard
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: ".75rem",
                  fontWeight: 600,
                  color: "rgba(147,197,253,.9)",
                  marginBottom: 6,
                  textTransform: "uppercase" as const,
                  letterSpacing: ".05em",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                style={{
                  width: "100%",
                  padding: ".875rem 1rem",
                  borderRadius: ".875rem",
                  background: "rgba(255,255,255,.10)",
                  border: "1px solid rgba(255,255,255,.18)",
                  color: "#fff",
                  fontSize: ".9375rem",
                  outline: "none",
                }}
              />
            </div>
            {error && (
              <p
                style={{
                  color: "#f87171",
                  fontSize: ".8125rem",
                  textAlign: "center" as const,
                }}
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              style={{
                padding: ".875rem",
                borderRadius: ".875rem",
                background: "linear-gradient(135deg,#f5c842,#e6b800)",
                color: "#020e47",
                fontWeight: 700,
                fontSize: ".9375rem",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(230,184,0,.35)",
              }}
            >
              Sign In →
            </button>
            <p
              style={{
                textAlign: "center" as const,
                fontSize: ".75rem",
                color: "rgba(147,197,253,.6)",
              }}
            >
              Default password: admin@tradepro123
            </p>
          </form>
        </div>
      </div>
    );

    const NAV = BASE_NAV.map((item) => {
  if (item.label === "Leads") {
    return {
      ...item,
      badge: leadCount > 0 ? String(leadCount) : null,
    };
  }

  return item;
});

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8faff" }}>
      {/* ── Sidebar ── */}
      <aside
        style={{
          width: "260px",
          flexShrink: 0,
          background: "#020e47",
          display: "flex",
          flexDirection: "column" as const,
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 40,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform .3s ease",
          boxShadow: "4px 0 24px rgba(0,0,0,.15)",
        }}
        className="lg-sidebar"
      >
        {/* Logo */}
        <div
          style={{
            padding: "1.5rem 1.25rem 1rem",
            borderBottom: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: ".875rem",
                background: "#1a5cf2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(26,92,242,.45)",
              }}
            >
              <Globe style={{ width: 20, height: 20, color: "#fff" }} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Clash Display',sans-serif",
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: "1rem",
                  lineHeight: 1,
                }}
              >
                TradePro
              </div>
              <div
                style={{
                  fontSize: ".65rem",
                  color: "rgba(147,197,253,.7)",
                  letterSpacing: ".12em",
                  textTransform: "uppercase" as const,
                }}
              >
                Admin Panel
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav
          style={{
            flex: 1,
            padding: "1rem .75rem",
            overflowY: "auto" as const,
            display: "flex",
            flexDirection: "column" as const,
            gap: ".25rem",
          }}
        >
          {NAV.map(({ icon: Icon, label, href, badge }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".75rem",
                  padding: ".75rem 1rem",
                  borderRadius: ".875rem",
                  background: active ? "rgba(26,92,242,.25)" : "transparent",
                  border: active
                    ? "1px solid rgba(26,92,242,.4)"
                    : "1px solid transparent",
                  color: active ? "#fff" : "rgba(148,163,184,.85)",
                  fontSize: ".875rem",
                  fontWeight: active ? 600 : 400,
                  transition: "all .2s",
                  textDecoration: "none",
                }}
              >
                <Icon style={{ width: 17, height: 17, flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{label}</span>
                {badge && (
                  <span
                    style={{
                      fontSize: ".65rem",
                      fontWeight: 700,
                      padding: "2px 7px",
                      borderRadius: 99,
                      background: "#1a5cf2",
                      color: "#fff",
                      minWidth: 20,
                      textAlign: "center" as const,
                    }}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div
          style={{
            padding: ".75rem",
            borderTop: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: ".75rem",
              padding: ".75rem 1rem",
              borderRadius: ".875rem",
              background: "transparent",
              border: "1px solid rgba(239,68,68,.2)",
              color: "rgba(252,165,165,.8)",
              fontSize: ".875rem",
              cursor: "pointer",
              transition: "all .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,.12)";
              e.currentTarget.style.color = "#fca5a5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "rgba(252,165,165,.8)";
            }}
          >
            <LogOut style={{ width: 17, height: 17 }} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.5)",
            zIndex: 30,
          }}
        />
      )}

      {/* ── Main content ── */}
      <div
        style={{
          flex: 1,
          marginLeft: 0,
          display: "flex",
          flexDirection: "column" as const,
          minWidth: 0,
        }}
        className="admin-main"
      >
        {/* Top bar */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            background: "rgba(255,255,255,.95)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid #e2e8f0",
            padding: ".875rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <button
            onClick={() => setOpen(!open)}
            style={{
              padding: ".5rem",
              borderRadius: ".625rem",
              background: "none",
              border: "1px solid #e2e8f0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {open ? (
              <X style={{ width: 18, height: 18, color: "#475569" }} />
            ) : (
              <Menu style={{ width: 18, height: 18, color: "#475569" }} />
            )}
          </button>

          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontFamily: "'Clash Display',sans-serif",
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#0f172a",
                lineHeight: 1,
              }}
            >
              {NAV.find((n) => isActive(n.href))?.label || "Dashboard"}
            </h1>
          </div>

          {/* Top right */}
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <button
              style={{
                position: "relative",
                padding: ".5rem",
                borderRadius: ".625rem",
                background: "none",
                border: "1px solid #e2e8f0",
                cursor: "pointer",
              }}
            >
              <Bell style={{ width: 17, height: 17, color: "#475569" }} />
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#ef4444",
                  border: "2px solid #fff",
                }}
              />
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".625rem",
                padding: ".375rem .75rem",
                borderRadius: ".875rem",
                background: "#f8faff",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#1a5cf2,#3d7cf5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: ".75rem",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                A
              </div>
              <span
                style={{
                  fontSize: ".8125rem",
                  fontWeight: 600,
                  color: "#1e293b",
                }}
              >
                Admin
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main
          style={{ flex: 1, padding: "1.5rem", overflowX: "hidden" as const }}
        >
          {children}
        </main>
      </div>

      {/* CSS to show sidebar on desktop */}
      <style>{`
        @media (min-width: 1024px) {
          .lg-sidebar { transform: translateX(0) !important; }
          .admin-main { margin-left: 260px !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
