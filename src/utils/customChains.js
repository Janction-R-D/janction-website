const janctionTestnet = {
  id: 679, // 自定义链的 ID
  name: 'Janction Testnet',
  network: 'janction-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Janction Token',
    symbol: 'JCT',
  },
  rpcUrls: {
    default: {
      http: ['https://janction-testnet.alt.technology'],
    },
    public: {
      http: ['https://janction-testnet.alt.technology'],
    },
  },
  blockExplorers: {
    default: {
      name: 'JanctionExplorer',
      url: 'https://janction-testnet-explorer.alt.technology',
    },
  },
  testnet: true,
};

export { janctionTestnet };
