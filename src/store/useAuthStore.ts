import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

interface User {
  id: string;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (data: Record<string, string>) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5055/api";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const res = await axios.post(`${API_URL}/auth/login`, { email, password });
        const { token, user } = res.data;
        document.cookie = `headstart-token=${token}; path=/; max-age=86400; SameSite=Lax`;
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      register: async (data) => {
        const res = await axios.post(`${API_URL}/auth/register`, data);
        const { token, user } = res.data;
        if (token) {
          document.cookie = `headstart-token=${token}; path=/; max-age=86400; SameSite=Lax`;
        }
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        document.cookie = "headstart-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        set({ user: null, token: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) return;
        try {
          const res = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          set({ user: res.data, isAuthenticated: true });
        } catch {
          set({ user: null, token: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: "headstart-auth",
    }
  )
);
