import type * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  `
    inline-flex items-center justify-center rounded-md border px-2.5 py-0.5
    text-xs font-medium transition-colors duration-200
    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    focus-visible:outline-none
  `,
  {
    compoundVariants: [
      // PENDING soft
      {
        class: `
          border-[hsl(39_85%_80%)] bg-[hsl(39_85%_90%)] text-[hsl(25_40%_25%)]
          hover:bg-[hsl(39_85%_88%)]
        `,
        tone: "soft",
        variant: "pending",
      },
      // PROCESSING soft
      {
        class: `
          border-[hsl(33_70%_75%)] bg-[hsl(33_80%_92%)] text-[hsl(25_40%_25%)]
          hover:bg-[hsl(33_80%_90%)]
        `,
        tone: "soft",
        variant: "processing",
      },
      // INFO soft
      {
        class: `
          border-[hsl(33_70%_80%)] bg-[hsl(33_80%_92%)] text-[hsl(25_40%_25%)]
          hover:bg-[hsl(33_80%_90%)]
        `,
        tone: "soft",
        variant: "info",
      },
      // READY soft
      {
        class: `
          border-[hsl(152_35%_70%)] bg-[hsl(152_46%_92%)]
          text-[hsl(152_46%_25%)]
          hover:bg-[hsl(152_46%_90%)]
        `,
        tone: "soft",
        variant: "ready",
      },
      // COMPLETED soft
      {
        class: `
          border-[hsl(152_35%_60%)] bg-[hsl(152_46%_90%)]
          text-[hsl(152_46%_22%)]
          hover:bg-[hsl(152_46%_88%)]
        `,
        tone: "soft",
        variant: "completed",
      },
      // DESTRUCTIVE soft
      {
        class: `
          border-[hsl(0_80%_85%)] bg-[hsl(0_84%_96%)] text-[hsl(0_70%_35%)]
          hover:bg-[hsl(0_84%_94%)]
        `,
        tone: "soft",
        variant: "destructive",
      },
      // OUTLINE soft (neutral)
      {
        class: `
          border-border bg-muted/50 text-foreground
          hover:bg-muted
        `,
        tone: "soft",
        variant: "outline",
      },
      // SECONDARY soft
      {
        class: `
          border-[hsl(39_30%_86%)] bg-[hsl(39_30%_94%)] text-[hsl(25_40%_25%)]
          hover:bg-[hsl(39_30%_92%)]
        `,
        tone: "soft",
        variant: "secondary",
      },
    ],
    defaultVariants: {
      tone: "solid",
      variant: "default",
    },
    variants: {
      tone: {
        soft: "shadow-none", // washed bg with border
        solid: "", // default
      },
      variant: {
        /* COMPLETED / DELIVERED → deeper mint */
        completed: `
          border-transparent bg-[hsl(152_46%_28%)] text-[hsl(39_100%_98%)]
          shadow-sm
          hover:bg-[hsl(152_46%_25%)]
        `,

        /* PRIMARY (brand cocoa) */
        default: `
          border-transparent bg-primary text-primary-foreground shadow-sm
          hover:bg-primary/90
        `,

        /* ERROR / CANCELLED */
        destructive: `
          border-transparent bg-destructive text-destructive-foreground
          shadow-sm
          hover:bg-destructive/90
        `,

        /* PREPARING (info) → warm accent (not blue) */
        info: `
          border-transparent bg-[hsl(33_80%_60%)] text-[hsl(39_100%_98%)]
          shadow-sm
          hover:bg-[hsl(33_80%_56%)]
        `,

        /* OUTLINE (neutral) */
        outline: `
          border border-input bg-background text-foreground shadow-sm
          hover:bg-muted/40
        `,

        /* PENDING → warm amber */
        pending: `
          border-transparent bg-[hsl(39_90%_55%)] text-[hsl(39_100%_98%)]
          shadow-sm
          hover:bg-[hsl(39_90%_52%)]
        `,

        /* CONFIRMED / PROCESSING → caramel */
        processing: `
          border-transparent bg-[hsl(33_80%_55%)] text-[hsl(39_100%_98%)]
          shadow-sm
          hover:bg-[hsl(33_80%_52%)]
        `,

        /* READY → mint success */
        ready: `
          border-transparent bg-[hsl(152_46%_35%)] text-[hsl(39_100%_98%)]
          shadow-sm
          hover:bg-[hsl(152_46%_32%)]
        `,

        /* SECONDARY (neutral chip) */
        secondary: `
          border-transparent bg-secondary text-secondary-foreground shadow-sm
          hover:bg-secondary/80
        `,

        /* SUCCESS / WARNING legacy aliases (kept for compatibility) */
        success: `
          border-transparent bg-[hsl(152_46%_35%)] text-[hsl(39_100%_98%)]
          shadow-sm
          hover:bg-[hsl(152_46%_32%)]
        `,
        warning: `
          border-transparent bg-[hsl(39_90%_55%)] text-[hsl(39_100%_98%)]
          shadow-sm
          hover:bg-[hsl(39_90%_52%)]
        `,
      },

      /* Soft tone versions */
      // use <Badge tone="soft" variant="pending" /> etc.
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ tone, variant }), className)} {...props} />;
}

export { badgeVariants };