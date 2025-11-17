import { Duration } from '@/constant';
import { message } from 'antd';
import { ethers } from 'ethers';
import currencyABI from './CurrencyAbi.json';
import Distribution from './Distribution.json';
import PaymentImpl from './PaymentImpl.json';
import JasmyRewards from './JasmyRewards.json';
import NFTEscrowImpl from './NFTEscrowImpl.json';
import JanctionNFT from './JanctionNFT.json';
import ClaimAirdropABI from './ClaimAirdrop.json';
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
  bsc: {
    chainId: 56,
    chainName: 'BNB Smart Chain',
    currencyName: 'BNB',
    currencySymbol: 'BNB',
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  bsc_test: {
    chainId: 97,
    chainName: 'BNB Smart Chain Testnet',
    currencyName: 'tBNB',
    currencySymbol: 'tBNB',
    rpcUrls: ['https://endpoints.omniatech.io/v1/bsc/testnet/public'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
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
    : Addresses.OP;

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
  let address = isProduction ? Addresses.OP : Addresses.OP_SEPOLIA;

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

const getAddresses = (networkName = 'BSC') => {
  const upperName = (networkName || 'BSC').toUpperCase();

  if (isProduction) {
    return Addresses[upperName];
  }

  if (upperName === 'ETH') {
    return Addresses.SEPOLIA;
  }

  if (upperName === 'BSC') {
    return Addresses.BSC || Addresses.BSC_TESTNET || Addresses[upperName];
  }

  if (process.env.TESTNET == 'jasmy') {
    return Addresses.JASMY_TESTNET;
  }

  return Addresses.OP;
};

export const switchNetwork = async (provider, networkName = 'bsc') => {
  try {
    const rawProvider = provider.provider;

    const currentChainId = await rawProvider.request({ method: 'eth_chainId' });

    console.log('Current chain ID:', currentChainId);

    let network_name = networkName?.toLowerCase?.() || 'op';
    if (!isProduction) {
      if (network_name !== 'eth' && network_name !== 'bsc') {
        network_name = process.env.TESTNET || network_name;
      }
    }

    const networkConf =
      NETWORKS[`${network_name}${isProduction ? '' : '_test'}`] ||
      NETWORKS[network_name];

    if (!networkConf) {
      throw new Error(`Unsupported network configuration: ${network_name}`);
    }
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

    let network_name = isProduction ? 'op' : 'op_test';

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
  const network_name = isProduction ? 'OP' : 'OP_SEPOLIA';
  console.log('network_name for pay: ', network_name);
  console.log('Addresses', Addresses[network_name]);
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

function toBigNumber(value) {
  if (ethers.BigNumber.isBigNumber(value)) {
    return value;
  }
  if (value === undefined || value === null) {
    throw new Error('Invalid numeric value');
  }
  return ethers.BigNumber.from(
    typeof value === 'string' ? value : value.toString(),
  );
}

const contract = {
  claimAirdrop: async (signer, messagePayload, signature) => {
    try {
      if (!signer) {
        throw new Error('Wallet not connected');
      }

      if (!signature || !messagePayload) {
        throw new Error('Invalid signature payload');
      }

      const { timestamp, amount, endTime } = messagePayload;
      if (
        timestamp === undefined ||
        amount === undefined ||
        endTime === undefined
      ) {
        throw new Error('Incomplete signature payload');
      }

      message.info({
        content: 'Waiting...',
        key: 'tx',
        duration: 0,
      });

      await switchNetwork(signer.provider, 'bsc');

      const rawProvider =
        signer.provider?.provider || signer.provider || window.ethereum;

      if (!rawProvider) {
        throw new Error('Provider not available');
      }

      const refreshedProvider = new ethers.providers.Web3Provider(
        rawProvider,
        'any',
      );
      const walletAddress =
        messagePayload.wallet || (await signer.getAddress());
      const refreshedSigner = refreshedProvider.getSigner(walletAddress);

      const claimContract = new ethers.Contract(
        getAddresses('BSC').ClaimAirdrop,
        ClaimAirdropABI,
        refreshedSigner,
      );

      const claimMessage = {
        wallet: walletAddress,
        timestamp: toBigNumber(timestamp),
        amount: toBigNumber(amount),
        endTime: toBigNumber(endTime),
      };

      let gasLimit;
      try {
        gasLimit = await claimContract.estimateGas.claimAirdrop(
          claimMessage,
          signature,
        );
      } catch (estimateError) {
        console.log('Claim gas estimate failed:', estimateError);
        gasLimit = ethers.BigNumber.from(400000);
      }

      const tx = await claimContract.claimAirdrop(claimMessage, signature, {
        gasLimit: gasLimit.mul(120).div(100),
      });
      await tx.wait();
      message.success('Claim successfully!');
      return tx;
    } catch (error) {
      console.log('Claim airdrop error:', error);
      throw error;
    } finally {
      message.destroy('tx');
    }
  },
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
      let currentAllowance = await currency.allowance(
        payerAddress,
        getJasmyAddress().PaymentProxy,
      );
      if (currentAllowance.lt(totalAmount)) {
        message.info({
          content: 'Approving...',
          key: 'approve',
          duration: 0,
        });
        const approveTx = await currency.approve(
          getJasmyAddress().PaymentProxy,
          totalAmount,
        );
        // 等待至少2个区块确认，确保授权状态已同步
        await approveTx.wait(2);
        message.destroy('approve');
        message.success('Approval successful!');

        // 等待一小段时间，确保状态完全同步
        await delay(1000);

        // 重新检查授权状态，确保授权已生效
        let retryCount = 0;
        const maxRetries = 5;
        while (retryCount < maxRetries) {
          currentAllowance = await currency.allowance(
            payerAddress,
            getJasmyAddress().PaymentProxy,
          );
          if (currentAllowance.gte(totalAmount)) {
            console.log('Allowance confirmed:', currentAllowance.toString());
            break;
          }
          console.log(
            `Waiting for allowance to sync... (${
              retryCount + 1
            }/${maxRetries})`,
          );
          await delay(500);
          retryCount++;
        }

        if (currentAllowance.lt(totalAmount)) {
          throw new Error('Approval not reflected on chain, please try again');
        }
      }
      const node32 = uuidToBytes32(nodeId);
      console.log(node32);
      // 调起支付 - 先手动估算gas，避免自动估算在授权后立即调用时失败
      let gasEstimate;
      try {
        // 先尝试估算gas
        gasEstimate = await payment.createPaymentPlan.estimateGas(
          payerAddress,
          ownerAddress,
          currencyAddress,
          totalAmount,
          totalHours,
          node32,
        );
        console.log('Gas estimate:', gasEstimate.toString());
      } catch (estimateError) {
        console.log(
          'Gas estimation failed, will use default gas limit:',
          estimateError,
        );
        // 如果估算失败，使用一个合理的固定值
        gasEstimate = ethers.BigNumber.from(400000); // 默认400k gas，通常足够支付合约调用
      }

      // 使用估算的gas（增加20%余量）或固定值
      const tx = await payment.createPaymentPlan(
        payerAddress,
        ownerAddress,
        currencyAddress,
        totalAmount,
        totalHours,
        node32,
        {
          gasLimit: gasEstimate.mul(120).div(100), // 增加20%的gas余量
        },
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
        chainId: (await provider.getNetwork()).chainId,
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
