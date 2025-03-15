import React, { useState } from "react";
import Header from "./Header";
import NavigationBar from "./NavigationBar";
import ConsumptionOverview from "./dashboard/ConsumptionOverview";
import ConsumptionDetail from "./dashboard/ConsumptionDetail";
import BudgetTracker from "./dashboard/BudgetTracker";
import ApplianceCards from "./dashboard/ApplianceCards";
import EnergyTips from "./dashboard/EnergyTips";

const Home = () => {
  // State to track if consumption details are being shown
  const [showConsumptionDetails, setShowConsumptionDetails] = useState(false);

  // Mock data for demonstration purposes
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleMenuClick = () => {
    console.log("Menu clicked");
  };

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleApplianceClick = (index: number) => {
    console.log(`Appliance ${index} clicked`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        date={currentDate}
        unreadNotifications={3}
        onMenuClick={handleMenuClick}
        onNotificationClick={handleNotificationClick}
      />

      <main className="flex-1 px-4 py-6 pb-24 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Real-time consumption overview or detailed view */}
          {showConsumptionDetails ? (
            <ConsumptionDetail
              onBack={() => setShowConsumptionDetails(false)}
              currentPower={2.4}
              dailyConsumption={18.7}
              previousPeriodConsumption={16.2}
            />
          ) : (
            <ConsumptionOverview
              currentPower={2.4}
              dailyConsumption={18.7}
              estimatedCost={156.32}
              maxPower={5}
              onViewDetails={() => setShowConsumptionDetails(true)}
            />
          )}

          {/* Only show these components when not in detailed view */}
          {!showConsumptionDetails && (
            <>
              {/* Budget tracker */}
              <BudgetTracker
                budgetAmount={2500}
                currentUsage={1875}
                daysRemaining={12}
                billingCycleTotal={30}
              />

              {/* Connected appliances */}
              <ApplianceCards
                onApplianceClick={handleApplianceClick}
                appliances={[
                  {
                    name: "Air Conditioner",
                    currentPower: 1.2,
                    dailyUsage: 8.5,
                    efficiency: "medium" as const,
                    icon: (
                      <span className="flex items-center justify-center">
                        🧊
                      </span>
                    ),
                  },
                  {
                    name: "Refrigerator",
                    currentPower: 0.8,
                    dailyUsage: 5.2,
                    efficiency: "high" as const,
                    icon: (
                      <span className="flex items-center justify-center">
                        ❄️
                      </span>
                    ),
                  },
                  {
                    name: "Television",
                    currentPower: 0.3,
                    dailyUsage: 2.1,
                    efficiency: "high" as const,
                    icon: (
                      <span className="flex items-center justify-center">
                        📺
                      </span>
                    ),
                  },
                  {
                    name: "Water Heater",
                    currentPower: 2.5,
                    dailyUsage: 4.7,
                    efficiency: "low" as const,
                    icon: (
                      <span className="flex items-center justify-center">
                        🔥
                      </span>
                    ),
                  },
                  {
                    name: "Washing Machine",
                    currentPower: 0.1,
                    dailyUsage: 1.8,
                    efficiency: "medium" as const,
                    icon: (
                      <span className="flex items-center justify-center">
                        🧺
                      </span>
                    ),
                  },
                ]}
              />

              {/* Energy saving tips */}
              <EnergyTips />
            </>
          )}
        </div>
      </main>

      <NavigationBar activePage="home" />
    </div>
  );
};

export default Home;
