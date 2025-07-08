import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
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

export const Modal: React.FC<ModalProps> = (props) => {
  const {
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
    className = '',
    wrapClassName = '',
    zIndex = 1000,
    destroyOnClose = false,
    centered = true,
    getContainer,
  } = props;

  // 处理 ESC 键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open && onClose) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  // 如果未打开且设置了销毁时不保留，则不渲染
  if (!open && destroyOnClose) {
    return null;
  }

  // 组合类名的函数
  const combineClasses = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  // 事件处理
  const handleMaskClick = (e: any) => {
    if (maskClosable && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  // 样式计算
  const wrapperStyle = {
    zIndex: zIndex,
    display: open ? 'flex' : 'none'
  };

  const modalStyle = {
    width: typeof width === 'number' ? width + 'px' : width,
    ...(style || {})
  };

  const modalContent = React.createElement('div', {
    className: combineClasses(styles.wrapper, wrapClassName),
    style: wrapperStyle
  }, [
    // 遮罩层
    mask && React.createElement('div', {
      key: 'mask',
      className: combineClasses(styles.mask, !open && styles.maskHidden),
      style: maskStyle,
      onClick: handleMaskClick
    }),
    
    // 模态框容器
    React.createElement('div', {
      key: 'container',
      className: combineClasses(
        styles.container,
        centered && styles.centered,
        !open && styles.hidden
      ),
      onClick: handleMaskClick
    }, 
      // 模态框主体
      React.createElement('div', {
        className: combineClasses(styles.modal, className),
        style: modalStyle,
        onClick: stopPropagation
      }, [
        // 头部
        (title || closable) && React.createElement('div', {
          key: 'header',
          className: styles.header
        }, [
          title && React.createElement('div', {
            key: 'title',
            className: styles.title
          }, title),
          
          closable && React.createElement('button', {
            key: 'close',
            className: styles.closeButton,
            onClick: handleCloseClick,
            'aria-label': '关闭',
            type: 'button'
          }, React.createElement('svg', {
            width: '14',
            height: '14',
            viewBox: '0 0 14 14',
            fill: 'none'
          }, React.createElement('path', {
            d: 'M13 1L1 13M1 1L13 13',
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round'
          })))
        ]),
        
        // 内容
        React.createElement('div', {
          key: 'body',
          className: styles.body
        }, children),
        
        // 底部
        footer && React.createElement('div', {
          key: 'footer',
          className: styles.footer
        }, footer)
      ])
    )
  ]);

  // 渲染到指定容器或 body
  const container = getContainer ? getContainer() : document.body;
  return createPortal(modalContent, container);
};