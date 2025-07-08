import React, { forwardRef } from 'react';
import styles from './Input.module.scss';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** 输入框标签 */
  label?: string;
  /** 输入框尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 错误信息 */
  error?: string | string[];
  /** 帮助文本 */
  helperText?: string;
  /** 是否必填 */
  required?: boolean;
  /** 前缀图标 */
  prefix?: React.ReactNode;
  /** 后缀图标 */
  suffix?: React.ReactNode;
  /** 是否显示清除按钮 */
  clearable?: boolean;
  /** 清除回调 */
  onClear?: () => void;
  /** 容器类名 */
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      size = 'medium',
      error,
      helperText,
      required = false,
      prefix,
      suffix,
      clearable = false,
      onClear,
      containerClassName = '',
      className = '',
      disabled,
      value,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);
    const showClearButton = clearable && value && !disabled;
    const errorMessages = Array.isArray(error) ? error : error ? [error] : [];

    const handleClear = () => {
      onClear?.();
    };

    // 手动组合类名，避免 clsx 依赖
    const containerClasses = [
      styles.container,
      containerClassName
    ].filter(Boolean).join(' ');

    const labelClasses = [
      styles.label,
      required && styles.required
    ].filter(Boolean).join(' ');

    const wrapperClasses = [
      styles.inputWrapper,
      styles[size],
      hasError && styles.error,
      disabled && styles.disabled,
      prefix && styles.hasPrefix,
      (suffix || showClearButton) && styles.hasSuffix
    ].filter(Boolean).join(' ');

    const inputClasses = [
      styles.input,
      className
    ].filter(Boolean).join(' ');

    return (
      <div className={containerClasses}>
        {/* 标签 */}
        {label && (
          <label className={labelClasses}>
            {label}
          </label>
        )}

        {/* 输入框容器 */}
        <div className={wrapperClasses}>
          {/* 前缀 */}
          {prefix && <span className={styles.prefix}>{prefix}</span>}

          {/* 输入框 */}
          <input
            ref={ref}
            className={inputClasses}
            disabled={disabled}
            value={value}
            {...props}
          />

          {/* 清除按钮 */}
          {showClearButton && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="清除"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 4.586L10.293.293a1 1 0 011.414 1.414L7.414 6l4.293 4.293a1 1 0 01-1.414 1.414L6 7.414l-4.293 4.293a1 1 0 01-1.414-1.414L4.586 6 .293 1.707A1 1 0 011.707.293L6 4.586z" />
              </svg>
            </button>
          )}

          {/* 后缀 */}
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>

        {/* 错误信息 */}
        {hasError && (
          <div className={styles.errorMessages}>
            {errorMessages.map((msg, index) => (
              <div key={index} className={styles.errorMessage}>
                {msg}
              </div>
            ))}
          </div>
        )}

        {/* 帮助文本 */}
        {helperText && !hasError && (
          <div className={styles.helperText}>{helperText}</div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';