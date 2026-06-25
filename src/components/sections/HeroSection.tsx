"use client";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, TrendingUp } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, text: "ISO 9001 Certified" },
  { icon: Star,        text: "4.9 ★  Rated"        },
  { icon: TrendingUp,  text: "80+ Countries"        },
];
const EMOJIS = ["🪑","👗","⚙️","🧵","🏠"];

export default function HeroSection() {
  return (
    <section className="hero-wrap">
      <div className="hero-bg" />
      <div className="hero-dots" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="hero-content container-custom w-full pt-24 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left ── */}
          <div>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Global Import &amp; Export Trading
            </div>

            <h1 className="hero-h1">
              Your Trusted
              <span className="hero-h1-accent">Global Trade</span>
              Partner
            </h1>

            <p className="hero-sub mt-5">
              We connect buyers and suppliers across 80+ countries — specialising in
              furniture, clothing, machinery, textiles &amp; home products.
            </p>

            <div className="hero-ctas">
              <Link href="/inquiry" className="btn-gold text-[15px] px-8 py-3.5">
                Get Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/products" className="btn-white text-[15px] px-8 py-3.5">
                Explore Products
              </Link>
            </div>

            <div className="hero-badges">
              {BADGES.map(({ icon: Icon, text }) => (
                <div key={text} className="h-badge">
                  <Icon className="w-3.5 h-3.5" /> {text}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right visual ── */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-[340px]">

              {/* Main card */}
              <div className="hero-card glass-card">
                <div className="text-6xl mb-3">🌐</div>
                <h3 className="font-display text-white text-xl font-semibold mb-1">
                  Global Reach
                </h3>
                <p className="text-blue-200 text-sm mb-5 leading-relaxed">
                  Connecting 80+ countries with reliable, professional trade solutions.
                </p>

                <div className="grid grid-cols-3 gap-2.5 mb-5">
                  {[{v:"80+",l:"Countries"},{v:"500+",l:"Products"},{v:"15yr",l:"Experience"}].map(({v,l})=>(
                    <div key={l} className="hero-mini-stat">
                      <div className="font-display text-white text-lg font-bold">{v}</div>
                      <div className="text-blue-300 text-xs mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-2 flex-wrap">
                  {EMOJIS.map(e=>(
                    <span key={e}
                      className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10
                                 flex items-center justify-center text-lg transition-colors cursor-default">
                      {e}
                    </span>
                  ))}
                </div>
              </div>

              {/* Float pill top */}
              <div className="hero-float-pill absolute -top-7 -left-10"
                   style={{animation:"floatSm 3.5s ease-in-out infinite"}}>
                <div className="text-xs text-white/55 mb-0.5">New Inquiry</div>
                <div className="text-sm font-semibold text-white">🇩🇪 Germany – Rice Export</div>
              </div>

              {/* Float pill bottom */}
              <div className="hero-float-pill absolute -bottom-7 -right-4"
                   style={{animation:"floatSm 4s ease-in-out infinite",animationDelay:"1.8s"}}>
                <div className="text-xs text-white/55 mb-0.5">Shipment Dispatched</div>
                <div className="text-sm font-semibold text-white">🇺🇸 USA – Cotton Yarn</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span className="text-white/45 text-xs tracking-widest uppercase">Scroll</span>
          <div className="scroll-mouse"><div className="scroll-dot" /></div>
        </div>
      </div>
    </section>
  );
}