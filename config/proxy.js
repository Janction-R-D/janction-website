export default {
  dev: {
    '/api/': {
      target: 'https://www.janction.io/',
      changeOrigin: true,
    },
    '/v0/': {
      target: 'http://54.95.234.135:81/',
      changeOrigin: true,
    },
  },
};
