import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      JANCTION_ENV: 'production',
      JANCTION_API: 'https://www.janction.ai/api',
      JANCTION_V0_API: 'https://www.janction.ai/v0',
      JANCTION_BASE_API: 'https://www.janction.ai',
      JANCTION_SOCKET_API: 'wss://www.janction.ai',
      ASSETS_URL: 'https://assets.janction.ai',
    },
  },
});
