"use client";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/common/Reveal";
const WA="919000000000";
const MSG=encodeURIComponent("Hi! I'd like to discuss a trade inquiry.");

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-content container-custom">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Ready to Start Trading <br/>
            <span className="text-gold">Globally?</span>
          </h2>
          <p className="text-blue-200 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Join thousands of businesses that trust TradePro Global for seamless import &amp; export operations.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link href="/inquiry" className="btn-gold text-base px-8 py-4">
                Get Free Quote <ArrowRight className="w-4 h-4"/>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <a href={`https://wa.me/${WA}?text=${MSG}`} target="_blank" rel="noopener noreferrer"
                 className="btn-white text-base px-8 py-4">
                <MessageCircle className="w-4 h-4 text-green-600"/> Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}