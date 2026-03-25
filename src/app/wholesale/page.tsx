import WholesalePortal from "@/components/wholesale/WholesalePortal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale & Business Partnerships | Headstart Foods",
  description: "Join Canada's fastest-growing premium food import network. Access exclusive seasonal pricing, priority allocation, and cold-chain logistics for Grade-A mangoes and S. Asian groceries.",
};

export default function WholesalePage() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <WholesalePortal />
    </div>
  );
}
