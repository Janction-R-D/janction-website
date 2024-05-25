import { defineConfig } from 'umi';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  proxy: proxy[REACT_APP_ENV || 'dev'],
  nodeModulesTransform: {
    type: 'none',
  },
  targets: {
    ie: 11,
  },
  antd: {},
  fastRefresh: {},
  webpack5: {},
});
