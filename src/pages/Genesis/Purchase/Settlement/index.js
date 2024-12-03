import JanctionCountDown from '@/components/JanctionCountDown';
import JanctionTable from '@/components/JanctionTable';
import {
  ADDRESS,
  currencyABI,
  currencyAddress,
  Duration,
  paymentABI,
  paymentAddress,
} from '@/constant';
import { fetchMarketRent } from '@/services/genesis';
import { Form, message } from 'antd';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import { useAccount } from 'wagmi';
import PurchaseCard from '../components/Card';
import Footer from '../components/Footer/index1';
import PayType from '../components/PayType';
import { SETTLEMENT_COLUMNS } from '../extra';
import styles from './index.less';

const Settlement = (props) => {
  const [deadline, setDeadline] = useState();

  const { formValues } = history.location.state || {};
  const { address } = useAccount();

  console.log('『formValues』', formValues);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDeadline(Date.now() + 20 * 60 * 1000);
  }, []);

  const onFinish = () => {
    console.log('『onFinish』', onFinish);
  };

  const onRent = async (values) => {
    try {
      await fetchMarketRent(values);
      message.success('Successful hire!');
    } catch (err) {
      console.log('『err』', err);
      throw new Error(err);
    }
  };

  const onPay = async () => {
    try {
      console.log('『values』', formValues);
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // 初始化合约
      const payment = new ethers.Contract(
        ADDRESS.Payment,
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
        Duration[values.purchase_duration_unit],
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
        message.info({
          content: 'Approving...',
          key: 'approveTx',
          duration: 0,
        });
        const approveTx = await currency.approve(paymentAddress, totalAmount);
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
      const tx = await payment.createPayerPlan(
        node.user_id,
        Duration[values.purchase_duration_unit],
      );
      await tx.wait(); // 等待交易完成
      message.destroy('tx');
      message.success('Trade successfully!');
      await onRent({
        tx_id: tx.hash,
        node_id: node.id,
        ...values,
      });
      setLoading(false);
      history.push('/genesis/instance');
    } catch (error) {
      setLoading(false);
      console.error('操作合约失败：', error);
      message.error('Operation contract failed, please try again!');
    }
  };

  return (
    <div className={styles['settlement-wrapper']}>
      <h1>
        <span>Confirm product information</span>
        <a>
          <i className="iconfont icon-pre_page"></i>
          <span>Back to modify configuration</span>
        </a>
      </h1>
      <JanctionCountDown
        deadline={deadline}
        onFinish={onFinish}
        format="mm:ss"
      />
      <PurchaseCard title="Price detail">
        <Form.Item
          name="pay_type"
          rules={[{ required: true, message: 'please select pay type' }]}
        >
          <PayType />
        </Form.Item>
        <JanctionTable columns={SETTLEMENT_COLUMNS} />
      </PurchaseCard>
      <Footer isSettlement onPre={() => history.goBack()} onPay={onPay} />
    </div>
  );
};

export default Settlement;
