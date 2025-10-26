"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";

interface StatusData {
  color: string;
  name: string;
  value: number;
  status?: string;
}

interface StatusPieChartProps {
  className?: string;
  data: StatusData[];
  title?: string;
  showLegend?: boolean;
}

export function StatusPieChart({
  className,
  data,
  title,
  showLegend = true,
}: StatusPieChartProps) {
  const chartConfig: ChartConfig = data.reduce((config, item) => {
    config[item.name] = {
      color: item.color,
      label: item.name,
    };
    return config;
  }, {} as ChartConfig);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <div className={className}>
        <div
          className={`
          flex h-[200px] items-center justify-center text-muted-foreground
        `}
        >
          No hay datos disponibles
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {title && (
        <h3 className="mb-4 text-center text-sm font-medium">{title}</h3>
      )}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <ChartContainer className="h-[200px] flex-1" config={chartConfig}>
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={data}
              dataKey="value"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell fill={entry.color} key={`cell-${index}`} />
              ))}
            </Pie>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `${value} (${((Number(value) / total) * 100).toFixed(1)}%)`,
                    name,
                  ]}
                />
              }
            />
          </PieChart>
        </ChartContainer>

        {showLegend && data.length > 0 && (
          <div className="flex flex-col gap-2 lg:min-w-[200px]">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="flex-1">{item.name}</span>
                <span className="font-medium text-muted-foreground">
                  {item.value} ({((item.value / total) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
