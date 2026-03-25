"use client";

import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
      {/* Visual Side */}
      <div className="hidden md:flex md:w-1/2 bg-navy relative items-center justify-center p-20 overflow-hidden">
         <div className="absolute inset-0 opacity-20">
            <img 
               src="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=1600" 
               alt="Premium Mangoes" 
               className="w-full h-full object-cover"
            />
         </div>
         <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/80 to-transparent" />
         
         <div className="relative z-10 space-y-12 max-w-lg">
            <Link href="/" className="flex items-center gap-2 group text-white/60 hover:text-white transition-colors mb-20 inline-flex">
               <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
               <span className="text-[10px] font-display font-black uppercase tracking-[0.2em] shadow-sm">Back to Sanctuary</span>
            </Link>

            <div className="space-y-6">
               <div className="w-16 h-1 bg-primary" />
               <h1 className="text-5xl font-display font-black text-white leading-[1.1] uppercase tracking-tighter text-left">
                  Orchard to <br/><span className="text-primary italic">Doorstep.</span>
               </h1>
               <p className="text-white/60 font-body text-sm leading-relaxed max-w-sm text-left">
                  Access the ultimate B2B gateway for India&apos;s finest seasonal exports. Track cold-chain logistics and leverage exclusive wholesale leverage.
               </p>
            </div>

            <div className="pt-12 grid grid-cols-2 gap-8 border-t border-white/10">
               <div className="space-y-1">
                  <div className="text-2xl font-display font-black text-white uppercase italic">100%</div>
                  <div className="text-[9px] font-black text-white/40 uppercase tracking-widest font-display shadow-sm uppercase">Traceability</div>
               </div>
               <div className="space-y-1">
                  <div className="text-2xl font-display font-black text-white uppercase italic">Global</div>
                  <div className="text-[9px] font-black text-white/40 uppercase tracking-widest font-display shadow-sm uppercase">Export Network</div>
               </div>
            </div>
         </div>

         {/* Floating Elements */}
         <motion.div 
           animate={{ y: [0, -20, 0] }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           className="absolute bottom-20 right-20 w-32 h-32 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
         >
            <ShieldCheck className="text-primary opacity-40" size={48} />
         </motion.div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-20 relative bg-[#F8F9FA]">
         <div className="w-full max-w-sm">
            <div className="mb-12 text-center md:text-left">
               <div className="md:hidden flex justify-center mb-8">
                  <span className="font-display font-black text-2xl text-navy tracking-tight">Headstart</span>
               </div>
               <h2 className="text-3xl font-display font-black text-navy uppercase tracking-tight">Access <span className="text-primary italic">Panel</span></h2>
               <p className="text-sm font-body text-slate/40 mt-2 font-medium">Please enter your credentials to manage your shipments.</p>
            </div>

            <LoginForm />

            <div className="mt-12 text-center">
               <p className="text-[10px] font-display font-black text-slate/20 uppercase tracking-[0.2em]">
                  Secure Authentication Protocol v4.0
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
