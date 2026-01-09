import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import { ThemeProvider } from './context/theme';

import './global.css';

// Inline script ONLY for preventing FOUC - theme toggle handled by Qwik
const themeScript = `
(function() {
  var STORAGE_KEY = 'mihai-codes-theme';
  var stored = localStorage.getItem(STORAGE_KEY);
  var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // Apply theme immediately to prevent FOUC
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
  
  // Store for Qwik context to read
  window.__theme = theme;
  window.__setTheme = function(t) {
    window.__theme = t;
    localStorage.setItem(STORAGE_KEY, t);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(t);
  };
})();
`;

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        {/* Prevent FOUC by setting theme before render */}
        <script dangerouslySetInnerHTML={themeScript} />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang="en">
        <ThemeProvider>
          <RouterOutlet />
        </ThemeProvider>
      </body>
    </QwikCityProvider>
  );
});
