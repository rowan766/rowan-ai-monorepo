// packages/rw-libs/src/utils/index.ts

import React from 'react';

// 获取文本内容的工具函数
export const getTextContent = (element: React.ReactNode): string => {
  if (typeof element === 'string' || typeof element === 'number') {
    return String(element);
  }
  
  if (element == null || typeof element === 'boolean') {
    return '';
  }
  
  if (Array.isArray(element)) {
    return element.map(getTextContent).join('');
  }
  
  if (React.isValidElement(element)) {
    return getTextContent(element.props.children);
  }
  
  return '';
};

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// 节流函数
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};

// 类名合并工具
export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// 深拷贝
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }

  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  return obj;
};

// 随机字符串生成
export const randomString = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// 数组去重
export const unique = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

// 休眠函数
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// 对象扁平化
export const flatten = (obj: Record<string, any>, prefix: string = ''): Record<string, any> => {
  const result: Record<string, any> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        Object.assign(result, flatten(obj[key], newKey));
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  
  return result;
};

// 空值检查
export const isEmpty = (value: any): boolean => {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

// 类型检查工具
export const isFunction = (value: any): value is Function => typeof value === 'function';
export const isString = (value: any): value is string => typeof value === 'string';
export const isNumber = (value: any): value is number => typeof value === 'number' && !isNaN(value);
export const isBoolean = (value: any): value is boolean => typeof value === 'boolean';
export const isArray = Array.isArray;
export const isObject = (value: any): value is object => 
  value !== null && typeof value === 'object' && !Array.isArray(value);

// 导出其他模块
export * from './date';
export * from './format';
export * from './validation';