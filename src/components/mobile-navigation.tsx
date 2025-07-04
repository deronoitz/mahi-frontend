"use client";

import { Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black backdrop-blur-sm border-t border-border">
      <div className="flex items-center justify-around py-2 px-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200",
                "min-w-[70px] min-h-[56px] relative",
                isActive
                  ? "text-primary bg-primary/10 scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 mb-1 transition-transform duration-200",
                  isActive && "scale-110"
                )}
                fill={isActive ? "#24F2A9" : "none"}
                stroke={isActive ? "none" : "#ddd"}
              />
              <span
                className={cn(
                  "text-xs font-medium transition-all duration-200",
                  isActive ? "font-semibold" : "font-normal"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
