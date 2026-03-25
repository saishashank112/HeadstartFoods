import { Metadata } from "next";
import OrdersPanel from "@/components/admin/OrdersPanel";

export const metadata: Metadata = {
  title: "Order Management | Admin | Headstart Foods",
};

export default function AdminOrdersPage() {
  return (
    <div className="p-6 md:p-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-display font-extrabold text-navy tracking-tight">Order <span className="text-primary italic">Processing</span></h1>
          <div className="flex items-center gap-2 text-[10px] font-display font-bold text-slate/40 uppercase tracking-[0.2em]">Manage fulfillment and logistics</div>
        </div>
      </div>
      <OrdersPanel />
    </div>
  );
}
