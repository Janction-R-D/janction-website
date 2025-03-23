import { Form } from 'antd';
import { history } from 'umi';
import PurchaseCard from './Card';
import ConnectivityTier from './ConnectivityTier';
import Footer from './Footer';
import styles from './index.less';
import ProductList from './ProductList';
import PurDuration from './PurDuration';
import { useState } from 'react';

const Quick = (props) => {
  const [form] = Form.useForm();

  const [formValues, setFormValues] = useState();

  const onValuesChange = async () => {
    const values = form.getFieldsValue();
    setFormValues(values);
  };

  const onConfirm = async () => {
    try {
      await form.validateFields();
      history.push('/genesis/purchase/settlement', { formValues });
    } catch (err) {
      console.log('『err』', err);
    }
  };

  return (
    <Form form={form} name="quick" onValuesChange={onValuesChange}>
      <div
        className={[styles['config-wrapper'], styles['quick-wrapper']].join(
          ' ',
        )}
      >
        <PurchaseCard title="Connectivity Tier">
          <Form.Item name="network_down">
            <ConnectivityTier defaultValue={1} />
          </Form.Item>
        </PurchaseCard>
        <PurchaseCard title="Available Instance">
          <Form.Item
            name="node"
            rules={[{ required: true, message: 'please select instance' }]}
          >
            <ProductList formValues={formValues} />
          </Form.Item>
        </PurchaseCard>
        <PurchaseCard>
          <Form.Item name="purDuration">
            <PurDuration />
          </Form.Item>
          <Footer isConfirm onConfirm={onConfirm} />
        </PurchaseCard>
      </div>
    </Form>
  );
};

export default Quick;
