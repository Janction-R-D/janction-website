import {
  ADDRESS,
  currencyABI,
  currencyAddress,
  Duration,
  paymentABI,
  paymentAddress,
} from '@/constant';
import { Form, message } from 'antd';
import { ethers } from 'ethers';
import BasicConf from './BasicConf';
import PurchaseCard from './Card';
import Footer from './Footer';
import styles from './index.less';
import ProductList from './ProductList';
import { fetchMarketRent, fetchNodesConfigInfo } from '@/services/genesis';
import { useEffect, useState } from 'react';
import LabelVal from './Card/LabelVal';
import { empty } from '@/utils/lang';
import { history } from 'umi';
import { useAccount } from 'wagmi';

const Create = (props) => {
  const { nodeId } = history.location.state || {};
  const { address } = useAccount();
  const [form] = Form.useForm();

  const [node, setNode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [configInfo, setConfigInfo] = useState();

  useEffect(() => {
    if (!nodeId) return;
    getNodeConfigInfo({ node_id: nodeId });
  }, [nodeId]);

  const onNodeChange = (node_id, _node) => {
    setNode(_node);
    if (!node_id) {
      setConfigInfo();
      return;
    }
    getNodeConfigInfo({ node_id });
  };

  const getNodeConfigInfo = async (params) => {
    try {
      const res = await fetchNodesConfigInfo(params);
      setConfigInfo(res);
    } catch (error) {
      console.log('『error』', error);
    }
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

  const onConfirm = async () => {
    try {
      const values = await form.validateFields();
      console.log('『values』', values);
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
      // history.push('/genesis/purchase/settlement');
    } catch (error) {
      setLoading(false);
      console.error('操作合约失败：', error);
      message.error('Operation contract failed, please try again!');
    }
  };

  return (
    <Form form={form} name="quick">
      <div
        className={[styles['config-wrapper'], styles['quick-wrapper']].join(
          ' ',
        )}
      >
        <PurchaseCard title="Nodes List">
          <Form.Item
            name="node_id"
            rules={[{ required: true, message: 'please select node' }]}
            initialValue={nodeId}
          >
            <ProductList onChange={onNodeChange} />
          </Form.Item>
        </PurchaseCard>
        <PurchaseCard title="Configuration summary">
          <LabelVal name="Node id">{node?.id || '~'}</LabelVal>
          <LabelVal name="Node price">
            {empty(configInfo?.price) ? '~' : `${configInfo?.price} veJCT/day`}
          </LabelVal>
          <LabelVal name="Tags">
            {empty(configInfo?.tags) ? '~' : `${configInfo.tags.join(',')}`}
          </LabelVal>
        </PurchaseCard>
        <BasicConf />
        <Footer loading={loading} onConfirm={onConfirm} />
      </div>
    </Form>
  );
};

export default Create;
