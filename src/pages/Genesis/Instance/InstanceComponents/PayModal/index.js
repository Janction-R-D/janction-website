import {
  currencyABI,
  currencyAddress,
  Duration,
  paymentABI,
  paymentAddress,
} from '@/constant';
import { fetchMarketRent, fetchNodesConfigInfo } from '@/services/genesis';
import { empty } from '@/utils/lang';
import { Form, InputNumber, message, Modal, Select } from 'antd';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import styles from './index.less';

const PayModal = (props) => {
  const { node, visible, onSuccess, onCancel } = props;

  const { address } = useAccount();
  const [form] = Form.useForm();

  const [configInfo, setConfigInfo] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!node?.id) return;
    getNodeConfigInfo();
  }, [node]);
  const getNodeConfigInfo = async (params) => {
    try {
      const res = await fetchNodesConfigInfo({ node_id: node.id });
      setConfigInfo(res);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const onRent = async (tx_id) => {
    try {
      const values = await form.validateFields();
      const res = await fetchMarketRent({
        tx_id,
        node_id: node.id,
        ...values,
      });
      console.log('『res』', res);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const onOk = async () => {
    try {
      if (!address) {
        message.error('Address is required!');
        return;
      }
      const values = await form.validateFields();
      setLoading(true);
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
        const approveTx = await currency.approve(paymentAddress, totalAmount);
        message.info({
          content: 'Approving...',
          key: 'approveTx',
        });
        await approveTx.wait();
        message.destroy('approveTx');
        message.success('Approval successful!');
      } else {
        console.log('Sufficient allowance, skipping approve step.');
      }

      // 调起支付
      const tx = await payment.createPayerPlan(
        node.user_id,
        Duration[values.purchase_duration_unit],
      );
      message.info({
        content: 'Transaction in transit...',
        key: 'tx',
      });
      await tx.wait(); // 等待交易完成
      message.destroy('tx');
      message.success('Trade successfully!');
      setLoading(false);
      await onRent(tx.hash);
      onSuccess();
    } catch (error) {
      setLoading(false);
      console.error('操作合约失败：', error);
      message.error('Operation contract failed, please try again!');
    }
  };

  return (
    <Modal
      title="node config"
      visible={visible}
      confirmLoading={loading}
      onCancel={onCancel}
      onOk={onOk}
      width={700}
      className={styles['node-config-modal']}
    >
      <Form form={form} labelCol={{ span: 8 }}>
        <Form.Item label="Device id" name="device_id">
          <span>{node?.id}</span>
        </Form.Item>
        <Form.Item label="node price" name="node_price">
          <span>
            {empty(configInfo?.price) ? '--' : `${configInfo?.price} JCT/day`}
          </span>
        </Form.Item>
        <Form.Item
          label="instance quantity"
          name="purchase_instance_quantity"
          rules={[
            {
              required: true,
              message: 'please enter purchase instance quantity',
            },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="please enter purchase instance quantity"
          />
        </Form.Item>
        <Form.Item
          label="duration"
          name="purchase_duration"
          rules={[
            { required: true, message: 'please enter purchase duration' },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="please enter duration"
          />
        </Form.Item>
        <Form.Item
          label="duration unit"
          name="purchase_duration_unit"
          rules={[
            {
              required: true,
              message: 'please select purchase duration unit',
            },
          ]}
        >
          <Select
            options={Object.keys(Duration).map((item) => ({
              label: item,
              value: item,
            }))}
            width="100%"
            placeholder="please select purchase duration unit"
          ></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PayModal;
