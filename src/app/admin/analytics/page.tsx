"use client";
import { TrendingUp, TrendingDown, Users, MessageSquare, Globe, Package } from "lucide-react";

const MONTHLY = [
  { month:"Jan", leads:18, inquiries:12 },
  { month:"Feb", leads:24, inquiries:18 },
  { month:"Mar", leads:30, inquiries:22 },
  { month:"Apr", leads:28, inquiries:20 },
  { month:"May", leads:42, inquiries:34 },
  { month:"Jun", leads:38, inquiries:28 },
];

const COUNTRIES = [
  { flag:"🇩🇪", name:"Germany",     leads:42, pct:17 },
  { flag:"🇺🇸", name:"USA",         leads:38, pct:15 },
  { flag:"🇦🇪", name:"UAE",         leads:35, pct:14 },
  { flag:"🇯🇵", name:"Japan",       leads:28, pct:11 },
  { flag:"🇨🇳", name:"China",       leads:25, pct:10 },
  { flag:"🇬🇧", name:"UK",          leads:20, pct:8  },
  { flag:"🇧🇷", name:"Brazil",      leads:18, pct:7  },
  { flag:"Others",name:"Others",     leads:42, pct:18 },
];

const PRODUCTS_PERF = [
  { emoji:"🪑", name:"Masaz Chairs",   inquiries:68, revenue:"$124,000", pct:32 },
  { emoji:"👗", name:"Clothing",       inquiries:52, revenue:"$86,000",  pct:24 },
  { emoji:"⚙️", name:"Engineering",   inquiries:45, revenue:"$210,000", pct:21 },
  { emoji:"🧵", name:"Textiles",       inquiries:38, revenue:"$74,000",  pct:17 },
  { emoji:"🏠", name:"Home Products",  inquiries:28, revenue:"$42,000",  pct:13 },
];

const maxLeads = Math.max(...MONTHLY.map(m=>m.leads));

export default function AnalyticsPage() {
  return (
    <div style={{ display:"flex",flexDirection:"column" as const,gap:"1.5rem" }}>

      {/* KPI cards */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"1rem" }}>
        {[
          { label:"Total Leads",     value:"248",  change:"+12%", up:true,  icon:Users,         color:"#1a5cf2" },
          { label:"Total Inquiries", value:"231",  change:"+18%", up:true,  icon:MessageSquare, color:"#10b981" },
          { label:"Countries",       value:"28",   change:"+3",   up:true,  icon:Globe,         color:"#8b5cf6" },
          { label:"Conv. Rate",      value:"14.2%",change:"+2.1%",up:true,  icon:TrendingUp,    color:"#f59e0b" },
        ].map(({ label,value,change,up,icon:Icon,color })=>(
          <div key={label} style={{ background:"#fff",borderRadius:"1.25rem",padding:"1.5rem",border:"1.5px solid #f1f5f9",boxShadow:"0 2px 12px rgba(0,0,0,.05)" }}>
            <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:".875rem" }}>
              <div style={{ width:40,height:40,borderRadius:".875rem",background:`${color}10`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <Icon style={{ width:18,height:18,color }}/>
              </div>
              <span style={{ fontSize:".72rem",fontWeight:700,color:up?"#10b981":"#ef4444",background:up?"rgba(16,185,129,.08)":"rgba(239,68,68,.08)",padding:"2px 8px",borderRadius:99,display:"flex",alignItems:"center",gap:2 }}>
                {up?<TrendingUp style={{width:10,height:10}}/>:<TrendingDown style={{width:10,height:10}}/>}
                {change}
              </span>
            </div>
            <div style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1.75rem",fontWeight:700,color:"#0f172a",lineHeight:1,marginBottom:".25rem" }}>{value}</div>
            <div style={{ fontSize:".8rem",color:"#64748b" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Bar chart + country breakdown */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.5rem" }}>

        {/* Bar chart */}
        <div style={{ background:"#fff",borderRadius:"1.5rem",padding:"1.5rem",border:"1.5px solid #f1f5f9",boxShadow:"0 2px 12px rgba(0,0,0,.05)" }}>
          <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1rem",fontWeight:700,color:"#0f172a",marginBottom:".25rem" }}>Leads & Inquiries</h3>
          <p style={{ fontSize:".8rem",color:"#94a3b8",marginBottom:"1.5rem" }}>Last 6 months</p>

          <div style={{ display:"flex",alignItems:"flex-end",gap:".625rem",height:"160px" }}>
            {MONTHLY.map(({ month,leads,inquiries })=>(
              <div key={month} style={{ flex:1,display:"flex",flexDirection:"column" as const,alignItems:"center",gap:4,height:"100%" }}>
                <div style={{ flex:1,display:"flex",flexDirection:"column" as const,justifyContent:"flex-end",gap:3,width:"100%" }}>
                  <div title={`Leads: ${leads}`} style={{ width:"100%",height:`${(leads/maxLeads)*100}%`,background:"linear-gradient(180deg,#3d7cf5,#1a5cf2)",borderRadius:"4px 4px 0 0",minHeight:4,transition:"height .5s ease" }}/>
                  <div title={`Inquiries: ${inquiries}`} style={{ width:"100%",height:`${(inquiries/maxLeads)*80}%`,background:"linear-gradient(180deg,#6ee7b7,#10b981)",borderRadius:"4px 4px 0 0",minHeight:4,transition:"height .5s ease" }}/>
                </div>
                <span style={{ fontSize:".65rem",color:"#94a3b8",fontWeight:600 }}>{month}</span>
              </div>
            ))}
          </div>

          <div style={{ display:"flex",gap:"1.5rem",marginTop:"1rem",paddingTop:"1rem",borderTop:"1px solid #f1f5f9" }}>
            <div style={{ display:"flex",alignItems:"center",gap:6 }}>
              <div style={{ width:10,height:10,borderRadius:2,background:"#1a5cf2" }}/>
              <span style={{ fontSize:".75rem",color:"#64748b" }}>Leads</span>
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:6 }}>
              <div style={{ width:10,height:10,borderRadius:2,background:"#10b981" }}/>
              <span style={{ fontSize:".75rem",color:"#64748b" }}>Inquiries</span>
            </div>
          </div>
        </div>

        {/* Country breakdown */}
        <div style={{ background:"#fff",borderRadius:"1.5rem",padding:"1.5rem",border:"1.5px solid #f1f5f9",boxShadow:"0 2px 12px rgba(0,0,0,.05)" }}>
          <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1rem",fontWeight:700,color:"#0f172a",marginBottom:".25rem" }}>Leads by Country</h3>
          <p style={{ fontSize:".8rem",color:"#94a3b8",marginBottom:"1.25rem" }}>Top markets</p>
          <div style={{ display:"flex",flexDirection:"column" as const,gap:".75rem" }}>
            {COUNTRIES.map(({ flag,name,leads,pct })=>(
              <div key={name}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                  <span style={{ fontSize:".8125rem",color:"#475569",display:"flex",alignItems:"center",gap:6 }}>
                    <span>{flag}</span>{name}
                  </span>
                  <span style={{ fontSize:".8125rem",fontWeight:600,color:"#0f172a" }}>{leads}</span>
                </div>
                <div style={{ height:6,borderRadius:3,background:"#f1f5f9",overflow:"hidden" }}>
                  <div style={{ height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#1a5cf2,#3d7cf5)",borderRadius:3,transition:"width .6s ease" }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product performance */}
      <div style={{ background:"#fff",borderRadius:"1.5rem",padding:"1.5rem",border:"1.5px solid #f1f5f9",boxShadow:"0 2px 12px rgba(0,0,0,.05)" }}>
        <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1rem",fontWeight:700,color:"#0f172a",marginBottom:"1.25rem" }}>Product Performance</h3>
        <div style={{ overflowX:"auto" as const }}>
          <table style={{ width:"100%",borderCollapse:"collapse" as const }}>
            <thead>
              <tr style={{ background:"#f8faff" }}>
                {["Product","Inquiries","Revenue","Share"].map(h=>(
                  <th key={h} style={{ padding:".75rem 1rem",textAlign:"left" as const,fontSize:".72rem",fontWeight:700,color:"#94a3b8",textTransform:"uppercase" as const,letterSpacing:".06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS_PERF.map(({ emoji,name,inquiries,revenue,pct })=>(
                <tr key={name} style={{ borderTop:"1px solid #f1f5f9" }}>
                  <td style={{ padding:".875rem 1rem" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:".625rem" }}>
                      <span style={{ fontSize:"1.25rem" }}>{emoji}</span>
                      <span style={{ fontWeight:600,fontSize:".875rem",color:"#1e293b" }}>{name}</span>
                    </div>
                  </td>
                  <td style={{ padding:".875rem 1rem",fontSize:".875rem",color:"#475569" }}>{inquiries}</td>
                  <td style={{ padding:".875rem 1rem",fontSize:".875rem",fontWeight:600,color:"#0f172a" }}>{revenue}</td>
                  <td style={{ padding:".875rem 1rem",width:"200px" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:".75rem" }}>
                      <div style={{ flex:1,height:6,borderRadius:3,background:"#f1f5f9",overflow:"hidden" }}>
                        <div style={{ height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#1a5cf2,#3d7cf5)",borderRadius:3 }}/>
                      </div>
                      <span style={{ fontSize:".75rem",fontWeight:600,color:"#64748b",width:30 }}>{pct}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}