"use client";

import { 
  LayoutDashboard, 
  Box, 
  ClipboardList, 
  Users, 
  Settings, 
  Truck,
  Star,
  LogOut,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const NAV_ITEMS = [
  { group: "Main", items: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { id: "orders", label: "Orders", icon: ClipboardList, href: "/admin/orders" },
    { id: "delivery", label: "Delivery", icon: Truck, href: "/admin/delivery" },
  ]},
  { group: "Catalog", items: [
    { id: "products", label: "Products", icon: Box, href: "/admin/inventory" },
    { id: "partners", label: "Customers", icon: Users, href: "/admin/partners" },
  ]},
  { group: "Operations", items: [
    { id: "reviews", label: "Reviews", icon: Star, href: "/admin/reviews" },
    { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
  ]}
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen shrink-0 overflow-y-auto hidden lg:flex">
         <div className="p-8">
            <div className="flex items-center gap-2">
               <span className="font-display font-black text-xl text-primary tracking-tight">Headstart</span>
               <span className="font-display font-medium text-sm text-slate opacity-40 italic">Admin</span>
            </div>
         </div>

         <nav className="flex-1 px-4 space-y-8">
            {NAV_ITEMS.map((group) => (
              <div key={group.group} className="space-y-1">
                <div className="px-4 text-[10px] font-bold text-slate/30 uppercase tracking-[0.2em] mb-2">{group.group}</div>
                {group.items.map((item) => {
                  const isActive = pathname === item.href || (item.id === "dashboard" && pathname === "/admin");
                  return (
                    <Link 
                      key={item.id}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body font-medium text-sm transition-all ${isActive ? "bg-primary/5 text-primary" : "text-slate/60 hover:bg-gray-50 hover:text-slate"}`}
                    >
                       <item.icon size={18} className={isActive ? "text-primary" : "text-slate/40"} />
                       {item.label}
                    </Link>
                  );
                })}
              </div>
            ))}
         </nav>

         <div className="p-6 border-t border-gray-100 space-y-4">
            <button 
              onClick={() => {
                logout();
                router.push("/auth/login");
              }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-error font-body font-medium text-sm hover:bg-error/5 transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
            <div className="flex items-center justify-center py-2 px-4 bg-primary/5 rounded-full border border-primary/10">
               <span className="text-[10px] font-bold text-primary uppercase tracking-widest">v2.4.0-premium</span>
            </div>
         </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header Bar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 shrink-0">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate/5 border border-slate/10 flex items-center justify-center text-slate/40 animate-pulse">
                 <AlertCircle size={20} />
              </div>
              <div className="h-6 w-px bg-gray-100 mx-2" />
              <div className="font-body text-xs text-slate/40 uppercase tracking-widest font-bold">System Online</div>
           </div>

           <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate/10 overflow-hidden">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                    </div>
                 ))}
              </div>
              <button className="h-10 px-4 bg-navy text-white rounded-lg font-display font-bold text-[10px] uppercase tracking-widest hover:bg-primary transition-all">Support Desk</button>
           </div>
        </header>

        {/* Scrollable Content */}
        <section className="flex-1 overflow-y-auto p-10">
          {children}
        </section>
      </main>
    </div>
  );
}

