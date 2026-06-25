"use client";
import { useState } from "react";
import { Search, Plus, Filter, Phone, Mail, MessageCircle, Eye, X, Clock } from "lucide-react";

const STAGES = ["All","New","Contacted","Quoted","Negotiating","Closed Won","Closed Lost"];

const LEADS = [
  { id:1,  name:"Klaus Meier",      email:"klaus@freshco.de",        phone:"+49 89 123456",    country:"🇩🇪 Germany",     product:"Masaz Chairs",   status:"New",         source:"Website",   date:"27 May 2025", value:"$12,000" },
  { id:2,  name:"Sarah Johnson",    email:"sarah@textilehub.com",    phone:"+1 212 555 0100",  country:"🇺🇸 USA",          product:"Textiles",       status:"Contacted",   source:"WhatsApp",  date:"26 May 2025", value:"$8,500"  },
  { id:3,  name:"Ahmed Al-Rashid",  email:"ahmed@gulftrade.ae",      phone:"+971 50 123 4567", country:"🇦🇪 UAE",           product:"Home Products",  status:"Quoted",      source:"Website",   date:"25 May 2025", value:"$22,000" },
  { id:4,  name:"Yuki Tanaka",      email:"yuki@nippon.co.jp",       phone:"+81 3 1234 5678",  country:"🇯🇵 Japan",         product:"Engineering",    status:"New",         source:"Referral",  date:"24 May 2025", value:"$45,000" },
  { id:5,  name:"Li Wei",           email:"liwei@sinotrade.cn",      phone:"+86 21 1234 5678", country:"🇨🇳 China",         product:"Clothing",       status:"Closed Won",  source:"LinkedIn",  date:"23 May 2025", value:"$18,000" },
  { id:6,  name:"Maria Santos",     email:"maria@brazilimport.br",   phone:"+55 11 9876 5432", country:"🇧🇷 Brazil",        product:"Textiles",       status:"Negotiating", source:"Website",   date:"22 May 2025", value:"$9,000"  },
  { id:7,  name:"David Brown",      email:"david@ukimports.co.uk",   phone:"+44 20 7946 0958", country:"🇬🇧 UK",            product:"Masaz Chairs",   status:"Contacted",   source:"Website",   date:"21 May 2025", value:"$6,500"  },
  { id:8,  name:"Priya Patel",      email:"priya@indotrade.in",      phone:"+91 98765 43210",  country:"🇮🇳 Indo",          product:"Engineering",    status:"Closed Lost", source:"Email",     date:"20 May 2025", value:"$3,000"  },
];

const STATUS_STYLE: Record<string,{bg:string,color:string}> = {
  "New":          { bg:"rgba(26,92,242,.10)",  color:"#1a5cf2" },
  "Contacted":    { bg:"rgba(245,158,11,.10)", color:"#d97706" },
  "Quoted":       { bg:"rgba(139,92,246,.10)", color:"#7c3aed" },
  "Negotiating":  { bg:"rgba(6,182,212,.10)",  color:"#0891b2" },
  "Closed Won":   { bg:"rgba(16,185,129,.10)", color:"#059669" },
  "Closed Lost":  { bg:"rgba(239,68,68,.10)",  color:"#dc2626" },
};

export default function LeadsPage() {
  const [stage,   setStage]   = useState("All");
  const [search,  setSearch]  = useState("");
  const [selected,setSelected]= useState<typeof LEADS[0]|null>(null);

  const filtered = LEADS.filter(l => {
    const matchStage  = stage === "All" || l.status === stage;
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
                        l.country.toLowerCase().includes(search.toLowerCase()) ||
                        l.product.toLowerCase().includes(search.toLowerCase());
    return matchStage && matchSearch;
  });

  return (
    <div style={{ display:"flex",flexDirection:"column" as const,gap:"1.5rem" }}>

      {/* Header */}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap" as const,gap:"1rem" }}>
        <div>
          <h2 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1.375rem",fontWeight:700,color:"#0f172a",marginBottom:".25rem" }}>Lead Management</h2>
          <p style={{ fontSize:".875rem",color:"#64748b" }}>{LEADS.length} total leads · {LEADS.filter(l=>l.status==="New").length} new</p>
        </div>
        <button style={{ display:"inline-flex",alignItems:"center",gap:6,padding:".75rem 1.25rem",borderRadius:"1rem",background:"linear-gradient(135deg,#1a5cf2,#3d7cf5)",color:"#fff",fontWeight:600,fontSize:".875rem",border:"none",cursor:"pointer",boxShadow:"0 4px 14px rgba(26,92,242,.30)" }}>
          <Plus style={{ width:16,height:16 }}/> Add Lead
        </button>
      </div>

      {/* Search + filter */}
      <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap" as const,alignItems:"center" }}>
        <div style={{ position:"relative",flex:1,minWidth:"200px" }}>
          <Search style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",width:15,height:15,color:"#94a3b8" }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search leads…"
            style={{ width:"100%",padding:".7rem 1rem .7rem 2.5rem",borderRadius:"1rem",border:"1.5px solid #e2e8f0",fontSize:".875rem",background:"#fff",outline:"none" }}/>
        </div>
        <span style={{ fontSize:".85rem",color:"#64748b" }}>{filtered.length} results</span>
      </div>

      {/* Stage tabs */}
      <div style={{ display:"flex",gap:".5rem",flexWrap:"wrap" as const }}>
        {STAGES.map(s=>{
          const count = s==="All" ? LEADS.length : LEADS.filter(l=>l.status===s).length;
          return (
            <button key={s} onClick={()=>setStage(s)} style={{
              padding:".45rem 1rem",borderRadius:99,fontSize:".8rem",fontWeight:600,
              border:"1.5px solid",cursor:"pointer",transition:"all .2s",
              background:stage===s?"#1a5cf2":"#fff",
              borderColor:stage===s?"#1a5cf2":"#e2e8f0",
              color:stage===s?"#fff":"#475569",
            }}>
              {s} {count > 0 && <span style={{ marginLeft:4,opacity:.7 }}>({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Leads table */}
      <div style={{ background:"#fff",borderRadius:"1.5rem",border:"1.5px solid #f1f5f9",boxShadow:"0 2px 12px rgba(0,0,0,.05)",overflow:"hidden" }}>
        <div style={{ overflowX:"auto" as const }}>
          <table style={{ width:"100%",borderCollapse:"collapse" as const }}>
            <thead>
              <tr style={{ background:"#f8faff",borderBottom:"1px solid #e2e8f0" }}>
                {["Lead","Country","Product","Value","Status","Source","Date","Actions"].map(h=>(
                  <th key={h} style={{ padding:".875rem 1rem",textAlign:"left" as const,fontSize:".72rem",fontWeight:700,color:"#94a3b8",textTransform:"uppercase" as const,letterSpacing:".06em",whiteSpace:"nowrap" as const }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((l,i)=>{
                const s = STATUS_STYLE[l.status] || STATUS_STYLE["New"];
                return (
                  <tr key={l.id} style={{ borderBottom:i<filtered.length-1?"1px solid #f1f5f9":"none",transition:"background .15s" }}
                    onMouseEnter={e=>(e.currentTarget.style.background="#f8faff")}
                    onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
                    <td style={{ padding:".875rem 1rem" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:".75rem" }}>
                        <div style={{ width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#1a5cf2,#3d7cf5)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:".8125rem",flexShrink:0 }}>
                          {l.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight:600,fontSize:".875rem",color:"#0f172a" }}>{l.name}</div>
                          <div style={{ fontSize:".75rem",color:"#94a3b8" }}>{l.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding:".875rem 1rem",fontSize:".875rem",color:"#475569",whiteSpace:"nowrap" as const }}>{l.country}</td>
                    <td style={{ padding:".875rem 1rem",fontSize:".875rem",color:"#475569" }}>{l.product}</td>
                    <td style={{ padding:".875rem 1rem",fontSize:".875rem",fontWeight:600,color:"#0f172a" }}>{l.value}</td>
                    <td style={{ padding:".875rem 1rem" }}>
                      <span style={{ fontSize:".72rem",fontWeight:700,padding:"3px 10px",borderRadius:99,background:s.bg,color:s.color,whiteSpace:"nowrap" as const }}>{l.status}</span>
                    </td>
                    <td style={{ padding:".875rem 1rem",fontSize:".8rem",color:"#64748b" }}>{l.source}</td>
                    <td style={{ padding:".875rem 1rem",fontSize:".8rem",color:"#94a3b8",whiteSpace:"nowrap" as const }}>{l.date}</td>
                    <td style={{ padding:".875rem 1rem" }}>
                      <div style={{ display:"flex",gap:".375rem" }}>
                        <button onClick={()=>setSelected(l)} title="View" style={{ width:30,height:30,borderRadius:".5rem",background:"rgba(26,92,242,.08)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s" }}
                          onMouseEnter={e=>(e.currentTarget.style.background="rgba(26,92,242,.18)")}
                          onMouseLeave={e=>(e.currentTarget.style.background="rgba(26,92,242,.08)")}>
                          <Eye style={{ width:13,height:13,color:"#1a5cf2" }}/>
                        </button>
                        <a href={`https://wa.me/${l.phone.replace(/[^0-9]/g,"")}`} target="_blank" rel="noopener noreferrer" title="WhatsApp"
                          style={{ width:30,height:30,borderRadius:".5rem",background:"rgba(37,211,102,.10)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none" }}>
                          <MessageCircle style={{ width:13,height:13,color:"#25D366" }}/>
                        </a>
                        <a href={`mailto:${l.email}`} title="Email"
                          style={{ width:30,height:30,borderRadius:".5rem",background:"rgba(245,158,11,.10)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none" }}>
                          <Mail style={{ width:13,height:13,color:"#d97706" }}/>
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead detail drawer */}
      {selected && (
        <div style={{ position:"fixed",inset:0,zIndex:100,display:"flex" }}>
          <div onClick={()=>setSelected(null)} style={{ flex:1,background:"rgba(0,0,0,.4)" }}/>
          <div style={{ width:"100%",maxWidth:"420px",background:"#fff",boxShadow:"-4px 0 40px rgba(0,0,0,.12)",overflowY:"auto" as const,padding:"1.75rem",display:"flex",flexDirection:"column" as const,gap:"1.25rem" }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1.125rem",fontWeight:700,color:"#0f172a" }}>Lead Details</h3>
              <button onClick={()=>setSelected(null)} style={{ width:32,height:32,borderRadius:"50%",background:"#f1f5f9",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <X style={{ width:16,height:16,color:"#475569" }}/>
              </button>
            </div>

            {/* Avatar + name */}
            <div style={{ display:"flex",alignItems:"center",gap:"1rem",padding:"1.25rem",background:"#f8faff",borderRadius:"1.25rem",border:"1px solid #e2e8f0" }}>
              <div style={{ width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#1a5cf2,#3d7cf5)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"1.25rem" }}>
                {selected.name[0]}
              </div>
              <div>
                <div style={{ fontFamily:"'Clash Display',sans-serif",fontWeight:700,fontSize:"1.0625rem",color:"#0f172a" }}>{selected.name}</div>
                <div style={{ fontSize:".8125rem",color:"#64748b",marginTop:2 }}>{selected.country}</div>
              </div>
            </div>

            {/* Details */}
            {[
              ["📧 Email",   selected.email],
              ["📞 Phone",   selected.phone],
              ["📦 Product", selected.product],
              ["💰 Value",   selected.value],
              ["🌐 Source",  selected.source],
              ["📅 Date",    selected.date],
            ].map(([l,v])=>(
              <div key={l} style={{ display:"flex",gap:".75rem",padding:".875rem",background:"#f8faff",borderRadius:".875rem",border:"1px solid #f1f5f9" }}>
                <span style={{ fontSize:".8rem",color:"#94a3b8",width:"90px",flexShrink:0 }}>{l}</span>
                <span style={{ fontSize:".875rem",fontWeight:500,color:"#1e293b" }}>{v}</span>
              </div>
            ))}

            {/* Status update */}
            <div>
              <label style={{ display:"block",fontSize:".75rem",fontWeight:600,color:"#64748b",marginBottom:6 }}>Update Status</label>
              <select defaultValue={selected.status} className="select-field">
                {STAGES.filter(s=>s!=="All").map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Action buttons */}
            <div style={{ display:"flex",gap:".75rem" }}>
              <a href={`https://wa.me/${selected.phone.replace(/[^0-9]/g,"")}`} target="_blank" rel="noopener noreferrer"
                style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:".75rem",borderRadius:"1rem",background:"#25D366",color:"#fff",fontWeight:600,fontSize:".875rem",textDecoration:"none" }}>
                <MessageCircle style={{ width:15,height:15 }}/> WhatsApp
              </a>
              <a href={`mailto:${selected.email}`}
                style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:".75rem",borderRadius:"1rem",background:"linear-gradient(135deg,#1a5cf2,#3d7cf5)",color:"#fff",fontWeight:600,fontSize:".875rem",textDecoration:"none" }}>
                <Mail style={{ width:15,height:15 }}/> Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}