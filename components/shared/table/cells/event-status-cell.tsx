import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  EventStatus,
  statusLabels,
  statusVariants,
} from "@/lib/constants/event-constants";

interface EventStatusCellProps {
  disabled?: boolean;
  onStatusChange?: (status: EventStatus) => void;
  status: EventStatus;
}

export function EventStatusCell({
  disabled = false,
  onStatusChange,
  status,
}: EventStatusCellProps) {
  if (!onStatusChange) {
    return (
      <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>
    );
  }

  return (
    <Select
      disabled={disabled}
      onValueChange={(value) => onStatusChange(value as EventStatus)}
      value={status}
    >
      <SelectTrigger className="w-36">
        <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>
      </SelectTrigger>
      <SelectContent>
        {Object.values(EventStatus).map((statusKey) => (
          <SelectItem key={statusKey} value={statusKey}>
            <Badge variant={statusVariants[statusKey]}>
              {statusLabels[statusKey]}
            </Badge>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
