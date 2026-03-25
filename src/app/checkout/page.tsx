import CheckoutFlow from "@/components/checkout/CheckoutFlow";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | Headstart Foods",
  description: "Securely place your order for premium mangoes and South Asian groceries. Fast air-import shipping across Canada.",
};

export default function CheckoutPage() {
  return (
    <div className="pt-16 pb-24 min-h-screen bg-white">
      <CheckoutFlow />
    </div>
  );
}
