import { Duration } from '@/constant';
import { message } from 'antd';
import { ethers } from 'ethers';
import currencyABI from './CurrencyAbi.json';
import Distribution from './Distribution.json';
import Payment from './Payment.json';
import JasmyRewards from './JasmyRewards.json';
import NFTEscrowImpl from './NFTEscrowImpl.json';
import JanctionNFT from './JanctionNFT.json';
import { delay } from '../lang';
import janctionTestnet from './janctionTestnet.json';
import Addresses from './Addresses.json';

const isProduction = process.env.JANCTION_ENV === 'production';

const NETWORKS = {
  eth: {
    chainId: 1,
    chainName: 'Ethereum Mainnet',
    rpcUrls: ['https://eth.llamarpc.com'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  eth_test: {
    chainId: 11155111,
    chainName: 'Sepolia Test Network',
    rpcUrls: ['https://rpc.sepolia.org'],
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  },
  op: {
    chainId: 10,
    chainName: 'Optimism Mainnet',
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
  },
  op_test: {
    chainId: 11155420,
    chainName: 'Optimism Sepolia Testnet',
    rpcUrls: ['https://sepolia.optimism.io'],
    blockExplorerUrls: ['https://sepolia-optimism.etherscan.io'],
  },
  janction_test: {
    chainId: janctionTestnet.id,
    chainName: janctionTestnet.name,
    rpcUrls: [janctionTestnet.rpcUrls.default],
    blockExplorerUrls: [janctionTestnet.blockExplorers.default.url],
  },
};

export const getCurrency = () => {
  const address = isProduction
    ? Addresses.OP
    : process.env.TESTNET == 'janction'
    ? Addresses.JANCTION_TESTNET
    : Addresses.OP_SEPOLIA;
  return [
    // {
    //   value: address.veJCT,
    //   label: 'veJCT',
    //   desc: 'From JANCTION',
    //   rate: 0.02,
    // },
    {
      value: address.USDT,
      label: 'USDT',
      rate: 1,
    },
    {
      value: address.USDC,
      label: 'USDC',
      rate: 1,
    },
  ];
};

export const getDefaultCurrency = () => {
  const allCurrency = getCurrency();
  return allCurrency[0].value;
};

export function durationMultiplier(duration, discount) {
  if (duration == Duration.Day) {
    return 1;
  } else if (duration == Duration.Week) {
    return discount ? 6 : 7;
  } else if (duration == Duration.Month) {
    return discount ? 25 : 30;
  } else if (duration == Duration.Quarter) {
    return discount ? 70 : 90;
  } else {
    throw Error('invalid duration');
  }
}

const getAddresses = (networkName = 'OP') => {
  const network_name = isProduction
    ? networkName
    : networkName == 'ETH'
    ? 'SEPOLIA'
    : process.env.TESTNET == 'janction'
    ? 'JANCTION_TESTNET'
    : 'OP_SEPOLIA';
  return Addresses[network_name];
};

const switchNetwork = async (provider, networkName = 'op') => {
  try {
    const network = await provider.getNetwork();
    const network_name =
      isProduction || networkName == 'eth' ? networkName : process.env.TESTNET;
    const networkConf =
      NETWORKS[`${network_name}${isProduction ? '' : '_test'}`];
    const chainId = networkConf.chainId;

    if (network.chainId !== chainId) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${chainId.toString(16)}`,
                  chainName: networkConf.chainName,
                  nativeCurrency: {
                    name: 'Ether',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                  rpcUrls: networkConf.rpcUrls,
                  blockExplorerUrls: networkConf.blockExplorerUrls,
                },
              ],
            });
          } catch (addError) {
            throw new Error(
              `Failed to add ${networkConf.chainName} to your wallet.`,
            );
          }
        } else {
          throw new Error(`Failed to switch to ${networkConf.chainName}.`);
        }
      }
    }
  } catch (err) {
    throw new Error(err);
  }
};

const contract = {
  rent: async ({
    payerAddress,
    ownerAddress,
    currencyAddress,
    durationNum,
    duration,
    price,
  }) => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any',
      );
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      message.info({
        content: 'Waiting...',
        key: 'tx',
        duration: 0,
      });

      await switchNetwork(provider);

      // 初始化合约
      const payment = new ethers.Contract(
        getAddresses().PaymentProxy,
        Payment.abi,
        provider,
      ).connect(signer);

      const currency = new ethers.Contract(
        currencyAddress,
        currencyABI,
        provider,
      ).connect(signer);

      // 获取需要支付的总金额
      const discountTotalDays =
        durationNum * durationMultiplier(duration, true);
      const totalAmount = ethers.utils.parseUnits(
        `${discountTotalDays * price}`,
        6,
      );

      // 检查授权额度
      const currentAllowance = await currency.allowance(
        payerAddress,
        getAddresses().PaymentProxy,
      );
      if (currentAllowance.lt(totalAmount)) {
        const approveTx = await currency.approve(
          getAddresses().PaymentProxy,
          totalAmount,
        );
        await approveTx.wait();
        message.success('Approval successful!');
      }

      // 调起支付
      const totalDays = durationNum * durationMultiplier(duration, true);
      const tx = await payment.createPaymentPlan(
        payerAddress,
        ownerAddress,
        currencyAddress,
        totalAmount,
        totalDays,
      );
      await tx.wait(); // 等待交易完成
      message.success('Trade successfully!');
      return tx;
    } catch (error) {
      console.log('『error』', error);
      throw new Error(error);
    } finally {
      message.destroy('tx');
    }
  },
  stopRent: async (paymentId, signatures = []) => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any',
      );
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      message.info({
        content: 'Waiting...',
        key: 'tx',
        duration: 0,
      });

      await switchNetwork(provider);

      const signMessage = ethers.utils.solidityPack(
        ['bytes32', 'string'],
        [paymentId, 'STOP'],
      );

      // 哈希化消息
      const messageHash = ethers.utils.keccak256(signMessage);

      // 签名
      const signature = await signer.signMessage(
        ethers.utils.arrayify(messageHash),
      );
      signatures.push(signature);

      // 初始化合约
      const payment = new ethers.Contract(
        getAddresses().PaymentProxy,
        Payment.abi,
        provider,
      ).connect(signer);

      const tx = await payment.stopPaymentPlan(paymentId, signatures);
      await tx.wait(); // 等待交易完成
      message.success('Stop successfully!');
      return tx;
    } catch (error) {
      console.log('『error』', error);
      throw new Error(error);
    } finally {
      message.destroy('tx');
    }
  },
  releaseDailyPayment: async (paymentId) => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any',
      );
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      message.info({
        content: 'Waiting...',
        key: 'tx',
        duration: 0,
      });

      await switchNetwork(provider);

      // 初始化合约
      const payment = new ethers.Contract(
        getAddresses().PaymentProxy,
        Payment.abi,
        provider,
      ).connect(signer);

      const tx = await payment.releaseDailyPayment(paymentId);
      await tx.wait(); // 等待交易完成
      message.success('Release successfully!');
      return tx;
    } catch (error) {
      console.log('『error』', error);
      throw new Error(error);
    } finally {
      message.destroy('tx');
    }
  },
  distribute: async (
    payerAddress,
    totalAmount,
    beneficiaries, // address[]
    rewards, // uint256[]
  ) => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any',
      );
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      await switchNetwork(provider);

      // 初始化合约
      const distribution = new ethers.Contract(
        getAddresses().Distribution,
        Distribution.abi,
        provider,
      ).connect(signer);

      const currency = new ethers.Contract(
        getAddresses().USDT,
        currencyABI,
        provider,
      ).connect(signer);
      // 检查授权额度
      const currentAllowance = await currency.allowance(
        payerAddress,
        getAddresses().Distribution,
      );
      if (currentAllowance.lt(totalAmount)) {
        message.info({
          content: 'Approving...',
          key: 'approveTx',
          duration: 0,
        });
        const approveTx = await currency.approve(
          getAddresses().Distribution,
          totalAmount,
        );
        await approveTx.wait();
        message.destroy('approveTx');
        message.success('Approval successful!');
      }

      message.info({
        content: 'Transaction in transit...',
        key: 'tx',
        duration: 0,
      });

      // 调起支付
      const tx = await distribution.distribute(
        getAddresses().USDT,
        totalAmount,
        beneficiaries || [],
        rewards || [],
      );
      await tx.wait(); // 等待交易完成
      message.destroy('tx');
      await delay(2000);
      message.success('Trade successfully!');
      return tx;
    } catch (error) {
      message.destroy('approveTx');
      message.destroy('tx');
      console.log('『error』', error);
      throw new Error(error);
    }
  },
  distributeRewards: async (nature, rewards) => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any',
      );
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      await switchNetwork(provider, 'eth');

      // 初始化合约
      const distribution = new ethers.Contract(
        getAddresses('ETH').JasmyRewards,
        JasmyRewards.abi,
        provider,
      ).connect(signer);

      message.info({
        content: 'Waiting...',
        key: 'tx',
        duration: 0,
      });
      const tx = await distribution.distributeRewards(nature, rewards);
      await tx.wait(); // 等待交易完成
      message.destroy('tx');
    } catch (err) {
      message.destroy('tx');
      console.log('『err』', err);
      throw new Error(err);
    }
  },

  escrow: async (tokenId) => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any',
      );
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      message.info({
        content: 'Waiting...',
        key: 'tx',
        duration: 0,
      });

      await switchNetwork(provider);

      // 初始化合约
      const escrowContract = new ethers.Contract(
        getAddresses().NFTEscrowProxy,
        NFTEscrowImpl.abi,
        provider,
      ).connect(signer);

      const nftContract = new ethers.Contract(
        getAddresses().JanctionNFT,
        JanctionNFT.abi,
        provider,
      ).connect(signer);

      const approveTx = await nftContract.approve(
        getAddresses().NFTEscrowProxy,
        tokenId,
      );
      console.log('Approve transaction sent:', approveTx.hash);

      // 等待交易完成
      await approveTx.wait();
      console.log(`Escrow contract approved for tokenId: ${tokenId}.`);

      // 检查授权是否成功
      const approvedAddress = await nftContract.getApproved(tokenId);
      if (
        approvedAddress.toLowerCase() !==
        getAddresses().NFTEscrowProxy.toLowerCase()
      ) {
        throw new Error('Approval failed. Escrow contract is not approved.');
      }

      console.log(`Escrowing NFT with tokenId: ${tokenId}...`);

      const tx = await escrowContract.escrow(tokenId);
      await tx.wait(); // 等待交易完成
      message.destroy('tx');
    } catch (err) {
      message.destroy('tx');
      console.log('『err』', err);
      throw new Error(err);
    }
  },

  unescrow: async (tokenId) => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any',
      );
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      message.info({
        content: 'Waiting...',
        key: 'tx',
        duration: 0,
      });

      await switchNetwork(provider);

      // 初始化合约
      const unescrowContract = new ethers.Contract(
        getAddresses().NFTEscrowProxy,
        NFTEscrowImpl.abi,
        provider,
      ).connect(signer);

      const tx = await unescrowContract.unescrow(tokenId);
      await tx.wait(); // 等待交易完成
      message.destroy('tx');
    } catch (err) {
      message.destroy('tx');
      console.log('『err』', err);
      throw new Error(err);
    }
  },
};

export default contract;
