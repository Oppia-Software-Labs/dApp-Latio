"use client";
import dynamic from "next/dynamic";
import { AuthGuard } from "@/modules/auth/ui/AuthGuard";

const DashboardScreen = dynamic(
  () => import("@/modules/dashboard/ui/DashboardScreen").then(m => ({ default: m.DashboardScreen })),
  { ssr: false }
);

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardScreen />
    </AuthGuard>
  );
}
