import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      JANCTION_ENV: 'test',
      JANCTION_API: 'https://dev.janction.io/api',
      JANCTION_V0_API: 'https://dev.janction.io/v0',
      JANCTION_BASE_API: 'https://dev.janction.io',
      JANCTION_SOCKET_API: 'wss://dev.janction.io',
      ASSETS_URL: 'https://assets.janction.io',
      TESTNET: 'op',
    },
  },
});
