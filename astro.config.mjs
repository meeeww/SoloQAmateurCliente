// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

import { GoogleAnalytics } from "astro-google-analytics";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    GoogleAnalytics({
      id: "G-N3DR1FF1CF",
    }),
  ],
  server: {
    port: 7565,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
