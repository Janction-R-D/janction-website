import { Duration, DURATION_OPTIONS } from '@/constant';
import { Form, InputNumber, Select } from 'antd';
import LabelVal from '../Card/LabelVal';
import styles from './index.less';

const PurDuration = (props) => {
  return (
    <div className={styles['duration-wrapper']}>
      <LabelVal nameWidthAuto name="Purchase duration">
        <div className={styles['input-group']}>
          <Form.Item
            name={['purDuration', 'value']}
            noStyle
            initialValue={1}
            rules={[{ required: true, message: 'please input duration value' }]}
          >
            <InputNumber bordered={false} min={1} style={{ width: '200px' }} />
          </Form.Item>
          <Form.Item
            name={['purDuration', 'unit']}
            noStyle
            initialValue={Duration.Month}
            rules={[{ required: true, message: 'please select duration type' }]}
          >
            <Select
              bordered={false}
              options={DURATION_OPTIONS}
              style={{ width: '105px' }}
            ></Select>
          </Form.Item>
        </div>
      </LabelVal>
    </div>
  );
};

export default PurDuration;
