import { Card, Collapse, Divider, Form, Switch } from 'antd';

import styles from './index.less';
import { useEffect, useState } from 'react';
import Operating from './Quick/Operating';

import AsidePrice from './Quick/AsidePrice/AsidePrice';
import Instances from './Quick/Instances';
import Specification from './Quick/Specification';
import { history } from 'umi';
import ToggleSwitch from './Quick/ToggelSwitch';
import FrameworkAi from './Customized/FrameworkAi';
import QuickTable from './Quick/QuickTable';

const Quick = (props) => {
  const [form] = Form.useForm();
  const [isGrid, setIsGrid] = useState(false);
  const [formValues, setFormValues] = useState({});
  useEffect(() => {
    console.log(formValues);
  }, [formValues, isGrid]);
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
        <section className={styles['header-desc']}>
          <h1 className={styles['title']}>Quick Purchase</h1>
          <p>
            Mobile is convenient, and large users can provide flexible computing
            power.
          </p>
        </section>
        <main className={styles['specification-conf-wrapper']}>
          <p>Instance Specification</p>
          <Card className={styles['specification-card']}>
            <section className={styles['specification-card-header']}>
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
              <section className={styles['switch-container']}>
                <ToggleSwitch isGrid={isGrid} setIsGrid={setIsGrid} />
              </section>
            </section>
            <Form.Item
              name="instance"
              rules={[
                {
                  required: true,
                  message: 'Please select an instance ',
                },
              ]}
            >
              {isGrid ? (
                <Instances styles={styles} />
              ) : (
                <QuickTable formValues={formValues} />
              )}
            </Form.Item>
          </Card>
        </main>
        <Form.Item
          name="operating_system_str"
          rules={[{ required: true, message: 'Please select a processor' }]}
        >
          <Operating />
        </Form.Item>

        <Collapse
          className={styles['custom-collapse']}
          bordered={false}
          defaultActiveKey={1}
        >
          <Collapse.Panel
            header="Pre-installed application (AI Framework)"
            key="1"
          >
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
          </Collapse.Panel>
        </Collapse>
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
