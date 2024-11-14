import Application from './Application';
import BandWidth from './BandWidth';
import PurchaseCard from './Card';
import PurchaseSubCard from './Card/SubCard';
import Footer from './Footer';
import ImageConf from './ImageConf';
import styles from './index.less';
import RegionSelect from './RegionSelect';
import Settlement from './BasicConf';
import Specification from './Specification';
import { Form } from 'antd';
import { history } from 'umi';

const Customized = (props) => {
  const [form] = Form.useForm();

  const onSubmit = async (callback) => {
    try {
      const values = await form.validateFields();
      console.log('『values』', values);
      history.push('/genesis/purchase/settlement');
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
          <PurchaseSubCard title="Instance specification">
            <Form.Item
              name="instance_specification"
              rules={[
                {
                  required: true,
                  message: 'please select instance specification',
                },
              ]}
            >
              <Specification />
            </Form.Item>
          </PurchaseSubCard>
          <PurchaseSubCard title="Image">
            <Form.Item
              name="image"
              rules={[{ required: true, message: 'please select image' }]}
            >
              <ImageConf />
            </Form.Item>
          </PurchaseSubCard>

          <PurchaseSubCard title="Pre-installed application">
            <Form.Item
              name="pre_installed_application"
              rules={[
                {
                  required: true,
                  message: 'please select pre-installed application',
                },
              ]}
            >
              <Application />
            </Form.Item>
          </PurchaseSubCard>
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
          <BandWidth />
        </PurchaseCard>
        <Settlement />
        <Footer isLast onConfirm={onSubmit} />
      </div>
    </Form>
  );
};

export default Customized;
