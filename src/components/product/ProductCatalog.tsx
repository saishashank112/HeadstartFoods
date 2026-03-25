"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShoppingBag } from "lucide-react";
import { useState, useMemo } from "react";
import ProductCard from "@/components/shared/ProductCard";
import MangoHeroBanner from "./MangoHeroBanner";
import { CATEGORIES } from "@/data/products";
import { useProductStore } from "@/store/useProductStore";

const SORT_OPTIONS = [
  { id: "newest", label: "Newest Arrivals" },
  { id: "low-high", label: "Price: Low to High" },
  { id: "high-low", label: "Price: High to Low" },
  { id: "popularity", label: "Popularity" }
];

function CategoryDivider({ category, count }: { category: any; count: number }) {
  if (category.id === "all" || category.id === "mangoes") return null;

  return (
    <div className="w-full h-12 flex items-center justify-between border-b border-gray-soft mt-10 mb-6 group">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.accent || '#F59E0B' }} />
        <h3 className="font-display font-black text-lg md:text-xl text-navy uppercase tracking-tighter leading-none">
          {category.name}
        </h3>
        <span className="text-slate/40 font-body text-[10px] md:text-xs font-medium tracking-wide">
          ({count})
        </span>
      </div>
      <button className="text-primary font-display font-black text-[10px] uppercase tracking-widest hover:underline transition-all">
        View All →
      </button>
    </div>
  );
}

export default function ProductCatalog() {
  const { products } = useProductStore();
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSort, setCurrentSort] = useState("newest");

  const sortedProducts = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "all") {
      list = list.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase().replace(/-/g, ' ')));
    }
    
    return list.sort((a, b) => {
      if (currentSort === "low-high") return a.price - b.price;
      if (currentSort === "high-low") return b.price - a.price;
      return 0;
    });
  }, [activeCategory, currentSort, products]);

  const groupedProducts = useMemo(() => {
    if (activeCategory !== "all") return [];
    return CATEGORIES
      .filter(cat => cat.id !== "all")
      .map(cat => ({
        category: cat,
        items: sortedProducts.filter(p => p.category.toLowerCase().includes(cat.id.toLowerCase().replace(/-/g, ' ')))
      }));
  }, [activeCategory, sortedProducts]);

  return (
    <div className="container mx-auto px-4 md:px-8 pt-12 md:pt-20 pb-24 md:pb-12">
      {/* Tab Navigation */}
      <div className="mb-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 border-b border-gray-100">
          <div className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex items-center gap-8 md:gap-10 min-w-max">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); }}
                  className={`relative flex items-center justify-center min-h-[48px] px-1 font-display font-black text-[11px] md:text-[12px] uppercase tracking-[0.3em] transition-all whitespace-nowrap ${
                    activeCategory === cat.id ? "text-primary" : "text-navy/40 hover:text-navy"
                  }`}
                >
                  {cat.name}
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="active-nav-line"
                      className="absolute -bottom-0.5 left-0 right-0 h-[3px] bg-primary rounded-full z-10"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 py-3 md:py-0">
            <div className="relative group w-full md:min-w-[180px]">
              <select
                value={currentSort}
                onChange={(e) => setCurrentSort(e.target.value)}
                className="appearance-none w-full h-12 bg-white border border-gray-100 rounded-xl pl-4 pr-10 font-display font-black text-[10px] md:text-[11px] uppercase tracking-widest text-navy outline-none cursor-pointer hover:border-primary transition-all shadow-sm"
              >
                {SORT_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate/40 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content Header */}
        {activeCategory !== "all" && (
          <div className="space-y-6 mb-12 mt-4">
            <nav className="flex items-center gap-2 text-[10px] font-display font-black text-slate/20 uppercase tracking-[0.25em]">
              <a href="/" className="hover:text-primary">Home</a>
              <span className="opacity-50">/</span>
              <span className="text-navy">{CATEGORIES.find(c => c.id === activeCategory)?.name}</span>
            </nav>
            <div className="space-y-4">
              <h2 className="text-display font-display font-black text-navy uppercase tracking-tighter leading-[0.9]">
                OUR <span className="text-primary italic">{CATEGORIES.find(c => c.id === activeCategory)?.name}</span>
              </h2>
              <div className="w-12 h-1 bg-primary rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Main Grid Flow */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + currentSort + products.length}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            {sortedProducts.length === 0 ? (
              <div className="py-20 text-center space-y-6">
                 <ShoppingBag size={48} className="mx-auto text-slate/20" />
                 <p className="font-display font-bold text-navy opacity-40 uppercase tracking-widest">No products in this category yet</p>
              </div>
            ) : (
              <>
                {(activeCategory === "all" || activeCategory === "fresh-fruits") && <MangoHeroBanner />}
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mb-16">
                   {sortedProducts.map(p => (
                     <ProductCard 
                        key={p.id} 
                        name={p.name}
                        slug={p.slug}
                        price={p.price}
                        unit="kg"
                        origin={p.origin}
                        image={p.image}
                        channels={["B2C", "B2B"]}
                     />
                   ))}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
