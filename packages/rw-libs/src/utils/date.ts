// packages/rw-libs/src/utils/date.ts

/**
 * 格式化日期
 * @param date 日期对象
 * @param format 格式化模板
 */
export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('YY', String(year).slice(-2))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 获取相对时间
 * @param date 日期对象
 */
export function getRelativeTime(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return '刚刚';
  } else if (minutes < 60) {
    return `${minutes}分钟前`;
  } else if (hours < 24) {
    return `${hours}小时前`;
  } else if (days < 30) {
    return `${days}天前`;
  } else if (months < 12) {
    return `${months}个月前`;
  } else {
    return `${years}年前`;
  }
}

/**
 * 判断是否为今天
 * @param date 日期对象
 */
export function isToday(date: Date): boolean {
  if (!(date instanceof Date)) return false;
  
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

/**
 * 判断是否为昨天
 * @param date 日期对象
 */
export function isYesterday(date: Date): boolean {
  if (!(date instanceof Date)) return false;
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  return date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();
}

/**
 * 获取日期范围
 * @param startDate 开始日期
 * @param endDate 结束日期
 */
export function getDateRange(startDate: Date, endDate: Date): Date[] {
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    return [];
  }

  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

/**
 * 添加天数
 * @param date 基础日期
 * @param days 要添加的天数
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * 获取月份的第一天
 * @param date 日期对象
 */
export function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * 获取月份的最后一天
 * @param date 日期对象
 */
export function getLastDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}