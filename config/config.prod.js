import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      JANCTION_ENV: 'production',
      JANCTION_API: 'https://api.janction.ai/api',
      JANCTION_V0_API: 'https://api.janction.ai/v0',
      JANCTION_BASE_API: 'https://api.janction.ai',
      JANCTION_SOCKET_API: 'wss://api.janction.ai',
      ASSETS_URL: 'https://assets.janction.ai',
    },
  },
});
