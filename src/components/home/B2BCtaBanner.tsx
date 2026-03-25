"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building, CheckCircle } from "lucide-react";
import Link from "next/link";

const WHOLESALE_CATEGORIES = [
  { name: "Alphonso Mangoes", bg: "#FF8C00", color: "white" },
  { name: "Kesar Mangoes", bg: "#FFB300", color: "#1A1A2E" },
  { name: "Premium Spices", bg: "#E53E3E", color: "white" },
  { name: "Lentils & Dals", bg: "#D97706", color: "white" },
  { name: "Snacks & Sweets", bg: "#7C3AED", color: "white" },
  { name: "Specialty Flours", bg: "#92400E", color: "white" },
  { name: "Pickles", bg: "#16A34A", color: "white" },
];

export default function B2BCtaBanner() {
  return (
    <section className="hidden md:block bg-white py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="relative bg-navy rounded-[3rem] p-8 md:p-16 overflow-hidden flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Abstract Orange Bloom */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
          
          {/* Left: Content */}
          <div className="relative z-10 flex-1 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/40 font-display font-black text-[10px] uppercase tracking-[0.3em]">
                Commercial Partnerships
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.85]">
                Partner <span className="text-primary italic">Direct</span> <br className="hidden md:block" />
                with the Source
              </h2>
              <p className="text-white/40 text-xs md:text-sm font-body max-w-lg mx-auto lg:mx-0 font-medium tracking-wide leading-relaxed uppercase">
                Are you a retailer, restaurant, or wholesale distributor? Join Canada&apos;s premium supply network for Grade A perishables.
              </p>
            </div>

            {/* Wholesale Categories - NEW */}
            <div className="space-y-4 pt-4">
              <span className="block text-white/30 text-[9px] font-display font-black uppercase tracking-[0.3em] text-center lg:text-left">
                Available for Wholesale:
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 max-w-xl mx-auto lg:mx-0">
                {WHOLESALE_CATEGORIES.map((cat, i) => (
                  <motion.span
                    key={cat.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{ backgroundColor: cat.bg, color: cat.color }}
                    className="px-4 py-1.5 font-display font-black text-[10px] uppercase tracking-widest rounded-full shadow-lg"
                  >
                    {cat.name}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 justify-center lg:justify-start">
              <Link
                href="/wholesale#apply-form"
                className="h-14 px-10 bg-primary text-white rounded-2xl font-display font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all group"
              >
                Apply for Bulk Access <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center gap-2 text-white/40 text-[9px] font-display font-black uppercase tracking-widest">
                <CheckCircle size={14} className="text-primary" /> CFIA Cleared Logistics
              </div>
            </div>
          </div>

          {/* Right: Iconography */}
          <div className="relative z-10 flex items-center justify-center w-64 h-64 md:w-80 md:h-80">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[1.5px] border-white/5 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border-[1.5px] border-primary/10 rounded-full"
            />
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-3xl border border-white/10 flex items-center justify-center shadow-2xl">
              <Building size={48} className="text-primary" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
