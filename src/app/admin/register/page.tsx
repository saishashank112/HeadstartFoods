"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { ShieldCheck, UserPlus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminRegisterPage() {
  const router = useRouter();
  const adminRegister = useAuthStore((state) => state.adminRegister);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    secret_key: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminRegister(formData);
      toast.success("Admin Registration Successful");
      router.push("/admin/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl p-10 border border-gray-100 shadow-xl shadow-slate/5 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <Link href="/admin/login" className="inline-flex items-center gap-2 text-xs font-bold text-slate/40 uppercase tracking-widest hover:text-primary transition-colors mb-8">
          <ArrowLeft size={14} /> Back to Login
        </Link>
        
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-lg shadow-primary/20">
            <UserPlus size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-display font-black text-navy tracking-tight">Request <span className="text-primary italic">Access</span></h1>
            <p className="text-sm font-body text-slate/60 mt-2">Provision a new administrator account.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate/50 uppercase tracking-widest mb-2">First Name</label>
              <input
                type="text"
                required
                value={formData.first_name}
                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Jane"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate/50 uppercase tracking-widest mb-2">Last Name</label>
              <input
                type="text"
                required
                value={formData.last_name}
                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate/50 uppercase tracking-widest mb-2">Work Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="admin@headstartfoods.com"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate/50 uppercase tracking-widest mb-2">Security Key (Optional)</label>
              <input
                type="password"
                value={formData.secret_key}
                onChange={(e) => setFormData({...formData, secret_key: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Provide access ticket"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate/50 uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Create a strong password"
              />
            </div>
          </div>

          <div className="bg-navy/5 rounded-xl p-4 flex items-start gap-3 border border-navy/10">
            <ShieldCheck size={18} className="text-navy mt-0.5 shrink-0" />
            <p className="text-xs font-body text-slate/60 leading-relaxed">
              By registering an admin account, you agree to adhere to the Headstart Foods Internal Security Protocols.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white rounded-xl py-3.5 font-display font-bold text-sm tracking-wide hover:bg-navy transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            {loading ? "Provisioning..." : "Provision Account"}
          </button>
        </form>

      </div>
    </div>
  );
}
