import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

interface BudgetTrackerProps {
  budgetAmount?: number;
  currentUsage?: number;
  daysRemaining?: number;
  billingCycleTotal?: number;
}

const BudgetTracker = ({
  budgetAmount = 2500,
  currentUsage = 1875,
  daysRemaining = 12,
  billingCycleTotal = 30,
}: BudgetTrackerProps) => {
  // Calculate percentage of budget used
  const percentageUsed = Math.min(
    Math.round((currentUsage / budgetAmount) * 100),
    100,
  );

  // Determine status color based on percentage used
  const getStatusColor = () => {
    if (percentageUsed < 60) return "text-green-500";
    if (percentageUsed < 85) return "text-yellow-500";
    return "text-red-500";
  };

  // Determine progress bar color based on percentage used
  const getProgressColor = () => {
    if (percentageUsed < 60) return "bg-green-500";
    if (percentageUsed < 85) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>Monthly Budget Tracker</span>
          <span className={`text-lg font-semibold ${getStatusColor()}`}>
            {percentageUsed}% Used
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Progress
            value={percentageUsed}
            className="h-3 bg-gray-100"
            indicatorClassName={getProgressColor()}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Budget</span>
            <span className="text-xl font-bold">
              ₱{budgetAmount.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Current Usage</span>
            <span className="text-xl font-bold">
              ₱{currentUsage.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Days Remaining</span>
            <span className="text-xl font-bold">
              {daysRemaining}/{billingCycleTotal}
            </span>
          </div>
        </div>

        {percentageUsed > 85 && (
          <div className="mt-4 p-2 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            Warning: You're approaching your monthly budget limit!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
