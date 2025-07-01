//  # 表单处理Hook

import { useState, useCallback } from 'react';
import { validateForm, ValidationRule } from '@rowan/rw-libs';

interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRule>>;
  onSubmit?: (values: T) => void | Promise<void>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string[]>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 更新字段值
  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // 清除该字段的错误
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  // 验证表单
  const validate = useCallback(() => {
    const result = validateForm(values, validationRules);
    setErrors(result.errors);
    return result.isValid;
  }, [values, validationRules]);

  // 提交表单
  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit?.(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [validate, onSubmit, values]);

  // 重置表单
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    setValue,
    validate,
    handleSubmit,
    reset
  };
}