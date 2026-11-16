import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'
import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'

// Canonical route list produced by scripts/generate-content.mjs.
const routes: string[] = JSON.parse(
  readFileSync(fileURLToPath(new URL('./src/site/routes.json', import.meta.url)), 'utf8'),
)

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://marathiatinos.gr',
      // routes.json already lists both locales explicitly ("/x" and "/en/x"),
      // so we emit them as-is rather than using the plugin's i18n suffixing
      // (which assumes a different URL scheme). Drop "/" to avoid duplicating
      // the root the plugin always adds from index.html.
      dynamicRoutes: routes.filter((r) => r !== '/'),
      exclude: ['/404'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
