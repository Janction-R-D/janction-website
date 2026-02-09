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
  // Tevau虚拟卡路由配置
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        // ... 其他现有路由保持不变
        // Tevau虚拟卡管理路由
        {
          path: '/genesis/tevau',
          name: 'Tevau Card Management',
          icon: 'CreditCardOutlined',
          routes: [
            {
              path: '/genesis/tevau/cards',
              name: 'My Cards',
              component: '@/pages/Genesis/Tevau/Cards',
              wrappers: ['@/wrappers/auth'],
            },
            {
              path: '/genesis/tevau/apply',
              name: 'Apply Card',
              component: '@/pages/Genesis/Tevau/Apply',
              wrappers: ['@/wrappers/auth'],
            },
          ],
        },
      ],
    },
  ],
});
