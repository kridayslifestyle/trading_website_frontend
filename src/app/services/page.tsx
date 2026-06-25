"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  { emoji:"📦", title:"Export Management",   color:"#1a5cf2", bg:"rgba(26,92,242,.07)",  border:"rgba(26,92,242,.15)", desc:"End-to-end export documentation, compliance, customs, and shipment coordination to 80+ countries. We handle everything from HS code classification to final delivery.", features:["Export Documentation","Customs Clearance","Compliance & Licensing","Freight Coordination","Port Handling"] },
  { emoji:"🚢", title:"Import Solutions",    color:"#10b981", bg:"rgba(16,185,129,.07)", border:"rgba(16,185,129,.15)", desc:"Seamless import operations including customs clearance, duty optimisation, and last-mile delivery. We reduce your import costs and eliminate paperwork headaches.", features:["Customs Clearance","Duty Optimisation","Import Licensing","Last-mile Delivery","Bonded Warehouse"] },
  { emoji:"🔍", title:"Supplier Sourcing",   color:"#8b5cf6", bg:"rgba(139,92,246,.07)", border:"rgba(139,92,246,.15)", desc:"Verified supplier discovery across Indo, China, and global markets. We audit suppliers, negotiate pricing, and ensure quality standards before connecting you.", features:["Supplier Discovery","Factory Audits","Quality Inspection","Price Negotiation","Sample Coordination"] },
  { emoji:"📋", title:"Trade Consulting",    color:"#f59e0b", bg:"rgba(245,158,11,.07)", border:"rgba(245,158,11,.15)", desc:"Expert guidance on tariffs, HS codes, free trade agreements, and market entry strategies. Our consultants have 15+ years of international trade experience.", features:["Tariff Consulting","HS Code Classification","FTA Advisory","Market Entry Strategy","Trade Finance Guidance"] },
  { emoji:"🌐", title:"Logistics Support",   color:"#06b6d4", bg:"rgba(6,182,212,.07)",  border:"rgba(6,182,212,.15)", desc:"Multi-modal freight solutions — sea, air, and land — with global carrier partnerships. We track, manage, and optimise every shipment in real time.", features:["Sea Freight (FCL/LCL)","Air Freight","Land Transport","Freight Insurance","Real-time Tracking"] },
  { emoji:"📑", title:"Documentation",       color:"#ef4444", bg:"rgba(239,68,68,.07)",  border:"rgba(239,68,68,.15)", desc:"Complete trade documentation services — LC, Bill of Lading, COO, phytosanitary certificates, and all other trade certificates prepared accurately and on time.", features:["Letter of Credit (LC)","Bill of Lading","Certificate of Origin","Phytosanitary Cert","Invoice & Packing List"] },
];

export default function ServicesPage() {
  return (
    <div style={{ paddingTop:"80px", background:"#f8faff", minHeight:"100vh" }}>

      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,#020e47 0%,#0e37b0 55%,#1a5cf2 100%)", padding:"4rem 0 3rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none" }}/>
        <div className="container-custom" style={{ position:"relative",zIndex:1,textAlign:"center" }}>
          <span style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"5px 14px",borderRadius:99,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",color:"rgba(191,219,254,1)",fontSize:".72rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase" as const,marginBottom:"1rem" }}>
            🚀 What We Offer
          </span>
          <h1 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#fff",marginBottom:".75rem",letterSpacing:"-.025em" }}>
            Our Complete Trade Services
          </h1>
          <p style={{ color:"rgba(147,197,253,.9)",fontSize:"1.05rem",maxWidth:"540px",margin:"0 auto" }}>
            From sourcing to shipment — every aspect of your international trade operations handled with precision.
          </p>
        </div>
      </div>

      <div className="container-custom" style={{ padding:"4rem 1.25rem" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:"1.5rem" }}>
          {SERVICES.map(({ emoji,title,color,bg,border,desc,features })=>(
            <div key={title} style={{
              background:"#fff",borderRadius:"1.5rem",padding:"2rem",
              border:`1.5px solid ${border}`,
              boxShadow:"0 2px 16px rgba(0,0,0,.05)",
              transition:"transform .25s ease,box-shadow .25s ease",
              position:"relative",overflow:"hidden",
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=`0 16px 48px rgba(0,0,0,.10)`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,.05)";}}>
              {/* top accent line */}
              <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${color},${color}99)`,borderRadius:"1.5rem 1.5rem 0 0" }}/>

              {/* Icon */}
              <div style={{ width:56,height:56,borderRadius:"1rem",background:bg,border:`1px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.75rem",marginBottom:"1.25rem" }}>
                {emoji}
              </div>

              <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1.15rem",fontWeight:700,color:"#0f172a",marginBottom:".625rem" }}>{title}</h3>
              <p style={{ fontSize:".875rem",color:"#475569",lineHeight:1.7,marginBottom:"1.5rem" }}>{desc}</p>

              {/* Features list */}
              <div style={{ display:"flex",flexDirection:"column" as const,gap:".5rem",marginBottom:"1.75rem" }}>
                {features.map(f=>(
                  <div key={f} style={{ display:"flex",alignItems:"center",gap:8 }}>
                    <span style={{ width:6,height:6,borderRadius:"50%",background:color,flexShrink:0 }}/>
                    <span style={{ fontSize:".8125rem",color:"#475569" }}>{f}</span>
                  </div>
                ))}
              </div>

              <Link href="/inquiry" style={{ display:"inline-flex",alignItems:"center",gap:6,fontSize:".8125rem",fontWeight:700,color:color }}>
                Get a Quote <ArrowRight style={{ width:14,height:14 }}/>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}