import { Metadata } from "next";
import { Undo2, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Returns & RMA | Admin | Headstart Foods",
};

export default function ReturnsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <h1 className="text-2xl font-display font-black text-navy border-l-4 border-primary pl-4 uppercase tracking-tight">Returns & RMAs</h1>
            <p className="text-xs font-body text-slate/40 ml-4 lowercase">Manage product returns, refund status, and quality control.</p>
         </div>
      </header>

      <section className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-12 text-center space-y-4">
         <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center text-navy/20 mx-auto"><Undo2 size={32}/></div>
         <h4 className="font-display font-black text-lg text-navy uppercase tracking-tight">All Operations Normal</h4>
         <p className="text-xs font-body text-slate opacity-40 max-w-md mx-auto">No pending returns or refund requests. Your cold-chain logistics are performing at 100% efficiency.</p>
      </section>
    </div>
  );
}
