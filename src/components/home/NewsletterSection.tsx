"use client";

import { motion } from "framer-motion";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function NewsletterSection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section className="bg-gradient-to-br from-primary to-accent-gold py-16 md:py-24 relative overflow-hidden group">
      {/* Decorative SVG elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none group-hover:bg-white/20 transition-all duration-slow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-navy/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none group-hover:bg-navy/10 transition-all duration-slow" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-14 lg:p-16 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center mx-auto md:mx-0 transform -rotate-6 group-hover:rotate-0 transition-transform">
              <Mail size={32} />
            </div>
            <div className="space-y-4">
              <h2 className="text-h2 text-navy leading-tight">
                Get Seasonal <span className="text-primary italic">Mango Alerts</span>
              </h2>
              <p className="text-slate font-body text-body-lg opacity-70">
                Be the first to know when the Alphonso season opens. Exclusive weekly deals. Zero spam.
              </p>
            </div>
          </div>

          <div className="md:w-1/2 w-full">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-success/5 border border-success/10 rounded-2xl p-8 text-center space-y-4"
              >
                <div className="w-12 h-12 bg-success text-white rounded-full flex items-center justify-center mx-auto mb-4">
                   <CheckCircle2 size={24} />
                </div>
                <h3 className="text-h3 text-navy">You&apos;re on the list!</h3>
                <p className="text-slate font-body text-sm opacity-60">We&apos;ll notify you as soon as the first shipment arrives.</p>
                <button onClick={() => setSubmitted(false)} className="text-primary font-display font-bold text-xs uppercase tracking-widest hover:underline pt-2">Add another email</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Mail size={18} className="text-slate/30 group-focus-within/input:text-primary transition-colors" />
                  </div>
                  <input 
                    required
                    type="email" 
                    placeholder="Enter your email address"
                    className="w-full h-16 md:h-20 bg-off-white border border-gray-soft rounded-[1.5rem] pl-14 pr-32 font-body text-base lg:text-lg focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all outline-none text-navy placeholder:text-slate/30 shadow-inner"
                  />
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="absolute inset-y-2 right-2 px-6 lg:px-10 bg-navy text-white font-display font-bold uppercase tracking-widest rounded-[1.2rem] hover:bg-primary transition-all hover:shadow-xl hover:shadow-primary/20 flex items-center gap-3 text-xs md:text-sm active:scale-95 disabled:opacity-70"
                  >
                    {loading ? "Joining..." : "Notify Me"}
                    {!loading && <ArrowRight size={16} className="hidden sm:inline" />}
                  </button>
                </div>
                <p className="text-[11px] text-center md:text-left text-slate font-body opacity-40 ml-2 italic">
                  * By subscribing, you agree to receive marketing notifications from Headstart Foods Inc.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
