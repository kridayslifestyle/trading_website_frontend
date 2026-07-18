"use client";
import { useState } from "react";
import { Search, ArrowRight, Zap } from "lucide-react";
import Reveal from "@/components/common/Reveal";

const COUNTRIES = ["India (Indo)","China","United States","Germany","United Arab Emirates","United Kingdom","Japan","Singapore","Australia","Canada","France","Italy","Brazil","South Korea","Netherlands","Saudi Arabia","Turkey","Indonesia","Mexico","South Africa"];
const PRODUCTS  = ["Masaz Chairs & Furniture","Clothing & Apparel","Engineering Tools & Machinery","Textiles & Apparel","Home Products"];
const TYPES     = ["Import","Export","Both (Import & Export)"];
const QUANTITIES= ["Below 100 units","100–500 units","500–1000 units","1000–5000 units","5000+ units"];

const EMPTY_FORM = {name:"",email:"",from:"",to:"",product:"",type:"",qty:""};

export default function TradeCalculator() {
  const [form,setForm]=useState(EMPTY_FORM);
  const [ok,setOk]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const set=(k:string)=>(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>setForm(p=>({...p,[k]:e.target.value}));
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim()) {
      setError("Please enter your name and email so our team can reach you.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          country: form.to,
          type: form.type,
          product: form.product,
          quantity: form.qty,
          message: `Quick trade enquiry — Origin: ${form.from || "Not specified"}, Destination: ${form.to || "Not specified"}.`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to submit enquiry");
      }

      setOk(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{
      background:"linear-gradient(135deg,#020e47 0%,#0e37b0 50%,#1a5cf2 100%)",
      padding:"3rem 0 4rem",
      position:"relative",
      overflow:"hidden",
      marginTop:"-2px",
    }}>
      {/* dot grid overlay */}
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}/>
      {/* glow orbs */}
      <div style={{position:"absolute",top:"-60px",right:"-60px",width:"300px",height:"300px",borderRadius:"50%",background:"radial-gradient(circle,rgba(245,200,66,.12) 0%,transparent 70%)",filter:"blur(40px)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-40px",left:"-40px",width:"250px",height:"250px",borderRadius:"50%",background:"radial-gradient(circle,rgba(26,92,242,.25) 0%,transparent 70%)",filter:"blur(50px)",pointerEvents:"none"}}/>

      <div className="container-custom" style={{position:"relative",zIndex:1}}>
        {/* heading */}
        <Reveal style={{textAlign:"center",marginBottom:"2rem"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:99,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",color:"rgba(191,219,254,1)",fontSize:".72rem",fontWeight:600,letterSpacing:".08em",textTransform:"uppercase",marginBottom:"1rem"}}>
            <Zap style={{width:13,height:13,color:"#f5c842"}} fill="#f5c842" /> Quick Trade Enquiry
          </div>
          <h2 style={{fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(1.5rem,3vw,2rem)",fontWeight:700,color:"#fff",marginBottom:".5rem",letterSpacing:"-.02em"}}>
            Get Your Free Trade Quote
          </h2>
          <p style={{color:"rgba(147,197,253,.85)",fontSize:".9rem"}}>
            Fill in your trade details and our team will respond within 24 hours.
          </p>
        </Reveal>

        {/* card */}
        <Reveal delay={0.1}>
        <div style={{
          background:"rgba(255,255,255,.06)",
          backdropFilter:"blur(24px)",
          WebkitBackdropFilter:"blur(24px)",
          border:"1px solid rgba(255,255,255,.14)",
          borderRadius:"1.5rem",
          padding:"2rem 2.5rem",
          boxShadow:"0 20px 60px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.10)",
          position:"relative",overflow:"hidden",
        }}>
          {/* top shimmer line */}
          <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:"linear-gradient(90deg,#1a5cf2,#3d7cf5,#f5c842,#3d7cf5,#1a5cf2)",backgroundSize:"200% 100%",animation:"shimmer 3s linear infinite"}}/>

          {ok ? (
            <div style={{textAlign:"center",padding:"2rem 0"}}>
              <div style={{fontSize:"3rem",marginBottom:"1rem"}}>✅</div>
              <p style={{color:"#fff",fontWeight:700,fontSize:"1.1rem",marginBottom:".5rem"}}>Enquiry Submitted!</p>
              <p style={{color:"rgba(147,197,253,.8)",fontSize:".875rem"}}>Our team will contact you within 24 hours.</p>
              <button onClick={()=>{setOk(false);setForm(EMPTY_FORM)}}
                style={{marginTop:"1rem",color:"rgba(147,197,253,.8)",fontSize:".8rem",textDecoration:"underline",background:"none",border:"none",cursor:"pointer"}}>
                Submit another
              </button>
            </div>
          ):(
            <form onSubmit={submit}>
              <div style={{display:"grid",gap:"1rem",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",alignItems:"end"}}>

                {/* Name + Email — required so our team can actually respond */}
                <div>
                  <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:"rgba(147,197,253,.9)",marginBottom:".4rem",letterSpacing:".05em",textTransform:"uppercase"}}>
                    👤  Your Name
                  </label>
                  <input
                    value={form.name}
                    onChange={set("name")}
                    placeholder="John Smith"
                    style={{
                      width:"100%",padding:".7rem 1rem",borderRadius:".875rem",
                      background:"rgba(255,255,255,.10)",border:"1px solid rgba(255,255,255,.18)",
                      color:"#fff",fontSize:".875rem",outline:"none",
                      transition:"background .2s,border-color .2s",
                    }}
                    onFocus={e=>{e.target.style.background="rgba(255,255,255,.15)";e.target.style.borderColor="rgba(61,124,245,.8)";}}
                    onBlur={e=>{e.target.style.background="rgba(255,255,255,.10)";e.target.style.borderColor="rgba(255,255,255,.18)";}}
                  />
                </div>
                <div>
                  <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:"rgba(147,197,253,.9)",marginBottom:".4rem",letterSpacing:".05em",textTransform:"uppercase"}}>
                    ✉️  Your Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="john@company.com"
                    style={{
                      width:"100%",padding:".7rem 1rem",borderRadius:".875rem",
                      background:"rgba(255,255,255,.10)",border:"1px solid rgba(255,255,255,.18)",
                      color:"#fff",fontSize:".875rem",outline:"none",
                      transition:"background .2s,border-color .2s",
                    }}
                    onFocus={e=>{e.target.style.background="rgba(255,255,255,.15)";e.target.style.borderColor="rgba(61,124,245,.8)";}}
                    onBlur={e=>{e.target.style.background="rgba(255,255,255,.10)";e.target.style.borderColor="rgba(255,255,255,.18)";}}
                  />
                </div>

                {[
                  {label:"🌍  Origin Country",  key:"from", opts:COUNTRIES, ph:"Select origin…"},
                  {label:"📍  Destination",      key:"to",   opts:COUNTRIES, ph:"Select destination…"},
                  {label:"📦  Product Type",     key:"product",opts:PRODUCTS,ph:"Select product…"},
                  {label:"🔄  Trade Type",       key:"type", opts:TYPES,     ph:"Import / Export…"},
                  {label:"📊  Quantity Range",   key:"qty",  opts:QUANTITIES, ph:"Select quantity…"},
                ].map(({label,key,opts,ph})=>(
                  <div key={key}>
                    <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:"rgba(147,197,253,.9)",marginBottom:".4rem",letterSpacing:".05em",textTransform:"uppercase"}}>
                      {label}
                    </label>
                    <div style={{position:"relative"}}>
                      <select
                        value={(form as any)[key]}
                        onChange={set(key)}
                        style={{
                          width:"100%",padding:".7rem 2.5rem .7rem 1rem",borderRadius:".875rem",
                          background:"rgba(255,255,255,.10)",border:"1px solid rgba(255,255,255,.18)",
                          color:"#fff",fontSize:".875rem",cursor:"pointer",appearance:"none",
                          transition:"background .2s,border-color .2s",outline:"none",
                        }}
                        onFocus={e=>{e.target.style.background="rgba(255,255,255,.15)";e.target.style.borderColor="rgba(61,124,245,.8)";}}
                        onBlur={e=>{e.target.style.background="rgba(255,255,255,.10)";e.target.style.borderColor="rgba(255,255,255,.18)";}}
                      >
                        <option value="" style={{background:"#0e37b0"}}>{ph}</option>
                        {opts.map(o=><option key={o} value={o} style={{background:"#0e37b0"}}>{o}</option>)}
                      </select>
                      {/* chevron */}
                      <svg style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}} width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 3.5L5 6.5L8 3.5" stroke="rgba(147,197,253,.8)" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                ))}

                {error && (
                  <div style={{
                    gridColumn:"1 / -1",
                    display:"flex",alignItems:"center",gap:8,
                    color:"#fca5a5",fontSize:".8rem",
                    background:"rgba(239,68,68,.10)",border:"1px solid rgba(239,68,68,.25)",
                    borderRadius:".75rem",padding:".65rem 1rem",
                  }}>
                    ⚠️ {error}
                  </div>
                )}

                {/* Submit button */}
                <div>
                  <label style={{display:"block",fontSize:".7rem",color:"transparent",marginBottom:".4rem"}}>x</label>
                  <button type="submit" disabled={loading} style={{
                    width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                    padding:".75rem 1.5rem",borderRadius:".875rem",border:"none",cursor:"pointer",
                    background:"linear-gradient(135deg,#f5c842,#e6b800)",color:"#020e47",
                    fontWeight:700,fontSize:".875rem",
                    boxShadow:"0 4px 18px rgba(230,184,0,.40)",
                    transition:"all .2s",
                  }}
                  onMouseEnter={e=>(e.currentTarget.style.transform="translateY(-1px)")}
                  onMouseLeave={e=>(e.currentTarget.style.transform="translateY(0)")}>
                    {loading ? (
                      <><span style={{width:15,height:15,border:"2px solid rgba(2,14,71,.3)",borderTopColor:"#020e47",borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite"}}/> Processing…</>
                    ):(
                      <><Search style={{width:15,height:15}}/> Get Free Quote <ArrowRight style={{width:15,height:15}}/></>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
        </Reveal>
      </div>
    </section>
  );
}