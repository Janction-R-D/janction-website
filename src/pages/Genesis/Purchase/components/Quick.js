import JanctionInput from '@/components/JanctionInput';
import JanctionSelect from '@/components/JanctionSelect';
import JanctionSteps from '@/components/JanctionSteps';
import { Checkbox, Form } from 'antd';
import { useState } from 'react';
import { PORT_PROTOCOL, SUMMARY, VERSIONS } from '../extra';
import BandWidth from './BandWidth';
import ProductList from './ProductList';
import PurchaseCard from './Card';
import LabelVal from './Card/LabelVal';
import PurchaseSubCard from './Card/SubCard';
import Footer from './Footer';
import styles from './index.less';
import PublicIp from './PublicIp';
import RegionSelect from './RegionSelect';
import BasicConf from './BasicConf';
import Storage from './Storage';
import { history } from 'umi';

const Step1 = (props) => {
  return (
    <>
      <PurchaseCard title="Basic configuration">
        <PurchaseSubCard title="Region">
          <Form.Item
            name="region"
            rules={[{ required: true, message: 'please select region' }]}
          >
            <RegionSelect />
          </Form.Item>
        </PurchaseSubCard>
      </PurchaseCard>

      <PurchaseCard title="Bandwidth">
        <Form.Item
          name="basic_configuration"
          rules={[
            { required: true, message: 'please select basic configuration' },
          ]}
        >
          <ProductList />
        </Form.Item>
        <Form.Item
          name="public_ip"
          rules={[{ required: true, message: 'please select public ip' }]}
        >
          <PublicIp />
        </Form.Item>
        <Form.Item
          name="version"
          rules={[{ required: true, message: 'please select region' }]}
        >
          <JanctionSelect
            options={VERSIONS}
            placeholder="Select version"
            className="w300"
          />
        </Form.Item>
      </PurchaseCard>
    </>
  );
};

const Step2 = () => {
  return (
    <>
      <PurchaseCard title="Storage">
        <Form.Item
          name="storage"
          rules={[{ required: true, message: 'please enter name' }]}
        >
          <Storage />
        </Form.Item>
      </PurchaseCard>
      <PurchaseCard title="Bandwidth">
        <BandWidth />
      </PurchaseCard>
      <PurchaseCard title="Security group">
        <LabelVal name="Name">
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'please enter name' }]}
          >
            <JanctionInput placeholder="Please enter name" />
          </Form.Item>
        </LabelVal>
        <LabelVal name="Enable IPv4 port/protocol">
          <Form.Item
            name="enable_ipv4_port"
            rules={[
              {
                required: true,
                message: 'please select enable ipv4 port or protocol',
              },
            ]}
          >
            <Checkbox.Group options={PORT_PROTOCOL} defaultValue={['Apple']} />
          </Form.Item>
        </LabelVal>
      </PurchaseCard>
    </>
  );
};

const Step3 = () => {
  return (
    <>
      <PurchaseCard title="Configuration summary">
        {SUMMARY.map((item, index) => (
          <LabelVal name={item.name} key={index}>
            <span className={styles['summary-value']}>{item.value}</span>
          </LabelVal>
        ))}
      </PurchaseCard>
      <BasicConf />
    </>
  );
};

const STEPS = [
  { title: 'Select the basic configuration', value: 0 },
  { title: 'Instance & Image', value: 1 },
  { title: 'Final confirmation', value: 2 },
];

const Quick = (props) => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(0);

  const onNext = async (callback) => {
    try {
      const values = await form.validateFields();
      setStep(step + 1);
      console.log('『values』', values);
    } catch (err) {
      console.log('『err』', err);
    }
  };
  const onPre = () => {
    setStep(step - 1);
  };

  const onConfirm = async (callback) => {
    try {
      const values = await form.validateFields();
      console.log('『values』', values);
      history.push('/genesis/purchase/settlement');
    } catch (err) {
      console.log('『err』', err);
    }
  };

  return (
    <Form form={form} name="quick">
      <div
        className={[styles['config-wrapper'], styles['quick-wrapper']].join(
          ' ',
        )}
      >
        <PurchaseCard>
          <JanctionSteps step={step} steps={STEPS} />
        </PurchaseCard>
        {step == 0 && <Step1 />}
        {step == 1 && <Step2 />}
        {step == 2 && <Step3 />}
        <Footer
          isFirst={step == 0}
          isLast={step == 2}
          onPre={onPre}
          onNext={onNext}
          onConfirm={onConfirm}
        />
      </div>
    </Form>
  );
};

export default Quick;
