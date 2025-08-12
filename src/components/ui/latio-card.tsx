import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function LatioCard({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("latio-card", className)}>{children}</div>;
}
