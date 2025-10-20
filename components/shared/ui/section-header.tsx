import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  badge?: ReactNode;
  className?: string;
  icon: LucideIcon;
  title: string;
}

export const SectionHeader = ({
  badge,
  className = "",
  icon: Icon,
  title,
}: SectionHeaderProps) => {
  return (
    <h4
      className={`
        flex items-center gap-2 text-base font-semibold text-foreground
        sm:text-lg
        ${className}
      `}
    >
      <Icon
        className={`
          h-4 w-4 text-primary
          sm:h-5 sm:w-5
        `}
      />
      {title}
      {badge}
    </h4>
  );
};
