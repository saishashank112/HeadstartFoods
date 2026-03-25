"use client";

import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const register = useAuthStore((state) => state.register);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      return toast.error("Passwords do not match.");
    }

    setLoading(true);
    try {
      await register({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password
      });

      const { token, user } = useAuthStore.getState();
      if (token) await fetchCart(token);

      toast.success("Welcome aboard! Your account is active.");
      if (user?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { error?: string } } })?.response?.data?.error || "Registration failed.";
      toast.error(errorMessage);
    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-display font-black text-slate/30 uppercase tracking-[0.2em] ml-1">First Name</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/20 group-focus-within:text-primary transition-colors">
                 <User size={18} />
              </div>
              <input
                name="first_name"
                required
                value={formData.first_name}
                onChange={handleChange}
                className="w-full h-20 bg-white border border-gray-100 rounded-xl pl-12 pr-4 text-base font-body font-medium text-navy focus:border-primary outline-none transition-all placeholder:text-slate/10 shadow-sm"
                placeholder="Ram"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-display font-black text-slate/30 uppercase tracking-[0.2em] ml-1">Last Name</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/20 group-focus-within:text-primary transition-colors">
                 <User size={18} />
              </div>
              <input
                name="last_name"
                required
                value={formData.last_name}
                onChange={handleChange}
                className="w-full h-20 bg-white border border-gray-100 rounded-xl pl-12 pr-4 text-base font-body font-medium text-navy focus:border-primary outline-none transition-all placeholder:text-slate/10 shadow-sm"
                placeholder="Sharma"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-display font-black text-slate/30 uppercase tracking-[0.2em] ml-1">Email Address</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/20 group-focus-within:text-primary transition-colors">
               <Mail size={18} />
            </div>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full h-20 bg-white border border-gray-100 rounded-xl pl-12 pr-4 text-base font-body font-medium text-navy focus:border-primary outline-none transition-all placeholder:text-slate/10 shadow-sm"
              placeholder="you@domain.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-display font-black text-slate/30 uppercase tracking-[0.2em] ml-1">Secure Passkey</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/20 group-focus-within:text-primary transition-colors">
                 <Lock size={18} />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
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
          <div className="space-y-2">
            <label className="text-[10px] font-display font-black text-slate/30 uppercase tracking-[0.2em] ml-1">Validate Passkey</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/20 group-focus-within:text-primary transition-colors">
                 <Lock size={18} />
              </div>
              <input
                name="confirm"
                type={showPassword ? "text" : "password"}
                required
                value={formData.confirm}
                onChange={handleChange}
                className="w-full h-20 bg-white border border-gray-100 rounded-xl pl-12 pr-12 text-base font-body font-medium text-navy focus:border-primary outline-none transition-all placeholder:text-slate/10 shadow-sm"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full h-16 bg-navy text-white rounded-xl font-display font-black text-[12px] uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50 group mt-4"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : (
            <>
              Connect Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="pt-10 border-t border-gray-100 flex flex-col items-center">
        <p className="text-[11px] font-body text-slate/40 text-center font-medium mb-4">
          Already Part of the Harvest?
        </p>
        <Link href="/auth/login" className="flex items-center justify-center min-h-[48px] w-full max-w-[280px] border border-primary/20 bg-primary/5 rounded-full text-primary font-display font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
          Sign In System
        </Link>
      </div>
    </div>
  );
}
