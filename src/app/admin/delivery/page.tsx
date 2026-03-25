"use client";

import { useOrderStore } from "@/store/useOrderStore";
import { Truck, MapPin, Package, Clock, CheckCircle2, User, Phone, ExternalLink } from "lucide-react";



export default function DeliveryPage() {
  const { orders } = useOrderStore();
  
  // Filter for orders that are beyond 'pending' (processing, shipped, etc.)
  const activeShipments = orders.filter(o => o.status !== 'cancelled');

  const stats = [
    { label: "Active Shipments", value: activeShipments.length.toString(), icon: Package, color: "text-primary", bg: "bg-primary/5" },
    { label: "In Shipped Phase", value: activeShipments.filter(o => o.status === 'shipped').length.toString(), icon: Truck, color: "text-[#10B981]", bg: "bg-[#10B981]/5" },
    { label: "Pending Processing", value: activeShipments.filter(o => o.status === 'pending').length.toString(), icon: Clock, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/5" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-display font-black text-navy border-l-4 border-primary pl-4 uppercase tracking-tight">Delivery <span className="text-primary italic">Command</span></h1>
            <p className="text-[10px] font-display font-bold text-slate/40 ml-4 uppercase tracking-[0.2em]">Real-time tracking and assignment for last-mile logistics.</p>
         </div>
      </header>

      {/* Logistics KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {stats.map(s => (
            <div key={s.label} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 flex items-center gap-6 shadow-sm group hover:shadow-xl transition-all duration-500">
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${s.bg} ${s.color} group-hover:scale-110 transition-transform`}><s.icon size={28}/></div>
               <div>
                  <div className="text-[10px] font-display font-black text-slate/30 uppercase tracking-[0.2em]">{s.label}</div>
                  <div className="text-2xl font-display font-black text-navy">{s.value}</div>
               </div>
            </div>
         ))}
      </div>

      {/* Main Logistics Table */}
      <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
         <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <div className="space-y-1">
               <h3 className="font-display font-black text-sm text-navy uppercase tracking-[0.15em]">Live Fleet Status</h3>
               <p className="text-[9px] font-body text-slate opacity-40 uppercase tracking-widest font-medium">Tracking {activeShipments.length} Active Nodes</p>
            </div>
            <button className="px-6 py-2.5 bg-navy text-white rounded-xl text-[10px] font-display font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2">View Full Logistics Map <MapPin size={12}/></button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-gray-50">
                     <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate/30 pl-10">Consignment ID</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate/30">Recipient & Contact</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate/30">Live Status</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate/30">Assigned Zone</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate/30 text-right pr-10">Administrative Control</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50/50">
                  {activeShipments.length > 0 ? activeShipments.map(shipment => (
                     <tr key={shipment.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="p-6 pl-10">
                           <div className="space-y-0.5">
                              <div className="font-display font-black text-[12px] text-navy group-hover:text-primary transition-all flex items-center gap-1.5">{shipment.id} <ExternalLink size={10} className="text-slate/20"/></div>
                              <div className="text-[9px] font-body text-slate/40 uppercase tracking-widest font-black">Grade A Perishables</div>
                           </div>
                        </td>
                        <td className="p-6">
                           <div className="space-y-1">
                              <div className="font-display font-bold text-[11px] text-navy flex items-center gap-2"><User size={10} className="text-primary"/> {shipment.customerName}</div>
                              <div className="text-[10px] font-body text-slate/40 flex items-center gap-2"><Phone size={10}/> {shipment.customerPhone}</div>
                           </div>
                        </td>
                        <td className="p-6">
                           <span className={`px-4 py-1.5 rounded-xl text-[9px] font-display font-black uppercase tracking-widest flex items-center gap-2 w-fit ${
                              shipment.status === "shipped" ? "bg-purple-100 text-purple-700" : 
                              shipment.status === "delivered" ? "bg-emerald-100 text-emerald-700" :
                              "bg-amber-100 text-amber-700"
                           }`}>
                              {shipment.status === "shipped" ? <Truck size={12}/> : shipment.status === "delivered" ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                              {shipment.status}
                           </span>
                        </td>
                        <td className="p-6">
                           <div className="flex items-start gap-2 max-w-[200px]">
                              <MapPin size={12} className="text-primary shrink-0 mt-0.5" />
                              <div className="text-[10px] font-body text-navy/80 font-medium leading-relaxed truncate hover:text-clip hover:overflow-visible transition-all cursor-default" title={shipment.shippingAddress}>
                                 {shipment.shippingAddress}
                              </div>
                           </div>
                        </td>
                        <td className="p-6 pr-10 text-right">
                           <button className="h-10 px-6 bg-off-white text-navy border border-gray-soft rounded-xl font-display font-black text-[10px] uppercase tracking-widest hover:bg-navy hover:text-white transition-all shadow-sm">
                              Update Tracking
                           </button>
                        </td>
                     </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="p-24 text-center">
                         <div className="space-y-4 opacity-20">
                            <Truck size={48} className="mx-auto" />
                            <p className="font-display font-bold text-sm uppercase tracking-widest">No active consignments in fleet</p>
                         </div>
                      </td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </section>
    </div>
  );
}
