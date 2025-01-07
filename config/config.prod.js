import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'production',
      JANCTION_API: '/api',
      JANCTION_V0_API: '/v0',
      REGISTER_NODE_URL: 'https://api.janction.io',
    },
  },
});
