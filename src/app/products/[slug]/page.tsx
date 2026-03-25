import ProductDetail from "@/components/product/ProductDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Alphonso Mangoes | Headstart Foods",
  description: "Experience the King of Mangoes! Hand-picked in Ratnagiri, air-shipped to Canada, and CFIA cleared. Order your box today for peak-season freshness.",
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  // In a real app, fetch product by slug here
  return (
    <div className="pt-16 pb-24 min-h-screen bg-white">
      <ProductDetail />
    </div>
  );
}
