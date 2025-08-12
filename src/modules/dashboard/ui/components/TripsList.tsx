"use client";

import { Trip } from "../../types/dashboard.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Calendar, 
  Plane, 
  Hotel, 
  Car,
  Plus
} from "lucide-react";

interface TripsListProps {
  trips: Trip[];
}

const statusConfig = {
  planning: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    text: "Planning"
  },
  active: {
    color: "bg-green-100 text-green-800 border-green-200",
    text: "Active"
  },
  completed: {
    color: "bg-gray-100 text-gray-800 border-gray-200",
    text: "Completed"
  },
};

export function TripsList({ trips }: TripsListProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getStatusBadge = (status: Trip['status']) => {
    const config = statusConfig[status];
    return (
      <Badge className={`${config.color} text-xs`}>
        {config.text}
      </Badge>
    );
  };

  const getBudgetProgress = (trip: Trip) => {
    return (trip.budget.spent / trip.budget.amount) * 100;
  };

  const getTransportationIcon = (transportation?: string) => {
    if (!transportation) return null;
    
    if (transportation.toLowerCase().includes('car')) {
      return <Car className="w-4 h-4" />;
    } else if (transportation.toLowerCase().includes('plane')) {
      return <Plane className="w-4 h-4" />;
    }
    return <Car className="w-4 h-4" />;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">My Trips</CardTitle>
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
          <Plus className="w-4 h-4" />
          New Trip
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="p-4 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-sm">{trip.destination}</h3>
                    <p className="text-xs text-gray-500">{trip.country}</p>
                  </div>
                </div>
                {getStatusBadge(trip.status)}
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </span>
                </div>
                {trip.accommodation && (
                  <div className="flex items-center gap-1">
                    <Hotel className="w-3 h-3" />
                    <span>{trip.accommodation}</span>
                  </div>
                )}
                {trip.transportation && (
                  <div className="flex items-center gap-1">
                    {getTransportationIcon(trip.transportation)}
                    <span>{trip.transportation}</span>
                  </div>
                )}
              </div>

              {/* Budget Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">Budget</span>
                  <span className="font-medium">
                    {formatCurrency(trip.budget.spent, trip.budget.currency)} / {formatCurrency(trip.budget.amount, trip.budget.currency)}
                  </span>
                </div>
                <Progress 
                  value={getBudgetProgress(trip)} 
                  className="h-2"
                />
              </div>

              {/* Activities */}
              {trip.activities.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {trip.activities.slice(0, 3).map((activity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {activity}
                    </Badge>
                  ))}
                  {trip.activities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{trip.activities.length - 3} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
