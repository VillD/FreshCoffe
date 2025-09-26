// @ts-check
import { defineConfig } from "astro/config";
import vercel from '@astrojs/vercel';

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  image:{
    domains: ['peachpuff-flamingo-849262.hostingersite.com']
  },
  output: 'server',
  integrations: [react(), vue()],
  adapter: vercel(),
});