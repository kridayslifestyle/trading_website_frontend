"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";

const NAV=[
  {label:"Home",       href:"/"},
  {label:"Products",   href:"/products"},
  {label:"Services",   href:"/services"},
  {label:"Countries",  href:"/countries"},
  {label:"About",      href:"/about"},
  {label:"Contact",    href:"/contact"},
];

export default function Navbar() {
  const pathname=usePathname();
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  // On inner pages (not homepage), always show solid navbar
  const isHomePage = pathname === "/";
  const solidNav = !isHomePage || scrolled;
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>24);
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);
  useEffect(()=>setOpen(false),[pathname]);
  const active=(h:string)=>h==="/"?pathname===h:pathname.startsWith(h);

  return (
    <header className={`navbar ${solidNav?"navbar-scrolled":""}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5 text-white"/>
            </div>
            <div className="leading-none">
              <div className={`font-display font-bold text-lg leading-none tracking-tight transition-colors ${solidNav ? "text-brand-900" : "text-white"}`}>TradePro</div>
              <div className={`text-[10px] font-medium tracking-[.18em] uppercase transition-colors ${solidNav ? "text-brand-400" : "text-blue-300"}`}>Global</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV.map(({label,href})=>(
              <Link key={href} href={href}
                className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-200 ${
                  active(href)
                    ?"text-brand-500 bg-brand-50/90"
                    :solidNav
                    ?"text-slate-700 hover:text-brand-500 hover:bg-brand-50"
                    :"text-white/90 hover:text-white hover:bg-white/10"
                }`}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/admin"
              className={`text-[13px] font-medium transition-colors ${solidNav ? "text-slate-500 hover:text-brand-500" : "text-white/65 hover:text-white"}`}>
              Admin Login
            </Link>
            <Link href="/inquiry" className="btn-primary text-[13px] py-2.5 px-5">
              Get a Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={()=>setOpen(!open)}
            className={`md:hidden p-2 rounded-lg transition-colors ${solidNav ?"text-slate-700 hover:bg-slate-100":"text-white hover:bg-white/10"}`}
            aria-label="Toggle menu">
            {open?<X className="w-5 h-5"/>:<Menu className="w-5 h-5"/>}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-white border-t border-slate-100 shadow-lg overflow-hidden transition-all duration-300 ${open?"max-h-[500px] opacity-100":"max-h-0 opacity-0"}`}>
        <div className="container-custom py-4 flex flex-col gap-1">
          {NAV.map(({label,href})=>(
            <Link key={href} href={href}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${active(href)?"text-brand-500 bg-brand-50":"text-slate-700 hover:text-brand-500 hover:bg-brand-50"}`}>
              {label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link href="/inquiry" className="btn-primary justify-center">Get a Quote</Link>
            <Link href="/admin"   className="btn-outline justify-center">Admin Login</Link>
          </div>
        </div>
      </div>
    </header>
  );
}