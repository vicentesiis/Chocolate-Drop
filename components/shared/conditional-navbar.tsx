"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();

  // Hide navbar on all checkout pages (/checkout, /checkout/confirmation, etc.)
  if (pathname.startsWith("/checkout")) {
    return null;
  }

  return <Navbar />;
}
