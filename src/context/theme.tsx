import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useSignal,
  useVisibleTask$,
  type Signal,
} from '@builder.io/qwik';

export type Theme = 'light' | 'dark';

export const ThemeContext = createContextId<Signal<Theme>>('theme-context');

const STORAGE_KEY = 'mihai-codes-theme';

declare global {
  interface Window {
    __theme?: string;
    __setTheme?: (theme: string) => void;
  }
}

export const ThemeProvider = component$(() => {
  const theme = useSignal<Theme>('dark');

  // Sync with the inline script's theme on hydration
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    () => {
      // Read from window.__theme set by inline script, or localStorage
      const currentTheme = (window.__theme as Theme) || 
        (localStorage.getItem(STORAGE_KEY) as Theme) || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      
      if (currentTheme !== theme.value) {
        theme.value = currentTheme;
      }
    },
    { strategy: 'document-ready' }
  );

  // Watch for theme changes and apply to DOM
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    const currentTheme = track(() => theme.value);
    // Use the global setter if available
    if (window.__setTheme) {
      window.__setTheme(currentTheme);
    } else {
      // Fallback: apply directly
      localStorage.setItem(STORAGE_KEY, currentTheme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(currentTheme);
    }
  });

  useContextProvider(ThemeContext, theme);

  return <Slot />;
});
