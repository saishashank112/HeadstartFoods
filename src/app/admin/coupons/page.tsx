import { Metadata } from "next";
import { Ticket, Plus, Tag, Clock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Coupons & Discounts | Admin | Headstart Foods",
};

export default function CouponsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <h1 className="text-2xl font-display font-black text-navy border-l-4 border-primary pl-4 uppercase tracking-tight">Coupons & Campaigns</h1>
            <p className="text-xs font-body text-slate/40 ml-4 lowercase">Manage promotional codes, loyalty discounts, and bundle offers.</p>
         </div>
         <button className="h-12 px-6 bg-[#8B1D21] text-white rounded-xl font-display font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-[#8B1D21]/20">
            <Plus size={16} /> Create Campaign
         </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
            { label: "Active Coupons", value: "24", icon: Ticket, color: "text-primary", bg: "bg-primary/5" },
            { label: "Total Claims", value: "1.2k", icon: Tag, color: "text-[#10B981]", bg: "bg-[#10B981]/5" },
            { label: "Revenue Saved", value: "₹45k", icon: Clock, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/5" },
            { label: "Conversion", value: "8.4%", icon: CheckCircle2, color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/5" },
         ].map(s => (
            <div key={s.label} className="bg-white rounded-[2rem] p-8 border border-gray-100 flex flex-col items-center justify-center gap-4 shadow-sm text-center">
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${s.bg} ${s.color}`}><s.icon size={28}/></div>
               <div>
                  <div className="text-[10px] font-black text-slate/30 uppercase tracking-widest mb-1">{s.label}</div>
                  <div className="text-2xl font-display font-black text-navy">{s.value}</div>
               </div>
            </div>
         ))}
      </div>

      <section className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-12 text-center space-y-4">
         <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center text-navy/20 mx-auto"><Ticket size={32}/></div>
         <h4 className="font-display font-black text-lg text-navy uppercase tracking-tight">Deployment Ready</h4>
         <p className="text-xs font-body text-slate opacity-40 max-w-md mx-auto">No campaigns active today. Launch your first B2B promo campaign to boost wholesale traffic.</p>
      </section>
    </div>
  );
}
