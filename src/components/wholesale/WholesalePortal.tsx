"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Package,
  ArrowRight,
  CheckCircle2,
  FileText,
  Building2,
  Users,
  Plus
} from "lucide-react";
import { useState, useRef } from "react";
import { useNotificationStore } from "@/store/useNotificationStore";

const STATS = [
  { label: "Partner Stores", value: "50+", icon: Building2 },
  { label: "Provinces Covered", value: "8", icon: Package },
  { label: "Seasonal Allocation", value: "Priority", icon: BarChart3 },
];

const FEATURES = [
  { title: "Direct Orchard Access", desc: "Skip middle-men with our direct farm partnerships in Ratnagiri and Gujarat." },
  { title: "Dedicated Support", desc: "Every retailer is assigned a season manager for volume allocation." },
  { title: "Cold-Chain Logistics", desc: "Full temperature control from flight to your store's doorstep." },
];

export default function WholesalePortal() {
  const [submitted, setSubmitted] = useState(false);
  const addNotification = useNotificationStore(state => state.addNotification);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const businessName = formData.get("businessName") as string;
    
    // Simulate API call & Trigger Admin Notification
    addNotification({
      type: "success",
      title: "New Wholesale Application",
      message: `New B2B inquiry from ${businessName}. Review volume and logistics.`,
      target: "admin"
    });

    setSubmitted(true);
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('/hero-mango.png')] bg-cover bg-center grayscale" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy to-transparent" />

        <div className="container mx-auto px-4 md:px-8 relative z-20 text-center space-y-8 select-none">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent-gold font-display font-bold text-xs uppercase tracking-[0.4em] block"
          >
            Institutional & Wholesale Partners
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight"
          >
            Scale Your <span className="text-primary italic">Produce</span> Business
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-body-lg max-w-2xl mx-auto font-body"
          >
            Join Canada&apos;s fastest-growing premium food import network. Access exclusive seasonal pricing and priority allocation on Grade-A Indian mangoes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <button 
              onClick={scrollToForm}
              className="px-10 py-5 bg-primary text-white font-display font-bold uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:bg-orange-600 transition-all flex items-center gap-4 group"
            >
              Apply for Wholesale <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Board */}
      <section className="container mx-auto px-4 md:px-8 -mt-20 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATS.map(s => (
            <div key={s.label} className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-soft flex flex-col items-center text-center space-y-3 group hover:border-primary transition-all">
              <div className="w-16 h-16 bg-off-white rounded-[1.5rem] flex items-center justify-center text-primary group-hover:scale-110 transition-transform"><s.icon size={32} /></div>
              <div className="text-4xl font-display font-bold text-navy">{s.value}</div>
              <div className="text-[11px] font-display font-bold text-slate/40 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 md:px-8 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-h2 text-navy">The <span className="text-primary italic">Partnership</span> Advantage</h2>
          <p className="text-slate font-body text-body-lg max-w-xl mx-auto opacity-70">Supply chain excellence built for premium retailers across Canada.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {FEATURES.map((f, i) => (
            <div key={i} className="space-y-6 group">
              <div className="w-14 h-14 bg-navy text-accent-gold rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all"><Plus size={24} /></div>
              <h3 className="text-2xl font-display font-bold text-navy tracking-tight">{f.title}</h3>
              <p className="text-slate font-body text-base leading-relaxed opacity-60">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Application Form */}
      <section id="apply-form" ref={formRef} className="bg-off-white py-24 border-y border-gray-soft">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row items-stretch">
            <div className="lg:w-1/2 p-12 md:p-20 bg-navy text-white space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">Ready to <span className="text-primary italic">Grow</span>?</h2>
                <p className="text-white/60 text-lg font-body leading-relaxed">Fill out our intake form and a dedicated season manager will contact you within 24 hours.</p>
              </div>

              <div className="space-y-6">
                {[
                  "Personalized Pricing Tiers",
                  "Direct Air-Cargo Priority",
                  "Custom Labeling & Packaging",
                  "CFIA & FSSAI Compliance Kits"
                ].map(l => (
                  <div key={l} className="flex items-center gap-4 text-white font-display font-bold text-sm uppercase tracking-widest"><CheckCircle2 size={20} className="text-primary" /> {l}</div>
                ))}
              </div>

              <div className="pt-8 flex items-center gap-6 border-t border-white/5 opacity-40">
                <Users size={32} />
                <p className="text-xs italic leading-relaxed">Trusted by over 50+ retailers and distribution centers across Ontario, BC, and Alberta.</p>
              </div>
            </div>

            <div className="lg:w-1/2 p-12 md:p-20">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={40} /></div>
                  <h3 className="text-h3 text-navy font-bold">Inquiry Sent Successfully</h3>
                  <p className="text-slate font-body text-sm opacity-60">We&apos;ve received your application. Your manager will be in touch soon.</p>
                  <button onClick={() => setSubmitted(false)} className="text-primary font-display font-bold text-xs uppercase tracking-widest hover:underline">Submit another application</button>
                </motion.div>
              ) : (
                <form onSubmit={handleApply} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-display font-bold uppercase tracking-widest text-navy/40 ml-1">Business Name</label>
                      <input name="businessName" required className="w-full h-14 bg-off-white border border-gray-soft rounded-2xl px-6 font-body text-sm outline-none focus:border-primary transition-all text-navy" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-display font-bold uppercase tracking-widest text-navy/40 ml-1">Contact Name</label>
                      <input name="contactName" required className="w-full h-14 bg-off-white border border-gray-soft rounded-2xl px-6 font-body text-sm outline-none focus:border-primary transition-all text-navy" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-display font-bold uppercase tracking-widest text-navy/40 ml-1">Email Address</label>
                    <input name="email" required type="email" className="w-full h-14 bg-off-white border border-gray-soft rounded-2xl px-6 font-body text-sm outline-none focus:border-primary transition-all text-navy" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-display font-bold uppercase tracking-widest text-navy/40 ml-1">Volume Interest (Boxes per Season)</label>
                    <select name="volume" className="w-full h-14 bg-off-white border border-gray-soft rounded-2xl px-6 font-body text-sm outline-none focus:border-primary transition-all text-navy appearance-none cursor-pointer">
                      <option>10 - 50 Boxes</option>
                      <option>50 - 200 Boxes</option>
                      <option>200 - 1000 Boxes</option>
                      <option>1000+ Boxes Institutional</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-display font-bold uppercase tracking-widest text-navy/40 ml-1">Warehouse/Store Location (City, Province)</label>
                    <input name="location" required className="w-full h-14 bg-off-white border border-gray-soft rounded-2xl px-6 font-body text-sm outline-none focus:border-primary transition-all text-navy" />
                  </div>
                  <button className="w-full h-16 bg-primary text-white font-display font-bold uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-4 group active:scale-95">
                    Submit Partnership Request <FileText size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
