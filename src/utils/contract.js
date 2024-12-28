import { ADDRESS, currencyABI, Duration } from '@/constant';
import { message } from 'antd';
import { ethers } from 'ethers';
import Distribution from './Distribution.json';
import Payment from './Payment.json';
import JasmyRewards from './JasmyRewards.json';

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

async function buildEIP712Signature(signer, contract, rewards) {
  // 从合约动态获取 name 和 version
  const name = await contract.eip712Domain().then((d) => d.name); // EIP712 name
  const version = await contract.eip712Domain().then((d) => d.version); // EIP712 version

  // 获取 nonce
  const signerAddress = await signer.getAddress();
  const nonce = await contract.getSigNonce(signerAddress);

  // 定义 EIP-712 域
  const chainId = await signer.getChainId(); // 当前链 ID
  const domain = {
    name,
    version,
    chainId,
    verifyingContract: contract.address,
  };

  // 定义 EIP-712 类型
  const types = {
    DistributeRewards: [
      { name: 'rewards', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };

  // 设置数据
  const deadline = Math.floor(Date.now() / 1000) + 3600; // 当前时间 + 1 小时
  const value = {
    rewards: rewards.toString(),
    nonce: nonce.toString(),
    deadline: deadline.toString(),
  };

  // 签名
  const signature = await signer._signTypedData(domain, types, value);

  // 分解签名为 v, r, s
  const { v, r, s } = ethers.utils.splitSignature(signature);

  // 构建 EIP712Signature 结构体
  const EIP712Signature = {
    signer: signerAddress,
    v,
    r,
    s,
    deadline,
  };

  return EIP712Signature;
}

const contract = {
  list: async (nodeId, price) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // 初始化合约
      const payment = new ethers.Contract(
        ADDRESS.Payment,
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
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // 初始化合约
      const payment = new ethers.Contract(
        ADDRESS.Payment,
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
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // 初始化合约
      const payment = new ethers.Contract(
        ADDRESS.Payment,
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
      console.log('Total Amount to approve:', totalAmount.toString());

      // 检查授权额度
      const currentAllowance = await currency.allowance(
        payerAddress,
        ADDRESS.Payment,
      );
      console.log('currentAllowance:', currentAllowance.toString());
      if (currentAllowance.lt(totalAmount)) {
        console.log('Insufficient allowance, approving...');
        message.info({
          content: 'Approving...',
          key: 'approveTx',
          duration: 0,
        });
        const approveTx = await currency.approve(payerAddress, totalAmount);
        await approveTx.wait();
        message.success('Approval successful!');
      } else {
        console.log('Sufficient allowance, skipping approve step.');
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
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // 初始化合约
      const distribution = new ethers.Contract(
        ADDRESS.Distribution,
        Distribution.abi,
        provider,
      ).connect(signer);

      const currency = new ethers.Contract(
        ADDRESS.USDT,
        currencyABI,
        provider,
      ).connect(signer);

      // 检查授权额度
      const currentAllowance = await currency.allowance(
        payerAddress,
        ADDRESS.Distribution,
      );
      if (currentAllowance.lt(totalAmount)) {
        message.info({
          content: 'Approving...',
          key: 'approveTx',
          duration: 0,
        });
        const approveTx = await currency.approve(
          ADDRESS.Distribution,
          totalAmount,
        );
        await approveTx.wait();
        message.destroy('approveTx');
        message.success('Approval successful!');
      } else {
        console.log('Sufficient allowance, skipping approve step.');
      }

      message.info({
        content: 'Transaction in transit...',
        key: 'tx',
        duration: 0,
      });

      // 调起支付
      const query = {
        a: ADDRESS.USDT,
        b: totalAmount,
        c: beneficiaries || [],
        d: (rewards || []).map((item) => ethers.utils.parseUnits(item, 6)),
      };
      console.log('『query』', query);
      const tx = await distribution.distribute(
        ADDRESS.USDT,
        totalAmount,
        beneficiaries || [],
        (rewards || []).map((item) => ethers.utils.parseUnits(item, 6)),
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
  eIP712Signature: async (rewards) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      // 初始化合约
      const distribution = new ethers.Contract(
        ADDRESS.JasmyRewards,
        JasmyRewards.abi,
        provider,
      ).connect(signer);

      const parseRewards = ethers.utils.parseEther(
        BigInt(rewards).toString(10),
      );

      message.info({
        content: 'waitting...',
        key: 'tx',
        duration: 0,
      });
      const signatureStruct = await buildEIP712Signature(
        signer,
        distribution,
        parseRewards,
      );

      console.log('『signatureStruct』', signatureStruct);

      message.destroy('tx');
      message.success('Successfully!');
      return signatureStruct;
    } catch (err) {
      message.destroy('tx');
      message.error('Failed, please try again!');
      console.log('『err』', err);
      return null;
    }
  },
  // distributeRewards: async (nature, rewards) => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     await provider.send('eth_requestAccounts', []);
  //     const signer = provider.getSigner();

  //     // 初始化合约
  //     const distribution = new ethers.Contract(
  //       ADDRESS.JasmyRewards,
  //       JasmyRewards.abi,
  //       provider,
  //     ).connect(signer);

  //     const parseRewards = ethers.utils.parseEther(
  //       BigInt(rewards).toString(10),
  //     );

  //     message.info({
  //       content: 'waitting...',
  //       key: 'tx',
  //       duration: 0,
  //     });
  //     const tx = await distribution.distributeRewards(nature, parseRewards);
  //     await tx.wait(); // 等待交易完成
  //     message.destroy('tx');
  //     message.success('Successfully!');
  //     return tx;
  //   } catch (err) {
  //     message.destroy('tx');
  //     message.error('Failed, please try again!');
  //     console.log('『err』', err);
  //   }
  // },
};

export default contract;
