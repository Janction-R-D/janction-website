import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'development',
      JANCTION_API: '/api',
      JANCTION_V0_API: '/v0',
      REGISTER_NODE_URL: 'http://dev.janction.io',
    },
  },
});
