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