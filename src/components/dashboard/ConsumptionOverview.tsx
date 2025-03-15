import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Gauge, Zap, DollarSign, ChevronRight } from "lucide-react";
import ConsumptionDetail from "./ConsumptionDetail";

interface ConsumptionOverviewProps {
  currentPower?: number;
  dailyConsumption?: number;
  estimatedCost?: number;
  maxPower?: number;
  onViewDetails?: () => void;
}

const ConsumptionOverview = ({
  currentPower = 2.4,
  dailyConsumption = 18.7,
  estimatedCost = 156.32,
  maxPower = 5,
  onViewDetails,
}: ConsumptionOverviewProps) => {
  const [showDetails, setShowDetails] = useState(false);

  // Calculate percentage for gauge visualization
  const powerPercentage = Math.min(
    Math.round((currentPower / maxPower) * 100),
    100,
  );

  // Determine color based on consumption level
  const getColorClass = (percentage: number) => {
    if (percentage < 40) return "text-green-500";
    if (percentage < 70) return "text-amber-500";
    return "text-red-500";
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      setShowDetails(true);
    }
  };

  if (showDetails) {
    return (
      <ConsumptionDetail
        onBack={() => setShowDetails(false)}
        currentPower={currentPower}
        dailyConsumption={dailyConsumption}
      />
    );
  }

  return (
    <Card
      className="w-full bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-gray-800">
          Real-Time Consumption
        </CardTitle>
        <div className="flex items-center text-sm text-blue-600 font-medium">
          View Details <ChevronRight className="h-4 w-4 ml-1" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Current Power Usage */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-32 w-32 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <Gauge
                  className={`h-12 w-12 ${getColorClass(powerPercentage)}`}
                />
              </div>
              <svg className="h-32 w-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke={
                    powerPercentage < 40
                      ? "#10b981"
                      : powerPercentage < 70
                        ? "#f59e0b"
                        : "#ef4444"
                  }
                  strokeWidth="8"
                  strokeDasharray="352"
                  strokeDashoffset={352 - (352 * powerPercentage) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={`text-2xl font-bold ${getColorClass(powerPercentage)}`}
                >
                  {currentPower}
                </span>
                <span className="text-sm text-gray-500">kW</span>
              </div>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-700">
              Current Power
            </p>
          </div>

          {/* Today's Energy Consumption */}
          <div className="flex flex-col items-center justify-center">
            <div className="h-32 w-32 flex flex-col items-center justify-center rounded-full border-4 border-blue-100">
              <Zap className="h-10 w-10 text-blue-500 mb-1" />
              <span className="text-2xl font-bold text-blue-600">
                {dailyConsumption}
              </span>
              <span className="text-sm text-gray-500">kWh</span>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-700">
              Today's Usage
            </p>
          </div>

          {/* Estimated Cost */}
          <div className="flex flex-col items-center justify-center">
            <div className="h-32 w-32 flex flex-col items-center justify-center rounded-full border-4 border-purple-100">
              <DollarSign className="h-10 w-10 text-purple-500 mb-1" />
              <span className="text-2xl font-bold text-purple-600">
                ₱{estimatedCost.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500">Est. Cost</span>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-700">
              Monthly Projection
            </p>
          </div>
        </div>

        {/* Power Usage Indicator */}
        <div className="mt-6">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium text-gray-500">0 kW</span>
            <span className="text-xs font-medium text-gray-500">
              {maxPower} kW
            </span>
          </div>
          <Progress value={powerPercentage} className="h-2" />
          <p className="mt-2 text-xs text-center text-gray-500">
            {powerPercentage < 40
              ? "Efficient usage"
              : powerPercentage < 70
                ? "Moderate usage"
                : "High consumption"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsumptionOverview;
