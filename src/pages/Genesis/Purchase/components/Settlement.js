import { Button, Checkbox } from 'antd';
import JanctionRange from '@/components/JanctionRange';
import { useState } from 'react';
import styles from './index.less';

const Settlement = (props) => {
  const { onPre } = props;
  const [instQuanlity, setInstQuanlity] = useState(1);
  const [duration, setDuration] = useState(1);
  const [isAuto, setIsAuto] = useState(false);
  const [agree, setAgree] = useState(false);

  const onInstQuaChange = (value) => {
    setInstQuanlity(value);
  };
  const onDurationChange = (value) => {
    setDuration(value);
  };
  const onCheckedChange = (e) => {
    setIsAuto(e.target.checked);
  };
  const onAgreeChange = (e) => {
    setAgree(e.target.checked);
  };
  return (
    <div className={styles['settlement-wrapper']}>
      <div className={styles['item']}>
        <div className={styles['name']}>Purchase instance quantity</div>
        <div className={styles['vlaue']}>
          <JanctionRange value={instQuanlity} onChange={onInstQuaChange} />
        </div>
      </div>
      <div className={styles['item']}>
        <div className={styles['name']}>Purchase duration</div>
        <div className={styles['vlaue']}>
          <JanctionRange
            value={duration}
            onChange={onDurationChange}
            unit="Month"
          />
        </div>
      </div>
      <div className={styles['item']}>
        <div className={styles['name']}>Automatic renewal</div>
        <div className={styles['vlaue']}>
          <Checkbox checked={isAuto} onChange={onCheckedChange}>
            Enable automatic renewal
          </Checkbox>
        </div>
      </div>
      <div className={styles['settlement-info']}>
        <div>
          <Checkbox checked={agree} onChange={onAgreeChange}>
            <div className={styles['agree-tip']}>
              I have read and agreed to the <a>relevant service terms</a>.
            </div>
          </Checkbox>
        </div>
        <div className={styles['submit']}>
          <div className={styles['price-info']}>
            <span className={styles['value']}>$34.669</span>
            <div className={styles['detail']}>
              Bill Details
              <i className="iconfont icon-next_page"></i>
            </div>
          </div>
          {onPre && (
            <div className={styles['pre']}>
              <Button onClick={onPre}>Previous</Button>
            </div>
          )}
          <div className={styles['confirm']}>
            <Button>Confirm the order</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settlement;
