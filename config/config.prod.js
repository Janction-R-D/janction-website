import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      JANCTION_ENV: 'production',
      JANCTION_API: 'https://api.janction.io/api',
      JANCTION_V0_API: 'https://api.janction.io/v0',
      JANCTION_BASE_API: 'https://api.janction.io',
      JANCTION_SOCKET_API: 'wss://api.janction.io',
      ASSETS_URL: 'https://assets.janction.io',
    },
  },
});
