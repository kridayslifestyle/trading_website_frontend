"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TEAM = [
  { name:"Sai Krishna",   role:"Founder & CEO",            flag:"🇮🇳", emoji:"👨‍💼", exp:"20yr exp" },
  { name:"Wei Zhang",      role:"Head of China Operations",  flag:"🇨🇳", emoji:"👨‍💼", exp:"15yr exp" },
  // { name:"Priya Sharma",   role:"Export Manager",            flag:"🇮🇳", emoji:"👩‍💼", exp:"10yr exp" },
  // { name:"David Miller",   role:"Global Sales Director",     flag:"🇺🇸", emoji:"👨‍💼", exp:"12yr exp" },
];


const MILESTONES = [
  { year:"2009", event:"Company founded in Hyderabad, India" },
  { year:"2012", event:"Expanded operations to China" },
  { year:"2015", event:"Crossed 500+ active clients worldwide" },
  { year:"2018", event:"Launched digital trade platform" },
  { year:"2021", event:"Entered Middle East & African markets" },
  { year:"2024", event:"Trading across 80+ countries" },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop:"80px", background:"#fff", minHeight:"100vh" }}>

      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,#020e47 0%,#0e37b0 55%,#1a5cf2 100%)", padding:"4.5rem 0 3.5rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none" }}/>
        <div className="container-custom" style={{ position:"relative",zIndex:1 }}>
          <div style={{ maxWidth:"640px" }}>
            <span style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"5px 14px",borderRadius:99,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",color:"rgba(191,219,254,1)",fontSize:".72rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase" as const,marginBottom:"1.25rem" }}>
              🏢 About Us
            </span>
            <h1 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#fff",marginBottom:"1rem",letterSpacing:"-.025em",lineHeight:1.1 }}>
              15 Years of Trusted<br/>Global Trade
            </h1>
            <p style={{ color:"rgba(147,197,253,.9)",fontSize:"1.05rem",lineHeight:1.75,maxWidth:"540px" }}>
              TradePro Global was founded in Hyderabad in 2009 with a simple mission — make international trade accessible, transparent, and reliable for businesses of all sizes.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom" style={{ padding:"5rem 1.25rem" }}>

        {/* Mission & Vision */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem",marginBottom:"5rem" }}>
          {[
            { icon:"🎯", title:"Our Mission",  text:"To connect businesses worldwide with the most reliable import and export solutions — reducing costs, saving time, and building long-term trade partnerships." },
            { icon:"🔭", title:"Our Vision",   text:"To become the most trusted B2B global trading platform, empowering businesses in emerging markets to compete on the world stage." },
            { icon:"💡", title:"Our Values",   text:"Transparency, reliability, and excellence in every trade operation. We treat every client's business as if it were our own." },
          ].map(({ icon,title,text })=>(
            <div key={title} style={{ background:"#f8faff",borderRadius:"1.5rem",padding:"2rem",border:"1.5px solid #e2e8f0",transition:"transform .25s,box-shadow .25s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 12px 36px rgba(26,92,242,.10)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
              <div style={{ fontSize:"2.5rem",marginBottom:"1rem" }}>{icon}</div>
              <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1.15rem",fontWeight:700,color:"#0f172a",marginBottom:".625rem" }}>{title}</h3>
              <p style={{ fontSize:".875rem",color:"#475569",lineHeight:1.75 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ background:"linear-gradient(135deg,#020e47,#0e37b0)",borderRadius:"2rem",padding:"3rem",marginBottom:"5rem",position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px)",backgroundSize:"24px 24px",pointerEvents:"none" }}/>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:"2rem",position:"relative",zIndex:1 }}>
            {[{v:"80+",l:"Countries"},{v:"2000+",l:"Happy Clients"},{v:"500+",l:"Products"},{v:"15yr",l:"Experience"},{v:"98%",l:"On-time Delivery"},{v:"24hr",l:"Response Time"}].map(({v,l})=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(1.75rem,3vw,2.5rem)",fontWeight:700,color:"#fff",marginBottom:".25rem" }}>{v}</div>
                <div style={{ fontSize:".8125rem",color:"rgba(147,197,253,.85)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom:"5rem" }}>
          <h2 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(1.5rem,3vw,2.25rem)",fontWeight:700,color:"#0f172a",marginBottom:"2.5rem",textAlign:"center" }}>Our Journey</h2>
          <div style={{ display:"flex",flexDirection:"column" as const,gap:"1rem",maxWidth:"640px",margin:"0 auto" }}>
            {MILESTONES.map(({ year,event },i)=>(
              <div key={year} style={{ display:"flex",gap:"1.5rem",alignItems:"flex-start" }}>
                <div style={{ display:"flex",flexDirection:"column" as const,alignItems:"center",flexShrink:0 }}>
                  <div style={{ width:44,height:44,borderRadius:"50%",background:i===MILESTONES.length-1?"#1a5cf2":"#e8f0fe",border:i===MILESTONES.length-1?"2px solid #1a5cf2":"2px solid #c7d7fd",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Clash Display',sans-serif",fontSize:".7rem",fontWeight:700,color:i===MILESTONES.length-1?"#fff":"#1a5cf2",flexShrink:0 }}>
                    {year.slice(2)}
                  </div>
                  {i<MILESTONES.length-1 && <div style={{ width:2,height:32,background:"#e2e8f0",marginTop:4 }}/>}
                </div>
                <div style={{ paddingTop:".75rem" }}>
                  <span style={{ fontSize:".75rem",fontWeight:700,color:"#1a5cf2",marginRight:8 }}>{year}</span>
                  <span style={{ fontSize:".9rem",color:"#475569" }}>{event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom:"5rem" }}>
          <h2 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(1.5rem,3vw,2.25rem)",fontWeight:700,color:"#0f172a",marginBottom:"2.5rem",textAlign:"center" }}>Meet Our Team</h2>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"1.5rem" }}>
            {TEAM.map(({ name,role,flag,emoji,exp })=>(
              <div key={name} style={{ background:"#fff",borderRadius:"1.5rem",padding:"2rem",border:"1.5px solid #f1f5f9",boxShadow:"0 2px 12px rgba(0,0,0,.05)",textAlign:"center",transition:"transform .25s,box-shadow .25s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 12px 36px rgba(26,92,242,.10)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,.05)";}}>
                <div style={{ width:72,height:72,borderRadius:"50%",background:"rgba(26,92,242,.07)",border:"2px solid rgba(26,92,242,.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",margin:"0 auto 1rem" }}>{flag}</div>
                <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1rem",fontWeight:700,color:"#0f172a",marginBottom:".25rem" }}>{name}</h3>
                <p style={{ fontSize:".8rem",color:"#64748b",marginBottom:".5rem" }}>{role}</p>
                <span style={{ fontSize:".75rem",padding:"3px 10px",borderRadius:99,background:"rgba(26,92,242,.07)",color:"#1a5cf2",fontWeight:600,border:"1px solid rgba(26,92,242,.12)" }}>{exp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        {/* <div style={{ background:"#f8faff",borderRadius:"2rem",padding:"3rem",border:"1.5px solid #e2e8f0",textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1.5rem",fontWeight:700,color:"#0f172a",marginBottom:"2rem" }}>Certifications & Memberships</h2>
          <div style={{ display:"flex",flexWrap:"wrap" as const,gap:"1rem",justifyContent:"center" }}>
            {CERTS.map(c=>(
              <div key={c} style={{ display:"inline-flex",alignItems:"center",gap:8,padding:".75rem 1.5rem",borderRadius:"1rem",background:"#fff",border:"1.5px solid #e2e8f0",boxShadow:"0 2px 8px rgba(0,0,0,.04)" }}>
                <span style={{ color:"#22c55e" }}>✅</span>
                <span style={{ fontSize:".875rem",fontWeight:600,color:"#1e293b" }}>{c}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop:"2.5rem" }}>
            <Link href="/inquiry" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:".875rem 2rem",borderRadius:"1rem",background:"linear-gradient(135deg,#1a5cf2,#3d7cf5)",color:"#fff",fontWeight:700,fontSize:".9375rem",boxShadow:"0 4px 16px rgba(26,92,242,.35)" }}>
              Start Trading With Us <ArrowRight style={{ width:16,height:16 }}/>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}