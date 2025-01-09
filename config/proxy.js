export default {
  '/api/': {
    target: 'https://www.janction.io/',
    changeOrigin: true,
  },
  '/v0/': {
    target: 'https://dev.janction.io',
    changeOrigin: true,
    secure: false,
  },
};
