"use client";

import { motion } from "framer-motion";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingCart, 
  ArrowRight, 
  ShoppingBag, 
  ChevronRight,
  ShieldCheck,
  Truck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const { items, removeItem, updateQty } = useCartStore();

  const subtotal = items.reduce((acc: number, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15.00;
  const tax = subtotal * 0.12; 
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8">
         <div className="w-24 h-24 bg-off-white rounded-full flex items-center justify-center text-slate/20"><ShoppingBag size={48} /></div>
         <div className="space-y-2">
            <h2 className="text-h2 text-navy">Your cart is currenty empty.</h2>
            <p className="text-slate font-body opacity-60">Looks like you haven&apos;t added any premium perishables yet.</p>
         </div>
         <Link href="/products" className="px-10 py-5 bg-primary text-white font-display font-bold uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:bg-orange-600 transition-all flex items-center gap-4 group active:scale-95">
           Browse the Catalogue <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
         </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 md:py-24 pb-32 md:pb-24">
      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
        
        {/* Items List */}
        <div className="lg:w-[65%] w-full space-y-12">
          <div className="space-y-4 pb-10 border-b border-gray-100">
            <nav className="flex items-center gap-2 text-[10px] font-display font-black text-slate/20 uppercase tracking-[0.25em] mb-4">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="opacity-50">/</span>
              <span className="text-navy">Checkout Basket</span>
            </nav>
            <h1 className="text-display text-navy leading-[0.9] uppercase tracking-tighter">Your <span className="text-primary italic">Basket</span></h1>
            <div className="w-12 h-1 bg-primary rounded-full" />
            <p className="text-[12px] font-display font-black text-slate/40 uppercase tracking-[0.2em]">Ready for premium seasonal delivery</p>
          </div>

          <div className="space-y-10">
            {items.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 md:p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <div className="aspect-square w-full sm:w-32 relative bg-off-white rounded-2xl shrink-0 overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent z-10" />
                   <Image src={item.image} alt={item.name} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                <div className="flex-1 space-y-2 w-full">
                  <div className="flex items-center gap-2">
                     <span className="px-3 py-1 bg-navy text-accent-gold text-[9px] font-display font-black uppercase tracking-widest rounded-full shadow-lg shadow-navy/10">Season Selection</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-black text-navy uppercase tracking-tight leading-tight">{item.name}</h3>
                  <div className="text-[10px] font-display font-black text-slate/40 uppercase tracking-[0.25em]">{item.variant}</div>
                  <div className="sm:hidden font-display font-black text-2xl text-primary mt-4">${item.price.toFixed(2)}</div>
                </div>

                <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-6 sm:pt-0">
                   <div className="h-14 bg-off-white/80 border border-gray-100 rounded-xl flex items-center px-2 gap-4 shadow-inner">
                      <button 
                        onClick={() => updateQty(item.id, -1)} 
                        className="w-10 h-10 flex items-center justify-center text-navy hover:text-primary transition-all active:scale-90"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} strokeWidth={3} />
                      </button>
                      <span className="w-8 text-center font-display font-black text-lg text-navy">{item.quantity}</span>
                      <button 
                        onClick={() => updateQty(item.id, 1)} 
                        className="w-10 h-10 flex items-center justify-center text-navy hover:text-primary transition-all active:scale-90"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                   </div>
                   
                   <div className="hidden sm:block text-right min-w-[120px]">
                      <div className="font-display font-black text-2xl text-navy tracking-tighter">${(item.price * item.quantity).toFixed(2)}</div>
                      <div className="text-[11px] font-body text-slate/40 font-black uppercase tracking-wider">${item.price.toFixed(2)} each</div>
                   </div>

                   <button 
                     onClick={() => removeItem(item.id)}
                     className="w-12 h-12 flex items-center justify-center text-slate/20 hover:text-error transition-all active:scale-90"
                     aria-label="Remove item"
                   >
                     <Trash2 size={22} />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>

          <Link href="/products" className="inline-flex items-center gap-3 text-navy hover:text-primary font-display font-black text-[10px] uppercase tracking-[0.3em] group border-b-2 border-transparent hover:border-primary pb-2 transition-all mt-8 ml-2">
             <ChevronRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Continue Shopping
          </Link>
        </div>

        {/* Summary Right */}
        <aside className="lg:w-[35%] w-full">
           <div className="bg-navy rounded-[2.5rem] p-8 md:p-12 shadow-2xl space-y-12 text-white relative overflow-hidden group/card sticky top-32">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover/card:bg-primary/20 transition-all duration-1000" />
              
              <div className="space-y-8">
                 <div className="flex items-center justify-between border-b border-white/10 pb-8">
                    <h2 className="text-[11px] uppercase tracking-[0.4em] text-white/40 font-display font-black">Order Summary</h2>
                    <ShoppingCart size={18} className="text-primary" />
                 </div>
                 
                 <div className="space-y-5">
                    <div className="flex justify-between text-white/60 font-body text-sm font-medium">
                       <span className="uppercase tracking-widest text-[10px]">Subtotal</span>
                       <span className="text-white font-display font-black">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/60 font-body text-sm font-medium">
                       <span className="uppercase tracking-widest text-[10px]">Shipping (Standard)</span>
                       <span className={shipping === 0 ? "text-emerald-400 font-display font-black uppercase text-[10px] tracking-[0.2em]" : "text-white font-display font-black"}>
                          {shipping === 0 ? "Free Delivery" : `$${shipping.toFixed(2)}`}
                       </span>
                    </div>
                    <div className="flex justify-between text-white/60 font-body text-sm font-medium">
                       <span className="uppercase tracking-widest text-[10px]">Tax (BC - 12%)</span>
                       <span className="text-white font-display font-black">${tax.toFixed(2)}</span>
                    </div>
                 </div>
              </div>

              <div className="space-y-10 pt-10 border-t border-white/10">
                 <div className="flex justify-between items-end">
                    <div className="space-y-1">
                       <span className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-display font-black">Total Payable</span>
                       <div className="text-[10px] text-white/20 font-body italic opacity-60">Secure Checkout in CAD</div>
                    </div>
                    <div className="text-5xl font-display font-black text-accent-gold tracking-tighter">${total.toFixed(2)}</div>
                 </div>

                 <Link 
                   href="/checkout"
                   className="w-full h-20 bg-primary text-white font-display font-black uppercase tracking-[0.3em] text-[12px] rounded-2xl shadow-2xl shadow-primary/40 hover:bg-orange-600 transition-all flex items-center justify-center gap-5 group active:scale-95"
                 >
                    Checkout Now <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-500" />
                 </Link>

                 <div className="space-y-5 pt-4">
                    <div className="flex items-center gap-4 text-white/30 text-[9px] font-display font-black uppercase tracking-[0.3em]">
                       <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center">
                          <ShieldCheck size={16} className="text-primary" />
                       </div>
                       SSL Secure Protocol Active
                    </div>
                    <div className="flex items-center gap-4 text-white/30 text-[9px] font-display font-black uppercase tracking-[0.3em]">
                       <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center">
                          <Truck size={16} className="text-primary" />
                       </div>
                       Air Shipment (72h Guarantee)
                    </div>
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
