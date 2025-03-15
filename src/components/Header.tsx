import React from "react";
import { Bell, Menu } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface HeaderProps {
  date?: string;
  unreadNotifications?: number;
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
}

const Header = ({
  date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  unreadNotifications = 3,
  onMenuClick = () => {},
  onNotificationClick = () => {},
}: HeaderProps) => {
  return (
    <header className="w-full h-[70px] px-4 py-3 flex items-center justify-between bg-background border-b border-border shadow-sm">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">W</span>
          </div>
          <h1 className="text-xl font-bold text-foreground hidden sm:block">
            WisEnergy
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground hidden md:block">{date}</p>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNotificationClick}
            className="relative"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground">
                {unreadNotifications}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
