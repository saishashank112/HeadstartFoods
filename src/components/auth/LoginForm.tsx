"use client";

import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      const { token, user } = useAuthStore.getState();
      if (token) await fetchCart(token);

      toast.success("Welcome back to Headstart Foods!");
      if (user?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-display font-black text-slate/30 uppercase tracking-[0.2em] ml-1">Account Identifier</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/20 group-focus-within:text-primary transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-20 bg-white border border-gray-100 rounded-xl pl-12 pr-4 text-base font-body font-medium text-navy focus:border-primary outline-none transition-all placeholder:text-slate/10 shadow-sm"
                placeholder="you@domain.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-display font-black text-slate/30 uppercase tracking-[0.2em]">Secret Key</label>
              <Link href="#" className="flex items-center justify-center min-h-[44px] px-2 text-[10px] font-display font-black text-primary/60 uppercase tracking-widest hover:text-primary transition-all">Recover</Link>
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/20 group-focus-within:text-primary transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-20 bg-white border border-gray-100 rounded-xl pl-12 pr-12 text-base font-body font-medium text-navy focus:border-primary outline-none transition-all placeholder:text-slate/10 shadow-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 w-14 h-20 flex items-center justify-center text-slate/20 hover:text-navy transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full h-16 bg-navy text-white rounded-xl font-display font-black text-[12px] uppercase tracking-[0.2em] hover:bg-[#8B1D21] transition-all flex items-center justify-center gap-3 shadow-xl shadow-navy/20 disabled:opacity-50 group active:scale-95"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : (
            <>
              Initialize Session <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="pt-10 border-t border-gray-100 flex flex-col items-center">
        <p className="text-[11px] font-body text-slate/40 text-center font-medium mb-4">
          Unauthorized Access is Restricted.
        </p>
        <Link href="/auth/register" className="flex items-center justify-center min-h-[48px] w-full max-w-[280px] border border-primary/20 bg-primary/5 rounded-full text-primary font-display font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
          Create New Account
        </Link>
      </div>
    </div>
  );
}
