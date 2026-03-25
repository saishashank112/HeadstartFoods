"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Plus, Lock } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
  name: string;
  slug: string;
  price: number;
  unit: string;
  origin: string;
  image: string;
  isInStock?: boolean;
  isHero?: boolean;
  channels: ("B2B" | "B2C")[];
  badge?: string;
  specialBadge?: { text: string; bg: string; color: string };
  flavourProfile?: string;
  season?: string;
  className?: string;
}

export default function ProductCard({
  name,
  slug,
  price,
  unit,
  origin,
  image,
  isInStock = true,
  isHero = false,
  channels,
  badge,
  specialBadge,
  flavourProfile,
  season,
  className = "",
}: ProductCardProps) {
  const { addItem } = useCartStore();
  
  const isB2BOnly = channels.includes("B2B") && !channels.includes("B2C");
  const isBoth = channels.includes("B2B") && channels.includes("B2C");

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-xl transition-all relative ${
        isHero ? "border-2 border-[#FF8C00] shadow-[0_4px_16px_rgba(255,140,0,0.1)]" : "border border-gray-100"
      } ${className}`}
    >
      {/* Ribbon Badge for Hero Mangoes - Smaller */}
      {isHero && (
        <div className="absolute top-0 right-0 z-20 bg-[#FF8C00] text-white px-2 py-0.5 font-display font-black text-[7px] uppercase tracking-widest rounded-bl-lg shadow-md leading-none">
          Star of Season
        </div>
      )}

      <div className="block relative aspect-square overflow-hidden bg-gray-50">
        <Link href={`/products/${slug}`} className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </Link>
        
        {/* Variety Badges - Ultra Compact */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
           {specialBadge && (
              <span className="px-1.5 py-0.5 font-display font-black text-[7px] uppercase tracking-widest rounded shadow-sm opacity-90" style={{ backgroundColor: specialBadge.bg, color: specialBadge.color }}>
                {specialBadge.text.replace(" OF MANGOES", "").replace("KING 👑", "KING").replace("QUEEN 👸", "QUEEN")}
              </span>
           )}
           {badge && !specialBadge && (
              <span className="px-1.5 py-0.5 bg-navy text-white font-display font-black text-[7px] uppercase tracking-widest rounded shadow-sm">
                {badge}
              </span>
           )}
        </div>

        {/* HERO PRODUCT badge (bottom left image) - Smaller */}
        {isHero && (
          <div className="absolute bottom-2 left-2 z-10">
            <span className="px-1.5 py-0.5 bg-navy text-white font-display font-black text-[7px] uppercase tracking-widest rounded shadow-sm">
              Hero
            </span>
          </div>
        )}
        
        {/* Action Buttons - Optimized for Touch + Desktop Hover */}
        {!isB2BOnly && (
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-3 z-10 
            md:opacity-0 md:translate-y-4 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-out 
            bg-gradient-to-t from-black/60 via-black/20 to-transparent">
            <button
               onClick={(e) => { 
                 e.preventDefault(); 
                 addItem({ id: slug, name, price, image });
               }}
               className="pointer-events-auto h-12 w-full bg-white text-navy rounded-xl font-display font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
            >
              <Plus size={14} className="text-primary" /> Add to Cart
            </button>
            <button
               onClick={(e) => { 
                 e.preventDefault(); 
                 addItem({ id: slug, name, price, image });
                 window.location.href = "/checkout";
               }}
               className="pointer-events-auto h-12 w-full bg-primary text-white rounded-xl font-display font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
            >
               Buy Now
            </button>
          </div>
        )}
      </div>

      <div className="p-3 md:p-5 flex flex-col min-h-[160px]">
        {/* Rating & Season - Scaled for readability */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-primary opacity-60">
            {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
          </div>
          {season && (
            <span className="text-primary font-display font-black text-[8px] uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded-full">
              {season}
            </span>
          )}
        </div>

        <Link href={`/products/${slug}`}>
          <h3 className="font-display text-navy text-[14px] md:text-[16px] font-black mb-1 hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight leading-tight">
            {name}
          </h3>
        </Link>
        
        <p className={`text-[10px] font-body mb-2 font-black uppercase tracking-widest ${isHero ? "text-primary" : "text-slate/40"}`}>
          {origin}
        </p>

        {flavourProfile && (
          <p className="text-[12px] font-body text-slate italic opacity-60 mb-3 line-clamp-2 leading-snug">
            {flavourProfile}
          </p>
        )}

        <div className="mt-auto space-y-3">
          {/* Price Area */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex flex-col">
               {isB2BOnly ? (
                 <div className="space-y-1">
                   <div className="flex items-center gap-1.5 text-slate/30">
                     <Lock size={12} /> <span className="text-[12px] font-black line-through">$??.??</span>
                   </div>
                   <Link href="/auth/login" className="text-primary text-[10px] font-display font-black uppercase tracking-wider hover:underline leading-none">
                     Login for B2B
                   </Link>
                 </div>
               ) : (
                 <div className="flex items-baseline gap-1">
                   <span className="font-display text-primary text-[18px] font-black leading-none">${price.toFixed(2)}</span>
                   <span className="text-slate text-[10px] font-black opacity-30 uppercase tracking-widest">/{unit.split(' ')[0]}</span>
                 </div>
               )}
            </div>
            
            <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border ${
              isInStock ? "text-green-600 bg-green-50 border-green-100" : "text-red-600 bg-red-50 border-red-100"
            }`}>
              {isInStock ? "In Stock" : "Limited"}
            </div>
          </div>

          {/* Channel Badges - Desktop Only to reduce mobile clutter */}
          <div className="hidden md:flex items-center gap-2">
            {isBoth ? (
              <div className="flex gap-1.5 items-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                 <span className="text-[8px] font-black text-slate/40 uppercase tracking-widest">Retail + Wholesale</span>
              </div>
            ) : (
              <div className="flex gap-1.5 items-center">
                 <div className={`w-1.5 h-1.5 rounded-full ${channels.includes("B2C") ? "bg-green-500" : "bg-navy"}`} />
                 <span className="text-[8px] font-black text-slate/40 uppercase tracking-widest">{channels.includes("B2C") ? "Retail Only" : "Wholesale Only"}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
