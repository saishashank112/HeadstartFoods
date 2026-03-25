import { Metadata } from "next";
import { Star, MessageSquare, ThumbsUp, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Reviews & Feedback | Admin | Headstart Foods",
};

export default function ReviewsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <h1 className="text-2xl font-display font-black text-navy border-l-4 border-primary pl-4 uppercase tracking-tight">Customer Reviews</h1>
            <p className="text-xs font-body text-slate/40 ml-4 lowercase">Manage product ratings, testimonial approvals, and feedback.</p>
         </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: "Approved Reviews", value: "142", icon: ThumbsUp, color: "text-[#10B981]", bg: "bg-[#10B981]/5" },
            { label: "Pending Approval", value: "0", icon: MessageSquare, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/5" },
            { label: "Average Rating", value: "4.8", icon: Star, color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/5" },
         ].map(s => (
            <div key={s.label} className="bg-white rounded-[2rem] p-8 border border-gray-100 flex items-center gap-6 shadow-sm">
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${s.bg} ${s.color}`}><s.icon size={28}/></div>
               <div>
                  <div className="text-[10px] font-black text-slate/30 uppercase tracking-widest">{s.label}</div>
                  <div className="text-2xl font-display font-black text-navy">{s.value}</div>
               </div>
            </div>
         ))}
      </div>

      <section className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-12 text-center space-y-4">
         <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center text-navy/20 mx-auto"><Star size={32}/></div>
         <h4 className="font-display font-black text-lg text-navy uppercase tracking-tight">High Satisfaction</h4>
         <p className="text-xs font-body text-slate opacity-40 max-w-md mx-auto">No new reviews pending approval. Your current catalog has a stellar satisfaction score.</p>
      </section>
    </div>
  );
}
