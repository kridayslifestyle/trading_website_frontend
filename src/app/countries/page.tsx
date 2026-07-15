"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { COUNTRIES } from "@/data/countries";

export default function CountriesPage() {
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("All");

  const continents = [
    "All",
    "Asia",
    "Middle East",
    "Europe",
    "North America",
    "Africa",
    "Oceania",
  ];

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter((country) => {
      const matchesSearch = country.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesContinent =
        continent === "All" || country.continent === continent;

      return matchesSearch && matchesContinent;
    });
  }, [search, continent]);

  return (
    <div
      style={{
        paddingTop: 80,
        background: "#F8FAFC",
        minHeight: "100vh",
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
          <span
            style={{
              display: "inline-block",
              padding: "8px 18px",
              borderRadius: 999,
              background: "rgba(255,255,255,.12)",
              marginBottom: "1.25rem",
              fontWeight: 700,
            }}
          >
            🌍 Global Trade Network
          </span>

          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Countries We Serve
          </h1>

          <p
            style={{
              maxWidth: 650,
              margin: "0 auto",
              color: "#DBEAFE",
              lineHeight: 1.8,
            }}
          >
            Connecting India, China, UAE and global buyers with trusted import
            and export solutions.
          </p>
        </div>
      </section>

      <div
        className="container-custom"
        style={{
          marginTop: "-40px",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "1.5rem",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          }}
        >
          <Stat title="Trade Markets" value="12+" />
          <Stat title="Continents" value="6" />
          <Stat title="Years Experience" value="15+" />
          <Stat title="Global Clients" value="250+" />
        </div>
      </div>

      {/* Search */}
      <div
        className="container-custom"
        style={{
          marginTop: "3rem",
        }}
      >
        <div
          style={{
            position: "relative",
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          <Search
            size={20}
            style={{
              position: "absolute",
              top: 18,
              left: 18,
              color: "#94A3B8",
            }}
          />

          <input
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 16px 16px 52px",
              borderRadius: 14,
              border: "1px solid #E2E8F0",
              fontSize: "1rem",
            }}
          />
        </div>
      </div>

      {/* Filters */}
      <div
        className="container-custom"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: ".75rem",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        {continents.map((item) => (
          <button
            key={item}
            onClick={() => setContinent(item)}
            style={{
              padding: "10px 20px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: continent === item ? "#2563EB" : "#EEF2FF",
              color: continent === item ? "#fff" : "#2563EB",
              fontWeight: 600,
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Placeholder */}
      <div
        className="container-custom"
        style={{
          marginTop: "4rem",
          marginBottom: "5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
            gap: "2rem",
          }}
        >
          {filteredCountries.map((country) => (
            <div
              key={country.name}
              style={{
                background: "#fff",
                borderRadius: 24,
                overflow: "hidden",
                border: "1px solid #E5E7EB",
                boxShadow: "0 10px 30px rgba(15,23,42,.05)",
                transition: "all .3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(37,99,235,.15)";
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(15,23,42,.05)";
              }}
            >
              {/* Card Header */}

              <div
                style={{
                  padding: "2rem",
                  background: "linear-gradient(135deg,#EFF6FF,#F8FAFC)",
                }}
              >
                <div
                  style={{
                    fontSize: "4rem",
                  }}
                >
                  {country.flag}
                </div>

                <h2
                  style={{
                    marginTop: ".75rem",
                    fontSize: "1.5rem",
                    color: "#0F172A",
                    fontWeight: 700,
                  }}
                >
                  {country.name}
                </h2>

                <div
                  style={{
                    marginTop: ".4rem",
                    color: "#2563EB",
                    fontWeight: 600,
                  }}
                >
                  {country.continent}
                </div>
              </div>

              {/* Description */}

              <div
                style={{
                  padding: "1.75rem",
                }}
              >
                <p
                  style={{
                    color: "#64748B",
                    lineHeight: 1.8,
                    marginBottom: "1.5rem",
                  }}
                >
                  {country.description}
                </p>

                <div
                  style={{
                    fontWeight: 700,
                    color: "#0F172A",
                    marginBottom: ".75rem",
                  }}
                >
                  Trade Services
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: ".6rem",
                    marginBottom: "1.75rem",
                  }}
                >
                  {country.services.map((service) => (
                    <span
                      key={service}
                      style={{
                        background: "#EEF2FF",
                        color: "#1D4ED8",
                        padding: ".45rem .85rem",
                        borderRadius: 999,
                        fontSize: ".82rem",
                        fontWeight: 600,
                      }}
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <Link
                  href="/products"
                  style={{
                    display: "block",
                    textAlign: "center",
                    textDecoration: "none",
                    background: "#2563EB",
                    color: "#fff",
                    padding: "14px",
                    borderRadius: 12,
                    fontWeight: 700,
                  }}
                >
                  View Products
                </Link>
              </div>
            </div>
          ))}
        </div>
        <section
          style={{
            background:
              "linear-gradient(135deg,#020E47 0%,#0E37B0 55%,#2563EB 100%)",
            padding: "5rem 0",
            marginTop: "2rem",
          }}
        >
          <div
            className="container-custom"
            style={{
              textAlign: "center",
              maxWidth: 900,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,.12)",
                color: "#DBEAFE",
                fontWeight: 700,
                marginBottom: "1.5rem",
              }}
            >
              🤝 Let's Work Together
            </span>

            <h2
              style={{
                color: "#fff",
                fontSize: "2.5rem",
                fontWeight: 700,
                marginBottom: "1.25rem",
                fontFamily: "'Clash Display',sans-serif",
              }}
            >
              Looking for a Reliable Trading Partner?
            </h2>

            <p
              style={{
                color: "#BFDBFE",
                maxWidth: 700,
                margin: "0 auto",
                lineHeight: 1.8,
                fontSize: "1.05rem",
              }}
            >
              Whether you're importing from China, exporting from India, or
              expanding into new international markets, our experienced team is
              here to support your business with reliable sourcing, logistics,
              and global trade solutions.
            </p>

            <div
              style={{
                marginTop: "2.5rem",
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/inquiry"
                style={{
                  background: "#fff",
                  color: "#2563EB",
                  padding: "15px 30px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                Request a Quote
              </Link>

              <Link
                href="/contact"
                style={{
                  border: "2px solid rgba(255,255,255,.25)",
                  color: "#fff",
                  padding: "15px 30px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "#2563EB",
        }}
      >
        {value}
      </div>

      <div
        style={{
          marginTop: 8,
          color: "#64748B",
        }}
      >
        {title}
      </div>
    </div>
  );
}
