import { useState, useCallback } from 'react';

export interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRule<T[keyof T]>>>;
  onSubmit?: (values: T) => void | Promise<void>;
}

export interface ValidationRule<T> {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | undefined;
}

export interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  handleChange: (name: keyof T, value: T[keyof T]) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
  setFieldError: (name: keyof T, error: string) => void;
  clearFieldError: (name: keyof T) => void;
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: keyof T, value: T[keyof T]): string | undefined => {
    const rule = validationRules[name];
    if (!rule) return undefined;

    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return 'This field is required';
    }

    if (typeof value === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        return `Minimum length is ${rule.minLength}`;
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        return `Maximum length is ${rule.maxLength}`;
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        return 'Invalid format';
      }
    }

    if (rule.custom) {
      return rule.custom(value);
    }

    return undefined;
  }, [validationRules]);

  const handleChange = useCallback((name: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Validate all fields
    const newErrors: Partial<Record<keyof T, string>> = {};
    let hasErrors = false;

    Object.keys(values).forEach((key) => {
      const fieldName = key as keyof T;
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (hasErrors || !onSubmit) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateField, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const clearFieldError = useCallback((name: keyof T) => {
    setErrors(prev => ({ ...prev, [name]: undefined }));
  }, []);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    setFieldError,
    clearFieldError,
  };
};