"use client";

import { motion } from "framer-motion";
import { Plane, Shield, Leaf, Snowflake } from "lucide-react";

const TRUST_PILLARS = [
  { icon: Plane, label: "Weekly Air Shipments" },
  { icon: Shield, label: "CFIA Licensed" },
  { icon: Leaf, label: "Grade A Orchards" },
  { icon: Snowflake, label: "Cold Chain Logistics" },
];

export default function TrustBar() {
  return (
    <div className="w-full bg-[#101424] py-4 md:py-6 border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 items-center justify-items-center">
          {TRUST_PILLARS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 md:gap-4 hover:scale-105 transition-transform duration-base"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-accent-gold group-hover:bg-primary transition-colors">
                 <item.icon size={20} className="md:size-24" />
              </div>
              <span className="text-white text-[11px] md:text-[13px] font-display font-medium uppercase tracking-widest leading-tight">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy to-transparent z-10 md:hidden" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy to-transparent z-10 md:hidden" />
    </div>
  );
}
