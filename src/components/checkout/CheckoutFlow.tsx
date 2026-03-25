"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  MapPin, 
  Truck, 
  CreditCard, 
  ArrowRight, 
  Lock, 
  ChevronRight,
  ShieldCheck,
  ShoppingBag
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";

type Step = "address" | "shipping" | "payment" | "success";

export default function CheckoutFlow() {
  const { items, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const [step, setStep] = useState<Step>("address");
  const [loading, setLoading] = useState(false);
  const [, setCoords] = useState<{lat: number, lng: number} | null>(null);
  
  // Form States
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [selectedShipping, setSelectedShipping] = useState("std");
  const [cardNumber, setCardNumber] = useState("");

  const [orderId] = useState(() => `HEADS-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = selectedShipping === "std" ? 15.00 : 35.00;
  const tax = subtotal * 0.12;
  const total = subtotal + shippingCost + tax;

  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const parts = [];
    for (let i=0, len=value.length; i<len; i+=4) {
      parts.push(value.substring(i, i+4));
    }
    setCardNumber(parts.join(' '));
  };

  const nextStep = (target: Step) => {
    setLoading(true);
    
    // Geolocation capture if moving to shipping
    if (target === "shipping" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      }, (err) => console.log("Geo error", err));
    }

    if (target === "success") {
      addOrder({
        id: orderId,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
        items: items.map(i => ({ ...i })),
        total: total,
        status: 'pending',
        paymentStatus: 'pending',
        shippingAddress: 'Current Session Address',
        customerName: 'Guest Session',
        customerPhone: `${countryCode} ${phone}`
      });
      // clearCart();
    }

    setTimeout(() => {
      setLoading(false);
      setStep(target);
      if (target === "success") clearCart();
    }, 1200);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-24">
      {items.length === 0 && step !== "success" ? (
        <div className="max-w-2xl mx-auto py-20 text-center space-y-8">
           <div className="w-24 h-24 bg-off-white rounded-full flex items-center justify-center mx-auto text-slate/20">
              <ShoppingBag size={48} />
           </div>
           <div className="space-y-4">
              <h2 className="text-h2 text-navy">Your cart is <span className="text-primary italic">Empty</span></h2>
              <p className="text-slate font-body text-lg opacity-60">You haven't added any premium perishables to your selection yet.</p>
           </div>
           <Link href="/products" className="inline-flex items-center gap-4 h-16 px-10 bg-navy text-white font-display font-bold uppercase tracking-widest rounded-2xl hover:bg-black transition-all">
              Browse Catalog <ArrowRight size={20} />
           </Link>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Main Step Flow Left */}
          <div className="lg:w-[60%] w-full space-y-12">
            {/* Step Indicators */}
            <div className="flex items-center gap-4 border-b border-gray-soft pb-8 scroll-x-auto">
              {[
                { id: "address", label: "Address", icon: MapPin },
                { id: "shipping", label: "Shipping", icon: Truck },
                { id: "payment", label: "Payment", icon: CreditCard }
              ].map((s, i) => (
                <div key={s.id} className="flex items-center gap-4 shrink-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${step === s.id ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" : "bg-off-white text-slate/30"}`}>
                      <s.icon size={18} />
                    </div>
                    <span className={`text-[11px] font-display font-bold uppercase tracking-widest ${step === s.id ? "text-navy" : "text-slate/30"}`}>{s.label}</span>
                    {i < 2 && <ChevronRight size={14} className="text-slate/20 mx-2" />}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === "address" && (
                <motion.div 
                  key="address"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div className="space-y-4">
                    <h2 className="text-h2 text-navy leading-none">Who are we <span className="text-primary italic">Shipping</span> to?</h2>
                    <p className="text-slate font-body text-sm opacity-60">We deliver across all Canadian provinces including BC, AB, ON, and QC.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-display font-bold uppercase tracking-widest text-navy/40 ml-1">Email Address</label>
                      <div className="relative group">
                        <input type="email" placeholder="you@example.ca" className="w-full h-14 bg-off-white border border-gray-soft rounded-2xl px-6 font-body text-base outline-none focus:border-primary transition-all text-navy" />
                      </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-display font-bold uppercase tracking-widest text-navy/40 ml-1">Phone Number</label>
                        <div className="flex gap-2">
                          <select 
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="h-14 bg-off-white border border-gray-soft rounded-2xl px-3 font-display font-bold text-xs outline-none focus:border-primary text-navy"
                          >
                            <option value="+1">🇨🇦 +1</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+61">🇦🇺 +61</option>
                          </select>
                          <input 
                            type="tel" 
                            placeholder="10 Digits" 
                            maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                            className="flex-1 h-14 bg-off-white border border-gray-soft rounded-2xl px-6 font-body text-base outline-none focus:border-primary transition-all text-navy" 
                          />
                        </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[11px] font-display font-bold uppercase tracking-widest text-navy/40 ml-1">Full Shipping Address</label>
                      <input placeholder="Suite, Street, City" className="w-full h-14 bg-off-white border border-gray-soft rounded-2xl px-6 font-body text-base outline-none focus:border-primary transition-all text-navy" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-display font-bold uppercase tracking-widest text-navy/40 ml-1">Province</label>
                      <select className="w-full h-14 bg-off-white border border-gray-soft rounded-2xl px-6 font-body text-base outline-none focus:border-primary transition-all text-navy appearance-none cursor-pointer">
                          <option>British Columbia</option>
                          <option>Ontario</option>
                          <option>Alberta</option>
                          <option>Quebec</option>
                          <option>Manitoba</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-display font-bold uppercase tracking-widest text-navy/40 ml-1">Postal Code</label>
                      <input placeholder="A1B 2C3" className="w-full h-14 bg-off-white border border-gray-soft rounded-2xl px-6 font-body text-base outline-none focus:border-primary transition-all text-navy" />
                    </div>
                  </div>

                  <button 
                    onClick={() => nextStep("shipping")}
                    disabled={loading}
                    className="w-full h-16 bg-navy text-white font-display font-bold uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-navy/20 hover:bg-black transition-all flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {loading ? "Saving Details..." : "Proceed to Shipping"}
                    {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                  </button>
                </motion.div>
              )}

              {step === "shipping" && (
                <motion.div 
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div className="space-y-4">
                    <h2 className="text-h2 text-navy leading-none">Choose <span className="text-primary italic">Delivery Method</span></h2>
                    <p className="text-slate font-body text-sm opacity-60">All fruit is air-imported for maximum freshness.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { id: "std", label: "Standard Air Parcel", price: "$15.00", time: "3-5 Business Days", best: false },
                      { id: "exp", label: "Priority Express (Cold Chain)", price: "$35.00", time: "1-2 Business Days", best: true }
                    ].map(method => (
                      <div 
                        key={method.id} 
                        onClick={() => setSelectedShipping(method.id)}
                        className={`p-6 bg-white border rounded-3xl transition-all cursor-pointer group flex items-center justify-between shadow-sm hover:shadow-md ${selectedShipping === method.id ? "border-primary ring-1 ring-primary/20" : "border-gray-soft hover:border-primary"}`}
                      >
                          <div className="flex items-center gap-6">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedShipping === method.id ? "border-primary" : "border-slate/20"}`}>
                              <div className={`w-3 h-3 rounded-full bg-primary transition-opacity ${selectedShipping === method.id ? "opacity-100" : "opacity-0"}`} />
                            </div>
                            <div className="space-y-1">
                              <span className="font-display font-bold text-lg text-navy">{method.label}</span>
                              <div className="text-[11px] font-body text-slate opacity-40 uppercase tracking-widest">{method.time}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-display font-bold text-xl text-primary">{method.price}</div>
                            {method.best && <span className="text-[9px] font-display font-bold uppercase tracking-widest bg-success/10 text-success px-2 py-0.5 rounded-full">Recommended</span>}
                          </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <button onClick={() => setStep("address")} className="h-16 px-8 border border-gray-soft text-navy font-display font-bold uppercase tracking-widest rounded-2xl hover:bg-off-white transition-all">Back</button>
                    <button 
                      onClick={() => nextStep("payment")}
                      disabled={loading}
                      className="flex-1 h-16 bg-navy text-white font-display font-bold uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-navy/20 hover:bg-black transition-all flex items-center justify-center gap-4 group active:scale-95"
                    >
                      {loading ? "Updating..." : "Proceed to Payment"}
                      {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div 
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div className="space-y-4">
                    <h2 className="text-h2 text-navy leading-none">Security <span className="text-primary italic">Checkout</span></h2>
                    <p className="text-slate font-body text-sm opacity-60">Your payment information is encrypted and SSL secure.</p>
                  </div>

                  <div className="bg-off-white border border-gray-soft rounded-[2rem] p-8 md:p-10 space-y-8">
                    <div className="flex items-center justify-between pb-6 border-b border-gray-soft/50">
                        <div className="flex items-center gap-4">
                          <CreditCard size={24} className="text-primary" />
                          <span className="font-display font-bold text-lg text-navy uppercase tracking-widest">Secure Credit Card</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-10 h-6 bg-white border border-gray-soft rounded" />
                          <div className="w-10 h-6 bg-white border border-gray-soft rounded" />
                          <div className="w-10 h-6 bg-white border border-gray-soft rounded" />
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[11px] font-display font-bold uppercase tracking-widest text-navy/40 ml-1">Card Number</label>
                            <div className="relative">
                              <input 
                                value={cardNumber}
                                onChange={handleCardInput}
                                maxLength={19}
                                placeholder="●●●● ●●●● ●●●● ●●●●" 
                                className="w-full h-14 bg-white border border-gray-soft rounded-2xl px-6 font-body text-base outline-none focus:border-primary transition-all text-navy" 
                              />
                              <Lock size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate/20" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[11px] font-display font-bold uppercase tracking-widest text-navy/40 ml-1">Expiry Date</label>
                            <input placeholder="MM / YY" className="w-full h-14 bg-white border border-gray-soft rounded-2xl px-6 font-body text-base outline-none focus:border-primary transition-all text-navy" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-display font-bold uppercase tracking-widest text-navy/40 ml-1">CVV</label>
                            <input placeholder="•••" className="w-full h-14 bg-white border border-gray-soft rounded-2xl px-6 font-body text-base outline-none focus:border-primary transition-all text-navy" />
                          </div>
                        </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button onClick={() => setStep("shipping")} className="h-16 px-8 border border-gray-soft text-navy font-display font-bold uppercase tracking-widest rounded-2xl hover:bg-off-white transition-all">Back</button>
                    <button 
                      onClick={() => nextStep("success")}
                      disabled={loading}
                      className="flex-1 h-16 bg-primary text-white font-display font-bold uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-4 group active:scale-95"
                    >
                      {loading ? "Validating Card..." : "Pay & Place Order"}
                      <ArrowRight size={20} className={loading ? "hidden" : "group-hover:translate-x-1 transition-transform"} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 md:py-20 text-center space-y-8"
                >
                  <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-500">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-h2 text-navy">Order <span className="text-primary italic">Confirmed!</span></h2>
                    <p className="text-slate font-body text-lg max-w-sm mx-auto opacity-70">Thank you for Choosing Headstart Foods. Your perishables are being allocated.</p>
                  </div>
                  
                  <div className="bg-off-white rounded-3xl p-8 max-w-sm mx-auto border border-gray-soft space-y-4">
                    <div className="text-[10px] font-display font-bold uppercase tracking-widest text-slate/40">Order Number</div>
                    <div className="text-2xl font-display font-bold text-navy tracking-tight">{orderId}</div>
                    <Link href={`/track/${orderId}`} className="text-primary font-display font-bold text-xs uppercase tracking-widest hover:underline block">Track Shipent</Link>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center">
                    <Link href="/products" className="px-8 py-5 bg-navy text-white font-display font-bold uppercase tracking-widest rounded-2xl hover:bg-black transition-all text-xs">Shop More</Link>
                    <Link href="/dashboard" className="px-8 py-5 border border-gray-soft text-navy font-display font-bold uppercase tracking-widest rounded-2xl hover:bg-off-white transition-all text-xs">View Account</Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar Right */}
          <aside className="lg:w-[40%] w-full h-fit">
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-gray-soft space-y-10 sticky top-24">
                <div className="flex items-center gap-3 border-b border-gray-soft pb-6">
                  <ShoppingBag size={20} className="text-primary" />
                  <h3 className="font-display font-bold text-lg text-navy uppercase tracking-widest">Order Summary</h3>
                </div>

                <div className="max-h-64 overflow-y-auto pr-4 space-y-6">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 group">
                        <div className="w-16 h-16 bg-off-white rounded-xl relative shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="font-display font-bold text-sm text-navy truncate">{item.name}</div>
                          <div className="text-[10px] text-slate/40 uppercase tracking-widest font-body">{item.variant} × {item.quantity}</div>
                        </div>
                        <div className="font-display font-bold text-sm text-navy">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 pt-6 border-t border-gray-soft">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex justify-between text-sm font-body text-slate opacity-60">
                          <span>Subtotal</span>
                          <span className="text-navy font-display font-bold">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-body text-slate opacity-60">
                          <span>Shipping ({selectedShipping === "std" ? "Standard" : "Express"})</span>
                          <span className="text-navy font-display font-bold">${shippingCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-body text-slate opacity-60">
                          <span>Estimated Tax (12%)</span>
                          <span className="text-navy font-display font-bold">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-end pt-4 border-t border-gray-soft">
                          <span className="font-display font-bold text-navy uppercase tracking-widest text-xs">Total</span>
                          <span className="text-3xl font-display font-bold text-primary">${total.toFixed(2)}</span>
                      </div>
                    </div>

                  <div className="flex items-center gap-3 p-4 bg-off-white rounded-2xl">
                      <ShieldCheck size={18} className="text-success" />
                      <p className="text-[10px] text-slate/60 font-body leading-relaxed">Your transaction is protected. We use industry-standard encryption to secure your data.</p>
                  </div>
                </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
