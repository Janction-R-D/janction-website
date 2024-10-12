export default {
  dev: {
    '/api/': {
      target: 'https://www.janction.io/',
      changeOrigin: true,
    },
    '/v0/': {
      target: 'http://18.181.196.49:8080/',
      changeOrigin: true,
    },
  },
};
