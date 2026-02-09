import { defineConfig } from 'umi';
import proxy from './proxy';
import metas from './metas';

export default defineConfig({
  favicon: '/janction.png',
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
  locale: {
    default: 'en-US',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  // 艹，这个项目使用Umi约定式路由（自动根据pages目录生成路由）
  // 不需要在config.js里配置routes，否则会覆盖约定式路由！
  // Tevau路由会通过约定式路由自动生成：/genesis/tevau/cards 和 /genesis/tevau/apply
});
