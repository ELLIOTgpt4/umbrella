import { memo } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { classNames } from '~/utils/classNames';

interface SwitchProps {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = memo(({ className, checked, onCheckedChange }: SwitchProps) => {
  return (
    <SwitchPrimitive.Root
      className={classNames(
        'group relative h-6 w-11 rounded-full transition-colors',
        'bg-border data-[state=checked]:bg-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <SwitchPrimitive.Thumb
        className={classNames(
          'block h-5 w-5 rounded-full bg-background shadow-lg',
          'transition-transform duration-200 translate-x-0.5',
          'group-data-[state=checked]:translate-x-[1.375rem]'
        )}
      />
    </SwitchPrimitive.Root>
  );
});
