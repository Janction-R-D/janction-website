import { Form } from 'antd';
import { history } from 'umi';
import styles from './index.less';
import { useState } from 'react';
import AsidePrice from './AsidePrice/AsidePrice';
import OperatingSystem from './Quick/OperatingSystem';

const Quick = (props) => {
  const [form] = Form.useForm();

  const [formValues, setFormValues] = useState();

  const onValuesChange = async () => {
    const values = form.getFieldsValue();
    setFormValues(values);
  };
  const onFinish = async (values) => {
    console.log(values);
  };
  return (
    <main className={styles['custom-conf-wrapper']}>
      <Form
        form={form}
        name="customized"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        className={styles['form']}
      >
        <Form.Item name="operating_system">
          <OperatingSystem />
        </Form.Item>
      </Form>
      <AsidePrice />
    </main>
  );
};

export default Quick;
