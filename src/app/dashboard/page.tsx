import UserDashboard from "@/components/dashboard/UserDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Dashboard | Headstart Foods",
  description: "Manage your premium seasonal orders, track air-import shipments, and save your delivery addresses for seamless checkout.",
};

export default function DashboardPage() {
  return (
    <div className="pt-10 pb-12 min-h-screen bg-off-white">
      <UserDashboard />
    </div>
  );
}
