import { memo, forwardRef, type ForwardedRef } from 'react';
import { classNames } from '~/utils/classNames';

type IconSize = 'sm' | 'md' | 'lg' | 'xl';

interface IconButtonProps {
  icon?: string;
  size?: IconSize;
  className?: string;
  iconClassName?: string;
  disabled?: boolean;
  title?: string;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
}

export const IconButton = memo(
  forwardRef(
    (
      { icon, size = 'md', className, iconClassName, disabled, title, onClick, children }: IconButtonProps,
      ref: ForwardedRef<HTMLButtonElement>
    ) => {
      const sizeClasses = {
        sm: 'h-7 w-7 text-sm',
        md: 'h-9 w-9 text-base',
        lg: 'h-11 w-11 text-lg',
        xl: 'h-14 w-14 text-xl',
      };

      return (
        <button
          ref={ref}
          title={title}
          disabled={disabled}
          onClick={onClick}
          className={classNames(
            'inline-flex items-center justify-center rounded-md transition-colors',
            'text-foreground hover:bg-accent focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
            sizeClasses[size],
            className
          )}
        >
          {children || <div className={classNames(icon, 'shrink-0', iconClassName)} />}
        </button>
      );
    }
  )
);
