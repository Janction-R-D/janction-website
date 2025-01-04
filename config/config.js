import { defineConfig } from 'umi';
import proxy from './proxy';
import metas from './metas';

export default defineConfig({
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
});
