import type * as React from "react"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  `
    inline-flex items-center justify-center rounded-md border px-2.5 py-0.5
    text-xs font-medium transition-colors duration-200
    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    focus-visible:outline-none
  `,
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        completed: `
          border-transparent bg-green-600 text-white shadow-sm
          hover:bg-green-600/90
        `,
        default: `
          border-transparent bg-primary text-primary-foreground shadow-sm
          hover:bg-primary/90
        `,
        destructive: `
          border-transparent bg-destructive text-destructive-foreground
          shadow-sm
          hover:bg-destructive/90
        `,
        info: `
          border-transparent bg-sky-500 text-white shadow-sm
          hover:bg-sky-500/90
        `,
        outline: `
          border border-input bg-background text-foreground shadow-sm
          hover:bg-muted/40
        `,
        pending: `
          border-transparent bg-orange-500 text-white shadow-sm
          hover:bg-orange-500/90
        `,
        processing: `
          border-transparent bg-indigo-500 text-white shadow-sm
          hover:bg-indigo-500/90
        `,
        ready: `
          border-transparent bg-violet-500 text-white shadow-sm
          hover:bg-violet-500/90
        `,
        secondary: `
          border-transparent bg-secondary text-secondary-foreground shadow-sm
          hover:bg-secondary/80
        `,
        success: `
          border-transparent bg-emerald-500 text-white shadow-sm
          hover:bg-emerald-500/90
        `,
        warning: `
          border-transparent bg-amber-500 text-white shadow-sm
          hover:bg-amber-500/90
        `,
      },
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
