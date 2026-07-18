"use client";

import { Star } from "lucide-react";
import Reveal from "@/components/common/Reveal";

const REVIEWS = [
  {
    name:"Klaus Meier",
    role:"Procurement Manager",
    company:"FreshCo GmbH, Germany",
    flag:"🇩🇪",
    rating:5,
    text:"TradePro has been our trusted partner for furniture imports from China for over 4 years. Their quality checks and documentation handling is impeccable. Highly recommended.",
  },
  {
    name:"Sarah Johnson",
    role:"Supply Chain Director",
    company:"TextileHub, New York",
    flag:"🇺🇸",
    rating:5,
    text:"We source clothing and textiles from Indo exclusively through TradePro. Their supplier network is unmatched and they always deliver on time. Fantastic team!",
  },
  {
    name:"Ahmed Al-Rashid",
    role:"CEO",
    company:"Gulf Trading LLC, Dubai",
    flag:"🇦🇪",
    rating:5,
    text:"Exceptional service. They helped us set up a home products import channel from China. Compliance and documentation handled perfectly every single time.",
  },
  {
    name:"Yuki Tanaka",
    role:"Import Manager",
    company:"Nippon Co., Japan",
    flag:"🇯🇵",
    rating:5,
    text:"Professional, reliable, and proactive. TradePro connected us with the best machinery suppliers in Indo. Communication is always smooth and delivery schedules maintained.",
  },
];

export default function Testimonials() {
  const infiniteReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section className="reviews-section section-pad overflow-hidden">
      <div className="container-custom">
        
        {/* Header */}
        <Reveal className="text-center mb-14">
          <span className="section-label mb-4">
            Client Reviews
          </span>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Trusted by Global Buyers
          </h2>

          <p className="text-slate-500 text-lg max-w-lg mx-auto">
            Our clients across the world rely on us for consistent,
            transparent, and professional trade services.
          </p>
        </Reveal>

        {/* Marquee */}
        <div className="reviews-marquee">
          <div className="reviews-track">
            {infiniteReviews.map(
              ({ name, role, company, flag, rating, text }, index) => (
                <div
                  key={`${name}-${index}`}
                  className="review-card min-w-[360px]"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">
                    "{text}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-xl flex-shrink-0">
                      {flag}
                    </div>

                    <div>
                      <div className="font-semibold text-slate-900 text-sm">
                        {name}
                      </div>

                      <div className="text-slate-400 text-xs">
                        {role} · {company}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}