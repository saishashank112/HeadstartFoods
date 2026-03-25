import { Metadata } from "next";
import InventoryPanel from "@/components/admin/InventoryPanel";

export const metadata: Metadata = {
  title: "Inventory & Pricing | Admin | Headstart Foods",
};

export default function AdminInventoryPage() {
  return (
    <div className="p-6 md:p-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-display font-extrabold text-navy tracking-tight">Inventory <span className="text-primary italic">Management</span></h1>
          <div className="flex items-center gap-2 text-[10px] font-display font-bold text-slate/40 uppercase tracking-[0.2em]">Manage catalog and tiered pricing</div>
        </div>
      </div>
      <InventoryPanel />
    </div>
  );
}
