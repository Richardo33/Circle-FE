import { formatDistanceToNow } from "date-fns";

export function formatRelative(dateString: string) {
  const utcDate = new Date(dateString);
  return formatDistanceToNow(utcDate, { addSuffix: true });
}
