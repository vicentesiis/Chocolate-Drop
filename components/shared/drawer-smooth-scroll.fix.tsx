"use client";

import { useEffect } from "react";

export default function DrawerSmoothScrollFix({ open }: { open: boolean }) {
  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      const prev = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      return () => {
        root.style.scrollBehavior = prev || "";
      };
    }
    const timeoutId = setTimeout(() => {
      root.style.scrollBehavior = "smooth";
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [open]);

  return null;
}
