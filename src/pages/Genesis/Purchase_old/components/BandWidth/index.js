import JanctionRadio from '@/components/JanctionRadio';
import JanctionRange from '@/components/JanctionRange';
import { Checkbox, Form } from 'antd';
import { PRIMARY_BAND } from '../../extra';
import LabelVal from '../Card/LabelVal';
import styles from './index.less';
import { useState } from 'react';

const BandWidth = (props) => {
  const [bandWidth, setBandWidth] = useState();

  const onBandWidthValueChange = (value) => {
    setBandWidth(value);
  };

  return (
    <div className={styles['band-width-wrapper']}>
      <LabelVal name="Public IP">
        <div className={styles['ip-vlaue']}>
          <Form.Item name="ip">
            <Checkbox>
              <span>
                Assign a public <a>IPv4</a> address
              </span>
            </Checkbox>
          </Form.Item>
        </div>
      </LabelVal>
      <LabelVal name="Bandwidth value">
        <div className={styles['bandwidth-value']}>
          <div className={styles['band-radio-wrapper']}>
            <Form.Item
              name="bandwidth_value"
              rules={[
                {
                  required: true,
                  message: 'please select bandwidth value',
                },
              ]}
            >
              <JanctionRadio
                type="value"
                options={PRIMARY_BAND}
                onChange={onBandWidthValueChange}
              />
            </Form.Item>
            <span className={styles['unit']}>Mbps</span>
          </div>
          <Form.Item
            name="bandwidth_value"
            rules={[
              {
                required: true,
                message: 'please enter bandwidth value',
              },
            ]}
          >
            <JanctionRange
              value={bandWidth}
              onChange={onBandWidthValueChange}
              unit="Mbps"
            />
          </Form.Item>
        </div>
      </LabelVal>
    </div>
  );
};

export default BandWidth;
