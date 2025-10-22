"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterTab {
  count?: number;
  label: string;
  value: string;
}

interface FilterTabsProps {
  className?: string;
  onValueChange: (value: string) => void;
  tabs: FilterTab[];
  value: string;
}

export function FilterTabs({
  className,
  onValueChange,
  tabs,
  value,
}: FilterTabsProps) {
  const isMobile = useIsMobile();

  return (
    <Tabs className={className} onValueChange={onValueChange} value={value}>
      <div className="w-full overflow-x-auto">
        <TabsList
          className={`
            flex h-auto w-full min-w-fit gap-1 p-1.5
            sm:p-2
            ${isMobile ? "justify-start" : "justify-center"}
          `}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              className={`
                flex min-w-fit items-center gap-1.5 px-2.5 py-2 text-xs
                whitespace-nowrap transition-colors
                hover:bg-orange-50
                data-[state=active]:bg-orange-100
                data-[state=active]:text-orange-800
                data-[state=inactive]:text-muted-foreground
                sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm
              `}
              key={tab.value}
              value={tab.value}
            >
              <span className="truncate">{tab.label}</span>
              {tab.count !== undefined && (
                <Badge
                  className={`
                    text-xs
                    ${
                      isMobile
                        ? "h-5 min-w-[20px] px-1.5 py-0.5"
                        : `px-2 py-0.5`
                    }
                  `}
                  variant="secondary"
                >
                  {tab.count}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
}
