import React from "react";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Plug, Zap, ChevronRight } from "lucide-react";

interface ApplianceCardProps {
  name: string;
  currentPower: number;
  dailyUsage: number;
  efficiency: "high" | "medium" | "low";
  icon?: React.ReactNode;
  onClick?: () => void;
}

const ApplianceCard = ({
  name = "Air Conditioner",
  currentPower = 1.2,
  dailyUsage = 8.5,
  efficiency = "medium",
  icon = <Plug className="h-6 w-6" />,
  onClick = () => {},
}: ApplianceCardProps) => {
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
    <Card
      className="min-w-[250px] max-w-[250px] bg-white hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              {icon}
            </div>
            <h3 className="font-medium text-gray-900">{name}</h3>
          </div>
          <Badge className={getEfficiencyColor(efficiency)}>{efficiency}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Current</span>
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="font-semibold">{currentPower} kW</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Today</span>
            <span className="font-semibold">{dailyUsage} kWh</span>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
};

interface ApplianceCardsProps {
  appliances?: ApplianceCardProps[];
  onApplianceClick?: (index: number) => void;
}

const ApplianceCards = ({
  appliances = [
    {
      name: "Air Conditioner",
      currentPower: 1.2,
      dailyUsage: 8.5,
      efficiency: "medium" as const,
      icon: <Plug className="h-6 w-6" />,
    },
    {
      name: "Refrigerator",
      currentPower: 0.8,
      dailyUsage: 5.2,
      efficiency: "high" as const,
      icon: <Plug className="h-6 w-6" />,
    },
    {
      name: "Television",
      currentPower: 0.3,
      dailyUsage: 2.1,
      efficiency: "high" as const,
      icon: <Plug className="h-6 w-6" />,
    },
    {
      name: "Water Heater",
      currentPower: 2.5,
      dailyUsage: 4.7,
      efficiency: "low" as const,
      icon: <Plug className="h-6 w-6" />,
    },
    {
      name: "Washing Machine",
      currentPower: 0.1,
      dailyUsage: 1.8,
      efficiency: "medium" as const,
      icon: <Plug className="h-6 w-6" />,
    },
  ],
  onApplianceClick = () => {},
}: ApplianceCardsProps) => {
  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Connected Appliances
        </h2>
        <Badge variant="outline" className="cursor-pointer">
          View All
        </Badge>
      </div>

      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {appliances.map((appliance, index) => (
            <ApplianceCard
              key={index}
              {...appliance}
              onClick={() => onApplianceClick(index)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ApplianceCards;
