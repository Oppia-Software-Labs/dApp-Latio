"use client";
import dynamic from "next/dynamic";
const DashboardScreen = dynamic(() => import("@/modules/dashboard/ui/DashboardScreen").then(m => m.DashboardScreen), { ssr: false, });
export default function Page(){ return <DashboardScreen/>; }
