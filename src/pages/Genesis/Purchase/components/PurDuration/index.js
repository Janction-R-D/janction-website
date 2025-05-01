// PurDuration.tsx
import { Duration, DURATION_OPTIONS } from '@/constant';
import { Button, Form, Input, Select } from 'antd';
import LabelVal from '../Card/LabelVal';
import styles from './index.less';

const PurDuration = () => {
  const form = Form.useFormInstance(); // Accede al form padre

  const handleChange = (delta) => {
    const current = form.getFieldValue(['purDuration', 'value']) || 1;
    const next = Math.max(1, current + delta);
    form.setFieldsValue({ purDuration: { value: next } });
  };

  return (
    <div className={styles['duration-wrapper']}>
      <LabelVal nameWidthAuto name="Purchase duration">
        <div className={styles['input-group']}>
          <Button className={styles['btn']} onClick={() => handleChange(-1)}>
            -
          </Button>
          <Form.Item
            name={['purDuration', 'value']}
            noStyle
            rules={[{ required: true, message: 'please input duration value' }]}
          >
            <Input
              type="number"
              bordered={false}
              min={1}
              style={{ width: '60px' }}
              className={styles['input']}
            />
          </Form.Item>
          <Button className={styles['btn']} onClick={() => handleChange(1)}>
            <i className="iconfont icon-add" />
          </Button>
          <Form.Item
            name={['purDuration', 'unit']}
            noStyle
            rules={[{ required: true, message: 'please select duration type' }]}
          >
            <Select
              bordered={false}
              options={DURATION_OPTIONS}
              style={{ width: '105px' }}
            />
          </Form.Item>
        </div>
      </LabelVal>
    </div>
  );
};

export default PurDuration;
