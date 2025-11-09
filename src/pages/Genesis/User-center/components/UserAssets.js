import JanctionTip from '@/components/JanctionTip';
import { sendImageToServer } from '@/services/genesis';
import { Button, Card, Form, InputNumber, message } from 'antd';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useIntl } from 'umi';
import styles from '../index.less';

export default function UserAssets({ data, duration, setDuration }) {
  const [form] = Form.useForm();
  const intl = useIntl();

  useEffect(() => {
    if (isEmpty(data?.assets)) return;
    form.setFieldsValue(data?.assets);
  }, [data]);

  const onSubmit = async () => {
    try {
      const assets = await form.validateFields();
      await sendImageToServer({ assets });
      message.success(
        intl.formatMessage({
          id: 'userAssets.updateSuccess',
          defaultMessage: 'Update success!',
        }),
      );
    } catch (err) {
      console.log('『err』', err);
    }
  };

  return (
    <Card className={styles['card']}>
      <section className={styles['card-header']}>
        <h3>
          {intl.formatMessage({
            id: 'userAssets.title',
            defaultMessage: 'Staking your assets',
          })}
        </h3>
        <JanctionTip
          title={intl.formatMessage({
            id: 'userAssets.tip',
            defaultMessage:
              'Bet your empty currency to earn rewards and help maintain network security.',
          })}
        />
      </section>
      <Form form={form} initialValues={data?.assets}>
        <section className={styles['card-assets-items']}>
          <div>
            <p>
              {intl.formatMessage({
                id: 'userAssets.amount',
                defaultMessage: 'Quantity pledged (USDT)',
              })}
            </p>
            <Form.Item noStyle name="amount">
              <InputNumber
                min={0}
                className={styles['card-assets-input']}
                placeholder={intl.formatMessage({
                  id: 'userAssets.placeholder.amount',
                  defaultMessage: 'Please enter the amount pledged',
                })}
                addonAfter="USDT"
              />
            </Form.Item>
          </div>
          <div>
            <p>
              {intl.formatMessage({
                id: 'userAssets.duration',
                defaultMessage: 'Duration pledged (Months)',
              })}
            </p>
            <Form.Item noStyle name="duration_months">
              <InputNumber
                min={0}
                className={styles['card-assets-input']}
                addonAfter={intl.formatMessage({
                  id: 'userAssets.duration.unit',
                  defaultMessage: 'Months',
                })}
              />
            </Form.Item>
          </div>
          <div>
            <p>
              {intl.formatMessage({
                id: 'userAssets.income',
                defaultMessage: 'Anticipated income',
              })}
            </p>
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
        className={styles['connect-btn']}
        style={{ paddingInline: '28px', marginTop: '12px' }}
        onClick={onSubmit}
      >
        {intl.formatMessage({
          id: 'userAssets.save',
          defaultMessage: 'Save',
        })}
        <div className={styles['icon']}>
          <i className="iconfont icon-next" />
        </div>
      </Button>
    </Card>
  );
}
