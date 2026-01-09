import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useSignal,
  type Signal,
} from '@builder.io/qwik';

export type Theme = 'light' | 'dark';

export const ThemeContext = createContextId<Signal<Theme>>('theme-context');

/**
 * Theme Provider Component
 * 
 * Provides theme context for components that need to read the current theme.
 * The actual theme management (storage, DOM updates, toggle) is handled by
 * the inline script in root.tsx which works without Qwik hydration.
 * 
 * This context is useful for:
 * - Components that need to conditionally render based on theme
 * - Third-party widgets that need theme-aware styling
 */
export const ThemeProvider = component$(() => {
  // Default to dark - the actual theme is applied by the inline script in root.tsx
  // This is just for Qwik context consumers that might need it
  const theme = useSignal<Theme>('dark');

  useContextProvider(ThemeContext, theme);

  return <Slot />;
});
