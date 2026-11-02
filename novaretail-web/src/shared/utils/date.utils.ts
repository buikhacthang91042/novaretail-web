import { format, isValid, parseISO } from "date-fns";

export function formatDateTime(date: string | Date | null | undefined) {
  if (!date) return "-";
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(parsedDate)) return "-";
  return format(parsedDate, "dd/MM/yyyy HH:mm");
}
