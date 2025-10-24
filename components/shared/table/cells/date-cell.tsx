import { formatDate } from "@/lib/utils/format-utils";

interface DateCellProps {
  date: Date | string;
}

export function DateCell({ date }: DateCellProps) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return <div className="text-sm">{formatDate(dateObj)}</div>;
}
