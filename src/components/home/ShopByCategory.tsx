"use client";

import { motion } from "framer-motion";
import { ArrowRight, Flame, Waves, Zap, Cookie, Wheat, GlassWater } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { id: "spices", name: "Premium Spices", count: 6, accent: "#E53E3E", icon: Flame, channel: "Both" },
  { id: "dals", name: "Lentils & Dals", count: 4, accent: "#D97706", icon: Waves, channel: "Both" },
  { id: "ready-to-eat", name: "Ready-to-Eat", count: 3, accent: "#059669", icon: Zap, channel: "B2C" },
  { id: "snacks", name: "Snacks & Sweets", count: 4, accent: "#7C3AED", icon: Cookie, channel: "Both" },
  { id: "flours", name: "Specialty Flours", count: 4, accent: "#92400E", icon: Wheat, channel: "B2B" },
  { id: "pickles", name: "Pickles & Condiments", count: 4, accent: "#16A34A", icon: GlassWater, channel: "Both" },
];

export default function ShopByCategory() {
  return (
    <section className="bg-white py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            className="block text-[10px] md:text-[11px] font-display font-black uppercase text-navy/60 tracking-[0.4em]"
          >
            Curated Global Selection
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-display font-black text-navy uppercase tracking-tighter leading-[0.85]">
            Shop By <span className="text-primary italic">Category</span>
          </h2>
          <p className="text-navy/40 text-xs md:text-sm font-body max-w-lg mx-auto font-medium tracking-wide leading-relaxed uppercase">
            From India&apos;s finest mangoes to authentic South Asian pantry essentials.
          </p>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-5 max-w-7xl mx-auto">
          {/* MANGO CATEGORY CARD (FEATURED) */}
          <Link href="/products?category=mangoes" className="col-span-2 group">
            <motion.div
              whileHover={{ y: -5 }}
              className="relative h-full min-h-[180px] md:min-h-[220px] bg-gradient-to-br from-[#FF8C00] to-[#FFB300] rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 overflow-hidden shadow-2xl transition-all"
            >
              {/* Orchard Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 blur-[80px] rounded-full -translate-x-1/4 -translate-y-1/4" />
              
              <div className="relative z-10 h-full flex flex-col justify-between items-start">
                <div className="space-y-3 md:space-y-4 text-left">
                  <div className="inline-flex items-center px-3 py-1 bg-white text-primary font-display font-black text-[7px] md:text-[9px] uppercase tracking-[0.2em] rounded-full shadow-lg">
                    Hero Product
                  </div>
                  <div className="space-y-0.5 md:space-y-1">
                    <h3 className="text-2xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">
                      Premium <span className="italic">Mangoes</span>
                    </h3>
                    <p className="text-white/80 font-body text-[9px] md:text-[13px] font-medium tracking-wide uppercase">
                      4 varieties · Air imported
                    </p>
                  </div>
                </div>

                <div className="w-full flex items-end justify-between mt-4 md:mt-8">
                  <button className="h-10 md:h-12 px-5 md:px-8 bg-white text-primary rounded-xl md:rounded-2xl font-display font-black uppercase tracking-[0.2em] text-[8px] md:text-[10px] flex items-center gap-2 md:gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all">
                    Shop <ArrowRight size={12} />
                  </button>
                  <span className="hidden lg:block text-white/50 font-display font-black text-[9px] uppercase tracking-[0.3em]">
                    Alphonso · Kesar · Banganapalli · Mallika
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* OTHER 6 CATEGORY CARDS */}
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="group">
              <motion.div
                whileHover={{ 
                  y: -5,
                  borderColor: cat.accent,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.06)"
                }}
                className="h-full min-h-[120px] md:h-[180px] bg-white border border-gray-100 rounded-[1.2rem] md:rounded-[2rem] p-3 md:p-4 flex flex-col justify-between transition-all"
              >
                <div className="flex items-start justify-between">
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all bg-navy/5"
                    style={{ backgroundColor: `${cat.accent}10`, color: cat.accent }}
                  >
                    <cat.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {cat.channel === "B2C" && <span className="px-1 py-0.5 bg-[#059669] text-white text-[6px] font-black uppercase rounded-[3px]">B2C</span>}
                    {cat.channel === "B2B" && <span className="px-1 py-0.5 bg-[#1A1A2E] text-white text-[6px] font-black uppercase rounded-[3px]">B2B</span>}
                  </div>
                </div>

                <div className="space-y-1 mt-4">
                  <h4 className="font-display font-black text-[11px] md:text-base text-navy uppercase tracking-tighter leading-none group-hover:text-primary transition-colors text-left">
                    {cat.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-slate/40 font-body text-[8px] md:text-[10px] font-medium tracking-tight uppercase">
                      {cat.count} items
                    </span>
                    <span className="text-primary text-[8px] font-display font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 hidden md:block">
                      Available
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
