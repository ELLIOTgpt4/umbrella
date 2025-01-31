// PanelHeader.tsx
export const PanelHeader = memo(({ className, children }: PanelHeaderProps) => {
  return (
    <div
      className={classNames(
        'flex items-center h-12 px-4 border-b border-border bg-background',
        'text-sm font-medium text-foreground',
        className
      )}
    >
      {children}
    </div>
  );
});

// PanelHeaderButton.tsx
export const PanelHeaderButton = memo(
  ({ className, disabled, children, onClick }: PanelHeaderButtonProps) => {
    return (
      <button
        className={classNames(
          'inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium',
          'text-foreground-muted hover:text-foreground hover:bg-accent',
          'transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);
