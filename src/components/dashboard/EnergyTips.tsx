import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";

interface EnergyTip {
  id: number;
  title: string;
  description: string;
  potentialSavings: string;
}

interface EnergyTipsProps {
  tips?: EnergyTip[];
}

const EnergyTips = ({ tips = defaultTips }: EnergyTipsProps) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex(
      (prevIndex) => (prevIndex - 1 + tips.length) % tips.length,
    );
  };

  const currentTip = tips[currentTipIndex];

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Energy Saving Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className="font-medium text-base">{currentTip.title}</h3>
          <p className="text-sm text-gray-600">{currentTip.description}</p>
          <p className="text-sm font-medium text-green-600">
            Potential savings: {currentTip.potentialSavings}
          </p>
          <div className="flex justify-between items-center pt-2">
            <p className="text-xs text-gray-500">
              Tip {currentTipIndex + 1} of {tips.length}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={prevTip}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={nextTip}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const defaultTips: EnergyTip[] = [
  {
    id: 1,
    title: "Adjust your refrigerator temperature",
    description:
      "Setting your refrigerator to 3-5°C instead of 2°C can reduce its energy consumption by up to 25%.",
    potentialSavings: "₱150-300 per month",
  },
  {
    id: 2,
    title: "Use natural ventilation",
    description:
      "Opening windows during cooler hours instead of using air conditioning can significantly reduce your energy bill.",
    potentialSavings: "₱500-1000 per month",
  },
  {
    id: 3,
    title: "Switch to LED lighting",
    description:
      "Replacing all incandescent bulbs with LED alternatives uses up to 75% less energy and lasts 25 times longer.",
    potentialSavings: "₱200-400 per month",
  },
  {
    id: 4,
    title: "Unplug idle electronics",
    description:
      "Devices on standby can account for up to 10% of your home's energy use. Unplug them when not in use.",
    potentialSavings: "₱100-250 per month",
  },
  {
    id: 5,
    title: "Run full loads of laundry",
    description:
      "Washing machines use the same amount of energy regardless of load size. Wait until you have a full load.",
    potentialSavings: "₱150-300 per month",
  },
];

export default EnergyTips;
