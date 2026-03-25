"use client";

import { motion } from "framer-motion";
import { TreeDeciduous, ClipboardCheck, Award, Plane, ShieldCheck, Warehouse, Home } from "lucide-react";

const STEPS = [
  { icon: TreeDeciduous, label: "Indian Orchards", color: "#FF8C00" },
  { icon: ClipboardCheck, label: "Harvest & Grading", color: "#FFA500" },
  { icon: Award, label: "FSSAI Cert", color: "#FF8C00" },
  { icon: Plane, label: "Air Cargo", color: "#FFA500" },
  { icon: ShieldCheck, label: "CFIA Inspection", color: "#FF8C00" },
  { icon: Warehouse, label: "Surrey Hub", color: "#FFA500" },
  { icon: Home, label: "Your Doorstep", color: "#FF8C00" },
];

export default function SupplyChainTimeline() {
  return (
    <section className="bg-white py-6 md:py-10 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-6 md:mb-10 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            className="text-4xl md:text-6xl font-display font-black text-navy uppercase tracking-tighter"
          >
            From Orchard to Your <span className="text-primary italic">Doorstep</span>
          </motion.h2>
          <p className="text-slate text-sm font-body max-w-2xl mx-auto opacity-50 font-medium tracking-wide">
            Every shipment fully traceable across 7 verified touchpoints for maximum freshness.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Desktop Curved Flow (SVG) */}
          <div className="hidden lg:block absolute top-[50%] left-0 right-0 h-24 -translate-y-1/2 overflow-visible z-0 pointer-events-none opacity-20">
             <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1000 100" className="w-full">
                <motion.path
                  d="M0,50 C100,0 200,100 300,50 C400,0 500,100 600,50 C700,0 800,100 900,50 L1000,50"
                  fill="none"
                  stroke="#FF8C00"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
             </svg>
          </div>
          
          {/* Mobile Vertical Line */}
          <div className="lg:hidden absolute left-[27px] top-8 bottom-8 w-[1.5px] bg-gradient-to-b from-primary/5 via-primary/30 to-primary/5 z-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 md:gap-10 lg:gap-2 relative z-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="flex lg:flex-col items-center gap-6 lg:gap-8 group"
              >
                {/* Icon Container with smoother hover */}
                <div className="relative">
                   <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   <div className="w-14 h-14 md:w-18 md:h-18 shrink-0 flex items-center justify-center rounded-full bg-white border border-gray-100 shadow-xl group-hover:border-primary group-hover:scale-110 transition-all duration-500 ease-out z-10 relative">
                     <step.icon size={22} className="text-navy group-hover:text-primary transition-colors duration-500" />
                   </div>
                   <div className="hidden lg:block absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full group-hover:scale-[3] transition-all" />
                </div>
                
                {/* Meta */}
                <div className="text-left lg:text-center space-y-0.5 md:space-y-1">
                  <span className="text-[10px] font-display font-black text-primary uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">Step 0{i+1}</span>
                  <h4 className="font-display font-black text-navy text-[11px] md:text-[11px] uppercase tracking-[0.1em] opacity-80 group-hover:text-primary group-hover:opacity-100 transition-all leading-tight max-w-[140px] lg:max-w-[100px] mx-auto">
                    {step.label}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    </section>
  );
}
