import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'test',
      JANCTION_API: 'http://54.95.234.135:81/api',
      JANCTION_V0_API: 'http://54.95.234.135:81/v0',
      REGISTER_NODE_URL: 'http://dev.janction.io',
    },
  },
});
