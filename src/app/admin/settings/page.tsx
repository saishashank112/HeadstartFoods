import { Metadata } from "next";
import SettingsPanel from "@/components/admin/SettingsPanel";

export const metadata: Metadata = {
  title: "Global Settings | Admin | Headstart Foods",
};

export default function AdminSettingsPage() {
  return (
    <div className="p-6 md:p-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-display font-extrabold text-navy tracking-tight">Global <span className="text-primary italic">Settings</span></h1>
          <div className="flex items-center gap-2 text-[10px] font-display font-bold text-slate/40 uppercase tracking-[0.2em]">Platform and security configuration</div>
        </div>
      </div>
      <SettingsPanel />
    </div>
  );
}
