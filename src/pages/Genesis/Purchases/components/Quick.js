import { Divider, Form } from 'antd';

import styles from './index.less';
import { useEffect, useState } from 'react';
import Operating from './Quick/Operating';
import FrameworkAi from './Quick/FrameworkAi';
import AsidePrice from './Quick/AsidePrice/AsidePrice';
import Instances from './Quick/Instances';
import Specification from './Quick/Specification';
import { history } from 'umi';

const Quick = (props) => {
  const [form] = Form.useForm();

  const [formValues, setFormValues] = useState({});
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);
  const onValuesChange = async () => {
    const values = form.getFieldsValue();
    setFormValues(values);
  };
  const onFinish = async (values) => {
    console.log(values);
  };
  const onConfirm = async () => {
    try {
      await form.validateFields();
      history.push('/genesis/purchases/settlement', { formValues });
    } catch (err) {
      console.log('『err』', err);
    }
  };
  return (
    <main className={styles['quick-conf-wrapper']}>
      <Form
        form={form}
        name="customized"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        className={styles['form']}
      >
        <Form.Item
          name="specification"
          rules={[
            {
              required: true,
              message: 'Please select an instance specification',
            },
          ]}
        >
          <Specification />
        </Form.Item>
        <Form.Item
          name="operating_system_str"
          rules={[{ required: true, message: 'Please select a processor' }]}
        >
          <Operating />
        </Form.Item>
        <Form.Item
          name="instance"
          rules={[
            {
              required: true,
              message: 'Please select an instance ',
            },
          ]}
        >
          <Instances />
        </Form.Item>
        <Form.Item
          name="ai_framework"
          rules={[
            {
              required: true,
              message: 'Please select a pre-installed application option',
            },
          ]}
        >
          <FrameworkAi formValues={formValues} />
        </Form.Item>
      </Form>
      <Divider type="vertical" className={styles['divider']} />
      <AsidePrice
        formValues={formValues}
        styles={styles}
        onConfirm={onConfirm}
      />
    </main>
  );
};

export default Quick;
