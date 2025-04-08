import JanctionTip from '@/components/JanctionTip';
import { sendImageToServer } from '@/services/genesis';
import { Button, Card, Form, InputNumber, message } from 'antd';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import styles from '../index.less';

export default function UserAssets({ data, duration, setDuration }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEmpty(data?.assets)) return;
    form.setFieldsValue(data?.assets);
  }, [data]);

  const onSubmit = async () => {
    try {
      const assets = await form.validateFields();
      await sendImageToServer({ assets });
      message.success('Update success!');
    } catch (err) {
      console.log('『err』', err);
    }
  };

  return (
    <Card className={styles['card']}>
      <section className={styles['card-header']}>
        <h3>Staking your assets</h3>
        <JanctionTip title="Bet your empty currency to earn rewards and help maintain network security." />
      </section>
      <Form form={form} initialValues={data?.assets}>
        <section className={styles['card-assets-items']}>
          <div>
            <p>Quantity pledged (USDT)</p>
            <Form.Item noStyle name="amount">
              <InputNumber
                min={0}
                className={styles['card-assets-input']}
                addonAfter="USDT"
              />
            </Form.Item>
          </div>
          <div>
            <p>Duration pledged (Months)</p>
            <Form.Item noStyle name="duration_months">
              <InputNumber
                min={0}
                className={styles['card-assets-input']}
                addonAfter="Months"
              />
            </Form.Item>
          </div>
          <div>
            <p>Anticipated income</p>
            <Form.Item noStyle name="anticipated_income">
              <InputNumber
                min={0}
                className={styles['card-assets-input']}
                addonAfter="USDT"
              />
            </Form.Item>
          </div>
        </section>
      </Form>
      <Button
        className={styles['create-btn']}
        style={{ paddingInline: '28px', marginTop: '12px' }}
        onClick={onSubmit}
      >
        Save
      </Button>
    </Card>
  );
}
