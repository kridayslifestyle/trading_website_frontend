import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "TradePro Global | Import & Export Trading Company",
    template: "%s | TradePro Global",
  },
  description:
    "TradePro Global is a professional import & export trading company connecting buyers and suppliers across 80+ countries. Agricultural products, textiles, chemicals, engineering goods and more.",
  keywords: [
    "import export company",
    "trading company india",
    "b2b trade platform",
    "supplier sourcing",
    "export from india",
    "global trade",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://tradeproglobal.com",
    siteName: "TradePro Global",
    title: "TradePro Global | Import & Export Trading Company",
    description:
      "Professional B2B import & export trading company. Connecting global buyers and suppliers since 2010.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TradePro Global | Import & Export Trading Company",
    description: "Professional B2B import & export trading company.",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://tradeproglobal.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}