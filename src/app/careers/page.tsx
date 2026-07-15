import Link from "next/link";
import { Briefcase, CheckCircle } from "lucide-react";

const perks = [
  "Global Trade Industry",
  "Professional Growth",
  "Collaborative Team",
  "International Business Exposure",
];

export default function CareersPage() {
  return (
    <div
      style={{
        paddingTop: 80,
        minHeight: "100vh",
        background: "#F8FAFC",
      }}
    >
      {/* Hero */}

      <section
        style={{
          background:
            "linear-gradient(135deg,#020E47 0%,#0E37B0 55%,#2563EB 100%)",
          color: "#fff",
          padding: "5rem 0",
          textAlign: "center",
        }}
      >
        <div className="container-custom">
          <div
            style={{
              fontSize: "4rem",
              marginBottom: "1rem",
            }}
          >
            💼
          </div>

          <h1
            style={{
              fontFamily: "'Clash Display',sans-serif",
              fontSize: "3rem",
              fontWeight: 700,
            }}
          >
            Careers at TradePro Global
          </h1>

          <p
            style={{
              maxWidth: 650,
              margin: "1rem auto 0",
              color: "#DBEAFE",
              lineHeight: 1.8,
            }}
          >
            Join our mission of connecting businesses across
            international markets through reliable import and export
            solutions.
          </p>
        </div>
      </section>

      {/* No Jobs */}

      <div
        className="container-custom"
        style={{
          maxWidth: 850,
          margin: "-50px auto 5rem",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: "3rem",
            textAlign: "center",
            boxShadow: "0 15px 40px rgba(0,0,0,.08)",
          }}
        >
          <Briefcase
            size={70}
            color="#2563EB"
            style={{
              marginBottom: "1.5rem",
            }}
          />

          <h2
            style={{
              fontSize: "2rem",
              color: "#0F172A",
              marginBottom: "1rem",
            }}
          >
            No Open Positions Right Now
          </h2>

          <p
            style={{
              color: "#64748B",
              lineHeight: 1.8,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            We don't have any active job openings at the moment.
            However, we're always interested in connecting with
            talented professionals. Feel free to send us your
            resume for future opportunities.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "2rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/contact"
              style={{
                background: "#2563EB",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Contact HR
            </Link>

            <Link
              href="/inquiry"
              style={{
                border: "2px solid #2563EB",
                color: "#2563EB",
                padding: "14px 28px",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Send Resume
            </Link>
          </div>
        </div>

        {/* Why Join */}

        <div
          style={{
            marginTop: "3rem",
            background: "#fff",
            borderRadius: 24,
            padding: "2.5rem",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              color: "#0F172A",
            }}
          >
            Why Join TradePro Global?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "1.5rem",
            }}
          >
            {perks.map((perk) => (
              <div
                key={perk}
                style={{
                  display: "flex",
                  gap: ".75rem",
                  alignItems: "center",
                }}
              >
                <CheckCircle
                  size={22}
                  color="#22C55E"
                />

                <span
                  style={{
                    color: "#334155",
                    fontWeight: 600,
                  }}
                >
                  {perk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}