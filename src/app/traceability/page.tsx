import TraceabilityPortal from "@/components/compliance/TraceabilityPortal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Batch Traceability & Compliance | Headstart Foods",
  description: "Trace your box from orchard to doorstep. Instantly view harvest dates, transit temperature logs, and CFIA health clearance records for your premium mangoes.",
};

export default function TraceabilityPage() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <TraceabilityPortal />
    </div>
  );
}
