import { formatDistanceToNow } from "date-fns";

export function formatRelativeTime(timestamp: number): string {
  try {
    const date = new Date(timestamp * 1000);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return "Unknown time";
  }
}
