import clsx, { ClassValue } from 'clsx';
import React from 'react';

/**
 * 类名合并工具函数
 */
export const cn = (...classes: ClassValue[]) => clsx(classes);

/**
 * 生成随机ID
 */
export const generateId = (prefix = 'rw') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 延迟函数
 */
export const delay = (ms: number) => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 判断是否为有效的React元素
 */
export const isValidElement = (element: any): element is React.ReactElement => {
  return React.isValidElement(element);
};

/**
 * 获取元素的文本内容
 */
export const getTextContent = (element: React.ReactNode): string => {
  if (typeof element === 'string' || typeof element === 'number') {
    return String(element);
  }
  if (React.isValidElement(element)) {
    return getTextContent(element.props.children);
  }
  if (Array.isArray(element)) {
    return element.map(getTextContent).join('');
  }
  return '';
};

/**
 * 合并refs
 */
export const mergeRefs = <T = any>(
  ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
};

// 主题工具
export const getThemeVariable = (variable: string): string => {
  return `var(--${variable})`;
};

// 尺寸映射
export const sizeMap = {
  small: { padding: '4px 8px', fontSize: '12px' },
  medium: { padding: '8px 16px', fontSize: '14px' },
  large: { padding: '12px 24px', fontSize: '16px' },
} as const;