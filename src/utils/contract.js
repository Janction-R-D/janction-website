import { ADDRESS, TEST_ADDRESS, currencyABI, Duration } from '@/constant';
import { message } from 'antd';
import { ethers } from 'ethers';
import Distribution from './Distribution.json';
import Payment from './Payment.json';
import JasmyRewards from './JasmyRewards.json';
import NFTEscrowImpl from './NFTEscrowImpl.json';
import JanctionNFT from './JanctionNFT.json';

const isProduction = process.env.NODE_ENV === 'production';

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

const getAddresses = () => (isProduction ? ADDRESS : TEST_ADDRESS);

const switchNetwork = async (provider) => {
  try {
    const network = await provider.getNetwork();
    const ethMainnet = 1;
    const sepoliaChainId = 11155111; // Sepolia 测试网的 Chain ID
    const chainId = isProduction ? ethMainnet : sepoliaChainId;

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
                  chainId: isProduction
                    ? '0x1'
                    : `0x${sepoliaChainId.toString(16)}`,
                  chainName: isProduction
                    ? 'Ethereum Mainnet'
                    : 'Sepolia Test Network',
                  nativeCurrency: {
                    name: 'Ether',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                  rpcUrls: isProduction
                    ? ['https://eth.llamarpc.com']
                    : ['https://rpc.sepolia.org'],
                  blockExplorerUrls: isProduction
                    ? ['https://etherscan.io']
                    : ['https://sepolia.etherscan.io'],
                },
              ],
            });
          } catch (addError) {
            throw new Error(
              isProduction
                ? 'Failed to add Ethereum Mainnet to your wallet.'
                : 'Failed to add Sepolia Test Network to your wallet.',
            );
          }
        } else {
          throw new Error(
            isProduction
              ? 'Failed to switch to Ethereum Mainnet.'
              : 'Failed to switch to Sepolia Test Network.',
          );
        }
      }
    }
  } catch (err) {
    throw new Error(err);
  }
};

const contract = {
  list: async (nodeId, price) => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any',
      );
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      await switchNetwork(provider);

      // 初始化合约
      const payment = new ethers.Contract(
        getAddresses().Payment,
        Payment.abi,
        provider,
      ).connect(signer);

      const listTx = await payment.list(
        ethers.utils.parseBytes32String(nodeId),
        ethers.utils.parseUnits(price, 6),
      );
      message.info({
        content: 'The operation is in progress, please wait...',
        key: 'listTx',
        duration: 0,
      });
      await listTx.wait();
      message.destroy('listTx');
      message.success('The operation was successful!');
    } catch (error) {
      console.log('『error』', error);
      throw new Error(error);
    }
  },
  delist: async (nodeId) => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any',
      );
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      await switchNetwork(provider);

      // 初始化合约
      const payment = new ethers.Contract(
        getAddresses().Payment,
        Payment.abi,
        provider,
      ).connect(signer);

      const delistTx = await payment.delist(
        ethers.utils.parseBytes32String(nodeId),
      );
      message.info({
        content: 'The operation is in progress, please wait...',
        key: 'delistTx',
        duration: 0,
      });
      await delistTx.wait();
      message.destroy('delistTx');
      message.success('The operation was successful!');
    } catch (error) {
      console.log('『error』', error);
      throw new Error(error);
    }
  },
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

      await switchNetwork(provider);

      // 初始化合约
      const payment = new ethers.Contract(
        getAddresses().Payment,
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
      const totalAmount = discountTotalDays * price;

      // 检查授权额度
      const currentAllowance = await currency.allowance(
        payerAddress,
        getAddresses().Payment,
      );
      if (currentAllowance.lt(totalAmount)) {
        message.info({
          content: 'Approving...',
          key: 'approveTx',
          duration: 0,
        });
        const approveTx = await currency.approve(payerAddress, totalAmount);
        await approveTx.wait();
        message.success('Approval successful!');
      }

      message.destroy('approveTx');
      message.info({
        content: 'Transaction in transit...',
        key: 'tx',
        duration: 0,
      });

      // 调起支付
      const totalDays = durationNum * durationMultiplier(duration);
      const tx = await payment.createPaymentPlan(
        payerAddress,
        ownerAddress,
        currencyAddress,
        ethers.utils.parseUnits(totalAmount, 6),
        totalDays,
      );
      await tx.wait(); // 等待交易完成
      message.destroy('tx');
      message.success('Trade successfully!');
      return tx;
    } catch (error) {
      console.log('『error』', error);
      throw new Error(error);
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

      await switchNetwork(provider);

      // 初始化合约
      const distribution = new ethers.Contract(
        getAddresses().JasmyRewards,
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

      // await switchNetwork(provider);

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

      message.info({
        content: 'Waiting...',
        key: 'tx',
        duration: 0,
      });
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

      // await switchNetwork(provider);

      // 初始化合约
      const unescrowContract = new ethers.Contract(
        getAddresses().NFTEscrowProxy,
        NFTEscrowImpl.abi,
        provider,
      ).connect(signer);

      message.info({
        content: 'Waiting...',
        key: 'tx',
        duration: 0,
      });
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
