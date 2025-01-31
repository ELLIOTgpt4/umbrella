import * as RadixDialog from '@radix-ui/react-dialog';
import { motion, type Variants } from 'framer-motion';
import React, { memo, type ReactNode } from 'react';
import { classNames } from '~/utils/classNames';
import { IconButton } from './IconButton';

export { Close as DialogClose, Root as DialogRoot } from '@radix-ui/react-dialog';

const transition = { duration: 0.15 };

export const dialogBackdropVariants = {
  closed: { opacity: 0, transition },
  open: { opacity: 1, transition },
} satisfies Variants;

export const dialogVariants = {
  closed: {
    scale: 0.95,
    opacity: 0,
    transition,
  },
  open: {
    scale: 1,
    opacity: 1,
    transition,
  },
} satisfies Variants;

interface DialogButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
  onClick?: (event: React.UIEvent) => void;
}

export const DialogButton = memo(({ variant = 'primary', children, onClick }: DialogButtonProps) => {
  return (
    <button
      className={classNames(
        'inline-flex items-center justify-center rounded-lg px-4 h-10 text-sm font-medium transition-colors',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export const DialogTitle = memo(({ className, children, ...props }: RadixDialog.DialogTitleProps) => {
  return (
    <RadixDialog.Title
      className={classNames(
        'px-6 py-4 flex items-center justify-between border-b border-border text-lg font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </RadixDialog.Title>
  );
});

export const DialogDescription = memo(({ className, children, ...props }: RadixDialog.DialogDescriptionProps) => {
  return (
    <RadixDialog.Description
      className={classNames('px-6 py-4 text-foreground text-md leading-relaxed', className)}
      {...props}
    >
      {children}
    </RadixDialog.Description>
  );
});

interface DialogProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClose?: () => void;
}

export const Dialog = memo(({ className, children, size = 'md', onClose }: DialogProps) => {
  const sizes = {
    sm: 'max-w-[400px]',
    md: 'max-w-[600px]',
    lg: 'max-w-[800px]',
  };

  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay asChild>
        <motion.div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          initial="closed"
          animate="open"
          exit="closed"
          variants={dialogBackdropVariants}
        />
      </RadixDialog.Overlay>

      <RadixDialog.Content asChild>
        <motion.div
          className={classNames(
            'fixed top-1/2 left-1/2 z-modal w-[95vw] max-h-[85vh] bg-background shadow-lg rounded-xl',
            'border border-border focus:outline-none overflow-hidden',
            sizes[size],
            className
          )}
          initial="closed"
          animate="open"
          exit="closed"
          variants={dialogVariants}
        >
          {children}
          <RadixDialog.Close asChild onClick={onClose}>
            <IconButton 
              icon="i-lucide-x" 
              className="absolute top-4 right-4 h-8 w-8 hover:bg-accent" 
              size="lg"
            />
          </RadixDialog.Close>
        </motion.div>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
});
