import type { LucideIcon } from "lucide-react";

interface InfoCardItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface InfoCardProps {
  items: InfoCardItem[];
  className?: string;
}

export const InfoCard = ({ items, className = "" }: InfoCardProps) => {
  return (
    <div
      className={`
        grid gap-2 rounded-lg bg-muted/30 p-3
        sm:grid-cols-2 sm:gap-3
        ${className}
      `}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`
            flex items-center gap-2
            sm:gap-3
          `}
        >
          <div
            className={`
              flex h-6 w-6 items-center justify-center rounded-full
              bg-primary/10
              sm:h-8 sm:w-8
            `}
          >
            <item.icon
              className={`
                h-3 w-3 text-primary
                sm:h-4 sm:w-4
              `}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className={`
                text-xs font-medium text-muted-foreground
                sm:text-sm
              `}
            >
              {item.label}
            </p>
            <p
              className={`
                truncate text-sm font-semibold
                sm:text-base
              `}
            >
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
