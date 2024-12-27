export default {
  dev: {
    '/api/': {
      target: 'https://www.janction.io/',
      changeOrigin: true,
    },
    '/v0/': {
      target: 'https://www.janction.io/',
      changeOrigin: true,
    },
  },
};
