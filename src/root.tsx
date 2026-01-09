import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import { ThemeProvider } from './context/theme';

import './global.css';

// Inline script for theme handling - works without Qwik hydration
// This is the ONLY theme code that runs - handles both FOUC prevention AND toggle clicks
const themeScript = `
(function() {
  var STORAGE_KEY = 'mihai-codes-theme';
  var stored = localStorage.getItem(STORAGE_KEY);
  var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // Apply theme immediately to prevent FOUC
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
  
  // Store current theme
  window.__theme = theme;
  
  // Global theme setter
  window.__setTheme = function(t) {
    window.__theme = t;
    localStorage.setItem(STORAGE_KEY, t);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(t);
  };
  
  // Toggle function for the button
  window.__toggleTheme = function() {
    var newTheme = window.__theme === 'dark' ? 'light' : 'dark';
    window.__setTheme(newTheme);
  };
  
  // Attach click handler to theme toggle button after DOM is ready
  // This works on SSG pages without Qwik hydration
  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.querySelector('[data-theme-toggle]');
    if (btn) {
      btn.addEventListener('click', window.__toggleTheme);
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
        {/* LinkedIn embed script - auto-finds badge elements after page load */}
        <script
          async
          src="https://platform.linkedin.com/badges/js/profile.js"
        />
      </body>
    </QwikCityProvider>
  );
});
