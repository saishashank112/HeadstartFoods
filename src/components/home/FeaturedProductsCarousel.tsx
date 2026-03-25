"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import ProductCard from "@/components/shared/ProductCard";
import { PRODUCTS } from "@/data/products";

// STRICT ORDER: 4 Mango Varieties [0-3], 2 Spices [4-5], 2 Pickles [6-7]
const FEATURED_PRODUCTS = [
  PRODUCTS.find(p => p.slug === "alphonso-hapus")!,
  PRODUCTS.find(p => p.slug === "kesar-mango")!,
  PRODUCTS.find(p => p.slug === "banganapalli-mango")!,
  PRODUCTS.find(p => p.slug === "mallika-mango")!,
  PRODUCTS.find(p => p.slug === "turmeric-powder")!,
  PRODUCTS.find(p => p.slug === "cumin-seeds")!,
  PRODUCTS.find(p => p.slug === "mango-pickle")!,
  PRODUCTS.find(p => p.slug === "mint-chutney")!,
].filter(Boolean);

export default function FeaturedProductsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden border-t border-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between items-center text-center md:text-left gap-8 mb-16 max-w-7xl mx-auto">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              className="block text-[10px] md:text-[11px] font-display font-black uppercase text-navy/60 tracking-[0.4em]"
            >
              Current Selection
            </motion.span>
            <h2 className="text-5xl md:text-8xl font-display font-black text-navy uppercase tracking-tighter leading-[0.85]">
              This Season&apos;s <br />
              <span className="text-primary italic">Premium Mangoes</span>
            </h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4 pt-2">
              <p className="text-navy/40 text-xs md:text-sm font-body font-medium tracking-wide uppercase leading-relaxed max-w-md">
                4 Varieties Available This Season — Air Imported Weekly Direct from GI-Tagged Orchards.
              </p>
              <div className="h-4 w-[1.5px] bg-primary/20 hidden md:block" />
              <a href="/products" className="text-primary font-display font-black text-[11px] uppercase tracking-widest hover:underline transition-all">
                View All Categories →
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => scroll("left")}
              className="w-14 h-14 flex items-center justify-center rounded-2xl border border-gray-soft text-navy hover:bg-gray-soft hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-14 h-14 flex items-center justify-center rounded-2xl border border-gray-soft text-navy hover:bg-gray-soft hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-12 snap-x snap-mandatory perspective-[2000px]"
        >
          {FEATURED_PRODUCTS.map((prod, i) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[280px] md:min-w-[340px] snap-center relative"
            >
              {i >= 4 && (
                <div className="absolute -top-4 left-6 z-20 px-3 py-1 bg-gray-50 border border-gray-100 text-slate/40 font-display font-black text-[8px] uppercase tracking-widest rounded-full">
                  Also Available
                </div>
              )}
              <ProductCard {...prod} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
