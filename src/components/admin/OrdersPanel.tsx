"use client";

import { useState } from "react";

import { 
  Search, 
  Printer, 
  ChevronDown,
  User,
  Phone,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  X,
  MapPin,
  Box,
  Truck,
  CreditCard
} from "lucide-react";
import { useOrderStore, OrderStatus, Order } from "@/store/useOrderStore";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending", "processing", "shipped", "delivered", "cancelled"
];

export default function OrdersPanel() {
  const { orders, updateOrderStatus, confirmPayment } = useOrderStore();
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending": return "bg-amber-100 text-amber-700";
      case "processing": return "bg-blue-100 text-blue-700";
      case "shipped": return "bg-purple-100 text-purple-700";
      case "delivered": return "bg-emerald-100 text-emerald-700";
      case "cancelled": return "bg-rose-100 text-rose-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(search.toLowerCase()) || 
    o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
    o.customerPhone?.includes(search)
  );

  const handlePrint = (order: Order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <html>
        <head>
          <title>Invoice - ${order.id}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #1a1a1a; }
            .header { border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
            .logo { font-size: 24px; font-weight: 800; color: #FF8C00; }
            .order-info { margin-bottom: 30px; }
            .table { w-full; border-collapse: collapse; margin-bottom: 30px; }
            .table th { text-align: left; border-bottom: 1px solid #eee; padding: 10px; }
            .table td { padding: 10px; border-bottom: 1px solid #f9f9f9; }
            .total { text-align: right; font-size: 18px; font-weight: 800; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">HEADSTART FOODS</div>
            <div>INVOICE: ${order.id}</div>
          </div>
          <div class="order-info">
            <p><strong>Customer:</strong> ${order.customerName}</p>
            <p><strong>Phone:</strong> ${order.customerPhone}</p>
            <p><strong>Date:</strong> ${order.date}</p>
            <p><strong>Address:</strong> ${order.shippingAddress}</p>
          </div>
          <table class="table" style="width: 100%">
            <thead>
              <tr><th>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td>$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">GRAND TOTAL: $${order.total.toFixed(2)}</div>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="text-2xl font-display font-black text-navy border-l-4 border-primary pl-4 uppercase tracking-tight">Procurement Logistics</h2>
        <div className="flex items-center gap-4">
           <div className="h-12 bg-white border border-gray-100 rounded-xl px-4 flex items-center gap-3 shadow-sm w-64 lg:w-80">
              <Search size={16} className="text-slate/30" />
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ID, name or phone..." 
                className="bg-transparent text-xs font-body outline-none w-full text-navy placeholder:text-slate/20 font-medium" 
              />
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
           <h3 className="font-display font-black text-sm text-navy uppercase tracking-[0.15em]">Live Shipments</h3>
           <span className="text-[10px] font-black text-slate/30 uppercase tracking-widest">{orders.length} active orders</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate/30 pl-10">Order & Customer</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate/30">Total</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate/30">Payment Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate/30">Logistics Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate/30 text-right pr-10">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {filteredOrders.length > 0 ? filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-6 pl-10">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 bg-off-white rounded-xl flex items-center justify-center text-slate/30 shrink-0">
                          <Box size={20} />
                       </div>
                       <div className="space-y-1">
                          <div className="font-display font-black text-[12px] text-navy flex items-center gap-2">
                             {order.id}
                             <ExternalLink size={12} className="text-slate/20 hover:text-primary cursor-pointer"/>
                          </div>
                          <div className="flex flex-col gap-0.5">
                             <div className="text-[10px] font-display font-bold text-slate/60 flex items-center gap-1.5"><User size={10} className="text-primary"/> {order.customerName || "Customer"}</div>
                             <div className="text-[10px] font-display font-bold text-slate/40 flex items-center gap-1.5"><Phone size={10}/> {order.customerPhone || "Not provided"}</div>
                          </div>
                       </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="font-display font-black text-[14px] text-navy">${typeof order.total === 'number' ? order.total.toFixed(2) : order.total}</div>
                    <div className="text-[9px] font-body text-slate opacity-40 uppercase tracking-widest">{order.date}</div>
                  </td>
                  <td className="p-6">
                    {order.paymentStatus === 'confirmed' ? (
                      <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-display font-black uppercase tracking-widest">
                         <CheckCircle2 size={14} /> Confirmed
                      </div>
                    ) : (
                      <button 
                        onClick={() => {
                          confirmPayment(order.id);
                          toast.success("Payment confirmed!");
                        }}
                        className="px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-[9px] font-display font-black uppercase tracking-widest hover:bg-amber-100 transition-all flex items-center gap-2 active:scale-95"
                      >
                         <Clock size={12} className="animate-pulse" /> Confirm Payment
                      </button>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="relative inline-block w-44">
                      <select 
                        value={order.status}
                        onChange={(e) => {
                          updateOrderStatus(order.id, e.target.value as OrderStatus);
                          toast.success(`Status updated to ${e.target.value}`);
                        }}
                        className={`w-full appearance-none px-4 py-2 rounded-xl text-[10px] font-display font-black uppercase tracking-widest outline-none cursor-pointer pr-10 shadow-sm transition-all border border-transparent ${getStatusStyle(order.status)}`}
                      >
                        {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none" />
                    </div>
                  </td>
                  <td className="p-6 pr-10 text-right">
                    <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                       <button onClick={() => setSelectedOrder(order)} className="w-10 h-10 border border-gray-soft rounded-xl flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all"><Eye size={16}/></button>
                       <button onClick={() => handlePrint(order)} className="w-10 h-10 border border-gray-soft rounded-xl flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all"><Printer size={16}/></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-20 text-center">
                    <div className="space-y-4 opacity-20">
                       <Box size={48} className="mx-auto" />
                       <p className="font-display font-bold text-sm uppercase tracking-widest">No active shipments found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-navy/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
               {/* Modal Header */}
               <div className="p-8 md:p-10 bg-navy text-white flex items-center justify-between shrink-0">
                  <div className="space-y-1">
                     <div className="text-[10px] font-display font-black uppercase tracking-widest opacity-40">Shipment Inspector</div>
                     <h2 className="text-2xl font-display font-black uppercase tracking-tight">Order <span className="text-primary italic">{selectedOrder.id}</span></h2>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><X/></button>
               </div>

               {/* Modal Content */}
               <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-10">
                  {/* Phase 1: Customer & Delivery Info */}
                  <div className="grid grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                           <User size={16}/> <span className="text-[10px] font-display font-black uppercase tracking-widest">Customer Details</span>
                        </div>
                        <div className="space-y-1 pl-6">
                           <div className="font-display font-black text-navy">{selectedOrder.customerName}</div>
                           <div className="text-sm font-body text-slate opacity-60">{selectedOrder.customerPhone}</div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                           <MapPin size={16}/> <span className="text-[10px] font-display font-black uppercase tracking-widest">Delivery Coordinates</span>
                        </div>
                        <div className="space-y-1 pl-6">
                           <div className="text-sm font-body text-navy/80 leading-relaxed font-medium">{selectedOrder.shippingAddress}</div>
                        </div>
                     </div>
                  </div>

                  {/* Phase 2: System Status */}
                  <div className="grid grid-cols-3 gap-6">
                     <div className="p-4 bg-off-white rounded-2xl space-y-2 border border-gray-soft">
                        <div className="text-[8px] font-display font-black text-slate uppercase tracking-widest opacity-40">Payment Status</div>
                        <div className={`text-[10px] font-display font-black uppercase tracking-widest flex items-center gap-2 ${selectedOrder.paymentStatus === 'confirmed' ? "text-emerald-600" : "text-amber-600"}`}>
                           {selectedOrder.paymentStatus === 'confirmed' ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                           {selectedOrder.paymentStatus}
                        </div>
                     </div>
                     <div className="p-4 bg-off-white rounded-2xl space-y-2 border border-gray-soft">
                        <div className="text-[8px] font-display font-black text-slate uppercase tracking-widest opacity-40">Logistics Status</div>
                        <div className="text-[10px] font-display font-black uppercase tracking-widest text-navy flex items-center gap-2">
                           <Truck size={12} className="text-primary"/> {selectedOrder.status}
                        </div>
                     </div>
                     <div className="p-4 bg-off-white rounded-2xl space-y-2 border border-gray-soft">
                        <div className="text-[8px] font-display font-black text-slate uppercase tracking-widest opacity-40">Payment Method</div>
                        <div className="text-[10px] font-display font-black uppercase tracking-widest text-navy flex items-center gap-2">
                           <CreditCard size={12} className="text-primary"/> Secure Check
                        </div>
                     </div>
                  </div>

                  {/* Phase 3: Items Manifest */}
                  <div className="space-y-6">
                     <div className="flex items-center gap-2 text-primary">
                        <Box size={16}/> <span className="text-[10px] font-display font-black uppercase tracking-widest">Shipment Manifest</span>
                     </div>
                     <div className="space-y-4 bg-off-white rounded-[2rem] p-6 border border-gray-soft">
                        {selectedOrder.items.map((item, i) => (
                           <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-soft last:border-0 last:pb-0">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 bg-white rounded-lg border border-gray-soft flex items-center justify-center"><Box size={18} className="text-slate/20"/></div>
                                 <div>
                                    <div className="font-display font-black text-xs text-navy uppercase text-sm">{item.name}</div>
                                    <div className="text-[10px] font-display font-bold text-slate/40 uppercase tracking-widest">Quantity: {item.quantity}</div>
                                 </div>
                              </div>
                              <div className="font-display font-black text-sm text-navy">${(item.price * item.quantity).toFixed(2)}</div>
                           </div>
                        ))}
                        <div className="pt-4 flex justify-between items-center">
                           <span className="font-display font-black text-[10px] uppercase tracking-widest text-slate/40">Total Manifest Value</span>
                           <span className="text-xl font-display font-black text-primary">${selectedOrder.total.toFixed(2)}</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Modal Footer */}
               <div className="p-8 border-t border-gray-soft flex justify-end gap-4 shrink-0 bg-white">
                  <button onClick={() => setSelectedOrder(null)} className="px-6 py-3 bg-off-white text-navy rounded-xl font-display font-bold text-[10px] uppercase tracking-widest hover:bg-gray-soft transition-all">Close Inspector</button>
                  <button onClick={() => { handlePrint(selectedOrder); setSelectedOrder(null); }} className="px-6 py-3 bg-navy text-white rounded-xl font-display font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all">
                     <Printer size={14} /> Print Master Invoice
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
