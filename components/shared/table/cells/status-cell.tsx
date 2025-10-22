import type { Order } from "@/lib/types/order";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { statusLabels, statusVariants } from "@/lib/constants/order-constants";

interface StatusCellProps {
  disabled?: boolean;
  onStatusChange?: (status: Order["status"]) => void;
  status: Order["status"];
}

export function StatusCell({
  disabled = false,
  onStatusChange,
  status,
}: StatusCellProps) {
  if (!onStatusChange) {
    return (
      <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>
    );
  }

  return (
    <div className="px-2">
      <Select
        disabled={disabled}
        onValueChange={(value) => onStatusChange(value as Order["status"])}
        value={status}
      >
        <SelectTrigger className="w-full">
          <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>
        </SelectTrigger>
        <SelectContent>
          {[
            "pending",
            "confirmed",
            "preparing",
            "ready",
            "delivered",
            "cancelled",
          ].map((statusKey) => (
            <SelectItem key={statusKey} value={statusKey}>
              <Badge
                variant={
                  statusVariants[statusKey as keyof typeof statusVariants]
                }
              >
                {statusLabels[statusKey as keyof typeof statusLabels]}
              </Badge>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
