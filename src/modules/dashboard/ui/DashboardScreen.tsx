"use client";
import LatioCard from "@/components/ui/latio-card";
import { Button } from "@/components/ui/button";

export function DashboardScreen() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <LatioCard>
        <div className="p-6">
          <h3 className="card-heading">Wallet Balance</h3>
          <p className="card-subheading">XLM • Converted to local</p>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="text-3xl font-semibold">1,245.90 XLM</div>
              <div className="text-muted-foreground">≈ $132.12 USD</div>
            </div>
            <Button className="latio-gradient">Send</Button>
          </div>
        </div>
      </LatioCard>

      <LatioCard>
        <div className="p-6">
          <h3 className="card-heading">Travel Plan</h3>
          <p className="card-subheading">Budget • Dates • Destination</p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="font-medium">San José, Costa Rica</div>
              <div className="text-sm text-muted-foreground">Aug 14 — Aug 20</div>
            </div>
            <Button variant="outline">View</Button>
          </div>
        </div>
      </LatioCard>
    </div>
  );
}
