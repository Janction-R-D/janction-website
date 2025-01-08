import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'production',
      JANCTION_API: 'https://api.janction.io/api',
      JANCTION_V0_API: 'https://api.janction.io/v0',
      REGISTER_NODE_URL: 'https://api.janction.io',
    },
  },
});
