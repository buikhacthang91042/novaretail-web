type Status = "ACTIVE" | "INACTIVE" | "ARCHIVED";

export function BadgeStatus(status: Status) {
  const statusClasses: Record<Status, string> = {
    ACTIVE: "bg-green-200 text-green-700",
    INACTIVE: "bg-gray-200 text-gray-700",
    ARCHIVED: "bg-red-200 text-red-700",
  };
  return statusClasses[status];
}
