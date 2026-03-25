"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Plane, Shield, Leaf, Snowflake } from "lucide-react";

const TRUST_PILLS = [
  { icon: Shield, label: "CFIA Licensed" },
  { icon: Plane, label: "Air Imported Weekly" },
  { icon: Leaf, label: "Grade A Orchards" },
  { icon: Snowflake, label: "Cold Chain Logistics" },
];

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[100svh] md:h-[85vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-mango.png"
          alt="Fresh Premium Indian Mangoes"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-navy/30 backdrop-brightness-75" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-display text-white mb-6 leading-[1.1]">
              <span className="text-display block">Canada's Freshest</span>
              <span className="text-display text-accent-gold block italic font-extrabold">Premium Mangoes</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-body text-white/90 text-body-lg mb-10 max-w-lg leading-relaxed"
          >
            Weekly air-imported from India's finest orchards. CFIA certified, fully traceable, and delivered fresh to your doorstep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link
              href="/products"
              className="px-8 h-14 md:h-16 flex items-center justify-center rounded-xl bg-primary text-white font-display font-bold uppercase tracking-wider hover:bg-orange-600 transition-all shadow-lg hover:shadow-primary/30 group"
            >
              Shop Mangoes Now
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/auth/register"
              className="px-8 h-14 md:h-16 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white font-display font-bold uppercase tracking-wider hover:bg-white hover:text-navy transition-all"
            >
              Sign Up
            </Link>
          </motion.div>
        </div>

        {/* Trust Pills (absolute bottom) */}
        <div className="absolute bottom-8 left-0 right-0 px-4 md:px-8 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-3 md:gap-6 min-w-max pb-4">
            {TRUST_PILLS.map((pill, i) => (
              <motion.div
                key={pill.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-full"
              >
                <pill.icon size={16} className="text-accent-gold" />
                <span className="text-white text-[11px] md:text-xs font-display font-bold uppercase tracking-widest">
                  {pill.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
