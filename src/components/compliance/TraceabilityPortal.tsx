"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  MapPin,
  Search,
  Calendar,
  Thermometer,
  FileText,
  CheckCircle2,
  Info,
  AlertCircle,
  ArrowRight,
  Verified,
  Wind
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const STEPS = [
  { label: "Orchard Harvest", date: "April 12, 2026", location: "Ratnagiri, India", icon: MapPin },
  { label: "CFIA Pre-Clearance", date: "April 14, 2026", location: "VSI Airport", icon: ShieldCheck },
  { label: "Air Shipment @ -4°C", date: "April 15, 2026", location: "In-Flight (72h)", icon: Wind },
  { label: "Vancouver Arrival", date: "April 16, 2026", location: "Headstart BC Hub", icon: MapPin },
  { label: "Quality Dispatch", date: "April 17, 2026", location: "Surrey Distribution", icon: CheckCircle2 },
];

export default function TraceabilityPortal() {
  const [query, setQuery] = useState("");
  const [activeBatch, setActiveBatch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsSearching(true);
    setErrorMessage("");
    setActiveBatch(false);

    // Simulated Verification Engine
    setTimeout(() => {
      setIsSearching(false);
      // Valid if starts with certain prefixes
      if (query.toUpperCase().includes("RAT-ALPH") || query.toUpperCase().includes("BATCH-")) {
        setActiveBatch(true);
        // Add a slight scroll
        window.scrollTo({ top: 400, behavior: "smooth" });
      } else {
        setErrorMessage("Batch # Not Found. Please check the lid seal.");
      }
    }, 1500);
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Search Hero */}
      <section className="bg-navy py-12 md:py-24 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2 pointer-events-none group-hover:bg-primary/20 transition-all duration-slow" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-accent-gold/5 skew-x-12 -translate-x-1/2 pointer-events-none group-hover:bg-accent-gold/10 transition-all duration-slow" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center space-y-12">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-accent-gold font-display font-bold text-[10px] uppercase tracking-[0.3em]"
            >
              Transparency & Safety First
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white text-5xl md:text-7xl font-display font-bold"
            >
              Trace Your <span className="text-primary italic">Batch</span>
            </motion.h1>
            <p className="text-white/60 text-body-lg max-w-xl mx-auto font-body">100% end-to-end transparency. Enter your box batch code to see exactly where your fruit came from.</p>
          </div>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group-focus-within/input:scale-105 transition-transform">
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search size={22} className="text-white/30 group-focus-within/input:text-primary transition-colors" />
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Batch Code (e.g. RAT-ALPH-2026-X83)"
                className="w-full h-16 md:h-20 bg-white/10 border border-white/10 rounded-[1.5rem] pl-16 pr-40 font-display font-medium text-lg md:text-xl outline-none focus:border-primary focus:bg-white/15 transition-all text-white placeholder:text-white/20 disabled:opacity-50"
                disabled={isSearching}
              />
              <button 
                disabled={isSearching}
                type="submit"
                className="absolute right-3 top-3 bottom-3 px-8 bg-primary text-white font-display font-black uppercase tracking-widest rounded-xl hover:bg-orange-600 active:scale-95 transition-all flex items-center gap-3 shadow-lg shadow-primary/20 disabled:bg-gray-500"
              >
                {isSearching ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Trace <ArrowRight size={18} /></>}
              </button>
            </div>
            {errorMessage && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] text-primary font-display font-black uppercase tracking-widest mt-4 flex items-center justify-center gap-2"
              >
                <AlertCircle size={14} /> {errorMessage}
              </motion.p>
            )}
            <p className="text-[10px] text-white/40 font-body italic mt-4 uppercase tracking-[0.1em]">Code is printed on the lid of your seasonal 12-pack mango box.</p>
          </form>
        </div>
      </section>

      {/* Trace Results */}
      <AnimatePresence mode="wait">
        {activeBatch ? (
          <motion.section
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="container mx-auto px-4 md:px-8 space-y-20"
          >
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-soft flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-soft/50">
              <div className="md:w-1/3 p-10 md:p-14 space-y-8 bg-off-white/50">
                <div className="w-16 h-16 bg-navy text-accent-gold rounded-full flex items-center justify-center mb-6"><Verified size={32} /></div>
                <div className="space-y-4">
                  <div className="text-[11px] font-display font-bold uppercase tracking-widest text-primary">Certified Grade-A</div>
                  <h2 className="text-3xl font-display font-bold text-navy">Alphonso Batch #{query}</h2>
                  <p className="text-sm font-body text-slate opacity-70">Harvested from the Salvi Orchard in Ratnagiri. Cleared by Vancouver CFIA inspection.</p>
                </div>

                <div className="pt-8 border-t border-gray-soft space-y-4">
                  <div className="flex items-center justify-between text-xs font-display font-bold uppercase tracking-widest text-navy">
                    <span>Harvest Temp</span>
                    <span className="text-success flex items-center gap-1"><Thermometer size={14} /> 28°C</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-display font-bold uppercase tracking-widest text-navy">
                    <span>Shelf Life</span>
                    <span className="text-slate">12-14 Days</span>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-10 md:p-14 space-y-12">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-display font-bold text-navy flex items-center gap-3"><Calendar size={20} className="text-primary" /> Orchard to Doorstep Journey</h3>
                  <span className="text-[10px] font-display font-bold uppercase tracking-widest bg-success text-white px-3 py-1 rounded-full">Delivered</span>
                </div>

                <div className="relative space-y-12 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-gray-soft">
                  {STEPS.map((s, i) => (
                    <div key={i} className="relative pl-16 group">
                      <div className={`absolute left-0 top-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${i === STEPS.length - 1 ? "bg-success text-white scale-110 shadow-lg" : "bg-white border border-gray-soft text-navy group-hover:border-primary shadow-sm"}`}>
                        <s.icon size={18} />
                      </div>
                      <div className="space-y-1">
                        <div className="font-display font-bold text-base text-navy">{s.label}</div>
                        <div className="flex items-center gap-3 text-xs font-body text-slate opacity-60">
                          <span>{s.date}</span>
                          <div className="w-1 h-1 rounded-full bg-gray-soft" />
                          <span className="flex items-center gap-1"><MapPin size={12} /> {s.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-navy rounded-[2.5rem] p-12 text-white flex flex-col items-center text-center space-y-6">
                <Image src="/logo.svg" alt="CFIA" width={120} height={120} className="opacity-20 grayscale" />
                <h4 className="text-2xl font-display font-bold">Health & Compliance</h4>
                <p className="text-sm font-body text-white/50 max-w-sm">Every batch imported by Headstart Foods is subject to Canadian Food Inspection Agency (CFIA) requirements and FSSAI quality export standards.</p>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-white/10 rounded-xl text-[10px] font-display font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2"><FileText size={14} /> CFIA Record</button>
                  <button className="px-6 py-3 bg-white/10 rounded-xl text-[10px] font-display font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2"><FileText size={14} /> Soil Certificate</button>
                </div>
              </div>
              <div className="bg-primary rounded-[2.5rem] p-12 text-white flex flex-col items-center text-center space-y-6 shadow-xl shadow-primary/20">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center"><Thermometer size={48} /></div>
                <h4 className="text-2xl font-display font-bold">Cold-Chain Log</h4>
                <p className="text-sm font-body text-white/80 max-w-sm">Detailed temperature analytics for flight #{query.split('-')[1]} from Mumbai to Vancouver.</p>
                <div className="w-full bg-white/10 h-32 rounded-2xl border border-white/10 relative overflow-hidden flex items-end px-4 gap-2">
                  {[0.2, 0.4, 0.3, 0.5, 0.2, 0.6, 0.4, 0.3, 0.5, 0.2].map((v, i) => (
                    <div key={i} className="flex-1 bg-white/20 group-hover:bg-white/40 transition-all" style={{ height: `${v * 100}%` }} />
                  ))}
                  <div className="absolute inset-x-0 bottom-4 px-4 flex justify-between text-[9px] font-display font-bold uppercase tracking-widest text-white/40"><span> Mumbai</span> <span>VANCOUVER</span></div>
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          <section className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 order-2 lg:order-1">
              <div className="space-y-4">
                <h2 className="text-h2 text-navy">Why We <span className="text-primary italic">Trace</span> Every Fruit</h2>
                <p className="text-slate font-body text-body-lg opacity-70 leading-relaxed">Most food importers hide behind generic labeling. At Headstart Foods, we believe premium perishable goods deserve clear origin verification and accountability.</p>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Direct Farm Contracts", desc: "We don't buy from open markets. We contract directly with orchards in Ratnagiri." },
                  { title: "72h Air cargo", desc: "Traceability ensures we maintain our speed-to-doorstep promise." },
                  { title: "CFIA Transparency", desc: "Instantly view health clearance dates for your specific batch." }
                ].map(item => (
                  <div key={item.title} className="flex gap-4 group">
                    <div className="w-12 h-12 bg-off-white rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors"><ShieldCheck size={20} className="text-primary" /></div>
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-lg text-navy">{item.title}</h4>
                      <p className="text-sm font-body text-slate opacity-60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-full max-w-sm mx-auto h-80 md:h-[450px] rounded-[2rem] overflow-hidden shadow-2xl order-1 lg:order-2 bg-gray-50 border border-gray-soft">
              <Image src="/mango_box_batch_code_1774428282727.png" alt="Traceability Box with Batch Code" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              <div className="absolute inset-x-8 bottom-8 p-8 bg-white/95 backdrop-blur rounded-[2rem] space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-display font-bold uppercase tracking-widest text-primary"><Info size={14} /> How to find your code</div>
                <p className="text-xs font-body text-navy opacity-70 leading-relaxed">Turn your box slightly. Look for the black ink batch code printed on the top-right corner of the shipping box seal.</p>
              </div>
            </div>
          </section>
        )}
      </AnimatePresence>
    </div>
  );
}
