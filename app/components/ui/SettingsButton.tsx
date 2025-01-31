import { memo } from 'react';
import { IconButton } from '~/components/ui/IconButton';

interface SettingsButtonProps {
  onClick: () => void;
}

export const SettingsButton = memo(({ onClick }: SettingsButtonProps) => {
  return (
    <IconButton
      onClick={onClick}
      icon="i-lucide-settings"
      size="lg"
      title="Settings"
      className="text-foreground-muted hover:text-foreground hover:bg-accent transition-colors"
    />
  );
});
