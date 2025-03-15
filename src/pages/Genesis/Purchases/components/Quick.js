import { Divider, Form } from 'antd';

import styles from './index.less';
import { useEffect, useState } from 'react';
import Operating from './Quick/Operating';
import FrameworkAi from './Quick/FrameworkAi';
import AsidePrice from './AsidePrice/AsidePrice';
import Instances from './Quick/Instances';
import Specification from './Quick/Specification';

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
  return (
    <main className={styles['quick-conf-wrapper']}>
      <Form
        form={form}
        name="customized"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        className={styles['form']}
      >
        <Form.Item name="specification">
          <Specification />
        </Form.Item>
        <Form.Item
          name="operating_system_str"
          rules={[{ required: true, message: 'Please select a processor' }]}
        >
          <Operating />
        </Form.Item>
        <Form.Item name="instance">
          <Instances />
        </Form.Item>
        <Form.Item name="ai_framework">
          <FrameworkAi formValues={formValues} />
        </Form.Item>
      </Form>
      <Divider type="vertical" className={styles['divider']} />
      <AsidePrice formValues={formValues} />
    </main>
  );
};

export default Quick;
