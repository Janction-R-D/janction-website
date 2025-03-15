export default {
  '/api/': {
    target: 'https://www.janction.ai/',
    changeOrigin: true,
  },
  '/v0/': {
    target: 'https://dev.janction.ai',
    changeOrigin: true,
    secure: false,
  },
};
