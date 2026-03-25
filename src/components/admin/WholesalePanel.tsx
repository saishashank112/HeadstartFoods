"use client";

import { useState } from "react";
import { 
  Users, 
  Search, 
  Plus, 
  ChevronRight, 
  MapPin, 
  TrendingUp, 
  FileText,
  BadgeCheck,
  ShieldAlert
} from "lucide-react";

const PARTNERS = [
  { name: "FreshMart Surrey", location: "Surrey, BC", contact: "Ali Ahmed", volume: "$12,450/mo", status: "Verified", icon: BadgeCheck, color: "text-success bg-success/10" },
  { name: "Global Halal Dist.", location: "Brampton, ON", contact: "John Doe", volume: "$45,200/mo", status: "Verified", icon: BadgeCheck, color: "text-success bg-success/10" },
  { name: "Saffron Foods", location: "Vancouver, BC", contact: "Sara K.", volume: "$8,900/mo", status: "Pending", icon: Users, color: "text-navy bg-navy/10" },
  { name: "Indo-Pak Grocers", location: "Calgary, AB", contact: "Vikram P.", volume: "$3,200/mo", status: "Suspended", icon: ShieldAlert, color: "text-error bg-error/10" },
  { name: "Island Harvest", location: "Victoria, BC", contact: "Emma L.", volume: "$15,700/mo", status: "Verified", icon: BadgeCheck, color: "text-success bg-success/10" },
];

export default function WholesalePanel() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 font-display">
         <h2 className="text-2xl font-black text-navy border-l-4 border-primary pl-4 uppercase tracking-tight">Wholesale Partners</h2>
         <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="h-12 bg-white border border-gray-100 rounded-xl px-4 flex items-center gap-3 shadow-sm flex-1">
               <Search size={16} className="text-slate/30" />
               <input 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 placeholder="Search B2B partners, locations or contacts..." 
                 className="bg-transparent text-xs font-body outline-none w-full text-navy placeholder:text-slate/20 font-medium" 
               />
            </div>
            <button className="h-12 px-6 bg-[#8B1D21] text-white rounded-xl font-display font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-[#8B1D21]/20">
               <Plus size={16} /> Register New Partner
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
         {PARTNERS.map((p, i) => (
            <div key={i} className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden text-navy hover:border-primary/20">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
               <div className="flex items-start justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-6">
                     <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 ${p.color}`}><p.icon size={28} /></div>
                     <div className="space-y-1">
                        <h4 className="font-display font-black text-[15px] uppercase tracking-tight group-hover:text-primary transition-all">{p.name}</h4>
                        <div className="flex items-center gap-4 text-[10px] font-black text-slate/30 uppercase tracking-widest">
                           <span className="flex items-center gap-1.5"><MapPin size={12}/> {p.location}</span>
                           <span className="w-1.5 h-1.5 rounded-full bg-gray-100" />
                           <span className="flex items-center gap-1.5"><Users size={12}/> {p.contact}</span>
                        </div>
                     </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-display font-black uppercase tracking-widest border border-current opacity-80 ${p.color}`}>
                     {p.status}
                  </div>
               </div>

               <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-10">
                     <div className="space-y-1">
                        <div className="text-[9px] font-black text-slate/20 uppercase tracking-[0.15em] flex items-center gap-1.5 font-display"><TrendingUp size={12}/> Monthly Volume</div>
                        <div className="text-[13px] font-display font-black text-navy">{p.volume}</div>
                     </div>
                     <div className="space-y-1">
                        <div className="text-[9px] font-black text-slate/20 uppercase tracking-[0.15em] flex items-center gap-1.5 font-display"><FileText size={12}/> Contracts</div>
                        <div className="text-[13px] font-display font-black text-navy">2 active</div>
                     </div>
                  </div>
                  <button className="h-10 w-10 bg-gray-50 hover:bg-navy hover:text-white rounded-lg flex items-center justify-center transition-all group border border-gray-100">
                     <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
               </div>
            </div>
         ))}
      </div>
    </div>

  );
}
