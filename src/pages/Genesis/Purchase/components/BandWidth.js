import JanctionRange from '@/components/JanctionRange';
import { Checkbox, Divider, Radio } from 'antd';
import { useState } from 'react';
import { PRIMARY_BAND } from '../extra';
import styles from './index.less';

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
    <section className={styles['band-width-wrapper']}>
      <h1 className={styles['title']}>Bandwidth</h1>
      <Divider />
      <div className={styles['band-config']}>
        <div className={styles['item']}>
          <div className={styles['name']}>Public IP</div>
          <div className={styles['vlaue']}>
            <Checkbox checked={ipv4} onChange={onIpv4Checked}>
              <span>
                Assign a public <a>IPv4</a> address
              </span>
            </Checkbox>
          </div>
        </div>
        <div className={styles['item']}>
          <div className={styles['name']}>Bandwidth value</div>
          <div className={styles['value']}>
            <div className={styles['band-radio-wrapper']}>
              <Radio.Group
                defaultValue={bandWidth}
                className={styles['band-radio']}
                onChange={(e) => onBandWidthValueChange(e.target.value)}
              >
                {PRIMARY_BAND.map((item) => (
                  <Radio.Button value={item} key={item}>
                    {item}
                  </Radio.Button>
                ))}
              </Radio.Group>
              <span>Mbps</span>
            </div>
            <div>
              <JanctionRange
                value={bandWidth}
                onChange={onBandWidthValueChange}
                unit="Mbps"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BandWidth;
