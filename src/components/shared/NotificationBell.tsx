"use client";

import { useNotificationStore, Notification } from "@/store/useNotificationStore";
import { Bell, X, Check, AlertCircle, Info, CheckCircle2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

export default function NotificationBell({ target, userId }: { target: "admin" | "user"; userId?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, unreadCount, clearAll } = useNotificationStore();
  const menuRef = useRef<HTMLDivElement>(null);

  const count = unreadCount(target, userId);
  const relevantNotifications = notifications.filter(
    (n) => (n.target === "all" || n.target === target) && (!userId || n.userId === userId)
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success": return <CheckCircle2 size={16} className="text-emerald-500" />;
      case "warning": return <AlertCircle size={16} className="text-amber-500" />;
      case "error": return <X size={16} className="text-rose-500" />;
      default: return <Info size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-slate/40 hover:text-navy hover:bg-off-white rounded-full transition-all"
        aria-label="View notifications"
      >
        <Bell size={20} />
        {count > 0 && (
          <span className="absolute top-2 right-2 w-4 h-4 bg-primary text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-lg">
            {count}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-4 w-80 md:w-96 bg-white border border-gray-soft rounded-3xl shadow-2xl z-[200] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-soft flex items-center justify-between">
              <h3 className="font-display font-black text-[12px] uppercase tracking-widest text-navy">Notifications</h3>
              <button onClick={clearAll} className="text-[9px] font-display font-black uppercase tracking-widest text-slate/40 hover:text-primary transition-colors">Clear All</button>
            </div>

            <div className="max-h-[400px] overflow-y-auto overflow-x-hidden">
              {relevantNotifications.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <div className="w-12 h-12 bg-off-white rounded-full flex items-center justify-center text-slate/20 mx-auto">
                    <Bell size={24} />
                  </div>
                  <p className="text-[11px] font-body text-slate/40 tracking-wide">No notifications yet.</p>
                </div>
              ) : (
                relevantNotifications.map((n) => (
                  <div 
                    key={n.id}
                    onClick={() => !n.read && markAsRead(n.id)}
                    className={`p-6 border-b border-gray-soft last:border-0 cursor-pointer transition-all hover:bg-off-white relative overflow-hidden ${!n.read ? "bg-primary/[0.02]" : ""}`}
                  >
                    {!n.read && <div className="absolute top-0 left-0 w-1 h-full bg-primary" />}
                    <div className="flex gap-4">
                      <div className="shrink-0 pt-1">{getIcon(n.type)}</div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                           <h4 className={`font-display font-bold text-xs ${!n.read ? "text-navy" : "text-slate/60"}`}>{n.title}</h4>
                           <span className="text-[9px] text-slate/30 font-body whitespace-nowrap">{formatDistanceToNow(n.timestamp)} ago</span>
                        </div>
                        <p className="text-[11px] font-body text-slate/60 leading-relaxed">{n.message}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-4 bg-off-white text-center">
               <span className="text-[9px] font-display font-black text-slate/20 uppercase tracking-[0.2em]">End of Notifications</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
