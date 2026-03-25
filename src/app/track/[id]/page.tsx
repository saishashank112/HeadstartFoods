"use client";



import { 
  Package, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  Box,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useOrderStore } from "@/store/useOrderStore";
import { useParams } from "next/navigation";

export default function TrackOrder() {
  const { id } = useParams<{ id: string }>();
  const { orders } = useOrderStore();
  
  // Find real order or fallback to mocked one for demo
  const order = orders.find(o => o.id.replace('#', '') === id) || {
    id: `#${id}`,
    date: "March 20, 2026",
    status: "pending",
    total: 157.89,
    items: [
      { name: "Premium Alphonso Mangoes", quantity: 2, price: 45.99 },
      { name: "Organic Red Lentils", quantity: 1, price: 12.50 }
    ],
    shippingAddress: "123 Surrey Central Mall, Surrey, BC"
  };

  const steps = [
    { id: "pending", label: "Confirmed", date: order.date, completed: true, active: order.status === "pending" },
    { id: "shipped", label: "Shipped", date: "Estimated Mar 22", completed: order.status === "shipped" || order.status === "delivered", active: order.status === "shipped" },
    { id: "transit", label: "In Transit", date: "Air Cargo", completed: order.status === "delivered", active: false },
    { id: "delivered", label: "Delivered", date: "Pending Arrival", completed: order.status === "delivered", active: order.status === "delivered" }
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-24">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
           <div className="space-y-4">
              <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate/40 hover:text-navy transition-colors font-display font-bold text-[10px] uppercase tracking-widest"><ArrowLeft size={14}/> Back to Dashboard</Link>
              <h1 className="text-h1 text-navy leading-none">Track <span className="text-primary italic"># {id}</span></h1>
              <div className="flex items-center gap-6 text-slate font-body text-sm opacity-60">
                 <div className="flex items-center gap-2"><Calendar size={16} /> Placed on {order.date}</div>
                 <div className="w-1.5 h-1.5 rounded-full bg-gray-soft" />
                 <div className="flex items-center gap-2"><Box size={16} /> Grade A Perishables</div>
              </div>
           </div>
           
           <div className="px-6 py-3 bg-navy text-accent-gold rounded-full font-display font-bold text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-navy/20">
              <Clock size={16} className="animate-pulse" /> Status: {order.status}
           </div>
        </div>

        {/* Tracking Flow Visualizer */}
        <div className="bg-white border border-gray-soft rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
           
           {/* Line connection */}
           <div className="hidden md:block absolute top-[110px] left-12 right-12 h-1 bg-off-white z-0" />

           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, i) => (
                <div key={step.id} className="flex flex-row md:flex-col items-center gap-6 md:gap-8 group">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-slow ${step.completed ? "bg-success text-white shadow-xl shadow-success/20 scale-110" : step.active ? "bg-primary text-white shadow-xl shadow-primary/20 scale-110 animate-pulse" : "bg-off-white text-slate/20"}`}>
                      {step.completed ? <CheckCircle2 size={24} /> : i === 0 ? <Package size={24}/> : i === 1 ? <Truck size={24}/> : i === 2 ? <MapPin size={24}/> : <Box size={24}/>}
                   </div>
                   <div className="space-y-1 text-left md:text-center">
                      <div className={`font-display font-black text-sm uppercase tracking-widest ${step.completed || step.active ? "text-navy" : "text-slate/20"}`}>{step.label}</div>
                      <div className="text-[10px] font-body text-slate opacity-40 uppercase tracking-[0.1em]">{step.date}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Shipment Details */}
           <div className="md:col-span-2 bg-white border border-gray-soft rounded-[2rem] p-8 space-y-8">
              <h3 className="font-display font-bold text-lg text-navy uppercase tracking-widest border-b border-gray-soft pb-6">Shipment Details</h3>
              <div className="space-y-6">
                 {order.items.map((item, i) => (
                   <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-off-white rounded-xl flex items-center justify-center text-slate/40 group-hover:bg-primary/10 group-hover:text-primary transition-all"><Box size={20}/></div>
                         <div className="space-y-0.5">
                            <div className="font-display font-bold text-sm text-navy">{item.name}</div>
                            <div className="text-[10px] text-slate opacity-40 uppercase tracking-widest font-body">Quantity: {item.quantity}</div>
                         </div>
                      </div>
                      <div className="font-display font-bold text-navy">${(item.price * item.quantity).toFixed(2)}</div>
                   </div>
                 ))}
                 <div className="pt-6 border-t border-gray-soft flex justify-between items-center">
                    <span className="font-display font-bold text-xs uppercase tracking-widest text-slate/40">Total Secured Value</span>
                    <span className="text-2xl font-display font-bold text-primary">${typeof order.total === 'number' ? order.total.toFixed(2) : order.total}</span>
                 </div>
              </div>
           </div>

           {/* Logistics Info Sidebar */}
           <div className="space-y-8">
              <div className="bg-navy rounded-[2rem] p-8 text-white space-y-6 shadow-xl shadow-navy/20 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-slow" />
                 <h4 className="font-display font-bold text-lg leading-tight">Delivery <span className="text-primary">Logistics</span></h4>
                 <div className="space-y-4 relative z-10">
                    <div className="flex items-start gap-4">
                       <MapPin className="text-primary shrink-0 mt-1" size={18} />
                       <div className="space-y-1">
                          <div className="text-[10px] uppercase font-display font-bold tracking-widest opacity-40">Destination</div>
                          <p className="text-xs font-body opacity-80 leading-relaxed">{order.shippingAddress}</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <Truck className="text-primary shrink-0 mt-1" size={18} />
                       <div className="space-y-1">
                          <div className="text-[10px] uppercase font-display font-bold tracking-widest opacity-40">Method</div>
                          <p className="text-xs font-body opacity-80 leading-relaxed">Cold-Chain Compliant Air Cargo</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-6 bg-off-white rounded-2xl border border-dashed border-gray-soft flex flex-col items-center text-center gap-4 group cursor-pointer hover:border-primary transition-all">
                  <ShieldCheck size={32} className="text-success group-hover:scale-110 transition-transform" />
                  <div className="space-y-1">
                     <div className="text-[10px] font-display font-black uppercase tracking-widest text-navy">Traceability Verified</div>
                     <p className="text-[9px] font-body text-slate opacity-60">Verified Origin Ratch RAT-2026</p>
                  </div>
                  <Link href="/traceability" className="text-[10px] font-display font-bold uppercase tracking-widest text-primary hover:underline">View Batch Portal <ChevronRight size={12} className="inline"/></Link>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

function Clock({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
