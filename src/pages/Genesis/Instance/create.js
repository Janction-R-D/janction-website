import JanctionTable from '@/components/JanctionTable';
import {
  currencyABI,
  currencyAddress,
  Duration,
  paymentABI,
  paymentAddress,
} from '@/constant';
import { fetchNodesConfigInfo, fetchNodesList } from '@/services/genesis';
import { calculateDuration } from '@/utils/datetime';
import { message } from 'antd';
import dayjs from 'dayjs';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { getNodeStatusMatch } from '../Nodes/components/extra';
import styles from './index.less';

const Create = (props) => {
  const { address } = useAccount();
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    try {
      const res = await fetchNodesList();
      setList(
        (res || []).filter((node) => {
          const { isListed } = getNodeStatusMatch(node);
          return isListed;
        }),
      );
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const onNodeSelect = async (node) => {
    console.log('『node』', node);

    try {
      if (!address) {
        message.error('Address is required!');
        return;
      }
      const res = await fetchNodesConfigInfo({ node_id: node.id });
      const price = res?.price;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // 初始化合约
      const payment = new ethers.Contract(
        paymentAddress,
        paymentABI,
        provider,
      ).connect(signer);
      const currency = new ethers.Contract(
        currencyAddress,
        currencyABI,
        provider,
      ).connect(signer);

      // 获取需要支付的总金额
      const totalAmount = await payment.getTotalAmount(
        node.user_id,
        Duration.Day,
      );
      console.log('Total Amount to approve:', totalAmount.toString());

      // 检查授权额度
      const currentAllowance = await currency.allowance(
        address,
        paymentAddress,
      );
      console.log('currentAllowance:', currentAllowance.toString());
      if (currentAllowance.lt(totalAmount)) {
        console.log('Insufficient allowance, approving...');
        const approveTx = await currency.approve(paymentAddress, totalAmount);
        message.info('Approving...');
        await approveTx.wait();
        message.success('Approval successful!');
      } else {
        console.log('Sufficient allowance, skipping approve step.');
      }

      // 调起支付
      const tx = await payment.createPayerPlan(node.user_id, Duration.Day);
      message.info('Transaction in transit...');
      await tx.wait(); // 等待交易完成
      message.success('Trade successfully!');
      getList();
    } catch (error) {
      console.error('操作合约失败：', error);
      message.error('Operation contract failed, please try again!');
    }
  };

  const columns = [
    {
      title: 'Device ID',
      dataIndex: 'id',
      key: 'deviceId',
      width: 'auto',
      ellipsis: true,
    },
    {
      title: 'CHIP/GPUS',
      dataIndex: 'chipGpu',
      key: 'chipGpu',
      ellipsis: true,
      width: 'auto',
      render: (text, record) => {
        if (!record.gpu_chip && !record.cpu_chip) return '--';
        return `${record.gpu_chip || ''} ${record.cpu_chip || ''}`;
      },
    },
    {
      title: (
        <div>
          <p>Node running time</p>
          <p>UP FOR </p>
        </div>
      ),
      dataIndex: 'last_start_at',
      width: 'auto',
      render: (text) => {
        if (!text) return '--';
        return calculateDuration(text, { showSeconds: false });
      },
    },

    {
      title: 'list time',
      dataIndex: 'last_config_at',
      width: 'auto',
      key: 'time',
      render: (text) => {
        if (!text) return '--';
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: 'Operation',
      key: 'action',
      width: 'auto',
      fixed: 'right',
      render: (error, record) => {
        return <a onClick={() => onNodeSelect(record)}>select</a>;
      },
    },
  ];

  return (
    <div className={styles['create-wrapper']}>
      <h1 className={styles['text__title']}>Configure instance</h1>
      <JanctionTable
        className={styles['table']}
        columns={columns}
        dataSource={list}
        pagination={false}
        emptyDescription={<p>No nodes are currently running.</p>}
      />
    </div>
  );
};

export default Create;
