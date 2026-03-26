"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { ShieldAlert, Fingerprint, ExternalLink } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const adminLogin = useAuthStore((state) => state.adminLogin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminLogin(email, password);
      toast.success("Welcome back, Admin!");
      router.push("/admin/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-10 border border-gray-100 shadow-xl shadow-slate/5 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center text-white shadow-lg shadow-navy/20">
            <Fingerprint size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-display font-black text-navy tracking-tight">Admin <span className="text-primary italic">Portal</span></h1>
            <p className="text-sm font-body text-slate/60 mt-2">Secure access restricted to authorized personnel.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate/50 uppercase tracking-widest mb-2">Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="admin@headstartfoods.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate/50 uppercase tracking-widest">Password</label>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="bg-primary/5 rounded-xl p-4 flex items-start gap-3 border border-primary/10">
            <ShieldAlert size={18} className="text-primary mt-0.5 shrink-0" />
            <p className="text-xs font-body text-slate/60 leading-relaxed">
              This system is monitored. Unauthorized access attempts will be logged and reported.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-white rounded-xl py-3.5 font-display font-bold text-sm tracking-wide hover:bg-primary transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating..." : "Establish Secure Connection"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs font-body text-slate/40 flex items-center justify-center gap-4">
           <Link href="/admin/register" className="hover:text-primary transition-colors">Request Admin Access</Link>
           <span>•</span>
           <Link href="/" className="hover:text-primary flex items-center gap-1 transition-colors">Return to Site <ExternalLink size={10}/></Link>
        </div>
      </div>
    </div>
  );
}
