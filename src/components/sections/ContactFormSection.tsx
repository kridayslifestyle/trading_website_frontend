"use client";
import { useState } from "react";
import { Send, CheckCircle, Zap, ShieldCheck, Lock, AlertCircle } from "lucide-react";
import Reveal from "@/components/common/Reveal";

const PRODUCTS=["Masaz Chairs & Furniture","Clothing & Apparel","Engineering Tools & Machinery","Textiles & Apparel","Home Products"];
const TYPES=["Import","Export","Supplier Sourcing","Trade Consulting"];

const EMPTY_FORM = {name:"",company:"",email:"",phone:"",country:"",type:"",product:"",message:""};

export default function ContactFormSection() {
  const [form,setForm]=useState(EMPTY_FORM);
  const [ok,setOk]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const ch=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>
    setForm(p=>({...p,[e.target.name]:e.target.value}));
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to submit inquiry");
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
    <section className="contact-section section-pad">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left info */}
          <Reveal direction="left">
          <div>
            <span className="section-label mb-4">Get In Touch</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              Request a Free <span className="text-gradient">Trade Quote</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Tell us what you need to import or export. Our team will respond within 24 hours with a detailed quotation.
            </p>
            <div className="space-y-4">
              {[
                {icon:Zap,       title:"Fast Response",      desc:"Quote within 24 hours"},
                {icon:ShieldCheck,title:"Verified Suppliers",desc:"All partners pre-vetted"},
                {icon:Lock,      title:"100% Confidential",  desc:"Your data is never shared"},
              ].map(({icon:Icon,title,desc})=>(
                <div key={title} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-100 hover:bg-blue-50/30 transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-500"/>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{title}</div>
                    <div className="text-slate-400 text-sm">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </Reveal>

          {/* Form card */}
          <Reveal direction="right" delay={0.1}>
          <div className="contact-form-card">
            {ok ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500"/>
                </div>
                <h3 className="font-display font-bold text-slate-900 text-xl mb-2">Inquiry Submitted!</h3>
                <p className="text-slate-500 text-sm">Our team will contact you within 24 hours.</p>
                <button onClick={()=>{setOk(false);setForm(EMPTY_FORM)}}
                  className="mt-5 text-sm text-brand-500 underline underline-offset-2">
                  Submit another inquiry
                </button>
              </div>
            ):(
              <form onSubmit={submit} className="space-y-4">
                <h3 className="font-display font-semibold text-slate-900 text-xl mb-5">Send Inquiry</h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Full Name *</label>
                    <input name="name" required value={form.name} onChange={ch} placeholder="John Smith" className="input-field"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Company</label>
                    <input name="company" value={form.company} onChange={ch} placeholder="ABC Corp" className="input-field"/>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={ch} placeholder="john@co.com" className="input-field"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Phone / WhatsApp</label>
                    <input name="phone" value={form.phone} onChange={ch} placeholder="+91 90000 00000" className="input-field"/>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Country *</label>
                    <input name="country" required value={form.country} onChange={ch} placeholder="Your country" className="input-field"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Inquiry Type</label>
                    <select name="type" value={form.type} onChange={ch} className="select-field">
                      <option value="">Select…</option>
                      {TYPES.map(t=><option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Product Category</label>
                  <select name="product" value={form.product} onChange={ch} className="select-field">
                    <option value="">Select product…</option>
                    {PRODUCTS.map(p=><option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Message / Requirements *</label>
                  <textarea name="message" required value={form.message} onChange={ch} rows={3}
                    placeholder="Describe your requirements, quantity, target price…"
                    className="input-field resize-none"/>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                    <AlertCircle className="w-4 h-4 flex-shrink-0"/>
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm py-3.5">
                  {loading?(
                    <span className="flex items-center gap-2">
                      <span style={{width:15,height:15,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite"}}/>
                      Sending…
                    </span>
                  ):(
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4"/> Send Inquiry
                    </span>
                  )}
                </button>
                <p className="text-center text-slate-400 text-xs">We never spam. Your info is confidential.</p>
              </form>
            )}
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}