import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
  origin: string;
  features: string[];
}

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setProducts: (products: Product[]) => void;
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Premium Alphonso Mangoes",
    slug: "premium-alphonso-mangoes",
    price: 45.99,
    category: "Fresh Fruits",
    image: "/mango-alphonso.png",
    description: "The 'King of Mangoes' sourced from Ratnagiri.",
    stock: 45,
    origin: "Ratnagiri, India",
    features: ["Grade A Export", "Naturally Ripened"]
  },
  {
    id: "p2",
    name: "Organic Red Lentils (Masoor Dal)",
    slug: "organic-red-lentils",
    price: 12.50,
    category: "Grains & Dals",
    image: "/dals-category.png",
    description: "High protein, organic red lentils.",
    stock: 120,
    origin: "Punjab, India",
    features: ["100% Organic", "Polished-Free"]
  },
  {
    id: "p3",
    name: "Stone-Ground Atta (Whole Wheat)",
    slug: "stone-ground-atta",
    price: 28.00,
    category: "Flours",
    image: "/atta.png",
    description: "Traditional stone-ground whole wheat flour.",
    stock: 80,
    origin: "Madhya Pradesh, India",
    features: ["Zero Maida", "High Fiber"]
  }
];

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: DEFAULT_PRODUCTS,
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updates) => set((state) => ({
        products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      })),
      setProducts: (products) => set({ products }),
    }),
    {
      name: 'headstart-inventory',
    }
  )
);
