"use client";
import { useState } from "react";
import { Send, CheckCircle, MapPin, Phone, Mail, Clock } from "lucide-react";

const CONTACT_INFO = [
  { icon: MapPin, label:"Office Address",  value:"Flat No. 104, padmaja rajas eclave, Bhagya Nagar Colony, Kukatpally,\nHyderabad – 500072, Telangana, India", color:"#1a5cf2" },
  { icon: Phone,  label:"Phone / WhatsApp",value:"+91 76739 53622", color:"#10b981", href:"tel:+919000000000" },
  { icon: Mail,   label:"Email",           value:"info.tradeproglobal@gmail.com", color:"#8b5cf6", href:"mailto:info@tradeproglobal.com" },
  { icon: Clock,  label:"Business Hours",  value:"Mon–Sat: 9:00 AM – 6:30 PM IST", color:"#f59e0b" },
];

export default function ContactPage() {
  const [form,setForm]=useState({name:"",email:"",phone:"",subject:"",message:""});
  const [ok,setOk]=useState(false);
  const [loading,setLoading]=useState(false);
  const ch=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>
    setForm(p=>({...p,[e.target.name]:e.target.value}));
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();setLoading(true);
    await new Promise(r=>setTimeout(r,1500));
    setLoading(false);setOk(true);
  };

  return (
    <div style={{ paddingTop:"80px", background:"#f8faff", minHeight:"100vh" }}>

      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,#020e47 0%,#0e37b0 55%,#1a5cf2 100%)", padding:"4rem 0 3rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none" }}/>
        <div className="container-custom" style={{ position:"relative",zIndex:1,textAlign:"center" }}>
          <span style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"5px 14px",borderRadius:99,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",color:"rgba(191,219,254,1)",fontSize:".72rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase" as const,marginBottom:"1rem" }}>
            📞 Contact Us
          </span>
          <h1 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#fff",marginBottom:".75rem",letterSpacing:"-.025em" }}>
            Get In Touch
          </h1>
          <p style={{ color:"rgba(147,197,253,.9)",fontSize:"1.05rem",maxWidth:"480px",margin:"0 auto" }}>
            We're here to help. Reach out for trade inquiries, partnerships, or general questions.
          </p>
        </div>
      </div>

      <div className="container-custom" style={{ padding:"4rem 1.25rem" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"2.5rem",alignItems:"start" }}>

          {/* Left: Contact info + map */}
          <div style={{ display:"flex",flexDirection:"column" as const,gap:"1.25rem" }}>
            {CONTACT_INFO.map(({ icon:Icon,label,value,color,href })=>(
              <div key={label} style={{ background:"#fff",borderRadius:"1.25rem",padding:"1.5rem",border:"1.5px solid #f1f5f9",boxShadow:"0 2px 12px rgba(0,0,0,.04)",display:"flex",gap:"1rem",alignItems:"flex-start",transition:"border-color .2s,box-shadow .2s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=`${color}33`;e.currentTarget.style.boxShadow=`0 6px 24px ${color}14`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#f1f5f9";e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,.04)";}}>
                <div style={{ width:44,height:44,borderRadius:"1rem",background:`${color}12`,border:`1px solid ${color}25`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <Icon style={{ width:20,height:20,color }} />
                </div>
                <div>
                  <div style={{ fontSize:".75rem",fontWeight:600,color:"#94a3b8",textTransform:"uppercase" as const,letterSpacing:".05em",marginBottom:4 }}>{label}</div>
                  {href ? (
                    <a href={href} style={{ fontSize:".9rem",color:"#1e293b",fontWeight:500,lineHeight:1.5,whiteSpace:"pre-line" as const }}>{value}</a>
                  ):(
                    <p style={{ fontSize:".9rem",color:"#1e293b",fontWeight:500,lineHeight:1.5,whiteSpace:"pre-line" as const,margin:0 }}>{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Google Maps embed */}
            <div style={{ borderRadius:"1.5rem",overflow:"hidden",border:"1.5px solid #e2e8f0",boxShadow:"0 2px 12px rgba(0,0,0,.06)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.629!2d78.4482!3d17.4126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI0JzQ1LjQiTiA3OMKwMjYnNTMuNSJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%" height="220" style={{ border:0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="TradePro Office Location"
              />
            </div>
          </div>

          {/* Right: Contact form */}
          <div style={{ background:"#fff",borderRadius:"1.75rem",border:"1.5px solid #e2e8f0",padding:"2.5rem",boxShadow:"0 4px 32px rgba(26,92,242,.08)",position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(90deg,#1a5cf2,#3d7cf5,#e6b800)",borderRadius:"1.75rem 1.75rem 0 0" }}/>
            {ok ? (
              <div style={{ textAlign:"center",padding:"3rem 0" }}>
                <div style={{ width:72,height:72,borderRadius:"50%",background:"rgba(34,197,94,.08)",border:"2px solid rgba(34,197,94,.2)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.5rem" }}>
                  <CheckCircle style={{ width:32,height:32,color:"#22c55e" }}/>
                </div>
                <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontWeight:700,fontSize:"1.25rem",color:"#0f172a",marginBottom:".5rem" }}>Message Sent!</h3>
                <p style={{ color:"#64748b",fontSize:".875rem" }}>We'll get back to you within 24 hours.</p>
                <button onClick={()=>{setOk(false);setForm({name:"",email:"",phone:"",subject:"",message:""})}}
                  style={{ marginTop:"1.25rem",fontSize:".85rem",color:"#1a5cf2",textDecoration:"underline",background:"none",border:"none",cursor:"pointer" }}>
                  Send another message
                </button>
              </div>
            ):(
              <form onSubmit={submit} style={{ display:"flex",flexDirection:"column" as const,gap:"1rem" }}>
                <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontWeight:700,fontSize:"1.25rem",color:"#0f172a",marginBottom:".25rem" }}>Send a Message</h3>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem" }}>
                  <div>
                    <label style={{ display:"block",fontSize:".75rem",fontWeight:600,color:"#64748b",marginBottom:6 }}>Full Name *</label>
                    <input name="name" required value={form.name} onChange={ch} placeholder="John Smith" className="input-field"/>
                  </div>
                  <div>
                    <label style={{ display:"block",fontSize:".75rem",fontWeight:600,color:"#64748b",marginBottom:6 }}>Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={ch} placeholder="john@co.com" className="input-field"/>
                  </div>
                </div>
                <div>
                  <label style={{ display:"block",fontSize:".75rem",fontWeight:600,color:"#64748b",marginBottom:6 }}>Phone / WhatsApp</label>
                  <input name="phone" value={form.phone} onChange={ch} placeholder="+91 90000 00000" className="input-field"/>
                </div>
                <div>
                  <label style={{ display:"block",fontSize:".75rem",fontWeight:600,color:"#64748b",marginBottom:6 }}>Subject</label>
                  <input name="subject" value={form.subject} onChange={ch} placeholder="How can we help you?" className="input-field"/>
                </div>
                <div>
                  <label style={{ display:"block",fontSize:".75rem",fontWeight:600,color:"#64748b",marginBottom:6 }}>Message *</label>
                  <textarea name="message" required value={form.message} onChange={ch} rows={4}
                    placeholder="Tell us more about your inquiry…" className="input-field" style={{ resize:"none" }}/>
                </div>
                <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent:"center",padding:".875rem" }}>
                  {loading ? (
                    <span style={{ display:"flex",alignItems:"center",gap:8 }}>
                      <span style={{ width:15,height:15,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite" }}/>
                      Sending…
                    </span>
                  ):(
                    <span style={{ display:"flex",alignItems:"center",gap:8 }}>
                      <Send style={{ width:16,height:16 }}/> Send Message
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}