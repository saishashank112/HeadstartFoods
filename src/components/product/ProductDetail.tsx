"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  MapPin, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Share2, 
  Truck, 
  CheckCircle2,
  Info
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";

const MOCK_PRODUCT = {
  name: "Premium Alphonso Mangoes",
  slug: "premium-alphonso-mangoes",
  price: 45.99,
  origin: "Ratnagiri, Maharashtra, India",
  description: "Known as the 'King of Mangoes', our Alphonso mangoes are sourced directly from the coastal orchards of Ratnagiri. Each fruit is hand-picked at peak maturity, ripened naturally without chemicals, and air-shipped to Canada within 72 hours of harvest.",
  features: [
    "Grade A Export Quality",
    "Naturally Ripened",
    "Sustainably Farmed",
    "CFIA Cleared",
  ],
  variants: [
    { id: "v1", name: "Box of 12", price: 45.99, stock: 45 },
    { id: "v2", name: "Box of 6", price: 24.99, stock: 120 },
    { id: "v3", name: "Single Sample", price: 4.99, stock: 300 },
  ],
  wholesale: [
    { qty: "5+ Boxes", price: 39.99 },
    { qty: "20+ Boxes", price: 34.99 },
    { qty: "50+ Boxes", price: 0 }, // Inquiry only
  ],
};

export default function ProductDetail() {
  const [selectedVariant, setSelectedVariant] = useState(MOCK_PRODUCT.variants[0]);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "trace" | "wholesale">("details");
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: MOCK_PRODUCT.slug + "-" + selectedVariant.id,
      name: MOCK_PRODUCT.name,
      price: selectedVariant.price,
      image: "/mango-alphonso.png",
      variant: selectedVariant.name
    }, qty);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/checkout";
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-24">
      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
        
        {/* Gallery Left */}
        <div className="lg:w-1/2 w-full space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-soft group"
          >
            <Image 
              src="/mango-alphonso.png" 
              alt={MOCK_PRODUCT.name} 
              fill 
              className="object-contain p-12 group-hover:scale-105 transition-transform duration-slow" 
            />
            <div className="absolute top-6 right-6 flex flex-col gap-3">
               <button className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-navy shadow-lg hover:bg-primary hover:text-white transition-all"><Share2 size={18} /></button>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
               <div key={i} className={`aspect-square relative bg-white rounded-2xl border transition-all cursor-pointer ${i === 1 ? "border-primary shadow-inner" : "border-gray-soft hover:border-navy"}`}>
                  <Image src="/mango-alphonso.png" alt="" fill className="object-contain p-4 opacity-50 transition-opacity hover:opacity-100" />
               </div>
             ))}
          </div>
        </div>

        {/* Content Right */}
        <div className="lg:w-1/2 w-full space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-success/10 text-success text-[10px] font-display font-bold uppercase tracking-widest rounded-full">In Stock</span>
              <span className="px-3 py-1 bg-navy text-accent-gold text-[10px] font-display font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5"><ShieldCheck size={12}/> Premium Grade</span>
            </div>
            <h1 className="text-h1 text-navy leading-tight">{MOCK_PRODUCT.name}</h1>
            <div className="flex items-center gap-4 text-slate text-sm font-body">
              <div className="flex items-center gap-1.5"><MapPin size={16} className="text-primary"/> {MOCK_PRODUCT.origin}</div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-soft"/>
              <div className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-primary"/> CFIA Cleared</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-display font-bold text-navy">${selectedVariant.price}</span>
              <span className="text-slate/40 line-through text-lg font-body">$54.99</span>
              <span className="text-primary font-display font-bold text-sm ml-2">SAVE 15%</span>
            </div>
            
            <div className="space-y-4 bg-off-white rounded-[1.5rem] p-6 border border-gray-soft">
               <label className="text-[11px] font-display font-bold uppercase tracking-widest text-navy/40 ml-1">Select Size / Box Count</label>
               <div className="flex flex-wrap gap-3">
                  {MOCK_PRODUCT.variants.map(v => (
                    <button 
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-6 py-3.5 rounded-xl font-display font-bold text-xs transition-all border ${selectedVariant.id === v.id ? "bg-navy text-accent-gold border-navy shadow-lg" : "bg-white border-gray-soft text-navy hover:border-navy"}`}
                    >
                      {v.name}
                    </button>
                  ))}
               </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <div className="h-16 bg-white border border-gray-soft rounded-2xl flex items-center px-2 gap-4 shadow-sm">
                 <button onClick={() => setQty(Math.max(1, qty-1))} className="w-10 h-10 flex items-center justify-center text-navy hover:text-primary active:scale-90 transition-all"><Minus size={18}/></button>
                 <span className="w-8 text-center font-display font-bold text-lg">{qty}</span>
                 <button onClick={() => setQty(qty+1)} className="w-10 h-10 flex items-center justify-center text-navy hover:text-primary active:scale-90 transition-all"><Plus size={18}/></button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-1 h-16 bg-white border border-primary text-primary font-display font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-primary/5 transition-all flex items-center justify-center gap-4 group active:scale-95"
              >
                <ShoppingCart size={20} className="group-hover:rotate-12 transition-transform" />
                Add to Cart
              </button>
            </div>
            
            <button 
              onClick={handleBuyNow}
              className="w-full h-16 bg-primary text-white font-display font-bold uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-primary/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-4 group active:scale-95"
            >
              Buy Now
            </button>
          </div>

          {/* Details & Traceability Tabs */}
          <div className="border-t border-gray-soft pt-10 space-y-8">
             <div className="flex gap-8 border-b border-gray-soft">
                {["details", "trace", "wholesale"].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as "details" | "trace" | "wholesale")}
                    className={`pb-4 font-display font-bold text-xs uppercase tracking-widest transition-all relative ${activeTab === tab ? "text-navy" : "text-slate/40 hover:text-navy"}`}
                  >
                    {tab}
                    {activeTab === tab && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full" />}
                  </button>
                ))}
             </div>

             <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                   {activeTab === "details" && (
                     <>
                       <p className="text-slate text-base font-body leading-relaxed opacity-80">{MOCK_PRODUCT.description}</p>
                       <div className="grid grid-cols-2 gap-4">
                          {MOCK_PRODUCT.features.map(f => (
                            <div key={f} className="flex items-center gap-2.5 text-navy font-display font-bold text-[13px]"><CheckCircle2 size={16} className="text-success" /> {f}</div>
                          ))}
                       </div>
                       <div className="flex items-center justify-between p-4 bg-off-white rounded-xl text-xs font-body italic opacity-60"><div className="flex items-center gap-2"><Truck size={14} /> Fresh Delivery Across Canada</div> 72h-Fresh Guarantee</div>
                     </>
                   )}

                   {activeTab === "trace" && (
                     <div className="space-y-6">
                        <div className="p-6 bg-navy rounded-2xl text-white space-y-4 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-all duration-slow" />
                           <h4 className="font-display font-bold text-lg">Trace Batch Origin</h4>
                           <p className="text-sm font-body opacity-60">Enter the batch code printed on your box lid to view orchard details, harvest time, and CFIA clearance status.</p>
                           <div className="relative group/input">
                              <input placeholder="e.g. RAT-ALPH-2026-X12" className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 font-body text-base outline-none focus:border-primary transition-all text-white" />
                              <button className="absolute right-2 top-2 h-10 px-4 bg-primary text-white font-display font-bold text-[10px] uppercase tracking-widest rounded-lg hover:bg-orange-600">Trace</button>
                           </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 border border-gray-soft rounded-xl">
                           <Info size={18} className="text-primary shrink-0 mt-0.5" />
                           <p className="text-xs text-slate font-body leading-relaxed">Headstart Foods supports 100% end-to-end traceability for all perishable shipments. Every batch is certified Grade-A and cleared by the CFIA before dispatch.</p>
                        </div>
                     </div>
                   )}

                   {activeTab === "wholesale" && (
                     <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-3">
                           {MOCK_PRODUCT.wholesale.map((tier, i) => (
                             <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-soft rounded-xl hover:border-primary transition-colors cursor-pointer group">
                                <div className="space-y-1">
                                   <span className="font-display font-bold text-sm text-navy">{tier.qty}</span>
                                   <div className="text-[10px] text-slate opacity-40 uppercase tracking-widest font-body">Tier {i+1} Pricing</div>
                                </div>
                                <span className="font-display font-extrabold text-lg text-primary">{tier.price > 0 ? `$${tier.price}` : "Inquire"}</span>
                             </div>
                           ))}
                        </div>
                        <button 
                          onClick={() => window.location.href = "/wholesale#apply-form"}
                          className="w-full h-14 bg-navy text-white font-display font-black uppercase tracking-widest rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-3 active:scale-95 shadow-lg"
                        >
                          Become a Wholesale Partner
                        </button>
                     </div>
                   )}
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
