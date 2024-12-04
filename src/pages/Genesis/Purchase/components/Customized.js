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

const Customized = (props) => {
  const [form] = Form.useForm();

  const [formValues, setFormValues] = useState();

  const onConfirm = async (callback) => {
    try {
      // const values = await form.validateFields();
      const values = await form.getFieldsValue();
      // console.log('『values』', values);
      history.push('/genesis/purchase/settlement', { formValues: values });
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const onValuesChange = async () => {
    const values = form.getFieldsValue();
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
            <Form.Item
              name="operating_system_str"
              rules={[{ required: true, message: 'please select image' }]}
            >
              <OperatingSystem />
            </Form.Item>
          </PurchaseSubCard>
          <PurchaseSubCard title="Architecture">
            <Form.Item
              name="architechture_str"
              rules={[
                {
                  required: true,
                  message: 'please select architecture',
                },
              ]}
            >
              <Architecture />
            </Form.Item>
          </PurchaseSubCard>
          <PurchaseSubCard title="Internet">
            <Form.Item
              name="internet_type"
              rules={[{ required: true, message: 'please select internet' }]}
            >
              <InternetSelect />
            </Form.Item>
          </PurchaseSubCard>
          <PurchaseSubCard title="Connectivity Tier">
            <Form.Item
              name="network_down"
              rules={[
                {
                  required: true,
                  message: 'please select connectivity tier',
                },
              ]}
            >
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
            <Form.Item
              name="location"
              rules={[
                {
                  required: true,
                  message: 'please select location',
                },
              ]}
            >
              <Location />
            </Form.Item>
          </PurchaseSubCard>
          <PurchaseSubCard title="Processor">
            <Form.Item
              name="processor"
              rules={[
                {
                  required: true,
                  message: 'please select processor',
                },
              ]}
            >
              <Processor />
            </Form.Item>
          </PurchaseSubCard>
        </PurchaseCard>
        <PurchaseCard title="Available Instance">
          <ProductList formValues={formValues} />
        </PurchaseCard>
        <PurchaseCard>
          <Form.Item
            name="purDuration"
            rules={[
              {
                required: true,
                message: 'please select PurDuration',
              },
            ]}
          >
            <PurDuration />
          </Form.Item>
          <Footer isConfirm onConfirm={onConfirm} />
        </PurchaseCard>
      </div>
    </Form>
  );
};

export default Customized;
