import { Form } from 'antd';
import { history } from 'umi';
import PurchaseCard from './Card';
import ConnectivityTier from './ConnectivityTier';
import Footer from './Footer';
import styles from './index.less';
import ProductList from './ProductList';
import PurDuration from './PurDuration';

const Quick = (props) => {
  const [form] = Form.useForm();

  const onConfirm = async (callback) => {
    try {
      // const values = await form.validateFields();
      const values = await form.getFieldsValue();
      console.log('『values』', values);
      history.push('/genesis/purchase/settlement', { formValues: values });
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
        <PurchaseCard title="Available Instance">
          <Form.Item
            name="node"
            rules={[{ required: true, message: 'please select instance' }]}
          >
            <ProductList />
          </Form.Item>
        </PurchaseCard>
        <PurchaseCard title="Connectivity Tier">
          <Form.Item
            name="connectivityTier"
            rules={[
              {
                required: true,
                message: 'please select connectivity tier',
              },
            ]}
            initialValue={1}
          >
            <ConnectivityTier defaultValue={1} />
          </Form.Item>
        </PurchaseCard>
        <PurchaseCard>
          <Form.Item
            name="duration"
            rules={[
              {
                required: true,
                message: 'please select duration',
              },
            ]}
            initialValue={{ value: undefined, unit: 'Month' }}
          >
            <PurDuration />
          </Form.Item>
          <Footer isConfirm onConfirm={onConfirm} />
        </PurchaseCard>
      </div>
    </Form>
  );
};

export default Quick;
