"use client";

import { useState } from "react";
import { 
  User, 
  Truck, 
  CreditCard, 
  Bell, 
  Mail, 
  Save,
  Phone
} from "lucide-react";


export default function SettingsPanel() {
  const [activeTab, setActiveTab] = useState("General Info");

  const TABS = [
    { id: "General Info", icon: User },
    { id: "Shipping", icon: Truck },
    { id: "Payments", icon: CreditCard },
    { id: "Notifications", icon: Bell },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <h1 className="text-2xl font-display font-black text-navy border-l-4 border-primary pl-4 uppercase tracking-tight">Store Settings</h1>
            <p className="text-xs font-body text-slate/40 ml-4 lowercase">Manage your store preferences and configurations.</p>
         </div>
         <button className="h-12 px-6 bg-[#8B1D21] text-white rounded-xl font-display font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-[#8B1D21]/20">
            <Save size={16} /> Save Changes
         </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Sidebar Tabs */}
         <aside className="lg:col-span-1 space-y-2">
            {TABS.map(tab => (
               <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-all ${activeTab === tab.id ? "bg-[#8B1D21] text-white shadow-lg shadow-[#8B1D21]/20" : "bg-white text-slate/40 hover:bg-gray-50 border border-transparent hover:border-gray-100"}`}
               >
                  <tab.icon size={18} />
                  {tab.id}
               </button>
            ))}
         </aside>

         {/* Content Area */}
         <main className="lg:col-span-3 bg-white rounded-[2rem] border border-gray-100 shadow-sm p-10 space-y-10">
            <section className="space-y-8">
               <div className="flex items-center gap-3 text-navy font-display font-black text-sm uppercase tracking-widest border-b border-gray-50 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#8B1D21]/10 text-[#8B1D21] flex items-center justify-center"><User size={20}/></div>
                  Store Details
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate/40 uppercase tracking-widest ml-1">Store Name</label>
                     <input className="w-full h-12 bg-off-white border border-gray-100 rounded-lg px-4 text-sm font-body outline-none focus:border-[#8B1D21] transition-all font-medium text-navy" defaultValue="Headstart Foods" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate/40 uppercase tracking-widest ml-1">Store Phone</label>
                     <div className="relative">
                        <input className="w-full h-12 bg-off-white border border-gray-100 rounded-lg px-4 text-sm font-body outline-none focus:border-[#8B1D21] transition-all font-medium text-navy" defaultValue="8367877660" />
                        <Phone size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate/20" />
                     </div>
                  </div>
               </div>

               <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#2563EB] shadow-sm shrink-0 mt-1"><Mail size={16}/></div>
                  <div className="space-y-1">
                     <h4 className="text-[11px] font-black text-[#1E40AF] uppercase tracking-widest">Email Configuration</h4>
                     <p className="text-xs font-body text-[#1E40AF]/70 leading-relaxed">This email and password are used to send all system emails — OTP verification, order confirmations, payment reminders, and status updates to customers.</p>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate/40 uppercase tracking-widest ml-1">Store Email (SMTP User)</label>
                     <div className="relative">
                        <input className="w-full h-12 bg-off-white border border-gray-100 rounded-lg px-12 text-sm font-body outline-none focus:border-[#8B1D21] transition-all font-medium text-navy" defaultValue="support@headstartfoods.com" />
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/20" />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate/40 uppercase tracking-widest ml-1">Email Password (SMTP Password)</label>
                     <input type="password" placeholder="••••••••••••" className="w-full h-12 bg-off-white border border-gray-100 rounded-lg px-4 text-sm font-body outline-none focus:border-[#8B1D21] transition-all font-medium text-navy" />
                     <p className="text-[10px] font-body text-slate/40 italic ml-1 lowercase">Used to authenticate with the mail server</p>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate/40 uppercase tracking-widest ml-1">SMTP Host</label>
                     <input className="w-full h-12 bg-off-white border border-gray-100 rounded-lg px-4 text-sm font-body outline-none focus:border-[#8B1D21] transition-all font-medium text-navy" defaultValue="mail.headstartfoods.com" />
                     <p className="text-[10px] font-body text-slate/40 italic ml-1 lowercase">e.g. mail.headstartfoods.com, smtp.gmail.com</p>
                  </div>
               </div>
            </section>
         </main>
      </div>
    </div>
  );
}
