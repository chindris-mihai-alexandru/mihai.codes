import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import { ThemeProvider } from './context/theme';

import './global.css';

// Inline script to prevent FOUC and handle theme toggle (works without Qwik hydration)
const themeScript = `
(function() {
  var STORAGE_KEY = 'mihai-codes-theme';
  var stored = localStorage.getItem(STORAGE_KEY);
  var theme = stored || 'system';
  
  function applyTheme(t) {
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    if (t === 'system') {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(t);
    }
  }
  
  // Apply theme immediately to prevent FOUC
  applyTheme(theme);
  
  // Store current theme globally for toggle access
  window.__theme = theme;
  window.__setTheme = function(t) {
    window.__theme = t;
    localStorage.setItem(STORAGE_KEY, t);
    applyTheme(t);
    // Update button title
    var btn = document.querySelector('[data-theme-toggle]');
    if (btn) btn.title = 'Current: ' + t + '. Click to change.';
  };
  
  // Attach click handler after DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.querySelector('[data-theme-toggle]');
    if (btn) {
      btn.title = 'Current: ' + window.__theme + '. Click to change.';
      btn.addEventListener('click', function() {
        var cycle = { dark: 'light', light: 'system', system: 'dark' };
        window.__setTheme(cycle[window.__theme]);
      });
    }
  });
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
