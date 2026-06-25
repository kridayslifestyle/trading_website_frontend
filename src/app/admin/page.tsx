"use client";
import Link from "next/link";
import { TrendingUp, Users, MessageSquare, Package, ArrowRight, ArrowUpRight, Clock, Globe, CheckCircle, AlertCircle } from "lucide-react";

const STATS = [
  { label:"Total Leads",      value:"248",  change:"+12%", up:true,  icon:Users,         color:"#1a5cf2", bg:"rgba(26,92,242,.08)",  href:"/admin/leads"     },
  { label:"New Inquiries",    value:"34",   change:"+8%",  up:true,  icon:MessageSquare, color:"#10b981", bg:"rgba(16,185,129,.08)", href:"/admin/inquiries" },
  { label:"Products Listed",  value:"15",   change:"+2",   up:true,  icon:Package,       color:"#8b5cf6", bg:"rgba(139,92,246,.08)", href:"/admin/products"  },
  { label:"Countries Reached",value:"28",   change:"+3",   up:true,  icon:Globe,         color:"#f59e0b", bg:"rgba(245,158,11,.08)", href:"/admin/analytics" },
];

const RECENT_LEADS = [
  { name:"Klaus Meier",     country:"🇩🇪 Germany",   product:"Masaz Chairs",    status:"New",        time:"2 min ago"  },
  { name:"Sarah Johnson",   country:"🇺🇸 USA",        product:"Clothing",        status:"Contacted",  time:"1 hr ago"   },
  { name:"Ahmed Al-Rashid", country:"🇦🇪 UAE",        product:"Home Products",   status:"Quoted",     time:"3 hr ago"   },
  { name:"Yuki Tanaka",     country:"🇯🇵 Japan",      product:"Machinery",       status:"New",        time:"5 hr ago"   },
  { name:"Li Wei",          country:"🇨🇳 China",      product:"Textiles",        status:"Closed",     time:"Yesterday"  },
];

const STATUS_STYLE: Record<string,{bg:string,color:string}> = {
  "New":       { bg:"rgba(26,92,242,.10)",   color:"#1a5cf2"  },
  "Contacted": { bg:"rgba(245,158,11,.10)",  color:"#d97706"  },
  "Quoted":    { bg:"rgba(139,92,246,.10)",  color:"#7c3aed"  },
  "Closed":    { bg:"rgba(16,185,129,.10)",  color:"#059669"  },
};

const QUICK_ACTIONS = [
  { emoji:"➕", label:"Add Product",     href:"/admin/products",  color:"#1a5cf2" },
  { emoji:"✍️", label:"Write Blog Post", href:"/admin/blog",      color:"#8b5cf6" },
  { emoji:"📊", label:"View Analytics",  href:"/admin/analytics", color:"#10b981" },
  { emoji:"📱", label:"Social Post",     href:"/admin/social",    color:"#f59e0b" },
];

const ACTIVITY = [
  { icon:"📩", text:"New inquiry from Germany — Masaz Chairs",   time:"2 min ago",  color:"#1a5cf2" },
  { icon:"✅", text:"Lead Klaus Meier marked as Quoted",          time:"1 hr ago",   color:"#10b981" },
  { icon:"📝", text:"Blog post 'Export Guide 2025' published",    time:"3 hr ago",   color:"#8b5cf6" },
  { icon:"💬", text:"WhatsApp message from +971 50 XXX XXXX",    time:"5 hr ago",   color:"#f59e0b" },
  { icon:"📦", text:"Product 'Luxury Massage Chair' updated",     time:"Yesterday",  color:"#06b6d4" },
];

export default function AdminDashboard() {
  return (
    <div style={{ display:"flex",flexDirection:"column" as const,gap:"1.5rem" }}>

      {/* Welcome bar */}
      <div style={{ background:"linear-gradient(135deg,#020e47,#0e37b0)",borderRadius:"1.5rem",padding:"1.75rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap" as const,gap:"1rem",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px)",backgroundSize:"24px 24px",pointerEvents:"none" }}/>
        <div style={{ position:"relative",zIndex:1 }}>
          <h2 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1.375rem",fontWeight:700,color:"#fff",marginBottom:".25rem" }}>
            Good morning, Admin 👋
          </h2>
          <p style={{ color:"rgba(147,197,253,.85)",fontSize:".875rem" }}>
            You have <strong style={{ color:"#f5c842" }}>5 new inquiries</strong> and <strong style={{ color:"#f5c842" }}>12 new leads</strong> since yesterday.
          </p>
        </div>
        <Link href="/admin/inquiries" style={{ display:"inline-flex",alignItems:"center",gap:6,padding:".75rem 1.5rem",borderRadius:"1rem",background:"linear-gradient(135deg,#f5c842,#e6b800)",color:"#020e47",fontWeight:700,fontSize:".875rem",textDecoration:"none",position:"relative",zIndex:1 }}>
          View Inquiries <ArrowRight style={{ width:15,height:15 }}/>
        </Link>
      </div>

      {/* Stats grid */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"1rem" }}>
        {STATS.map(({ label,value,change,up,icon:Icon,color,bg,href })=>(
          <Link key={label} href={href} style={{ display:"block",background:"#fff",borderRadius:"1.25rem",padding:"1.5rem",border:"1.5px solid #f1f5f9",boxShadow:"0 2px 12px rgba(0,0,0,.05)",textDecoration:"none",transition:"transform .25s,box-shadow .25s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 28px rgba(26,92,242,.10)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,.05)";}}>
            <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"1rem" }}>
              <div style={{ width:44,height:44,borderRadius:"1rem",background:bg,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <Icon style={{ width:20,height:20,color }}/>
              </div>
              <span style={{ display:"inline-flex",alignItems:"center",gap:3,fontSize:".72rem",fontWeight:700,color:up?"#10b981":"#ef4444",background:up?"rgba(16,185,129,.08)":"rgba(239,68,68,.08)",padding:"2px 8px",borderRadius:99 }}>
                <TrendingUp style={{ width:10,height:10 }}/>{change}
              </span>
            </div>
            <div style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1.875rem",fontWeight:700,color:"#0f172a",lineHeight:1,marginBottom:".25rem" }}>{value}</div>
            <div style={{ fontSize:".8125rem",color:"#64748b" }}>{label}</div>
          </Link>
        ))}
      </div>

      {/* Two column: recent leads + activity */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.5rem" }}>

        {/* Recent Leads */}
        <div style={{ background:"#fff",borderRadius:"1.5rem",padding:"1.5rem",border:"1.5px solid #f1f5f9",boxShadow:"0 2px 12px rgba(0,0,0,.05)" }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem" }}>
            <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1rem",fontWeight:700,color:"#0f172a" }}>Recent Leads</h3>
            <Link href="/admin/leads" style={{ fontSize:".75rem",color:"#1a5cf2",fontWeight:600,display:"flex",alignItems:"center",gap:3,textDecoration:"none" }}>
              View all <ArrowRight style={{ width:12,height:12 }}/>
            </Link>
          </div>
          <div style={{ display:"flex",flexDirection:"column" as const,gap:".75rem" }}>
            {RECENT_LEADS.map(({ name,country,product,status,time })=>{
              const s = STATUS_STYLE[status] || STATUS_STYLE["New"];
              return (
                <div key={name} style={{ display:"flex",alignItems:"center",gap:".875rem",padding:".875rem",borderRadius:"1rem",background:"#f8faff",border:"1px solid #f1f5f9",transition:"border-color .2s" }}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(26,92,242,.15)")}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor="#f1f5f9")}>
                  <div style={{ width:38,height:38,borderRadius:"50%",background:"linear-gradient(135deg,#1a5cf2,#3d7cf5)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:".875rem",flexShrink:0 }}>
                    {name[0]}
                  </div>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontWeight:600,color:"#0f172a",fontSize:".875rem",marginBottom:2 }}>{name}</div>
                    <div style={{ fontSize:".75rem",color:"#64748b",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" as const }}>{country} · {product}</div>
                  </div>
                  <div style={{ display:"flex",flexDirection:"column" as const,alignItems:"flex-end",gap:4,flexShrink:0 }}>
                    <span style={{ fontSize:".68rem",fontWeight:700,padding:"2px 8px",borderRadius:99,background:s.bg,color:s.color }}>{status}</span>
                    <span style={{ fontSize:".68rem",color:"#94a3b8",display:"flex",alignItems:"center",gap:3 }}><Clock style={{ width:9,height:9 }}/>{time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display:"flex",flexDirection:"column" as const,gap:"1.25rem" }}>

          {/* Quick actions */}
          <div style={{ background:"#fff",borderRadius:"1.5rem",padding:"1.5rem",border:"1.5px solid #f1f5f9",boxShadow:"0 2px 12px rgba(0,0,0,.05)" }}>
            <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1rem",fontWeight:700,color:"#0f172a",marginBottom:"1rem" }}>Quick Actions</h3>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:".75rem" }}>
              {QUICK_ACTIONS.map(({ emoji,label,href,color })=>(
                <Link key={label} href={href} style={{ display:"flex",alignItems:"center",gap:".625rem",padding:".875rem",borderRadius:"1rem",background:`${color}08`,border:`1.5px solid ${color}18`,textDecoration:"none",transition:"all .2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.background=`${color}14`;e.currentTarget.style.borderColor=`${color}35`;e.currentTarget.style.transform="translateY(-2px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background=`${color}08`;e.currentTarget.style.borderColor=`${color}18`;e.currentTarget.style.transform="translateY(0)";}}>
                  <span style={{ fontSize:"1.25rem" }}>{emoji}</span>
                  <span style={{ fontSize:".8125rem",fontWeight:600,color:"#1e293b" }}>{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div style={{ background:"#fff",borderRadius:"1.5rem",padding:"1.5rem",border:"1.5px solid #f1f5f9",boxShadow:"0 2px 12px rgba(0,0,0,.05)",flex:1 }}>
            <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1rem",fontWeight:700,color:"#0f172a",marginBottom:"1rem" }}>Recent Activity</h3>
            <div style={{ display:"flex",flexDirection:"column" as const,gap:".75rem" }}>
              {ACTIVITY.map(({ icon,text,time,color },i)=>(
                <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:".75rem" }}>
                  <div style={{ width:32,height:32,borderRadius:"50%",background:`${color}12`,border:`1px solid ${color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".875rem",flexShrink:0 }}>
                    {icon}
                  </div>
                  <div style={{ flex:1,minWidth:0 }}>
                    <p style={{ fontSize:".8125rem",color:"#475569",lineHeight:1.5,margin:0 }}>{text}</p>
                    <span style={{ fontSize:".7rem",color:"#94a3b8",display:"flex",alignItems:"center",gap:3,marginTop:3 }}><Clock style={{ width:9,height:9 }}/>{time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}