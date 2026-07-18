import type { Metadata } from "next";
import Reveal from "@/components/common/Reveal";

export const metadata: Metadata = {
  title: "Terms of Use | TradePro Global",
  description:
    "The terms and conditions that govern your use of the TradePro Global website and services.",
};

const LAST_UPDATED = "July 17, 2026";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: [
      `These Terms of Use ("Terms") govern your access to and use of the tradeproglobal.com website (the "Site") and any inquiry, quotation, or communication you initiate with TradePro Global ("we", "us", "our") through it. By accessing the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.`,
    ],
  },
  {
    title: "2. Use of the Website",
    body: [`You agree to use the Site only for lawful purposes. You agree not to:`],
    list: [
      "Use the Site in any way that violates applicable local, national, or international law",
      "Attempt to gain unauthorized access to any part of the Site, including the admin systems",
      "Interfere with or disrupt the Site's operation, servers, or networks",
      "Submit false, misleading, or fraudulent inquiries",
      "Copy, scrape, or reproduce Site content for commercial purposes without permission",
    ],
  },
  {
    title: "3. Product Information & Pricing",
    body: [
      `Product descriptions, categories, and any indicative pricing shown on the Site are provided for general information only and do not constitute a binding offer. Availability, specifications, minimum order quantities (MOQ), and pricing are subject to confirmation and may change without notice.`,
    ],
  },
  {
    title: "4. Inquiries & Quotations",
    body: [
      `Submitting an inquiry or quotation request through the Site does not create a binding contract between you and TradePro Global. A trade agreement is only formed once both parties have agreed in writing to specific terms — including price, quantity, delivery, and payment conditions — typically via a formal quotation, proforma invoice, or purchase agreement.`,
    ],
  },
  {
    title: "5. Intellectual Property",
    body: [
      `All content on the Site — including text, graphics, logos, and design — is the property of TradePro Global or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from Site content without our prior written consent.`,
    ],
  },
  {
    title: "6. Third-Party Links & Services",
    body: [
      `The Site may link to third-party websites (for example, WhatsApp) or use third-party services to operate certain features. We are not responsible for the content, privacy practices, or availability of any third-party website or service.`,
    ],
  },
  {
    title: "7. Disclaimer of Warranties",
    body: [
      `The Site is provided "as is" and "as available" without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Site will be uninterrupted, error-free, or completely secure.`,
    ],
  },
  {
    title: "8. Limitation of Liability",
    body: [
      `To the fullest extent permitted by law, TradePro Global shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Site. Our liability for any claim arising from an actual trade transaction is governed separately by the terms of that specific agreement, not by these Terms.`,
    ],
  },
  {
    title: "9. Indemnification",
    body: [
      `You agree to indemnify and hold TradePro Global harmless from any claims, damages, or expenses (including reasonable legal fees) arising from your misuse of the Site or violation of these Terms.`,
    ],
  },
  {
    title: "10. Governing Law",
    body: [
      `These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of Hyderabad, Telangana, India.`,
    ],
  },
  {
    title: "11. Changes to These Terms",
    body: [
      `We may revise these Terms from time to time. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of the Site after changes take effect constitutes acceptance of the updated Terms.`,
    ],
  },
];

export default function TermsOfUsePage() {
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
                📜 Terms of Use
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
                Terms &amp; Conditions
              </h1>
              <p
                style={{
                  color: "rgba(147,197,253,.9)",
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  maxWidth: "540px",
                }}
              >
                The terms that govern your use of our website and services.
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
                      margin: 0,
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
                12. Contact Us
              </h2>
              <p
                style={{
                  fontSize: ".9375rem",
                  color: "#475569",
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                }}
              >
                Questions about these Terms? Reach out to us:
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