// packages/rw-ui/src/components/index.ts

// 基础组件
export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Input } from './Input';
export type { InputProps } from './Input';

// 反馈组件
export { Loading } from './Loading';
export type { LoadingProps } from './Loading';

export { Modal } from './Modal';
export type { ModalProps } from './Modal';

// 复合组件
export { Form } from './Form';
export type { FormProps } from './Form';

// packages/rw-ui/src/index.ts

// 导出所有组件
export * from './components';

// 导出类型定义
export * from './types';

// 导出工具函数
export * from './utils';

// 按命名空间导出（可选）
export * as Components from './components';

// packages/rw-ui/src/types/index.ts

// 通用组件类型定义
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// 尺寸类型
export type Size = 'small' | 'medium' | 'large';

// 状态类型
export type Status = 'success' | 'warning' | 'error' | 'info';

// 主题类型
export interface Theme {
  primaryColor: string;
  dangerColor: string;
  successColor: string;
  warningColor: string;
  borderRadius: string;
  fontSize: {
    small: string;
    medium: string;
    large: string;
  };
}