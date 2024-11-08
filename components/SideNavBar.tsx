"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Package2,
  Home,
  Building2,
  DollarSign,
  Package,
  FileText,
  Truck,
  ChevronRight,
  ChevronLeft,
  Store,
  Warehouse,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSidebar } from "./SidebarContext";

export function SideNavBar() {
  const pathname = usePathname();
  const [view, setView] = useState<"retail" | "wholesale">("retail");
  const { isCollapsed, toggleCollapse } = useSidebar();

  return (
    <div
      className={cn(
        "hidden top-0 left-0 z-40 bg-primary text-primary-foreground md:flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center justify-between px-2 md:h-[60px] md:px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6 flex-shrink-0" />
            <span
              className={cn(
                "transition-all duration-300 overflow-hidden",
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              )}
            >
              POMONA
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto flex-shrink-0 hover:bg-transparent"
            onClick={toggleCollapse}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className={cn("px-2 py-2", isCollapsed && "flex justify-center")}>
          <Tabs
            value={view}
            onValueChange={(value) => setView(value as "retail" | "wholesale")}
            className={cn("w-full", isCollapsed && "flex flex-col")}
            orientation={isCollapsed ? "vertical" : "horizontal"}
          >
            <TabsList
              className={cn(
                "w-full",
                isCollapsed ? "flex-col h-auto space-y-2" : "grid grid-cols-2"
              )}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full">
                      <TabsTrigger
                        value="retail"
                        className={cn(
                          "flex items-center justify-center w-full",
                          isCollapsed && "p-2"
                        )}
                      >
                        {isCollapsed ? <Store className="h-4 w-4" /> : "Retail"}
                      </TabsTrigger>
                    </div>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>Retail</p>
                    </TooltipContent>
                  )}
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full">
                      <TabsTrigger
                        value="wholesale"
                        className={cn(
                          "flex items-center justify-center w-full",
                          isCollapsed && "p-2"
                        )}
                      >
                        {isCollapsed ? (
                          <Warehouse className="h-4 w-4" />
                        ) : (
                          "Wholesale"
                        )}
                      </TabsTrigger>
                    </div>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>Wholesale</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 transition-all duration-300 overflow-hidden text-sm font-medium md:px-4">
            <TooltipProvider>
              {[
                { href: "/dashboard", icon: Home, label: "Dashboard" },
                { href: "/branches", icon: Building2, label: "Branches" },
                { href: "/expenses", icon: DollarSign, label: "Expenses" },
                { href: "/inventory", icon: Package, label: "Inventory" },
                { href: "/reports", icon: FileText, label: "Reports" },
                { href: "/suppliers", icon: Truck, label: "Suppliers" },
                { href: "/products", icon: Package2, label: "Products" },
              ].map(({ href, icon: Icon, label }) => (
                <Tooltip key={href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 my-1 transition-all hover:bg-background hover:text-foreground",
                        pathname.startsWith(href)
                          ? "bg-background text-foreground font-semibold"
                          : "text-primary-foreground",
                        isCollapsed && "justify-center px-0"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {!isCollapsed && label}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>{label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </TooltipProvider>
          </nav>
        </div>
      </div>
    </div>
  );
}
