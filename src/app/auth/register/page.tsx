"use client";

import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
      {/* Visual Side */}
      <div className="hidden md:flex md:w-1/2 bg-[#8B1D21] relative items-center justify-center p-20 overflow-hidden">
         <div className="absolute inset-0 opacity-30">
            <img 
               src="https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=1600" 
               alt="Harvest Field" 
               className="w-full h-full object-cover"
            />
         </div>
         <div className="absolute inset-0 bg-gradient-to-br from-[#8B1D21] via-[#8B1D21]/90 to-transparent" />
         
         <div className="relative z-10 space-y-12 max-w-lg">
            <Link href="/" className="flex items-center gap-2 group text-white/60 hover:text-white transition-colors mb-20 inline-flex">
               <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
               <span className="text-[10px] font-display font-black uppercase tracking-[0.2em] shadow-sm">Back to Sanctuary</span>
            </Link>

            <div className="space-y-6">
               <div className="w-16 h-1 bg-white" />
               <h1 className="text-5xl font-display font-black text-white leading-[1.1] uppercase tracking-tighter text-left">
                  Join the <br/><span className="text-white/40 italic">Global Harvest.</span>
               </h1>
               <p className="text-white/60 font-body text-sm leading-relaxed max-w-sm text-left">
                  Register today to unlock B2B pricing leverage, seasonal drop alerts, and full vertical traceability of India&apos;s finest perishables.
               </p>
            </div>

            <div className="pt-12 grid grid-cols-2 gap-8 border-t border-white/10">
               <div className="space-y-1 text-left">
                  <div className="text-2xl font-display font-black text-white uppercase italic">Private</div>
                  <div className="text-[9px] font-black text-white/40 uppercase tracking-widest font-display shadow-sm uppercase">Wholesale Pricing</div>
               </div>
               <div className="space-y-1 text-left">
                  <div className="text-2xl font-display font-black text-white uppercase italic">Early</div>
                  <div className="text-[9px] font-black text-white/40 uppercase tracking-widest font-display shadow-sm uppercase">Seasonal Access</div>
               </div>
            </div>
         </div>

         {/* Floating Elements */}
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           className="absolute -bottom-20 -right-20 w-64 h-64 border border-white/5 rounded-full flex items-center justify-center"
         >
            <div className="w-48 h-48 border border-white/10 rounded-full flex items-center justify-center">
               <BadgeCheck className="text-white opacity-20" size={48} />
            </div>
         </motion.div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-20 relative bg-[#F8F9FA]">
         <div className="w-full max-w-lg">
            <div className="mb-12 text-center md:text-left">
               <div className="md:hidden flex justify-center mb-8">
                  <span className="font-display font-black text-2xl text-navy tracking-tight">Headstart</span>
               </div>
               <h2 className="text-3xl font-display font-black text-navy uppercase tracking-tight">Create <span className="text-[#8B1D21] italic">Account</span></h2>
               <p className="text-sm font-body text-slate/40 mt-2 font-medium">Initialize your partnership with Headstart Foods.</p>
            </div>

            <RegisterForm />

            <div className="mt-12 text-center">
               <p className="text-[10px] font-display font-black text-slate/20 uppercase tracking-[0.2em]">
                  Partnership Protocol Integrated v4.0
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
