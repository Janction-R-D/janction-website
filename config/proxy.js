export default {
  dev: {
    '/api/': {
      target: 'https://www.janction.io/',
      changeOrigin: true,
    },
    '/v0/': {
      target: 'http://54.95.234.135',
      changeOrigin: true,
    },
  },
  uat: {
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
