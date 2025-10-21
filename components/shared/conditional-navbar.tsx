"use client";

import { Navbar } from "@/components/navbar";
import { usePathname } from "next/navigation";

export function ConditionalNavbar() {
  const pathname = usePathname();

  // Hide navbar on all checkout pages (/checkout, /checkout/confirmation, etc.)
  if (pathname.startsWith("/checkout") || pathname.startsWith("/dashboard")) {
    return null;
  }

  return <Navbar />;
}
