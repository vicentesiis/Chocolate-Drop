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
  status: Order["status"];
  onStatusChange?: (status: Order["status"]) => void;
  disabled?: boolean;
}

export function StatusCell({
  status,
  onStatusChange,
  disabled = false,
}: StatusCellProps) {
  if (!onStatusChange) {
    return (
      <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>
    );
  }

  return (
    <Select
      disabled={disabled}
      onValueChange={(value) => onStatusChange(value as Order["status"])}
      value={status}
    >
      <SelectTrigger className="w-32">
        <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(statusLabels).map(([statusKey, label]) => (
          <SelectItem key={statusKey} value={statusKey}>
            <Badge
              variant={statusVariants[statusKey as keyof typeof statusVariants]}
            >
              {label}
            </Badge>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
