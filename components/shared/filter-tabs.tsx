"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  return (
    <Tabs className={className} onValueChange={onValueChange} value={value}>
      <TabsList className="flex h-auto w-full gap-1 p-2">
        {tabs.map((tab) => (
          <TabsTrigger
            className={`
              flex items-center gap-2
              data-[state=active]:bg-orange-100
              data-[state=active]:text-orange-800
            `}
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
            {tab.count !== undefined && (
              <Badge className="ml-1 text-xs" variant="secondary">
                {tab.count}
              </Badge>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
