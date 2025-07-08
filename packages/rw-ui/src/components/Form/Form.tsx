import React from 'react';
import styles from './Form.module.scss';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /** Form submission handler */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Form content */
  children: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
  /** Form layout direction */
  layout?: 'vertical' | 'horizontal' | 'inline';
  /** Form size variant */
  size?: 'small' | 'medium' | 'large';
  /** Whether form is disabled */
  disabled?: boolean;
  /** Whether to show loading state */
  loading?: boolean;
}

export const Form: React.FC<FormProps> = ({ 
  onSubmit, 
  children, 
  className = '',
  layout = 'vertical',
  size = 'medium',
  disabled = false,
  loading = false,
  autoComplete = 'off',
  ...props 
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!disabled && !loading) {
      onSubmit?.(e);
    }
  };

  const formClasses = [
    styles.form,
    styles[layout],
    styles[size],
    disabled && styles.disabled,
    loading && styles.loading,
    className
  ].filter(Boolean).join(' ');

  return (
    <form 
      onSubmit={handleSubmit} 
      className={formClasses}
      autoComplete={autoComplete}
      {...props}
    >
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
        </div>
      )}
      <fieldset disabled={disabled || loading} className={styles.fieldset}>
        {children}
      </fieldset>
    </form>
  );
};