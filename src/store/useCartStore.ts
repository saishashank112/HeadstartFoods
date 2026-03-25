import { create } from "zustand";


interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface CartState {
  cartCount: number;
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  fetchCart: (token?: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cartCount: 0,
  items: [],
  addItem: (item, qty = 1) => set((state) => {
    const existing = state.items.find(i => i.id === item.id);
    let newItems;
    if (existing) {
      newItems = state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + qty } : i);
    } else {
      newItems = [...state.items, { ...item, quantity: qty }];
    }
    return {
      items: newItems,
      cartCount: state.cartCount + qty
    };
  }),
  removeItem: (id) => set((state) => {
    const item = state.items.find(i => i.id === id);
    return {
      items: state.items.filter(i => i.id !== id),
      cartCount: state.cartCount - (item?.quantity || 0)
    };
  }),
  updateQty: (id, delta) => set((state) => {
    const newItems = state.items.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    });
    const newCount = newItems.reduce((sum, i) => sum + i.quantity, 0);
    return { items: newItems, cartCount: newCount };
  }),
  clearCart: () => set({ items: [], cartCount: 0 }),
  fetchCart: async () => {} // Compatibility stub
}));
