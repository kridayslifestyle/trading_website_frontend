import Link from "next/link";
import { ArrowRight, Package, Ship, Search, BookOpen, Globe, FileText } from "lucide-react";

const OFFERS = [
  {
    icon: Package,
    emoji: "📦",
    title: "Export Management",
    desc: "End-to-end export documentation, compliance, and shipment coordination across 80+ countries.",
    color: "text-brand-600 bg-brand-50",
    stat: "80+ Countries",
  },
  {
    icon: Ship,
    emoji: "🚢",
    title: "Import Solutions",
    desc: "Customs clearance, duty optimisation, and last-mile delivery for seamless and stress-free imports.",
    color: "text-emerald-700 bg-emerald-50",
    stat: "Fastest Clearance",
  },
  {
    icon: Search,
    emoji: "🔍",
    title: "Supplier Sourcing",
    desc: "Verified supplier discovery across global markets with rigorous quality checks and audit reports.",
    color: "text-violet-700 bg-violet-50",
    stat: "500+ Suppliers",
  },
  {
    icon: BookOpen,
    emoji: "📋",
    title: "Trade Consulting",
    desc: "Expert guidance on tariffs, HS codes, trade agreements, and international market entry strategies.",
    color: "text-amber-700 bg-amber-50",
    stat: "15yr Expertise",
  },
  {
    icon: Globe,
    emoji: "🌐",
    title: "Logistics Support",
    desc: "Multi-modal freight — sea, air, and land — with global carrier partnerships and real-time tracking.",
    color: "text-sky-700 bg-sky-50",
    stat: "Sea · Air · Land",
  },
  {
    icon: FileText,
    emoji: "📑",
    title: "Documentation",
    desc: "LC, Bill of Lading, COO, phytosanitary, and all trade certificates handled by our expert team.",
    color: "text-rose-700 bg-rose-50",
    stat: "100% Compliant",
  },
];

export default function WhatWeOffer() {
  return (
    <section className="offers-section section-pad">
      <div className="container-custom">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <span className="section-label mb-4">What We Offer</span>
            <h2 className="font-display text-3xl md:text-[2.4rem] font-bold text-slate-900 leading-tight">
              Complete Trade <br/>
              <span className="text-gradient">Services</span>
            </h2>
          </div>
          <div>
            <p className="text-slate-500 text-lg leading-relaxed mb-4">
              From sourcing to shipment, we handle every aspect of your international trade
              operations with precision and expertise.
            </p>
            <Link href="/services"
              className="inline-flex items-center gap-2 text-brand-500 font-semibold text-sm hover:gap-3 transition-all">
              See all services <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>
        </div>

        {/* 6 cards grid */}
        <div className="offers-grid">
          {OFFERS.map(({icon:Icon,emoji,title,desc,color,stat})=>(
            <div key={title} className="offer-card group">
              <div className={`offer-icon-wrap ${color}`}>
                <Icon className="w-6 h-6"/>
              </div>
              <h3 className="font-display font-semibold text-slate-900 text-base mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{desc}</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-500 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                {emoji} {stat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}