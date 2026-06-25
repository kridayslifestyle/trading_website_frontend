"use client";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";

const POSTS = [
  { slug:"export-guide-indo-2024",     emoji:"🇮🇳", category:"Export Guide",      title:"Complete Guide to Exporting from India in 2024",                         excerpt:"Everything you need to know about export documentation, DGFT registration, IEC code, and shipping from India to global markets.",   date:"May 10, 2025", read:"8 min", author:"Rajesh Kumar"   },
  { slug:"china-sourcing-tips",        emoji:"🇨🇳", category:"Sourcing",          title:"Top 10 Tips for Sourcing Products from China",                           excerpt:"Avoid common pitfalls when sourcing from Chinese manufacturers. From factory audits to payment terms — a practical guide.",          date:"Apr 28, 2025", read:"6 min", author:"Wei Zhang"      },
  { slug:"incoterms-explained",        emoji:"📦", category:"Trade Terms",        title:"Incoterms 2024 Explained — FOB, CIF, EXW and More",                      excerpt:"A clear breakdown of the most common Incoterms used in international trade and how to choose the right one for your shipment.",      date:"Apr 15, 2025", read:"7 min", author:"Priya Sharma"   },
  { slug:"masaz-chairs-import-guide",  emoji:"🪑", category:"Product Guide",      title:"How to Import Massage Chairs from Asia — Complete Guide",                 excerpt:"Import duties, quality standards, certifications, and finding reliable suppliers for massage chairs and furniture from China.",       date:"Mar 30, 2025", read:"5 min", author:"David Miller"   },
  { slug:"textile-trade-trends",       emoji:"🧵", category:"Market Trends",      title:"Textile & Apparel Trade Trends to Watch in 2025",                        excerpt:"Shifting supply chains, sustainability demands, and new sourcing hubs — the key trends reshaping global textile trade this year.",    date:"Mar 12, 2025", read:"6 min", author:"Priya Sharma"   },
  { slug:"lc-vs-tt-payment",           emoji:"💳", category:"Trade Finance",      title:"LC vs TT Payment — Which is Safer for International Trade?",             excerpt:"A comprehensive comparison of Letter of Credit (LC) and Telegraphic Transfer (TT) for import/export payments, with pros and cons.",  date:"Feb 25, 2025", read:"5 min", author:"Rajesh Kumar"   },
];

const CATEGORY_COLORS: Record<string,string> = {
  "Export Guide":  "#1a5cf2",
  "Sourcing":      "#10b981",
  "Trade Terms":   "#8b5cf6",
  "Product Guide": "#f59e0b",
  "Market Trends": "#06b6d4",
  "Trade Finance": "#ef4444",
};

export default function BlogPage() {
  return (
    <div style={{ paddingTop:"80px", background:"#f8faff", minHeight:"100vh" }}>

      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,#020e47 0%,#0e37b0 55%,#1a5cf2 100%)", padding:"4rem 0 3rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none" }}/>
        <div className="container-custom" style={{ position:"relative",zIndex:1,textAlign:"center" }}>
          <span style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"5px 14px",borderRadius:99,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",color:"rgba(191,219,254,1)",fontSize:".72rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase" as const,marginBottom:"1rem" }}>
            📝 Trade Blog
          </span>
          <h1 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#fff",marginBottom:".75rem",letterSpacing:"-.025em" }}>
            Trade Insights & Guides
          </h1>
          <p style={{ color:"rgba(147,197,253,.9)",fontSize:"1.05rem",maxWidth:"480px",margin:"0 auto" }}>
            Practical guides, market insights, and expert tips for global importers and exporters.
          </p>
        </div>
      </div>

      <div className="container-custom" style={{ padding:"4rem 1.25rem" }}>

        {/* Featured post */}
        <div style={{ background:"#fff",borderRadius:"2rem",padding:"2.5rem",border:"1.5px solid #e2e8f0",boxShadow:"0 4px 24px rgba(26,92,242,.08)",marginBottom:"3rem",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"2rem",alignItems:"center" }}>
          <div>
            <span style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:99,background:"rgba(26,92,242,.08)",border:"1px solid rgba(26,92,242,.15)",color:"#1a5cf2",fontSize:".72rem",fontWeight:700,letterSpacing:".05em",marginBottom:"1rem" }}>
              ⭐ Featured Post
            </span>
            <div style={{ fontSize:"3rem",marginBottom:"1rem" }}>🇮🇳</div>
            <h2 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1.5rem",fontWeight:700,color:"#0f172a",marginBottom:".75rem",lineHeight:1.3 }}>
              Complete Guide to Exporting from India in 2024
            </h2>
            <p style={{ color:"#475569",fontSize:".9rem",lineHeight:1.75,marginBottom:"1.5rem" }}>
              Everything you need to know about export documentation, DGFT registration, IEC code, and shipping from India to global markets.
            </p>
            <div style={{ display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.5rem" }}>
              <span style={{ fontSize:".75rem",color:"#94a3b8",display:"flex",alignItems:"center",gap:5 }}><Clock style={{ width:12,height:12 }}/> 8 min read</span>
              <span style={{ fontSize:".75rem",color:"#94a3b8",display:"flex",alignItems:"center",gap:5 }}><User style={{ width:12,height:12 }}/> Rajesh Kumar</span>
              <span style={{ fontSize:".75rem",color:"#94a3b8" }}>May 10, 2025</span>
            </div>
            <Link href="/blog/export-guide-indo-2024" style={{ display:"inline-flex",alignItems:"center",gap:6,padding:".75rem 1.5rem",borderRadius:"1rem",background:"linear-gradient(135deg,#1a5cf2,#3d7cf5)",color:"#fff",fontWeight:700,fontSize:".875rem",boxShadow:"0 4px 14px rgba(26,92,242,.30)" }}>
              Read Article <ArrowRight style={{ width:14,height:14 }}/>
            </Link>
          </div>
          <div style={{ background:"linear-gradient(135deg,#e8f0fe,#f0f4ff)",borderRadius:"1.5rem",height:"280px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"6rem" }}>
            🇮🇳
          </div>
        </div>

        {/* Grid */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.5rem" }}>
          {POSTS.slice(1).map(({ slug,emoji,category,title,excerpt,date,read,author })=>{
            const color = CATEGORY_COLORS[category] || "#1a5cf2";
            return (
              <Link key={slug} href={`/blog/${slug}`} style={{ display:"block",background:"#fff",borderRadius:"1.5rem",padding:"1.75rem",border:"1.5px solid #f1f5f9",boxShadow:"0 2px 12px rgba(0,0,0,.05)",transition:"transform .25s,box-shadow .25s,border-color .25s",textDecoration:"none" }}
                onMouseEnter={(e:any)=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 14px 40px rgba(26,92,242,.12)";e.currentTarget.style.borderColor="rgba(26,92,242,.15)";}}
                onMouseLeave={(e:any)=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,.05)";e.currentTarget.style.borderColor="#f1f5f9";}}>
                {/* Emoji */}
                <div style={{ fontSize:"2.5rem",marginBottom:"1rem" }}>{emoji}</div>
                {/* Category */}
                <span style={{ fontSize:".68rem",padding:"3px 10px",borderRadius:99,background:`${color}10`,color,fontWeight:700,border:`1px solid ${color}22`,display:"inline-block",marginBottom:".875rem" }}>
                  {category}
                </span>
                <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1.0625rem",fontWeight:700,color:"#0f172a",lineHeight:1.35,marginBottom:".625rem" }}>{title}</h3>
                <p style={{ fontSize:".8125rem",color:"#64748b",lineHeight:1.65,marginBottom:"1.25rem" }}>{excerpt}</p>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:".875rem",borderTop:"1px solid #f1f5f9" }}>
                  <div style={{ display:"flex",gap:"1rem" }}>
                    <span style={{ fontSize:".72rem",color:"#94a3b8",display:"flex",alignItems:"center",gap:4 }}><Clock style={{ width:11,height:11 }}/>{read}</span>
                    <span style={{ fontSize:".72rem",color:"#94a3b8" }}>{date}</span>
                  </div>
                  <ArrowRight style={{ width:14,height:14,color:"#1a5cf2" }}/>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}