import {
  connectorsForWallets,
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  tokenPocketWallet,
  walletConnectWallet,
  injectedWallet,
  binanceWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { optimism, optimismSepolia } from 'wagmi/chains';

const jasmyTestnet = {
  id: 681,
  name: 'Jasmy Testnet',
  network: 'jasmy-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'JASMY',
    symbol: 'JASMY',
  },
  rpcUrls: {
    default: {
      http: ['https://jasmy-chain-testnet.alt.technology'],
    },
    public: {
      http: ['https://jasmy-chain-testnet.alt.technology'],
    },
  },
  blockExplorers: {
    default: {
      name: 'JasmyExplorer',
      url: 'https://jasmy-chain-testnet-explorer.alt.technology/',
    },
  },
  testnet: true,
};

const projectId = '23cf742fb52fc761a81ebe69526d0b82';

const chains = [optimismSepolia, optimism, jasmyTestnet];

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        tokenPocketWallet,
        coinbaseWallet,
        walletConnectWallet,
        injectedWallet,
      ],
    },
  ],
  {
    appName: 'Janction',
    projectId,
  },
);

const config = getDefaultConfig({
  appName: 'Janction',
  connectors,
  projectId,
  chains,
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const RainbowKit = (props) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} locale="en">
          {props.children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowKit;
