import JanctionTip from '@/components/JanctionTip';
import { Form } from 'antd';
import { history } from 'umi';
import Architecture from './Architecture';
import PurchaseCard from './Card';
import PurchaseSubCard from './Card/SubCard';
import ConnectivityTier from './ConnectivityTier';
import PurDuration from './PurDuration';
import Footer from './Footer';
import styles from './index.less';
import Location from './Location';
import OperatingSystem from './OperatingSystem';
import Processor from './Processor';
import ProductList from './ProductList';
import InternetSelect from './InternetSelect';
import { useState } from 'react';
import { empty } from '@/utils/lang';

const Customized = (props) => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState();

  const onConfirm = async (callback) => {
    try {
      await form.validateFields();
      history.push('/genesis/purchase/settlement', { formValues });
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const onValuesChange = async () => {
    const values = form.getFieldsValue();
    if (values.operating_system_str == 'android') {
      values.Architecture = undefined;
    }
    setFormValues(values);
  };

  return (
    <Form form={form} name="customized" onValuesChange={onValuesChange}>
      <div
        className={[
          styles['config-wrapper'],
          styles['customized-wrapper'],
        ].join(' ')}
      >
        <PurchaseCard title="Basic configuration">
          <PurchaseSubCard title="Operating System">
            <Form.Item name="operating_system_str">
              <OperatingSystem formValues={formValues} />
            </Form.Item>
          </PurchaseSubCard>
          {formValues?.operating_system_str &&
            formValues.operating_system_str !== 'android' && (
              <PurchaseSubCard title="Architecture">
                <Form.Item name="architechture_str">
                  <Architecture formValues={formValues} />
                </Form.Item>
              </PurchaseSubCard>
            )}
          <PurchaseSubCard title="Internet">
            <Form.Item name="internet_type">
              <InternetSelect formValues={formValues} />
            </Form.Item>
          </PurchaseSubCard>
          <PurchaseSubCard title="Connectivity Tier">
            <Form.Item name="network_down">
              <ConnectivityTier defaultValue={1} />
            </Form.Item>
          </PurchaseSubCard>
          <PurchaseSubCard
            title={
              <div className="df ai_c">
                <span>Location</span>
                <JanctionTip />
              </div>
            }
          >
            <Form.Item name="location">
              <Location />
            </Form.Item>
          </PurchaseSubCard>
          <PurchaseSubCard title="Processor">
            <Form.Item name="processor">
              <Processor />
            </Form.Item>
          </PurchaseSubCard>
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

export default Customized;
