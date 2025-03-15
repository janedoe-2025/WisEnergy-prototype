import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Zap,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface ApplianceUsageData {
  name: string;
  power: number;
  efficiency: "high" | "medium" | "low";
  change: number; // percentage change from previous period
}

interface ConsumptionDetailProps {
  onBack: () => void;
  currentPower?: number;
  dailyConsumption?: number;
  timeFrameData?: {
    hourly: { time: string; value: number }[];
    daily: { time: string; value: number }[];
    weekly: { time: string; value: number }[];
  };
  applianceData?: ApplianceUsageData[];
  previousPeriodConsumption?: number;
}

const ConsumptionDetail = ({
  onBack,
  currentPower = 2.4,
  dailyConsumption = 18.7,
  previousPeriodConsumption = 16.2,
  timeFrameData = {
    hourly: [
      { time: "6AM", value: 1.2 },
      { time: "8AM", value: 1.8 },
      { time: "10AM", value: 2.4 },
      { time: "12PM", value: 2.1 },
      { time: "2PM", value: 1.9 },
      { time: "4PM", value: 2.3 },
      { time: "6PM", value: 2.7 },
      { time: "8PM", value: 3.1 },
      { time: "10PM", value: 2.2 },
    ],
    daily: [
      { time: "Mon", value: 16.5 },
      { time: "Tue", value: 17.2 },
      { time: "Wed", value: 18.7 },
      { time: "Thu", value: 15.9 },
      { time: "Fri", value: 19.3 },
      { time: "Sat", value: 21.4 },
      { time: "Sun", value: 18.2 },
    ],
    weekly: [
      { time: "Week 1", value: 112.5 },
      { time: "Week 2", value: 118.3 },
      { time: "Week 3", value: 124.7 },
      { time: "Week 4", value: 131.2 },
    ],
  },
  applianceData = [
    {
      name: "Air Conditioner",
      power: 1.2,
      efficiency: "medium" as const,
      change: 5,
    },
    {
      name: "Water Heater",
      power: 0.8,
      efficiency: "low" as const,
      change: 12,
    },
    {
      name: "Refrigerator",
      power: 0.5,
      efficiency: "high" as const,
      change: -3,
    },
    { name: "Television", power: 0.3, efficiency: "high" as const, change: 0 },
    {
      name: "Washing Machine",
      power: 0.2,
      efficiency: "medium" as const,
      change: -8,
    },
    { name: "Microwave", power: 0.1, efficiency: "medium" as const, change: 2 },
  ],
}: ConsumptionDetailProps) => {
  const [timeFrame, setTimeFrame] = useState<"hourly" | "daily" | "weekly">(
    "hourly",
  );
  const [filterEfficiency, setFilterEfficiency] = useState<
    "all" | "high" | "medium" | "low"
  >("all");

  // Sort appliances by power consumption (highest first)
  const sortedAppliances = [...applianceData].sort((a, b) => b.power - a.power);

  // Filter appliances based on efficiency selection
  const filteredAppliances =
    filterEfficiency === "all"
      ? sortedAppliances
      : sortedAppliances.filter((app) => app.efficiency === filterEfficiency);

  // Calculate percentage change from previous period
  const consumptionChange =
    ((dailyConsumption - previousPeriodConsumption) /
      previousPeriodConsumption) *
    100;
  const isIncrease = consumptionChange > 0;

  // Get efficiency color
  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full space-y-6 bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-xl font-bold text-gray-900">
          Energy Consumption Details
        </h1>
      </div>

      {/* Summary Card */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
              <Zap className="h-8 w-8 text-blue-500 mb-2" />
              <span className="text-sm text-gray-500">Current Power</span>
              <span className="text-2xl font-bold">{currentPower} kW</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold">
                  {dailyConsumption} kWh
                </span>
                <Badge
                  className={
                    isIncrease
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }
                >
                  {isIncrease ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(consumptionChange).toFixed(1)}%
                </Badge>
              </div>
              <span className="text-sm text-gray-500">Today's Consumption</span>
              <span className="text-xs text-gray-400">
                vs. {previousPeriodConsumption} kWh yesterday
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
              {isIncrease ? (
                <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
              ) : (
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-100 mb-2">
                  <Zap className="h-5 w-5 text-green-600" />
                </div>
              )}
              <span className="text-sm text-gray-500">Status</span>
              <span className="text-lg font-medium">
                {isIncrease ? "Above Average Usage" : "Efficient Usage"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Trends */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="hourly"
            value={timeFrame}
            onValueChange={(value) => setTimeFrame(value as any)}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="hourly">Hourly</TabsTrigger>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
            </TabsList>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timeFrameData[timeFrame]}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="time"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    unit={timeFrame === "hourly" ? " kW" : " kWh"}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #f0f0f0",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ fontWeight: "bold" }}
                    formatter={(value: any) => [
                      `${value} ${timeFrame === "hourly" ? "kW" : "kWh"}`,
                      "Usage",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{
                      stroke: "#3b82f6",
                      strokeWidth: 2,
                      fill: "#fff",
                      r: 4,
                    }}
                    activeDot={{
                      r: 6,
                      stroke: "#3b82f6",
                      strokeWidth: 2,
                      fill: "#3b82f6",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Appliance Breakdown */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Appliance Breakdown
          </CardTitle>
          <div className="flex gap-2">
            <Badge
              variant={filterEfficiency === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilterEfficiency("all")}
            >
              All
            </Badge>
            <Badge
              variant={filterEfficiency === "high" ? "default" : "outline"}
              className="cursor-pointer bg-green-100 text-green-800 hover:bg-green-200"
              onClick={() => setFilterEfficiency("high")}
            >
              High Efficiency
            </Badge>
            <Badge
              variant={filterEfficiency === "medium" ? "default" : "outline"}
              className="cursor-pointer bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              onClick={() => setFilterEfficiency("medium")}
            >
              Medium
            </Badge>
            <Badge
              variant={filterEfficiency === "low" ? "default" : "outline"}
              className="cursor-pointer bg-red-100 text-red-800 hover:bg-red-200"
              onClick={() => setFilterEfficiency("low")}
            >
              Low
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredAppliances}
                layout="vertical"
                margin={{ top: 5, right: 30, bottom: 5, left: 80 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis type="number" unit=" kW" />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  width={80}
                />
                <Tooltip
                  formatter={(value: any) => [`${value} kW`, "Power Usage"]}
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="power"
                  fill="#3b82f6"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 mt-4">
            <h3 className="text-sm font-medium text-gray-700">
              Appliance Details
            </h3>
            {filteredAppliances.map((appliance, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{appliance.name}</p>
                    <p className="text-sm text-gray-500">
                      {appliance.power} kW
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getEfficiencyColor(appliance.efficiency)}>
                    {appliance.efficiency}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      appliance.change > 0 ? "text-red-600" : "text-green-600"
                    }
                  >
                    {appliance.change > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : appliance.change < 0 ? (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    ) : null}
                    {appliance.change > 0 ? "+" : ""}
                    {appliance.change}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            Energy Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isIncrease && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">
                    Unusual Consumption Detected
                  </p>
                  <p className="text-sm text-amber-700">
                    Your energy usage is{" "}
                    {Math.abs(consumptionChange).toFixed(1)}% higher than
                    yesterday. Check your appliances for any issues.
                  </p>
                </div>
              </div>
            )}

            {applianceData.some((a) => a.efficiency === "low") && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800">
                    Inefficient Appliances
                  </p>
                  <p className="text-sm text-red-700">
                    {applianceData
                      .filter((a) => a.efficiency === "low")
                      .map((a) => a.name)
                      .join(", ")}
                    {applianceData.filter((a) => a.efficiency === "low")
                      .length === 1
                      ? " is"
                      : " are"}{" "}
                    consuming more energy than expected.
                  </p>
                </div>
              </div>
            )}

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
              <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Peak Usage Time</p>
                <p className="text-sm text-blue-700">
                  Your highest energy consumption today was between 6PM-8PM.
                  Consider shifting some activities to off-peak hours.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsumptionDetail;
