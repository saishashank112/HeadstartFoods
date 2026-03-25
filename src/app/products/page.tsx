import ProductCatalog from "@/components/product/ProductCatalog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Premium Mangoes & Groceries",
  description: "Browse the finest collection of Alphonso, Kesar, and premium Indian mangoes and South Asian groceries in Canada. Hand-picked, air-shipped, and CFIA cleared.",
};

export default function CatalogPage() {
  return (
    <div className="pt-16 pb-24 min-h-screen bg-off-white">
      <ProductCatalog />
    </div>
  );
}
