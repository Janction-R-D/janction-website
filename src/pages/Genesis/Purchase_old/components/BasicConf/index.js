import { Button, Checkbox, Divider, Form, Input, Select } from 'antd';
import JanctionRange from '@/components/JanctionRange';
import { useState } from 'react';
import styles from './index.less';
import { PORT_PROTOCOL } from '../../extra';
import JanctionTip from '@/components/JanctionTip';
import PurchaseCard from '../Card';
import LabelVal from '../Card/LabelVal';
import JanctionDivider from '@/components/JanctionDivider';
import JanctionInput from '@/components/JanctionInput';
import { Duration } from '@/constant';
import JanctionSelect from '@/components/JanctionSelect';

const BasicConf = (props) => {
  const [instQuanlity, setInstQuanlity] = useState(1);
  const [duration, setDuration] = useState(1);
  const [isAuto, setIsAuto] = useState(false);

  const onInstQuaChange = (value) => {
    setInstQuanlity(value);
  };
  const onDurationChange = (value) => {
    setDuration(value);
  };
  const onCheckedChange = (e) => {
    setIsAuto(e.target.checked);
  };

  return (
    <PurchaseCard title="Basic configuration">
      {/* <LabelVal name="Login role" align="flex-start">
        <div className={styles['vertical-value']}>
          <Form.Item
            name="region"
            rules={[{ required: true, message: 'please select login role' }]}
          >
            <Checkbox.Group options={PORT_PROTOCOL} defaultValue={['Apple']} />
          </Form.Item>
          <p className={styles['desc']}>
            Root has the highest permission of the operating system. Using root
            as the login name may cause security risks. It is recommended that
            you use user as the login name.
          </p>
        </div>
      </LabelVal>
      <LabelVal name="Login password">
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'please enter password' }]}
          hasFeedback
        >
          <JanctionInput type="password" placeholder="Please enter password" />
        </Form.Item>
      </LabelVal>
      <LabelVal name="Confirm password">
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <JanctionInput type="password" placeholder="Please enter password" />
        </Form.Item>
      </LabelVal>
      <JanctionDivider /> */}
      <LabelVal name="Purchase instance quantity">
        <Form.Item
          name="purchase_instance_quantity"
          rules={[
            {
              required: true,
              message: 'please enter purchase instance quantity',
            },
          ]}
        >
          <JanctionRange />
        </Form.Item>
      </LabelVal>
      <LabelVal name="Purchase duration">
        <div className="df ai_c gap10">
          <Form.Item
            name="purchase_duration"
            rules={[
              {
                required: true,
                message: 'please enter purchase duration',
              },
            ]}
          >
            <JanctionRange value={duration} onChange={onDurationChange} />
          </Form.Item>
        </div>
      </LabelVal>
      <LabelVal name="Purchase duration unit">
        <Form.Item
          name="purchase_duration_unit"
          rules={[
            {
              required: true,
              message: 'please select purchase duration unit',
            },
          ]}
        >
          <JanctionSelect
            placeholder="please select purchase duration unit"
            options={Object.keys(Duration).map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </Form.Item>
      </LabelVal>
      {/* <LabelVal name="Automatic renewal">
        <Form.Item name="automatic_renewal">
          <Checkbox>Enable automatic renewal</Checkbox>
        </Form.Item>
      </LabelVal> */}
    </PurchaseCard>
  );
};

export default BasicConf;
