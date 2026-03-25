import { 
  Users, 
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  RefreshCw,
  Wallet,
  ShieldCheck,
  Package,
  Truck,
  AlertCircle
} from "lucide-react";


const STATS = [
  { label: "Total Revenue", value: "₹76,122.6", trend: "+14.2%", icon: Wallet, color: "text-[#10B981]", bg: "bg-[#10B981]/10" },
  { label: "Total Orders", value: "84", trend: "+4", icon: ShoppingBag, color: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10" },
  { label: "Pending Verifications", value: "1", trend: "Review", icon: ShieldCheck, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
  { label: "Total Customers", value: "52", trend: "+2", icon: Users, color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10" },
];

export default function OverviewPanel() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Top Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
         {STATS.map(s => (
            <div key={s.label} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${s.bg} ${s.color}`}><s.icon size={28} /></div>
               <div className="space-y-0.5">
                  <div className="text-[11px] font-body font-medium text-slate/40 uppercase tracking-widest">{s.label}</div>
                  <div className="text-2xl font-display font-black text-navy">{s.value}</div>
               </div>
            </div>
         ))}
      </section>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white rounded-[2rem] p-8 border border-gray-100 flex items-center justify-between group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1 h-full bg-[#F59E0B]" />
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center"><Package size={24} /></div>
               <div>
                  <h4 className="font-display font-bold text-slate/40 text-[10px] uppercase tracking-widest">Pending Orders</h4>
                  <p className="text-sm font-body text-slate/60">Not yet shipped / not handed to logistics</p>
                  <p className="text-3xl font-display font-black text-navy mt-1">2</p>
               </div>
            </div>
            <button className="flex items-center gap-1 text-[10px] font-bold text-slate/40 hover:text-primary transition-all uppercase tracking-widest">View <ChevronRight size={14}/></button>
         </div>

         <div className="bg-white rounded-[2rem] p-8 border border-gray-100 flex items-center justify-between group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1 h-full bg-[#06B6D4]" />
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center"><Truck size={24} /></div>
               <div>
                  <h4 className="font-display font-bold text-slate/40 text-[10px] uppercase tracking-widest">Pending Deliveries</h4>
                  <p className="text-sm font-body text-slate/60">Shipped / out for delivery — awaiting completion</p>
                  <p className="text-3xl font-display font-black text-navy mt-1">1</p>
               </div>
            </div>
            <button className="flex items-center gap-1 text-[10px] font-bold text-slate/40 hover:text-primary transition-all uppercase tracking-widest">View <ChevronRight size={14}/></button>
         </div>
      </div>

      {/* Low Stock Alerts */}
      <section className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center"><RefreshCw size={20} /></div>
               <div>
                  <h3 className="font-display font-bold text-lg text-navy">Low Stock Alerts</h3>
                  <p className="text-xs font-body text-slate/40">20 products need urgent attention</p>
               </div>
            </div>
            <button className="text-primary font-display font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-2">Manage Inventory <ArrowRight size={14}/></button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <tbody className="divide-y divide-gray-50">
                  {[
                    "Premium Banarasi Silk Saree in red - Edition 1",
                    "Premium Kanjivaram Silk Saree in red - Edition 2",
                    "Premium Tissue Silk Saree in green - Edition 3",
                    "Premium Banarasi Silk Saree in pink - Edition 4",
                    "Premium Soft Silk Silk Saree in green - Edition 5"
                  ].map((item, i) => (
                     <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="p-6 flex items-center gap-4">
                           <div className="w-2 h-2 rounded-full bg-error" />
                           <div>
                              <div className="font-display font-bold text-sm text-navy">{item}</div>
                              <div className="text-[10px] font-body text-slate/40 uppercase tracking-widest">Sarees</div>
                           </div>
                        </td>
                        <td className="p-6 text-right">
                           <div className="flex items-center justify-end gap-6">
                              <span className="text-[10px] font-black text-error uppercase tracking-widest flex items-center gap-1">
                                 <AlertCircle size={12} /> OOS
                              </span>
                              <button className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">Update</button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>
    </div>
  );
}




