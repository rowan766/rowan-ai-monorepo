import React from 'react';
import styles from './FormField.module.scss';

export interface FormFieldProps {
  /** Field label */
  label?: string;
  /** Field description/help text */
  description?: string;
  /** Error message */
  error?: string;
  /** Whether field is required */
  required?: boolean;
  /** Field content */
  children: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
  /** Field layout */
  layout?: 'vertical' | 'horizontal';
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  description,
  error,
  required = false,
  children,
  className = '',
  layout = 'vertical'
}) => {
  const fieldClasses = [
    styles.formField,
    styles[layout],
    error && styles.hasError,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={fieldClasses}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.fieldContent}>
        {children}
        
        {description && !error && (
          <div className={styles.description}>{description}</div>
        )}
        
        {error && (
          <div className={styles.error}>{error}</div>
        )}
      </div>
    </div>
  );
};