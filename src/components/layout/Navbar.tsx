"use client";

import { ShoppingCart, Menu, LogOut, Home, Grid, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../shared/Logo";
import NotificationBell from "../shared/NotificationBell";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Catalog", href: "/products", icon: Grid },
  { label: "Wholesale", href: "/wholesale" },
  { label: "Traceability", href: "/traceability" },
  { label: "About", href: "/about" },
];

const MOBILE_BOTTOM_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Catalog", href: "/products", icon: Grid },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
  { label: "Profile", href: "/dashboard", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const cartItemCount = useCartStore((state) => state.cartCount);
  const { isAuthenticated, logout, user } = useAuthStore();

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (!isMounted) return null;

  const isHome = pathname === "/";
  // Determine if we should use the 'Light' theme for the capsule (white bg, navy text)
  const useLightNavbar = scrolled || !isHome;

  return (
    <>
      {/* Top Floating Navbar (Desktop focus) */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-3 md:p-3 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto flex items-center justify-between px-4 md:px-8 h-12 md:h-16 max-w-7xl w-full transition-all duration-500 ease-out border shadow-2xl ${
            useLightNavbar
              ? "bg-white/95 backdrop-blur-3xl border-gray-100 rounded-full scale-[1]" 
              : "bg-navy/40 backdrop-blur-2xl border-white/20 rounded-full"
          }`}
        >
          {/* Left: Branding */}
          <div className="flex-1">
            <Logo light={!useLightNavbar} />
          </div>

          {/* Center: Nav Links (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-center gap-10 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[12px] font-display font-black uppercase tracking-[0.25em] transition-all hover:text-primary relative group ${
                  pathname === link.href 
                    ? "text-primary" 
                    : useLightNavbar ? "text-navy font-bold" : "text-white"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div 
                     layoutId="nav-active" 
                     className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full shadow-[0_0_10px_rgba(255,140,0,0.5)]" 
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
            <div className="flex items-center justify-end gap-2 md:gap-8 flex-1">
              <div className="flex items-center gap-1 md:gap-2">
                <Link href="/cart" className={`relative hidden md:flex w-10 h-10 md:w-12 md:h-12 items-center justify-center transition-all transform hover:scale-110 ${useLightNavbar ? "text-navy/60 hover:text-navy" : "text-white/70 hover:text-white"}`}>
                <ShoppingCart size={18} />
                <AnimatePresence>
                  {cartItemCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-1 right-1 h-4 min-w-4 px-1 flex items-center justify-center bg-primary text-white text-[8px] font-black rounded-full shadow-lg border border-white/20"
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {isAuthenticated && <NotificationBell target="user" userId={user?.id} />}
            </div>

            <div className={`h-4 w-[1px] hidden md:block ${useLightNavbar ? "bg-navy/10" : "bg-white/10"}`} />

            {/* Auth Actions (Desktop Only) */}
            <div className="hidden md:flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                    <Link href="/dashboard" className="flex items-center gap-2 group/user pl-2">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-[8px] font-black uppercase group-hover/user:border-primary transition-all ${useLightNavbar ? "bg-navy/5 border-navy/20 text-navy" : "bg-white/5 border-white/20 text-white"}`}>
                        {user?.first_name?.[0]}{user?.last_name?.[0]}
                      </div>
                    </Link>
                    <button 
                      onClick={() => logout()}
                      className={`w-10 h-10 flex items-center justify-center transition-all ${useLightNavbar ? "text-navy/40 hover:text-error" : "text-white/40 hover:text-error"}`}
                    >
                      <LogOut size={14} />
                    </button>
                </div>
              ) : (
                <Link 
                  href="/auth/register" 
                  className="group relative px-6 h-10 overflow-hidden rounded-full transition-all active:scale-95"
                >
                  <div className="absolute inset-0 bg-primary group-hover:bg-primary-hover transition-colors" />
                  <span className="relative z-10 text-[10px] font-display font-black uppercase tracking-[0.2em] text-white">
                    Sign Up
                  </span>
                </Link>
              )}
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center transition-all ${useLightNavbar ? "text-navy/80 hover:text-navy" : "text-white/80 hover:text-white"}`}
            >
              <Menu size={22} />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[110] bg-navy flex flex-col items-center justify-center p-8"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="w-full space-y-10 text-center">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block text-5xl font-display font-black text-white hover:text-primary transition-colors uppercase tracking-tight"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-10 border-t border-white/10 space-y-6"
              >
                 {isAuthenticated ? (
                   <Link href="/dashboard" className="block text-white/40 font-display font-black uppercase tracking-[0.3em] text-[10px] hover:text-white transition-colors">My Strategic Account</Link>
                 ) : (
                   <div className="flex flex-col gap-6">
                    <Link href="/auth/login" className="block text-white/40 font-display font-black uppercase tracking-[0.3em] text-[10px] hover:text-white transition-colors">Client Sign In</Link>
                    <Link href="/auth/register" className="block text-primary font-display font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-all">Apply for Access</Link>
                   </div>
                 )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation (Strictly for viewports < 768px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 safe-pb shadow-[0_-4px_24px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between h-16 max-w-md mx-auto">
          {MOBILE_BOTTOM_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className="relative flex flex-col items-center justify-center w-12 h-12 transition-all active:scale-90"
              >
                <div className="relative">
                  <Icon 
                    size={20} 
                    className={`transition-colors ${isActive ? "text-primary" : "text-slate/30"}`} 
                  />
                  {link.label === "Cart" && cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-2 h-3.5 min-w-[14px] px-1 flex items-center justify-center bg-primary text-white text-[7px] font-black rounded-full border border-white shadow-lg">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span className={`text-[8px] font-display font-black uppercase tracking-widest mt-1 ${isActive ? "text-primary" : "text-slate/30"}`}>
                  {link.label}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="bottom-nav-indicator"
                    className="absolute -top-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(255,140,0,0.5)]"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
