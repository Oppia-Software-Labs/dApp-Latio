"use client";

import { QuickAction } from "../../types/dashboard.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, ArrowLeftRight, CreditCard, MapPin, QrCode, Wallet } from "lucide-react";
import { useSendStore } from "../../state/send.store";

interface QuickActionsProps {
  actions: QuickAction[];
}

const iconMap = {
  Send: Send,
  ArrowLeftRight: ArrowLeftRight,
  CreditCard: CreditCard,
  MapPin: MapPin,
  QrCode: QrCode,
  Wallet: Wallet,
};

const colorClasses = {
  blue: "bg-blue-500 hover:bg-blue-600",
  green: "bg-green-500 hover:bg-green-600",
  purple: "bg-purple-500 hover:bg-purple-600",
  orange: "bg-orange-500 hover:bg-orange-600",
};

export function QuickActions({ actions }: QuickActionsProps) {
  const { openModal } = useSendStore();

  const handleAction = (action: QuickAction) => {
    if (action.id === "send") {
      openModal();
    } else {
      action.action();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const IconComponent = iconMap[action.icon as keyof typeof iconMap];
            return (
              <button
                key={action.id}
                onClick={() => handleAction(action)}
                className={`${colorClasses[action.color]} text-white rounded-lg p-4 transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                aria-label={action.title}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <IconComponent className="w-6 h-6" />
                  <div>
                    <p className="font-medium text-sm">{action.title}</p>
                    <p className="text-xs opacity-90">{action.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
