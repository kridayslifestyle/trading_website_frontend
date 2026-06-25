"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
const WA="919000000000";
const MSG=encodeURIComponent("Hi! I'm interested in your import/export services. Can you help me?");

export default function WhatsAppButton() {
  return (
    <a href={`https://wa.me/${WA}?text=${MSG}`} target="_blank" rel="noopener noreferrer"
       className="wa-wrap" aria-label="Chat on WhatsApp">
      <div className="wa-tip">Chat with us! 👋</div>
      <div className="wa-circle">
        <MessageCircle className="w-6 h-6 text-white fill-white relative z-10"/>
      </div>
    </a>
  );
}