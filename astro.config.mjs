import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL ?? 'http://localhost:4321';
const seoManifest = JSON.parse(
  readFileSync(new URL('./data/seo/indexable-routes.json', import.meta.url), 'utf8')
);
const indexableRoutes = new Set(seoManifest.routes);

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return indexableRoutes.has(pathname);
      },
    }),
  ],
});
