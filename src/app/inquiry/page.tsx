"use client";
import { useState } from "react";
import { Send, CheckCircle, Zap, ShieldCheck, Clock } from "lucide-react";

const PRODUCTS  = ["Masaz Chairs & Furniture","Clothing & Apparel","Engineering Tools & Machinery","Textiles & Apparel","Home Products"];
const TYPES     = ["Import","Export","Supplier Sourcing","Trade Consulting","Logistics Support"];
const COUNTRIES = ["India (Indo)","China","United States","Germany","UAE","United Kingdom","Japan","Singapore","Australia","Canada","France","Brazil","South Korea","Saudi Arabia","Other"];
const QUANTITIES= ["Below 100 units","100–500 units","500–1000 units","1000–5000 units","5000+ units","Custom"];

export default function InquiryPage() {
  const [form,setForm]=useState({ name:"",company:"",email:"",phone:"",country:"",type:"",product:"",quantity:"",budget:"",message:"" });
  const [ok,setOk]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const ch=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>
    setForm(p=>({...p,[e.target.name]:e.target.value}));
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();setLoading(true);setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(()=>({}));
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setOk(true);
      setForm({ name:"",company:"",email:"",phone:"",country:"",type:"",product:"",quantity:"",budget:"",message:"" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop:"80px",background:"#f8faff",minHeight:"100vh" }}>

      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,#020e47 0%,#0e37b0 55%,#1a5cf2 100%)",padding:"4rem 0 3rem",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none" }}/>
        <div className="container-custom" style={{ position:"relative",zIndex:1,textAlign:"center" }}>
          <span style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"5px 14px",borderRadius:99,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",color:"rgba(191,219,254,1)",fontSize:".72rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase" as const,marginBottom:"1rem" }}>
            📋 Request a Quote
          </span>
          <h1 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#fff",marginBottom:".75rem",letterSpacing:"-.025em" }}>
            Get Your Free Trade Quote
          </h1>
          <p style={{ color:"rgba(147,197,253,.9)",fontSize:"1.05rem",maxWidth:"480px",margin:"0 auto" }}>
            Fill in your details below and we&apos;ll respond with a comprehensive quote within 24 hours.
          </p>
        </div>
      </div>

      <div className="container-custom" style={{ padding:"4rem 1.25rem" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"2.5rem",alignItems:"start" }}>

          {/* Left: Why choose us */}
          <div>
            <h2 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1.5rem",fontWeight:700,color:"#0f172a",marginBottom:"1.5rem" }}>Why Request a Quote?</h2>
            <div style={{ display:"flex",flexDirection:"column" as const,gap:"1rem",marginBottom:"2.5rem" }}>
              {[
                { icon:Zap,        color:"#1a5cf2", title:"24hr Response",      desc:"Our team reviews every inquiry within 24 hours and provides detailed pricing." },
                { icon:ShieldCheck,color:"#10b981", title:"Verified Sources",   desc:"All suppliers and products are pre-vetted for quality and compliance." },
                { icon:Clock,      color:"#f59e0b", title:"Best Price Promise", desc:"We negotiate the best rates on your behalf across our supplier network." },
              ].map(({ icon:Icon,color,title,desc })=>(
                <div key={title} style={{ display:"flex",gap:"1rem",padding:"1.25rem",borderRadius:"1.25rem",background:"#fff",border:"1.5px solid #f1f5f9",boxShadow:"0 2px 10px rgba(0,0,0,.04)" }}>
                  <div style={{ width:44,height:44,borderRadius:"1rem",background:`${color}12`,border:`1px solid ${color}22`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <Icon style={{ width:20,height:20,color }} />
                  </div>
                  <div>
                    <div style={{ fontWeight:700,color:"#0f172a",fontSize:".9375rem",marginBottom:4 }}>{title}</div>
                    <div style={{ fontSize:".8125rem",color:"#64748b",lineHeight:1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick contact */}
            <div style={{ background:"linear-gradient(135deg,#020e47,#0e37b0)",borderRadius:"1.5rem",padding:"1.75rem",color:"#fff" }}>
              <div style={{ fontSize:"1.25rem",marginBottom:".625rem" }}>💬 Prefer to chat?</div>
              <p style={{ color:"rgba(147,197,253,.85)",fontSize:".875rem",marginBottom:"1.25rem",lineHeight:1.6 }}>
                Our trade experts are available on WhatsApp for quick questions.
              </p>
              <a href="https://wa.me/919000000000" target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex",alignItems:"center",gap:8,padding:".75rem 1.5rem",borderRadius:"1rem",background:"#25D366",color:"#fff",fontWeight:700,fontSize:".875rem",boxShadow:"0 4px 14px rgba(37,211,102,.35)" }}>
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right: Full inquiry form */}
          <div style={{ background:"#fff",borderRadius:"1.75rem",border:"1.5px solid #e2e8f0",padding:"2.5rem",boxShadow:"0 4px 32px rgba(26,92,242,.08)",position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(90deg,#1a5cf2,#3d7cf5,#e6b800)" }}/>
            {ok ? (
              <div style={{ textAlign:"center",padding:"3rem 0" }}>
                <div style={{ width:72,height:72,borderRadius:"50%",background:"rgba(34,197,94,.08)",border:"2px solid rgba(34,197,94,.2)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.5rem" }}>
                  <CheckCircle style={{ width:32,height:32,color:"#22c55e" }}/>
                </div>
                <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontWeight:700,fontSize:"1.25rem",color:"#0f172a",marginBottom:".5rem" }}>Quote Request Submitted!</h3>
                <p style={{ color:"#64748b",fontSize:".875rem",marginBottom:"1.5rem" }}>Our team will contact you within 24 hours with a detailed quotation.</p>
                <button onClick={()=>setOk(false)} style={{ fontSize:".85rem",color:"#1a5cf2",textDecoration:"underline",background:"none",border:"none",cursor:"pointer" }}>
                  Submit another inquiry
                </button>
              </div>
            ):(
              <form onSubmit={submit} style={{ display:"flex",flexDirection:"column" as const,gap:"1rem" }}>
                <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontWeight:700,fontSize:"1.25rem",color:"#0f172a",marginBottom:".25rem" }}>Trade Quote Request</h3>
                {error && (
                  <div style={{ padding:".75rem 1rem",borderRadius:"0.75rem",background:"rgba(239,68,68,.08)",border:"1.5px solid rgba(239,68,68,.2)",color:"#b91c1c",fontSize:".825rem" }}>
                    {error}
                  </div>
                )}
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:".875rem" }}>
                  <div>
                    <label style={{ display:"block",fontSize:".73rem",fontWeight:600,color:"#64748b",marginBottom:5 }}>Full Name *</label>
                    <input name="name" required value={form.name} onChange={ch} placeholder="John Smith" className="input-field"/>
                  </div>
                  <div>
                    <label style={{ display:"block",fontSize:".73rem",fontWeight:600,color:"#64748b",marginBottom:5 }}>Company</label>
                    <input name="company" value={form.company} onChange={ch} placeholder="ABC Corp" className="input-field"/>
                  </div>
                  <div>
                    <label style={{ display:"block",fontSize:".73rem",fontWeight:600,color:"#64748b",marginBottom:5 }}>Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={ch} placeholder="john@co.com" className="input-field"/>
                  </div>
                  <div>
                    <label style={{ display:"block",fontSize:".73rem",fontWeight:600,color:"#64748b",marginBottom:5 }}>Phone / WhatsApp</label>
                    <input name="phone" value={form.phone} onChange={ch} placeholder="+91 90000 00000" className="input-field"/>
                  </div>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:".875rem" }}>
                  <div>
                    <label style={{ display:"block",fontSize:".73rem",fontWeight:600,color:"#64748b",marginBottom:5 }}>Country</label>
                    <select name="country" value={form.country} onChange={ch} className="select-field">
                      <option value="">Select country…</option>
                      {COUNTRIES.map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:"block",fontSize:".73rem",fontWeight:600,color:"#64748b",marginBottom:5 }}>Inquiry Type</label>
                    <select name="type" value={form.type} onChange={ch} className="select-field">
                      <option value="">Select type…</option>
                      {TYPES.map(t=><option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:"block",fontSize:".73rem",fontWeight:600,color:"#64748b",marginBottom:5 }}>Product Category</label>
                    <select name="product" value={form.product} onChange={ch} className="select-field">
                      <option value="">Select product…</option>
                      {PRODUCTS.map(p=><option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:"block",fontSize:".73rem",fontWeight:600,color:"#64748b",marginBottom:5 }}>Quantity Range</label>
                    <select name="quantity" value={form.quantity} onChange={ch} className="select-field">
                      <option value="">Select qty…</option>
                      {QUANTITIES.map(q=><option key={q} value={q}>{q}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display:"block",fontSize:".73rem",fontWeight:600,color:"#64748b",marginBottom:5 }}>Target Budget (optional)</label>
                  <input name="budget" value={form.budget} onChange={ch} placeholder="e.g. $5,000–$10,000" className="input-field"/>
                </div>
                <div>
                  <label style={{ display:"block",fontSize:".73rem",fontWeight:600,color:"#64748b",marginBottom:5 }}>Requirements / Message *</label>
                  <textarea name="message" required value={form.message} onChange={ch} rows={4}
                    placeholder="Describe your product requirements, specs, delivery timeline…"
                    className="input-field" style={{ resize:"none" }}/>
                </div>
                <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent:"center",padding:".875rem",fontSize:".9375rem" }}>
                  {loading ? (
                    <span style={{ display:"flex",alignItems:"center",gap:8 }}>
                      <span style={{ width:15,height:15,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite" }}/>
                      Processing…
                    </span>
                  ):(
                    <span style={{ display:"flex",alignItems:"center",gap:8 }}>
                      <Send style={{ width:16,height:16 }}/> Submit Quote Request
                    </span>
                  )}
                </button>
                <p style={{ textAlign:"center",fontSize:".75rem",color:"#94a3b8" }}>No spam. 100% confidential. We respond within 24 hours.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}