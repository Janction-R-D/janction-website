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
import RegionSelect from './RegionSelect';

const Customized = (props) => {
  const [form] = Form.useForm();

  const onConfirm = async (callback) => {
    try {
      const values = await form.validateFields();
      console.log('『values』', values);
      // history.push('/genesis/purchase/settlement');
    } catch (err) {
      console.log('『err』', err);
    }
  };

  return (
    <Form form={form} name="customized">
      <div
        className={[
          styles['config-wrapper'],
          styles['customized-wrapper'],
        ].join(' ')}
      >
        <PurchaseCard title="Basic configuration">
          <PurchaseSubCard title="Operating System">
            <Form.Item
              name="image"
              rules={[{ required: true, message: 'please select image' }]}
            >
              <OperatingSystem />
            </Form.Item>
          </PurchaseSubCard>
          <PurchaseSubCard title="Architecture">
            <Form.Item
              name="architecture"
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
              name="internet"
              rules={[{ required: true, message: 'please select internet' }]}
            >
              <RegionSelect />
            </Form.Item>
          </PurchaseSubCard>
          <PurchaseSubCard title="Connectivity Tier">
            <Form.Item
              name="connectivityTier"
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
          <ProductList />
        </PurchaseCard>
        <PurchaseCard>
          <Form.Item
            name="PurDuration"
            rules={[
              {
                required: true,
                message: 'please select PurDuration',
              },
            ]}
          >
            <PurDuration />
          </Form.Item>
          <Footer isSettlement onConfirm={onConfirm} />
        </PurchaseCard>
      </div>
    </Form>
  );
};

export default Customized;
