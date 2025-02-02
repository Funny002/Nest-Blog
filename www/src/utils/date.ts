import type { ConfigType } from 'dayjs';
import dayjs from 'dayjs';

export function formatDate(date: ConfigType = Date.now(), format = 'YYYY-MM-DD'): string {
  return dayjs(date).format(format);
}
