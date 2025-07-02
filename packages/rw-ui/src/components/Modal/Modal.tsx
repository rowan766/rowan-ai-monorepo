// packages/rw-ui/src/components/Modal/Modal.tsx

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useToggle } from '@rowan/rw-hooks';
import styles from './Modal.module.scss';

export interface ModalProps {
  /** 是否显示模态框 */
  open: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 模态框标题 */
  title?: React.ReactNode;
  /** 模态框内容 */
  children: React.ReactNode;
  /** 底部操作按钮 */
  footer?: React.ReactNode;
  /** 模态框宽度 */
  width?: number | string;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 点击遮罩层是否关闭 */
  maskClosable?: boolean;
  /** 是否显示遮罩层 */
  mask?: boolean;
  /** 遮罩层样式 */
  maskStyle?: React.CSSProperties;
  /** 模态框样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 容器类名 */
  wrapClassName?: string;
  /** z-index */
  zIndex?: number;
  /** 销毁时是否保留子元素 */
  destroyOnClose?: boolean;
  /** 垂直居中 */
  centered?: boolean;
  /** 自定义渲染容器 */
  getContainer?: () => HTMLElement;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  width = 520,
  closable = true,
  maskClosable = true,
  mask = true,
  maskStyle,
  style,
  className,
  wrapClassName,
  zIndex = 1000,
  destroyOnClose = false,
  centered = true,
  getContainer,
}) => {
  // 处理 ESC 键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open && onClose) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEsc);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  // 处理遮罩层点击
  const handleMaskClick = (e: React.MouseEvent) => {
    if (maskClosable && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  // 如果未打开且设置了销毁时不保留，则不渲染
  if (!open && destroyOnClose) {
    return null;
  }

  const modalContent = (
    <div
      className={clsx(styles.wrapper, wrapClassName)}
      style={{ zIndex, display: open ? 'flex' : 'none' }}
    >
      {/* 遮罩层 */}
      {mask && (
        <div
          className={clsx(styles.mask, { [styles.maskHidden]: !open })}
          style={maskStyle}
          onClick={handleMaskClick}
        />
      )}

      {/* 模态框容器 */}
      <div
        className={clsx(
          styles.container,
          {
            [styles.centered]: centered,
            [styles.hidden]: !open,
          }
        )}
        onClick={handleMaskClick}
      >
        {/* 模态框主体 */}
        <div
          className={clsx(styles.modal, className)}
          style={{ width, ...style }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 头部 */}
          {(title || closable) && (
            <div className={styles.header}>
              {title && <div className={styles.title}>{title}</div>}
              {closable && (
                <button
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="关闭"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          )}

          {/* 内容 */}
          <div className={styles.body}>{children}</div>

          {/* 底部 */}
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    </div>
  );

  // 渲染到指定容器或 body
  const container = getContainer ? getContainer() : document.body;
  return createPortal(modalContent, container);
};

// 关闭图标组件
const CloseIcon: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 1L1 13M1 1L13 13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);