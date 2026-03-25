"use client";

import { 
  TrendingUp, 
  Users, 
  Plus, 
  Search, 
  MoreVertical, 
  AlertTriangle, 
  Calendar,
  Layers,
  Settings,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  LayoutDashboard,
  Box,
  ClipboardList,
  ArrowRight,
  ShoppingBag
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import InventoryPanel from "../admin/InventoryPanel";
import OrdersPanel from "../admin/OrdersPanel";
import WholesalePanel from "../admin/WholesalePanel";
import SettingsPanel from "../admin/SettingsPanel";
import NotificationBell from "../shared/NotificationBell";

const STATS = [
  { label: "Gross Revenue", value: "$45,280", trend: "+14.2%", icon: TrendingUp, color: "bg-success/10 text-success" },
  { label: "Active Orders", value: "84", trend: "+4", icon: ShoppingBag, color: "bg-primary/10 text-primary" },
  { label: "Total Partners", value: "52", trend: "+2 this week", icon: Users, color: "bg-navy/10 text-navy" },
  { label: "Low Stock Alert", value: "3 Items", trend: "Urgent", icon: AlertTriangle, color: "bg-error/10 text-error" },
];

const RECENT_ORDERS = [
  { id: "#SSA-2026-X83", customer: "Shashank S.", total: "$157.89", status: "Processing", date: "2 mins ago" },
  { id: "#SSA-2026-X82", customer: "Aditya K.", total: "$45.99", status: "Delivered", date: "15 mins ago" },
  { id: "#SSA-2026-X81", customer: "Priya M.", total: "$124.50", status: "Pending", date: "1 hour ago" },
  { id: "#SSA-2026-X80", customer: "Store #42 (Wholesale)", total: "$1,240.00", status: "In Transit", date: "3 hours ago" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Guard Clause for Admin Access
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "inventory":
        return <InventoryPanel />;
      case "orders":
        return <OrdersPanel />;
      case "partners":
        return <WholesalePanel />;
      case "settings":
        return <SettingsPanel />;
      case "overview":
      default:
        return (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
               {STATS.map(s => (
                  <div key={s.label} className="bg-white rounded-3xl p-8 border border-gray-soft shadow-sm hover:shadow-lg transition-all space-y-6 group">
                     <div className="flex items-center justify-between">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${s.color}`}><s.icon size={28} /></div>
                        <div className="text-right">
                           <div className="text-[10px] font-display font-bold text-slate/40 uppercase tracking-widest">{s.label}</div>
                           <div className="text-2xl font-display font-bold text-navy">{s.value}</div>
                        </div>
                     </div>
                     <div className="pt-4 border-t border-gray-soft/50 flex items-center justify-between">
                        <span className={`text-[10px] font-display font-bold uppercase tracking-widest ${s.trend.startsWith('+') ? 'text-success' : 'text-error'}`}>{s.trend}</span>
                        <span className="text-[9px] font-body text-slate opacity-40 uppercase tracking-widest">vs. Last Month</span>
                     </div>
                  </div>
               ))}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               <section className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-soft shadow-sm overflow-hidden flex flex-col">
                  <div className="p-8 border-b border-gray-soft flex items-center justify-between">
                     <h3 className="font-display font-bold text-xl text-navy">Live Order Queue</h3>
                     <button className="text-primary font-display font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-2">View Full Log <ArrowRight size={14}/></button>
                  </div>
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="bg-off-white/50 border-b border-gray-soft">
                              <th className="p-6 text-[10px] font-display font-bold uppercase tracking-widest text-slate/40">Order Detail</th>
                              <th className="p-6 text-[10px] font-display font-bold uppercase tracking-widest text-slate/40">Customer</th>
                              <th className="p-6 text-[10px] font-display font-bold uppercase tracking-widest text-slate/40">Total</th>
                              <th className="p-6 text-[10px] font-display font-bold uppercase tracking-widest text-slate/40">Status</th>
                              <th className="p-6"></th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-soft/50">
                           {RECENT_ORDERS.map(o => (
                              <tr key={o.id} className="hover:bg-off-white/30 transition-colors group">
                                 <td className="p-6">
                                    <div className="font-display font-bold text-sm text-navy">{o.id}</div>
                                    <div className="text-[10px] font-body text-slate opacity-40 italic">{o.date}</div>
                                 </td>
                                 <td className="p-6 font-body text-sm text-navy/70 uppercase tracking-widest text-[11px] font-bold">{o.customer}</td>
                                 <td className="p-6 font-display font-bold text-sm text-navy">{o.total}</td>
                                 <td className="p-6">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-display font-bold uppercase tracking-widest ${o.status === "Delivered" ? "bg-success/10 text-success" : o.status === "Pending" ? "bg-primary/10 text-primary" : "bg-navy/10 text-navy"}`}>
                                       <div className={`w-1.5 h-1.5 rounded-full ${o.status === "Delivered" ? "bg-success" : o.status === "Pending" ? "bg-primary" : "bg-navy"}`} />
                                       {o.status}
                                    </div>
                                 </td>
                                 <td className="p-6 text-right">
                                    <button className="p-2 text-slate/20 hover:text-navy transition-all"><MoreVertical size={16} /></button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </section>

               <aside className="space-y-10">
                  <div className="bg-navy rounded-[2.5rem] p-10 text-white space-y-8 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-all duration-slow" />
                     <div className="space-y-4">
                        <h4 className="text-xl font-display font-bold">Cold Chain Alert</h4>
                        <p className="text-sm font-body text-white/50 leading-relaxed">Flight #RAT-ALPH-B12 transit temperature spiked to -2°C at 18:24 UTC. Action Required.</p>
                     </div>
                     <div className="pt-4 flex items-center gap-4">
                        <button className="flex-1 h-12 bg-white text-navy font-display font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-accent-gold transition-colors">View Logs</button>
                        <button className="w-12 h-12 border border-white/10 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-all"><RefreshCw size={14}/></button>
                     </div>
                  </div>

                  <div className="bg-white rounded-[2.5rem] border border-gray-soft p-10 space-y-8 shadow-sm">
                     <h4 className="font-display font-bold text-lg text-navy flex items-center gap-3"><Users size={20} className="text-primary"/> New B2B Inquiries</h4>
                     <div className="space-y-4">
                        {[
                          { name: "FreshMart Surrey", volume: "1,000 Boxes/Yr", icon: Layers },
                          { name: "Global Halal Dist.", volume: "5,000 Boxes/Yr", icon: Users }
                        ].map((inq, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-off-white/50 rounded-2xl group hover:border-primary transition-all border border-transparent">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-navy shadow-sm"><inq.icon size={18}/></div>
                                <div className="space-y-0.5">
                                   <div className="font-display font-bold text-xs text-navy">{inq.name}</div>
                                   <div className="text-[9px] font-body text-slate opacity-40 uppercase tracking-widest">{inq.volume}</div>
                                </div>
                             </div>
                             <ChevronRight size={14} className="text-slate/20 group-hover:text-primary transition-all" />
                          </div>
                        ))}
                     </div>
                  </div>
               </aside>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-off-white">
      <aside className="w-72 bg-navy p-8 flex flex-col gap-10 sticky top-0 h-screen shrink-0 border-r border-white/5 overflow-y-auto hidden lg:flex">
         <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20 text-primary shadow-lg shadow-primary/20"><ShieldCheck size={20} /></div>
            <span className="font-display font-bold text-white uppercase tracking-[0.2em] text-sm">Admin Control</span>
         </div>

         <div className="flex flex-col gap-2">
            {[
              { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
              { id: "inventory", label: "Inventory & Pricing", icon: Box },
              { id: "orders", label: "Order Management", icon: ClipboardList },
              { id: "partners", label: "Wholesale Partners", icon: Users },
              { id: "settings", label: "Global Settings", icon: Settings },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-all ${activeTab === item.id ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]" : "text-white/40 hover:text-white"}`}
              >
                 <item.icon size={16} />
                 {item.label}
              </button>
            ))}
         </div>

         <div className="mt-auto space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-white space-y-4">
               <div className="flex items-center gap-2 text-xs font-display font-bold text-accent-gold uppercase tracking-widest"><RefreshCw size={14} className="animate-spin" /> Live Sync</div>
               <p className="text-[10px] font-body text-white/40 leading-relaxed uppercase tracking-widest">Connected to Prisma Engine 2.18.4</p>
            </div>
            <button 
              onClick={() => {
                const logout = useAuthStore.getState().logout;
                logout();
                router.push("/auth/login");
              }}
              className="w-full h-12 border border-white/10 hover:border-white/20 text-white/50 hover:text-white text-[10px] font-display font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              Sign Out
            </button>
         </div>
      </aside>

      <main className="flex-1 p-6 md:p-12 space-y-12">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
               <h1 className="text-4xl font-display font-extrabold text-navy tracking-tight">{activeTab === "overview" ? "Dashboard" : activeTab === "inventory" ? "Inventory" : "Management"} <span className="text-primary italic">Overview</span></h1>
               <div className="flex items-center gap-2 text-[10px] font-display font-bold text-slate/40 uppercase tracking-[0.2em]"><Calendar size={12}/> Updated @ {new Date().toLocaleTimeString()}</div>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="h-14 bg-white border border-gray-soft rounded-2xl px-6 flex items-center gap-3 shadow-sm min-w-[280px]">
                  <Search size={18} className="text-slate/30" />
                  <input placeholder="Search orders, SKU or partners..." className="bg-transparent text-sm font-body outline-none w-full text-navy placeholder:text-slate/20" />
               </div>
               <NotificationBell target="admin" />
               <button className="h-14 w-14 bg-white border border-gray-soft rounded-2xl flex items-center justify-center text-navy shadow-sm hover:border-primary hover:text-primary transition-all group active:scale-95">
                 <Plus size={24} className="group-hover:rotate-90 transition-transform" />
               </button>
            </div>
         </div>

         {renderContent()}
      </main>
    </div>
  );
}
