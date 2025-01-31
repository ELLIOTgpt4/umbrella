import { useStore } from '@nanostores/react';
import { memo, useEffect, useState } from 'react';
import { themeStore, toggleTheme } from '~/lib/stores/theme';
import { IconButton } from './IconButton';

export const ThemeSwitch = memo(() => {
  const theme = useStore(themeStore);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted ? (
    <IconButton
      icon={theme === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'}
      size="lg"
      title="Toggle theme"
      onClick={toggleTheme}
      className="text-foreground-muted hover:text-foreground"
    />
  ) : null;
});
