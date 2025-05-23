import { defineConfig } from 'umi';
import proxy from './proxy';
import metas from './metas';

export default defineConfig({
  favicon: '/favicon.ico',
  proxy,
  nodeModulesTransform: {
    type: 'none',
  },
  targets: {
    ie: 11,
  },
  antd: {
    dark: true,
  },
  fastRefresh: {},
  webpack5: {},
  hash: true,
  metas: metas,
  headScripts: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-7V3K6RGGN0',
      async: true,
    },
    {
      content: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-7V3K6RGGN0');
      `,
    },
  ],
});
