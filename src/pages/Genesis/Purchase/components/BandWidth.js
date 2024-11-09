import JanctionRange from '@/components/JanctionRange';
import { Checkbox, Divider, Radio } from 'antd';
import { useState } from 'react';
import { PRIMARY_BAND } from '../extra';
import styles from './index.less';
import PurchaseCard from './Card';
import LabelVal from './Card/LabelVal';
import JanctionRadio from '@/components/JanctionRadio';

const BandWidth = (props) => {
  const [ipv4, setIpv4] = useState(false);
  const [bandWidth, setBindWidth] = useState(1);

  const onIpv4Checked = (e) => {
    setIpv4(e.target.checked);
  };
  const onBandWidthValueChange = (value) => {
    setBindWidth(value);
  };

  return (
    <PurchaseCard title="Bandwidth">
      <LabelVal name="Public IP">
        <div className={styles['ip-vlaue']}>
          <Checkbox checked={ipv4} onChange={onIpv4Checked}>
            <span>
              Assign a public <a>IPv4</a> address
            </span>
          </Checkbox>
        </div>
      </LabelVal>
      <LabelVal name="Bandwidth value">
        <div className={styles['bandwidth-value']}>
          <div className={styles['band-radio-wrapper']}>
            <JanctionRadio
              type="value"
              options={PRIMARY_BAND}
              onChange={onBandWidthValueChange}
            />
            <span className={styles['unit']}>Mbps</span>
          </div>
          <JanctionRange
            value={bandWidth}
            onChange={onBandWidthValueChange}
            unit="Mbps"
          />
        </div>
      </LabelVal>
    </PurchaseCard>
  );
};

export default BandWidth;
