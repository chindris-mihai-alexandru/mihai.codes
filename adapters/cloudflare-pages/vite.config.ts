import { cloudflarePagesAdapter } from '@builder.io/qwik-city/adapters/cloudflare-pages/vite';
import { extendConfig } from '@builder.io/qwik-city/vite';
import baseConfig from '../../vite.config';

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ['src/entry.cloudflare-pages.tsx', '@qwik-city-plan'],
      },
    },
    plugins: [
      cloudflarePagesAdapter({
        ssg: {
          include: ['/*'],
          exclude: ['/sitemap.xml', '/blog/*'],
          origin: 'https://mihai.codes',
          sitemapOutFile: null, // Disable auto-generated sitemap - we have a dynamic one
        },
      }),
    ],
  };
});
