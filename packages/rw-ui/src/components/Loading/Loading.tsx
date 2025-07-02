// packages/rw-ui/src/components/Loading/Loading.tsx

import React from 'react';
import clsx from 'clsx';
import styles from './Loading.module.scss';

export interface LoadingProps {
  /** 加载状态 */
  loading?: boolean;
  /** 加载指示器大小 */
  size?: 'small' | 'medium' | 'large';
  /** 加载指示器类型 */
  type?: 'spinner' | 'dots' | 'pulse';
  /** 提示文本 */
  tip?: string;
  /** 是否居中显示 */
  centered?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 子元素（用于包装模式） */
  children?: React.ReactNode;
  /** 遮罩层透明度 */
  maskOpacity?: number;
}

export const Loading: React.FC<LoadingProps> = ({
  loading = true,
  size = 'medium',
  type = 'spinner',
  tip,
  centered = false,
  className,
  children,
  maskOpacity = 0.5,
}) => {
  // 如果有children，使用包装模式
  if (children) {
    return (
      <div className={clsx(styles.wrapper, className)}>
        {children}
        {loading && (
          <div 
            className={styles.overlay}
            style={{ backgroundColor: `rgba(255, 255, 255, ${maskOpacity})` }}
          >
            <LoadingIndicator size={size} type={type} tip={tip} />
          </div>
        )}
      </div>
    );
  }

  // 独立加载组件
  if (!loading) return null;

  return (
    <div
      className={clsx(
        styles.container,
        {
          [styles.centered]: centered,
        },
        className
      )}
    >
      <LoadingIndicator size={size} type={type} tip={tip} />
    </div>
  );
};

// 加载指示器组件
interface LoadingIndicatorProps {
  size: 'small' | 'medium' | 'large';
  type: 'spinner' | 'dots' | 'pulse';
  tip?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size, type, tip }) => {
  const renderIndicator = () => {
    switch (type) {
      case 'spinner':
        return <SpinnerIcon size={size} />;
      case 'dots':
        return <DotsIcon size={size} />;
      case 'pulse':
        return <PulseIcon size={size} />;
      default:
        return <SpinnerIcon size={size} />;
    }
  };

  return (
    <div className={styles.indicator}>
      {renderIndicator()}
      {tip && <div className={clsx(styles.tip, styles[size])}>{tip}</div>}
    </div>
  );
};

// 旋转器图标
const SpinnerIcon: React.FC<{ size: 'small' | 'medium' | 'large' }> = ({ size }) => (
  <div className={clsx(styles.spinner, styles[size])} />
);

// 点状加载图标
const DotsIcon: React.FC<{ size: 'small' | 'medium' | 'large' }> = ({ size }) => (
  <div className={clsx(styles.dots, styles[size])}>
    <div className={styles.dot} />
    <div className={styles.dot} />
    <div className={styles.dot} />
  </div>
);

// 脉冲图标
const PulseIcon: React.FC<{ size: 'small' | 'medium' | 'large' }> = ({ size }) => (
  <div className={clsx(styles.pulse, styles[size])} />
);