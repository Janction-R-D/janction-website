import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'test',
      JANCTION_API: 'https://dev.janction.io/api',
      JANCTION_V0_API: 'https://dev.janction.io/v0',
      REGISTER_NODE_URL: 'https://dev.janction.io',
    },
  },
});
