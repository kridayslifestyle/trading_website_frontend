"use client";

const FEATURED = [
  {
    flag:"🇮🇳",
    code:"Indo",
    name:"India (Indo)",
    tagline:"Primary Trade Hub",
    cities:["Mumbai · Delhi · Chennai","Hyderabad · Bengaluru","Kolkata · Ahmedabad"],
    highlight:"Textiles, Chemicals, Engineering",
    accentColor:"#3b82f6",
    glowColor:"rgba(59,130,246,.25)",
  },
  {
    flag:"🇨🇳",
    code:"China",
    name:"China",
    tagline:"Manufacturing Powerhouse",
    cities:["Shanghai · Shenzhen","Guangzhou · Beijing","Yiwu · Zhejiang"],
    highlight:"Furniture, Electronics, Machinery",
    accentColor:"#ef4444",
    glowColor:"rgba(239,68,68,.20)",
  },
];

const REGIONS = [
  { emoji:"🌍", name:"Middle East",  color:"#f59e0b", countries:["🇦🇪 UAE","🇸🇦 Saudi Arabia","🇶🇦 Qatar","🇰🇼 Kuwait"] },
  { emoji:"🌍", name:"Europe",       color:"#10b981", countries:["🇩🇪 Germany","🇬🇧 UK","🇳🇱 Netherlands","🇮🇹 Italy"] },
  { emoji:"🌎", name:"Americas",     color:"#8b5cf6", countries:["🇺🇸 USA","🇨🇦 Canada","🇧🇷 Brazil","🇲🇽 Mexico"] },
  { emoji:"🌏", name:"Asia Pacific", color:"#06b6d4", countries:["🇯🇵 Japan","🇸🇬 Singapore","🇹🇭 Thailand","🇻🇳 Vietnam"] },
];

export default function GlobalPresence() {
  return (
    <section style={{
      background:"linear-gradient(160deg,#020e47 0%,#041a6e 50%,#0a2d96 100%)",
      padding:"5rem 0",
      position:"relative",overflow:"hidden",
    }}>
      {/* dot grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.055) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}/>
      {/* top glow */}
      <div style={{position:"absolute",top:"-80px",left:"50%",transform:"translateX(-50%)",width:"600px",height:"200px",background:"radial-gradient(ellipse,rgba(26,92,242,.25) 0%,transparent 70%)",filter:"blur(40px)",pointerEvents:"none"}}/>

      <div className="container-custom" style={{position:"relative",zIndex:1}}>

        {/* Header */}
        <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:99,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",color:"rgba(191,219,254,1)",fontSize:".72rem",fontWeight:600,letterSpacing:".08em",textTransform:"uppercase",marginBottom:"1rem"}}>
            🌐 Our Global Presence
          </div>
          <h2 style={{fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(1.75rem,3.5vw,2.5rem)",fontWeight:700,color:"#fff",marginBottom:".75rem",letterSpacing:"-.025em"}}>
            Primarily{" "}
            <span style={{background:"linear-gradient(90deg,#f5c842,#e6b800)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
              Indo &amp; China
            </span>
            {" "}— Worldwide Reach
          </h2>
          <p style={{color:"rgba(147,197,253,.85)",fontSize:"1.05rem",maxWidth:"560px",margin:"0 auto",lineHeight:1.7}}>
            Our core operations are rooted in India and China — the world's biggest manufacturing
            and export hubs — with active trade in 80+ countries.
          </p>
        </div>

        {/* ── Featured: Indo + China ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.25rem",marginBottom:"1.25rem"}}>
          {FEATURED.map(({flag,code,name,tagline,cities,highlight,accentColor,glowColor})=>(
            <div key={name} style={{
              background:`linear-gradient(135deg,rgba(255,255,255,.10) 0%,rgba(255,255,255,.04) 100%)`,
              border:`1.5px solid ${accentColor}55`,
              borderRadius:"1.5rem",padding:"2rem",
              boxShadow:`0 0 40px ${glowColor}, inset 0 1px 0 rgba(255,255,255,.10)`,
              backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",
              transition:"transform .25s ease",
              position:"relative",overflow:"hidden",
            }}
            onMouseEnter={e=>(e.currentTarget.style.transform="translateY(-5px)")}
            onMouseLeave={e=>(e.currentTarget.style.transform="translateY(0)")}>
              {/* glow blob */}
              <div style={{position:"absolute",top:"-30px",right:"-30px",width:"120px",height:"120px",borderRadius:"50%",background:`radial-gradient(circle,${glowColor} 0%,transparent 70%)`,filter:"blur(20px)",pointerEvents:"none"}}/>

              {/* Primary badge */}
              <div style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 12px",borderRadius:99,background:`${accentColor}22`,border:`1px solid ${accentColor}55`,color:accentColor,fontSize:".68rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",marginBottom:"1rem"}}>
                ⭐ Primary Hub
              </div>

              {/* Flag + name */}
              <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.25rem"}}>
                <span style={{fontSize:"3.5rem",lineHeight:1}}>{flag}</span>
                <div>
                  <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:"1.3rem",fontWeight:700,color:"#fff"}}>{name}</div>
                  <div style={{fontSize:".8rem",color:accentColor,marginTop:"2px"}}>{tagline}</div>
                </div>
              </div>

              {/* Cities */}
              <div style={{marginBottom:"1.25rem",display:"flex",flexDirection:"column" as const,gap:"6px"}}>
                {cities.map(c=>(
                  <div key={c} style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{width:6,height:6,borderRadius:"50%",background:accentColor,flexShrink:0,boxShadow:`0 0 6px ${accentColor}`}}/>
                    <span style={{fontSize:".875rem",color:"rgba(191,219,254,.9)"}}>{c}</span>
                  </div>
                ))}
              </div>

              {/* Highlight tag */}
              <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:99,background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",fontSize:".75rem",color:"rgba(191,219,254,.85)"}}>
                📦 {highlight}
              </div>
            </div>
          ))}
        </div>

        {/* ── Other Regions ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1rem"}}>
          {REGIONS.map(({emoji,name,color,countries})=>(
            <div key={name} style={{
              background:"rgba(255,255,255,.04)",
              border:"1px solid rgba(255,255,255,.08)",
              borderRadius:"1.25rem",padding:"1.5rem",
              backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",
              transition:"background .2s,border-color .2s,transform .2s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.08)";e.currentTarget.style.borderColor=`${color}44`;e.currentTarget.style.transform="translateY(-4px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.04)";e.currentTarget.style.borderColor="rgba(255,255,255,.08)";e.currentTarget.style.transform="translateY(0)";}}>

              {/* Icon circle */}
              <div style={{width:44,height:44,borderRadius:"50%",background:`${color}18`,border:`1px solid ${color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem",marginBottom:"1rem"}}>
                {emoji}
              </div>

              <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:"1rem",fontWeight:600,color:"#fff",marginBottom:".875rem"}}>{name}</div>

              <div style={{display:"flex",flexDirection:"column" as const,gap:"6px"}}>
                {countries.map(c=>(
                  <div key={c} style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{width:5,height:5,borderRadius:"50%",background:`${color}99`,flexShrink:0}}/>
                    <span style={{fontSize:".8125rem",color:"rgba(147,197,253,.8)"}}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

