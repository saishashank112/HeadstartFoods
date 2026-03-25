"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Globe, Clock } from "lucide-react";

export default function MangoHeroBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full h-auto min-h-[220px] md:h-[240px] bg-gradient-to-br from-[#FF8C00] to-[#FFB300] rounded-[2rem] overflow-hidden p-8 md:p-12 mb-16 shadow-[0_20px_50px_rgba(255,140,0,0.25)] flex items-center justify-between"
    >
      {/* Decorative Orchard Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      
      {/* Left Content */}
      <div className="relative z-10 flex flex-col items-start gap-4 md:gap-5 max-w-xl">
        <div className="px-4 py-1.5 bg-white text-primary font-display font-black text-[10px] uppercase tracking-[0.2em] rounded-full shadow-lg">
          Season Now Open
        </div>
        
        <div className="space-y-1">
          <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">
            Premium <span className="italic">Indian Mangoes</span>
          </h2>
          <p className="text-white/80 font-body text-sm md:text-base font-medium tracking-wide">
            Air-imported weekly · 4 exclusive varieties · CFIA cleared on arrival.
          </p>
        </div>

        <button className="h-12 md:h-14 px-8 bg-white text-primary rounded-2xl font-display font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all mt-2 group">
          Shop All Mangoes <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Right Content - Stats (Desktop Only) */}
      <div className="hidden xl:flex flex-col gap-6 relative z-10">
        <div className="flex items-center gap-4 text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Globe size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-xl leading-none">4 Varieties</span>
            <span className="text-white/60 text-[10px] uppercase font-black tracking-widest pt-1">Direct from Farms</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Clock size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-xl leading-none">Weekly Import</span>
            <span className="text-white/60 text-[10px] uppercase font-black tracking-widest pt-1">Fresh Air Shipments</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <CheckCircle size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-xl leading-none">CFIA Certified</span>
            <span className="text-white/60 text-[10px] uppercase font-black tracking-widest pt-1">Cleared on Arrival</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
