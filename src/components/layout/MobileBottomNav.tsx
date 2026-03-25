"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Store, User } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const TABS = [
    { label: "Home", href: "/", icon: Home },
    { label: "Products", href: "/products", icon: ShoppingBag },
    { label: "Wholesale", href: "/wholesale", icon: Store },
    { label: "Account", href: "/account", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-soft pb-[env(safe-area-inset-bottom)] h-[calc(64px+env(safe-area-inset-bottom))] shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
      <div className="h-16 flex items-center justify-around px-2">
        {TABS.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-base ${
                isActive ? "text-primary scale-110" : "text-slate opacity-70"
              }`}
            >
              <tab.icon size={22} className={`${isActive ? "stroke-[2.5px]" : "stroke-[2px] transition-transform group-hover:scale-110"}`} />
              <span className={`text-[10px] font-display font-bold uppercase tracking-widest ${isActive ? "text-primary" : "text-slate"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
