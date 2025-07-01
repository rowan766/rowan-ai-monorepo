// # 数据格式化
// packages/rw-libs/src/utils/format.ts

/**
 * 数字格式化工具函数
 */

/**
 * 格式化数字，添加千分位分隔符
 * @param num 要格式化的数字
 * @param separator 分隔符，默认为逗号
 * @returns 格式化后的字符串
 */
export function formatNumber(num: number, separator: string = ','): string {
  if (isNaN(num)) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * 格式化货币
 * @param amount 金额
 * @param currency 货币符号，默认为¥
 * @param decimals 小数位数，默认为2
 */
export function formatCurrency(
  amount: number, 
  currency: string = '¥', 
  decimals: number = 2
): string {
  if (isNaN(amount)) return `${currency}0.00`;
  const formattedAmount = amount.toFixed(decimals);
  const [integer, decimal] = formattedAmount.split('.');
  const formattedInteger = formatNumber(parseInt(integer));
  return `${currency}${formattedInteger}${decimal ? '.' + decimal : ''}`;
}

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @param decimals 小数位数，默认为2
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

/**
 * 格式化百分比
 * @param value 数值（0-1之间）
 * @param decimals 小数位数，默认为2
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  if (isNaN(value)) return '0%';
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * 格式化手机号码
 * @param phone 手机号码
 * @param separator 分隔符，默认为空格
 */
export function formatPhone(phone: string, separator: string = ' '): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    // 中国手机号格式：138 0013 8000
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, `$1${separator}$2${separator}$3`);
  }
  
  return phone; // 如果不是11位，返回原始值
}

/**
 * 截断文本并添加省略号
 * @param text 原始文本
 * @param maxLength 最大长度
 * @param suffix 后缀，默认为...
 */
export function truncateText(
  text: string, 
  maxLength: number, 
  suffix: string = '...'
): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * 首字母大写
 * @param str 字符串
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * 驼峰命名转换
 * @param str 字符串
 * @param separator 分隔符，默认为-
 */
export function camelCase(str: string, separator: string = '-'): string {
  return str
    .split(separator)
    .map((word, index) => index === 0 ? word.toLowerCase() : capitalize(word))
    .join('');
}