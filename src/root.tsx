import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import { ThemeProvider } from './context/theme';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';

import './global.css';

// Inline script for theme handling - runs in <head> BEFORE body renders
// This prevents FOUC (Flash of Unstyled Content)
// The toggle button's click handler is attached via useVisibleTask$ in ThemeToggle component
const themeScript = `
(function() {
  var STORAGE_KEY = 'mihai-codes-theme';
  var stored = localStorage.getItem(STORAGE_KEY);
  var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // Apply theme immediately to prevent FOUC
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
  
  // Store current theme globally
  window.__theme = theme;
  
  // Global theme setter - updates class, localStorage, and window.__theme
  window.__setTheme = function(t) {
    window.__theme = t;
    localStorage.setItem(STORAGE_KEY, t);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(t);
  };
  
  // Toggle function - called by the theme toggle button via useVisibleTask$
  window.__toggleTheme = function() {
    var newTheme = window.__theme === 'dark' ? 'light' : 'dark';
    window.__setTheme(newTheme);
  };
})();
`;

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="Mihai Chindris - Blog" href="https://mihai.codes/rss.xml" />
        {/* Prevent FOUC by setting theme before render */}
        <script dangerouslySetInnerHTML={themeScript} />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang="en">
        {/* Theme toggle - uses useVisibleTask$ to attach click handler client-side */}
        <div class="fixed top-4 right-4 md:top-8 md:right-8 z-50">
          <ThemeToggle />
        </div>
        <ThemeProvider>
          <RouterOutlet />
        </ThemeProvider>
      </body>
    </QwikCityProvider>
  );
});
