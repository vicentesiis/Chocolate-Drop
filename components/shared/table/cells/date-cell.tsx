import { formatDate } from "@/lib/utils/format-utils";

interface DateCellProps {
  date: Date | string;
}

export function DateCell({ date }: DateCellProps) {
  return <div className="text-sm">{formatDate(date)}</div>;
}
