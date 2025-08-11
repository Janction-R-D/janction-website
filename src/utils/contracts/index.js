import { Duration } from '@/constant';
import { message } from 'antd';
import { ethers } from 'ethers';
import currencyABI from './CurrencyAbi.json';
import Distribution from './Distribution.json';
import PaymentImpl from './PaymentImpl.json';
import JasmyRewards from './JasmyRewards.json';
import NFTEscrowImpl from './NFTEscrowImpl.json';
import JanctionNFT from './JanctionNFT.json';
import { delay } from '../lang';
import Addresses from './Addresses.json';

const isProduction = process.env.JANCTION_ENV === 'production';

export const NETWORKS = {
  eth: {
    chainId: 1,
    chainName: 'Ethereum Mainnet',
    currencyName: 'Ether',
    currencySymbol: 'ETH',
    rpcUrls: ['https://eth.llamarpc.com'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  eth_test: {
    chainId: 11155111,
    chainName: 'Sepolia Test Network',
    currencyName: 'Ether',
    currencySymbol: 'ETH',
    rpcUrls: ['https://rpc.sepolia.org'],
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  },
  op: {
    chainId: 10,
    chainName: 'Optimism Mainnet',
    currencyName: 'Ether',
    currencySymbol: 'ETH',
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
  },
  op_test: {
    chainId: 11155420,
    chainName: 'Optimism Sepolia Testnet',
    currencyName: 'Ether',
    currencySymbol: 'ETH',
    rpcUrls: ['https://sepolia.optimism.io'],
    blockExplorerUrls: ['https://sepolia-optimism.etherscan.io'],
  },
  jasmy_test: {
    chainId: 681,
    chainName: 'Jasmy Testnet',
    currencyName: 'JASMY',
    currencySymbol: 'JASMY',
    rpcUrls: ['https://jasmy-chain-testnet.alt.technology'],
    blockExplorerUrls: ['https://jasmy-chain-testnet-explorer.alt.technology/'],
  },
};

export const getCurrency = () => {
  let address = isProduction
    ? Addresses.OP
    : process.env.TESTNET == 'jasmy'
    ? Addresses.JASMY_TESTNET
    : Addresses.OP_SEPOLIA;

  // 补丁
  if (process.env.TESTNET == 'jasmy') {
    address = Addresses.JASMY_TESTNET;
  }

  console.log('get address:', address);

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
export const getJasmyCurrency = () => {
  let address = isProduction ? Addresses.OP_SEPOLIA : Addresses.OP_SEPOLIA;

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

export const getDefaultJasmyCurrency = () => {
  const allCurrency = getJasmyCurrency();
  return allCurrency[0].value;
};

export function convertDurationToHours(duration, discount) {
  if (duration == Duration.Hour) {
    return 1;
  } else if (duration == Duration.Day) {
    return 1 * 24;
  } else if (duration == Duration.Week) {
    return discount ? 6 * 24 : 7 * 24;
  } else if (duration == Duration.Month) {
    return discount ? 25 * 24 : 30 * 24;
  } else if (duration == Duration.Quarter) {
    return discount ? 70 * 24 : 90 * 24;
  } else if (duration == Duration.Year) {
    return discount ? 300 * 24 : 365 * 24;
  } else {
    throw Error('invalid duration');
  }
}

const getAddresses = (networkName = 'OP') => {
  const network_name = isProduction
    ? networkName
    : networkName == 'ETH'
    ? 'SEPOLIA'
    : process.env.TESTNET == 'jasmy'
    ? 'JASMY_TESTNET'
    : 'OP_SEPOLIA';
  console.log(network_name);
  return Addresses[network_name];
};

export const switchNetwork = async (provider, networkName = 'op') => {
  try {
    const rawProvider = provider.provider;

    const currentChainId = await rawProvider.request({ method: 'eth_chainId' });

    console.log('Current chain ID:', currentChainId);

    let network_name =
      isProduction || networkName == 'eth' ? networkName : process.env.TESTNET;

    const networkConf =
      NETWORKS[`${network_name}${isProduction ? '' : '_test'}`];
    const chainId = networkConf.chainId;

    console.log('Expected chain ID:', chainId);

    if (currentChainId !== chainId) {
      try {
        await rawProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await rawProvider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${chainId.toString(16)}`,
                  chainName: networkConf.chainName,
                  nativeCurrency: {
                    name: networkConf.currencyName,
                    symbol: networkConf.currencySymbol,
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
export const switchNetworkJasmy = async (provider) => {
  try {
    const rawProvider = provider.provider;

    const currentChainId = await rawProvider.request({ method: 'eth_chainId' });

    console.log('Current chain ID:', currentChainId);

    let network_name = isProduction ? 'op_test' : 'op_test';

    const networkConf = NETWORKS[network_name];

    const chainId = networkConf.chainId;

    console.log('Expected chain ID:', chainId);

    if (currentChainId !== chainId) {
      try {
        await rawProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await rawProvider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${chainId.toString(16)}`,
                  chainName: networkConf.chainName,
                  nativeCurrency: {
                    name: networkConf.currencyName,
                    symbol: networkConf.currencySymbol,
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

const getJasmyAddress = () => {
  const network_name = isProduction ? 'OP_SEPOLIA' : 'OP_SEPOLIA';
  // console.log('network_name for pay: ', network_name);
  // console.log('Addresses', Addresses[network_name]);
  return Addresses[network_name];
};

function uuidToBytes32(uuidString) {
  // Remove hyphens from the UUID string
  const hexWithoutHyphens = uuidString.replace(/-/g, '');
  // Validate the UUID format (should have exactly 32 hex characters after removing hyphens)
  if (hexWithoutHyphens.length !== 32) {
    throw new Error(
      'Invalid UUID format. Expected 32 hex characters after removing hyphens.',
    );
  }
  //Pad the hex string to 64 characters (32 bytes) and add '0x' prefix
  const paddedHex = '0x' + hexWithoutHyphens.padEnd(64, '0');
  return paddedHex; // Returns a bytes32-compatible hex string
}

const contract = {
  rent: async ({
    signer,
    payerAddress,
    ownerAddress,
    currencyAddress,
    durationNum,
    duration,
    price,
    nodeId,
  }) => {
    try {
      message.info({
        content: 'Waiting...',
        key: 'tx',
        duration: 0,
      });

      await switchNetworkJasmy(signer.provider);

      // 初始化合约

      const payment = new ethers.Contract(
        getJasmyAddress().PaymentProxy,
        PaymentImpl.abi,
        signer,
      );

      const currency = new ethers.Contract(
        currencyAddress,
        currencyABI,
        signer,
      );

      const totalHours = durationNum * convertDurationToHours(duration);
      console.log(totalHours, duration, durationNum);
      // const totalAmount = ethers.utils.parseUnits(`${totalHours * price}`, 6);
      const totalAmount = price; //price comming from the backend
      // 检查授权额度
      const currentAllowance = await currency.allowance(
        payerAddress,
        getJasmyAddress().PaymentProxy,
      );
      if (currentAllowance.lt(totalAmount)) {
        const approveTx = await currency.approve(
          getJasmyAddress().PaymentProxy,
          totalAmount,
        );
        await approveTx.wait();
        message.success('Approval successful!');
      }
      const node32 = uuidToBytes32(nodeId);
      console.log(node32);
      // 调起支付
      const tx = await payment.createPaymentPlan(
        payerAddress,
        ownerAddress,
        currencyAddress,
        totalAmount,
        totalHours,
        node32,
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
  stopRent: async (signer, paymentId, adminSignature) => {
    try {
      const signerAddress = await signer.getAddress();
      console.log(signerAddress);
      const deadline = adminSignature.deadline;

      message.info({
        content: 'Waiting...',
        key: 'tx',
        duration: 0,
      });

      await switchNetworkJasmy(signer.provider);

      // 初始化合约
      const payment = new ethers.Contract(
        getJasmyAddress().PaymentProxy,
        PaymentImpl.abi,
        signer,
      );

      const domain = {
        name: 'PaymentImpl',
        version: '1',
        chainId: (await signer.provider.getNetwork()).chainId,
        verifyingContract: getJasmyAddress().PaymentProxy,
      };

      const types = {
        StopPaymentPlan: [
          { name: 'paymentId', type: 'bytes32' },
          { name: 'deadline', type: 'uint256' },
        ],
      };

      const value = {
        paymentId: paymentId,
        deadline: deadline,
      };

      const signature = await signer._signTypedData(domain, types, value);

      // 拆分签名
      const sig = ethers.utils.splitSignature(signature);

      // 构造EIP712Signature对象
      const eip712Signature = {
        signer: signerAddress,
        v: sig.v,
        r: sig.r,
        s: sig.s,
        deadline: deadline,
      };

      // 加上已有的管理员签名
      const signatures = [adminSignature, eip712Signature];

      console.log('EIP-712 signatures:', signatures);

      const tx = await payment.stopPaymentPlan(paymentId, signatures);
      await tx.wait();
      message.success('Stop successfully!');
      return tx;
    } catch (error) {
      console.error('Stop payment error:', error);
      message.error('Stop payment failed');
      throw error;
    } finally {
      message.destroy('tx');
    }
  },
  releaseHourlyPayment: async (signer, paymentId) => {
    try {
      message.info({
        content: 'Waiting...',
        key: 'tx',
        duration: 0,
      });

      await switchNetwork(signer.provider);

      // 初始化合约
      const payment = new ethers.Contract(
        getAddresses().PaymentProxy,
        PaymentImpl.abi,
        signer,
      );

      const tx = await payment.releaseHourlyPayment(paymentId);
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
    signer,
    payerAddress,
    totalAmount,
    beneficiaries, // address[]
    rewards, // uint256[]
  ) => {
    try {
      await switchNetwork(signer.provider);

      // 初始化合约
      const distribution = new ethers.Contract(
        getAddresses().Distribution,
        Distribution.abi,
        signer,
      );

      const currency = new ethers.Contract(
        getAddresses().USDT,
        currencyABI,
        signer,
      );
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
  distributeRewards: async (signer, nature, rewards) => {
    try {
      await switchNetwork(signer.provider, 'eth');

      // 初始化合约
      const distribution = new ethers.Contract(
        getAddresses('ETH').JasmyRewards,
        JasmyRewards.abi,
        signer,
      );

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

  escrow: async (signer, tokenId) => {
    try {
      message.info({
        content: 'Waiting...',
        key: 'tx',
        duration: 0,
      });

      await switchNetwork(signer.provider);

      // 初始化合约
      const escrowContract = new ethers.Contract(
        getAddresses().NFTEscrowProxy,
        NFTEscrowImpl.abi,
        signer,
      );

      const nftContract = new ethers.Contract(
        getAddresses().JanctionNFT,
        JanctionNFT.abi,
        signer,
      );

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

  unescrow: async (signer, tokenId) => {
    try {
      message.info({
        content: 'Waiting...',
        key: 'tx',
        duration: 0,
      });

      await switchNetwork(signer.provider);

      // 初始化合约
      const unescrowContract = new ethers.Contract(
        getAddresses().NFTEscrowProxy,
        NFTEscrowImpl.abi,
        signer,
      );

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
