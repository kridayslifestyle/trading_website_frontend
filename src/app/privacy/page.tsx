import type { Metadata } from "next";
import Reveal from "@/components/common/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy | TradePro Global",
  description:
    "How TradePro Global collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "July 17, 2026";

const SECTIONS = [
  {
    title: "1. Introduction",
    body: [
      `TradePro Global ("we", "us", "our") operates the tradeproglobal.com website and provides import & export trading services. This Privacy Policy explains what information we collect when you use our website or contact us, how we use it, and the choices you have.`,
      `By using our website or submitting an inquiry, you agree to the collection and use of information in accordance with this policy.`,
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      `When you submit an inquiry, request a quote, or contact us through the website, we may collect:`,
    ],
    list: [
      "Name, company name, and job title",
      "Email address and phone / WhatsApp number",
      "Country and, where relevant, shipping destination",
      "Product category, quantity, and budget details you provide",
      "Any message or requirements you write in a form",
    ],
    after: [
      `We also automatically collect limited technical information — such as browser type, general location (country/region), and pages visited — to help us understand how the website is used and to keep it secure.`,
    ],
  },
  {
    title: "3. How We Use Your Information",
    list: [
      "To respond to your inquiries and prepare quotations",
      "To connect you with the right product or service team",
      "To send you updates about your inquiry via email, phone, or WhatsApp",
      "To improve our website, products, and services",
      "To comply with legal and regulatory obligations",
    ],
  },
  {
    title: "4. Cookies & Similar Technologies",
    body: [
      `Our website may use cookies and similar technologies to remember your preferences and understand how visitors use the site. You can disable cookies in your browser settings, though some parts of the site may not function as intended if you do.`,
    ],
  },
  {
    title: "5. Sharing Your Information",
    body: [
      `We do not sell your personal information. We may share it only with:`,
    ],
    list: [
      "Our internal team, to respond to and process your inquiry",
      "Service providers who help us operate the website — for example, email delivery, image hosting, and database hosting providers — under obligations to keep it confidential",
      "Authorities, where required by law or to protect our legal rights",
    ],
  },
  {
    title: "6. Data Security",
    body: [
      `We use reasonable administrative and technical safeguards to protect your information, including restricted access to our admin systems and encrypted transmission of data submitted through our forms. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
    ],
  },
  {
    title: "7. Data Retention",
    body: [
      `We retain inquiry and lead information for as long as necessary to respond to you, maintain our business records, and comply with legal obligations. You may request deletion of your information at any time — see "Your Rights" below.`,
    ],
  },
  {
    title: "8. Your Rights",
    body: [`Depending on your location, you may have the right to:`],
    list: [
      "Request access to the personal information we hold about you",
      "Request correction of inaccurate information",
      "Request deletion of your information",
      "Withdraw consent to future communications from us",
    ],
    after: [
      `To exercise any of these rights, contact us using the details below.`,
    ],
  },
  {
    title: "9. Children's Privacy",
    body: [
      `Our website and services are intended for businesses and individuals over the age of 18. We do not knowingly collect personal information from children.`,
    ],
  },
  {
    title: "10. Changes to This Policy",
    body: [
      `We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of the website after changes take effect constitutes acceptance of the updated policy.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div style={{ paddingTop: "80px", background: "#fff", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg,#020e47 0%,#0e37b0 55%,#1a5cf2 100%)",
          padding: "4.5rem 0 3.5rem",
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
        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ maxWidth: "640px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 14px",
                  borderRadius: 99,
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.15)",
                  color: "rgba(191,219,254,1)",
                  fontSize: ".72rem",
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase" as const,
                  marginBottom: "1.25rem",
                }}
              >
                🔒 Privacy Policy
              </span>
              <h1
                style={{
                  fontFamily: "'Clash Display',sans-serif",
                  fontSize: "clamp(2rem,4vw,3rem)",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "1rem",
                  letterSpacing: "-.025em",
                  lineHeight: 1.1,
                }}
              >
                Your Privacy Matters to Us
              </h1>
              <p
                style={{
                  color: "rgba(147,197,253,.9)",
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  maxWidth: "540px",
                }}
              >
                How TradePro Global collects, uses, and protects your information.
              </p>
              <p
                style={{
                  color: "rgba(147,197,253,.65)",
                  fontSize: ".8125rem",
                  marginTop: "1rem",
                }}
              >
                Last updated: {LAST_UPDATED}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom" style={{ padding: "4.5rem 1.25rem" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          {SECTIONS.map((section, i) => (
            <Reveal key={section.title} delay={Math.min(i * 0.04, 0.2)}>
              <div style={{ marginBottom: "2.75rem" }}>
                <h2
                  style={{
                    fontFamily: "'Clash Display',sans-serif",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: "0.875rem",
                    letterSpacing: "-.01em",
                  }}
                >
                  {section.title}
                </h2>

                {section.body?.map((p, j) => (
                  <p
                    key={j}
                    style={{
                      fontSize: ".9375rem",
                      color: "#475569",
                      lineHeight: 1.8,
                      marginBottom: "0.875rem",
                    }}
                  >
                    {p}
                  </p>
                ))}

                {section.list && (
                  <ul
                    style={{
                      margin: "0 0 0.875rem",
                      paddingLeft: "1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {section.list.map((item) => (
                      <li
                        key={item}
                        style={{
                          fontSize: ".9375rem",
                          color: "#475569",
                          lineHeight: 1.7,
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.after?.map((p, j) => (
                  <p
                    key={j}
                    style={{
                      fontSize: ".9375rem",
                      color: "#475569",
                      lineHeight: 1.8,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}

          {/* Contact */}
          <Reveal>
            <div
              style={{
                background: "#f8faff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "1.5rem",
                padding: "2rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Clash Display',sans-serif",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "0.75rem",
                }}
              >
                11. Contact Us
              </h2>
              <p
                style={{
                  fontSize: ".9375rem",
                  color: "#475569",
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                }}
              >
                If you have questions about this Privacy Policy or wish to exercise
                your rights over your personal information, please contact us:
              </p>
              <p style={{ fontSize: ".9375rem", color: "#0f172a", lineHeight: 1.9 }}>
                TradePro Global
                <br />
                Flat No. 104, Padmaja Rajas Eclave, Bhagya Nagar Colony, Kukatpally,
                <br />
                Hyderabad – 500072, India
                <br />
                Email:{" "}
                <a
                  href="mailto:info.tradeproglobal@gmail.com"
                  style={{ color: "#1a5cf2" }}
                >
                  info.tradeproglobal@gmail.com
                </a>
                <br />
                Phone:{" "}
                <a href="tel:+917673953622" style={{ color: "#1a5cf2" }}>
                  +91 76739 53622
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}