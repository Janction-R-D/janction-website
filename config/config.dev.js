import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      JANCTION_ENV: 'development',
      JANCTION_API: '/api',
      JANCTION_V0_API: '/v0',
      JANCTION_BASE_API: 'https://dev.janction.ai',
      JANCTION_SOCKET_API: 'wss://dev.janction.ai',
      ASSETS_URL: 'https://assets.janction.ai',
      TESTNET: 'op',
    },
  },
});
