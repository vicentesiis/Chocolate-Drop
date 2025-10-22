"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/lib/contexts/auth-context";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const getPageTitle = () => {
    if (pathname === "/dashboard") {
      return "Dashboard Home";
    }

    if (pathname.startsWith("/dashboard/pedidos")) {
      return "Pedidos";
    }

    if (pathname.startsWith("/dashboard/eventos")) {
      return "Eventos";
    }

    return "Dashboard";
  };

  return (
    <header
      className={`
        sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur
        supports-[backdrop-filter]:bg-white/60
      `}
    >
      <div className="flex h-14 items-center px-4">
        <SidebarTrigger className="mr-2 " />
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            {getPageTitle()}
          </h1>
          <div className="flex items-center space-x-4">
            <Button
              className={`
                hidden text-gray-600
                hover:text-gray-900
                sm:flex
              `}
              onClick={logout}
              size="sm"
              variant="ghost"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
