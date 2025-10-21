"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    console.log("Current pathname:", pathname); // Debug log
    
    if (pathname === "/dashboard") {
      return "Dashboard Home";
    } else if (pathname.startsWith("/dashboard/pedidos")) {
      return "Pedidos";
    } else if (pathname.startsWith("/dashboard/eventos")) {
      return "Eventos";
    } else if (pathname.startsWith("/dashboard")) {
      return "Dashboard";
    }
    
    return "Dashboard";
  };

  return (
    <header className={`
      sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur
      supports-[backdrop-filter]:bg-white/60
    `}>
      <div className="flex h-14 items-center px-4">
        <SidebarTrigger className="mr-4" />
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            {getPageTitle()}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="font-mono text-xs text-gray-500">
              {pathname}
            </div>
            <div className="text-sm text-gray-600">
              ChocolateDrop Admin
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}