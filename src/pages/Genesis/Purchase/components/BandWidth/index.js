import JanctionRadio from '@/components/JanctionRadio';
import JanctionRange from '@/components/JanctionRange';
import { Checkbox } from 'antd';
import { PRIMARY_BAND } from '../../extra';
import LabelVal from '../Card/LabelVal';
import styles from './index.less';
import { useState } from 'react';

const BandWidth = (props) => {
  const [bandWidth, setBandWidth] = useState();
  const [ipv4, setIpv4] = useState(false);

  const onIpv4Checked = (e) => {
    setIpv4(e.target.checked);
  };
  const onBandWidthValueChange = (value) => {
    setBandWidth(value);
  };

  return (
    <div className={styles['band-width-wrapper']}>
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
    </div>
  );
};

export default BandWidth;
