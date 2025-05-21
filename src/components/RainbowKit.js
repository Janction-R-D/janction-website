import janctionTestnet from '@/utils/contracts/janctionTestnet.json';
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
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { optimism, optimismSepolia } from 'wagmi/chains';
import ThirdWeb from './ThirdWeb';

const projectId = '23cf742fb52fc761a81ebe69526d0b82';
const chains = [optimismSepolia, optimism, janctionTestnet];

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
    <ThirdWeb>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()} locale="en">
            {props.children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThirdWeb>
  );
};

export default RainbowKit;
