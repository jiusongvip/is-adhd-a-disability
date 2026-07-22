// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

/** Copy sitemap-index.xml → sitemap.xml so /sitemap.xml is always available */
function sitemapCopyPlugin() {
  return {
    name: "sitemap-copy",
    hooks: {
      "astro:build:done": ({ dir }) => {
        const distDir = fileURLToPath(dir);
        const src = resolve(distDir, "sitemap-index.xml");
        const dest = resolve(distDir, "sitemap.xml");
        try {
          copyFileSync(src, dest);
        } catch { /* sitemap-index.xml may not exist */ }
      }
    }
  };
}

export default defineConfig({
  site: "https://isadhdadisability.com",
  trailingSlash: "never",
  integrations: [sitemap(), sitemapCopyPlugin()],
  vite: {
    plugins: [tailwindcss()]
  }
});
