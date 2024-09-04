import { defineConfig } from 'umi';
import proxy from './proxy';
import metas from './metas';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  proxy: proxy[REACT_APP_ENV || 'dev'],
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
