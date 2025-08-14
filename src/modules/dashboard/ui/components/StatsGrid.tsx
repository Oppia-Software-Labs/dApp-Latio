"use client";

import { DashboardStats, ExchangeRate } from "../../types/dashboard.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  MapPin, 
  Activity
} from "lucide-react";

interface StatsGridProps {
  stats: DashboardStats;
  exchangeRates?: ExchangeRate[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const statsData = [
    {
      title: "Total Spent",
      value: formatCurrency(stats.totalSpent),
      icon: DollarSign,
      trend: "+12.5%",
      trendUp: true,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Active Trips",
      value: stats.activeTrips.toString(),
      icon: MapPin,
      trend: "+1",
      trendUp: true,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Transactions",
      value: stats.totalTransactions.toString(),
      icon: Activity,
      trend: "+3",
      trendUp: true,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Savings",
      value: formatCurrency(stats.savings),
      icon: TrendingUp,
      trend: "+8.2%",
      trendUp: true,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <IconComponent className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                {stat.trendUp ? (
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                )}
                <span className={stat.trendUp ? "text-green-500" : "text-red-500"}>
                  {stat.trend}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
