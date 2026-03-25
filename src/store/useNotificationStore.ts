import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  target: "admin" | "user" | "all";
  userId?: string;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  unreadCount: (target: "admin" | "user", userId?: string) => number;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      addNotification: (notif) => {
        const newNotif: Notification = {
          ...notif,
          id: Math.random().toString(36).substring(7),
          timestamp: Date.now(),
          read: false,
        };
        set((state) => ({
          notifications: [newNotif, ...state.notifications],
        }));
      },
      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },
      clearAll: () => set({ notifications: [] }),
      unreadCount: (target, userId) => {
        return get().notifications.filter(
          (n) => !n.read && (n.target === "all" || n.target === target) && (!userId || n.userId === userId)
        ).length;
      },
    }),
    {
      name: "headstart-notifications",
    }
  )
);
