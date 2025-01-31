import * as Tooltip from '@radix-ui/react-tooltip';
import { forwardRef, type ForwardedRef, type ReactElement } from 'react';

interface TooltipProps {
  tooltip: React.ReactNode;
  children: ReactElement;
  sideOffset?: number;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const WithTooltip = forwardRef(
  (
    { tooltip, children, sideOffset = 8, className, position = 'top', delay = 100 }: TooltipProps,
    _ref: ForwardedRef<HTMLElement>
  ) => {
    return (
      <Tooltip.Root delayDuration={delay}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={position}
            sideOffset={sideOffset}
            className={classNames(
              'z-tooltip max-w-[240px] px-3 py-2 rounded-md text-sm',
              'bg-popover text-popover-foreground shadow-md',
              'animate-in fade-in-0 zoom-in-95',
              className
            )}
          >
            {tooltip}
            <Tooltip.Arrow className="fill-popover" width={12} height={6} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    );
  }
);
