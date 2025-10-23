import type React from "react";
import { Check } from "lucide-react";

export function InfoRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-sm">
      {children}
    </div>
  );
}

export function FeatureRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 text-sm text-muted-foreground">
      <div
        className={`
          mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center
          rounded-full bg-primary/20
        `}
      >
        <Check className="h-3 w-3 text-primary" />
      </div>
      <span>{text}</span>
    </div>
  );
}
