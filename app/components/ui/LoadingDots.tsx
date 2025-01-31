// LoadingDots.tsx
export const LoadingDots = memo(({ text }: LoadingDotsProps) => {
  // ... existing logic ...
  return (
    <div className="flex items-center gap-2 text-foreground">
      <span>{text}</span>
      <span className="flex gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <span 
            key={i}
            className="inline-block w-1 h-1 rounded-full bg-current"
            style={{ animation: `pulse 1.2s ${i * 0.2}s infinite` }}
          />
        ))}
      </span>
    </div>
  );
});

// LoadingOverlay.tsx
export const LoadingOverlay = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 p-6 bg-background rounded-xl shadow-lg border border-border">
        <div className="animate-spin text-3xl i-lucide-loader-2" />
        <p className="text-foreground-muted font-medium">{message}</p>
      </div>
    </div>
  );
};
