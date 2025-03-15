import React from "react";
import { Home, BarChart3, Settings, Zap, Bell } from "lucide-react";
import { Link } from "react-router-dom";

interface NavigationBarProps {
  activePage?: "home" | "appliances" | "reports" | "notifications" | "settings";
}

const NavigationBar = ({ activePage = "home" }: NavigationBarProps) => {
  const navItems = [
    { name: "Home", icon: Home, path: "/", id: "home" },
    { name: "Appliances", icon: Zap, path: "/appliances", id: "appliances" },
    { name: "Reports", icon: BarChart3, path: "/reports", id: "reports" },
    {
      name: "Notifications",
      icon: Bell,
      path: "/notifications",
      id: "notifications",
    },
    { name: "Settings", icon: Settings, path: "/settings", id: "settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg h-20 px-4 flex items-center justify-between z-10">
      {navItems.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className={`flex flex-col items-center justify-center w-1/5 h-full ${activePage === item.id ? "text-primary" : "text-gray-500"}`}
        >
          <item.icon
            className={`h-6 w-6 ${activePage === item.id ? "text-primary" : "text-gray-500"}`}
          />
          <span
            className={`text-xs mt-1 ${activePage === item.id ? "font-medium" : "font-normal"}`}
          >
            {item.name}
          </span>
          {activePage === item.id && (
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />
          )}
        </Link>
      ))}
    </div>
  );
};

export default NavigationBar;
