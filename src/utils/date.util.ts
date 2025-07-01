import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export function formatRelativeTime(timestamp: number): string {
  try {
    const date = new Date(timestamp * 1000);
    return formatDistanceToNow(date, { addSuffix: true, locale: es });
  } catch (error) {
    return "Unknown time";
  }
}
