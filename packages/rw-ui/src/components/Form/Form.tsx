import React from 'react';
import { useForm } from '@rowan/rw-hooks';
import { ValidationRule } from '@rowan/rw-libs';
import styles from './Form.module.scss';

export interface FormProps<T extends Record<string, any>> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRule>>;
  onSubmit: (values: T) => void | Promise<void>;
  children: (form: ReturnType<typeof useForm<T>>) => React.ReactNode;
  className?: string;
}

export function Form<T extends Record<string, any>>({
  initialValues,
  validationRules,
  onSubmit,
  children,
  className
}: FormProps<T>) {
  const form = useForm({
    initialValues,
    validationRules,
    onSubmit
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children(form)}
    </form>
  );
}