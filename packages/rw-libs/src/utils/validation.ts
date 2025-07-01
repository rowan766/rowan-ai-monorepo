// # 表单验证
// packages/rw-libs/src/utils/validation.ts

/**
 * 表单验证工具函数
 */

/**
 * 验证规则接口
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

/**
 * 验证结果接口
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * 验证邮箱格式
 * @param email 邮箱地址
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 验证中国手机号码
 * @param phone 手机号码
 */
export function validateChinesePhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * 验证身份证号码（简单版）
 * @param idCard 身份证号码
 */
export function validateIdCard(idCard: string): boolean {
  // 18位身份证号码正则
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return idCardRegex.test(idCard);
}

/**
 * 验证密码强度
 * @param password 密码
 * @param minLength 最小长度，默认8位
 */
export function validatePasswordStrength(
  password: string, 
  minLength: number = 8
): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  suggestions: string[];
} {
  const suggestions: string[] = [];
  let score = 0;

  // 长度检查
  if (password.length < minLength) {
    suggestions.push(`密码长度至少${minLength}位`);
  } else {
    score += 1;
  }

  // 包含小写字母
  if (!/[a-z]/.test(password)) {
    suggestions.push('包含小写字母');
  } else {
    score += 1;
  }

  // 包含大写字母
  if (!/[A-Z]/.test(password)) {
    suggestions.push('包含大写字母');
  } else {
    score += 1;
  }

  // 包含数字
  if (!/\d/.test(password)) {
    suggestions.push('包含数字');
  } else {
    score += 1;
  }

  // 包含特殊字符
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    suggestions.push('包含特殊字符');
  } else {
    score += 1;
  }

  let strength: 'weak' | 'medium' | 'strong';
  if (score < 3) {
    strength = 'weak';
  } else if (score < 5) {
    strength = 'medium';
  } else {
    strength = 'strong';
  }

  return {
    isValid: score >= 3 && password.length >= minLength,
    strength,
    suggestions
  };
}

/**
 * 验证URL格式
 * @param url URL地址
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 通用表单字段验证
 * @param value 字段值
 * @param rules 验证规则
 */
export function validateField(value: any, rules: ValidationRule): ValidationResult {
  const errors: string[] = [];

  // 必填验证
  if (rules.required && (!value || value.toString().trim() === '')) {
    errors.push('此字段为必填项');
  }

  // 如果值为空且非必填，跳过其他验证
  if (!value && !rules.required) {
    return { isValid: true, errors: [] };
  }

  const stringValue = value?.toString() || '';

  // 最小长度验证
  if (rules.minLength && stringValue.length < rules.minLength) {
    errors.push(`最少需要${rules.minLength}个字符`);
  }

  // 最大长度验证
  if (rules.maxLength && stringValue.length > rules.maxLength) {
    errors.push(`最多允许${rules.maxLength}个字符`);
  }

  // 正则验证
  if (rules.pattern && !rules.pattern.test(stringValue)) {
    errors.push('格式不正确');
  }

  // 自定义验证
  if (rules.custom) {
    const customResult = rules.custom(value);
    if (typeof customResult === 'string') {
      errors.push(customResult);
    } else if (!customResult) {
      errors.push('验证失败');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * 批量验证表单
 * @param data 表单数据
 * @param rules 验证规则对象
 */
export function validateForm<T extends Record<string, any>>(
  data: T,
  rules: Partial<Record<keyof T, ValidationRule>>
): {
  isValid: boolean;
  errors: Partial<Record<keyof T, string[]>>;
} {
  const errors: Partial<Record<keyof T, string[]>> = {};
  let isValid = true;

  for (const [field, rule] of Object.entries(rules)) {
    if (rule) {
      const result = validateField(data[field as keyof T], rule);
      if (!result.isValid) {
        errors[field as keyof T] = result.errors;
        isValid = false;
      }
    }
  }

  return { isValid, errors };
}

/**
 * 常用验证规则预设
 */
export const ValidationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    required: true,
    pattern: /^1[3-9]\d{9}$/
  },
  password: {
    required: true,
    minLength: 8,
    custom: (value: string) => {
      const result = validatePasswordStrength(value);
      return result.isValid ? true : result.suggestions.join('，');
    }
  },
  username: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/
  }
} as const;