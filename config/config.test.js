import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'test',
      JANCTION_API: 'http://dev.janction.io/api',
      JANCTION_V0_API: 'http://dev.janction.io/v0',
      REGISTER_NODE_URL: 'http://dev.janction.io',
    },
  },
});
