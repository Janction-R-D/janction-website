import { Button, Checkbox, Divider, Input } from 'antd';
import JanctionRange from '@/components/JanctionRange';
import { useState } from 'react';
import styles from './index.less';
import { PORT_PROTOCOL } from '../../extra';
import JanctionTip from '@/components/JanctionTip';
import PurchaseCard from '../Card';
import LabelVal from '../Card/LabelVal';
import JanctionDivider from '@/components/JanctionDivider';
import JanctionInput from '@/components/JanctionInput';

const Settlement = (props) => {
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
      <LabelVal name="Confirm password" align="flex-start">
        <div className={styles['vertical-value']}>
          <Checkbox.Group options={PORT_PROTOCOL} defaultValue={['Apple']} />
          <p className={styles['desc']}>
            Root has the highest permission of the operating system. Using root
            as the login name may cause security risks. It is recommended that
            you use user as the login name.
          </p>
        </div>
      </LabelVal>
      <LabelVal name="Login password">
        <JanctionInput type="password" placeholder="Please enter password" />
      </LabelVal>
      <LabelVal name="Confirm password">
        <JanctionInput type="password" placeholder="Please enter password" />
      </LabelVal>
      <JanctionDivider />
      <LabelVal name="Purchase instance quantity">
        <JanctionRange value={instQuanlity} onChange={onInstQuaChange} />
      </LabelVal>
      <LabelVal name="Purchase duration">
        <div className="df ai_c gap10">
          <JanctionRange
            value={duration}
            onChange={onDurationChange}
            unit="Month"
          />
          <JanctionTip title="" />
        </div>
      </LabelVal>
      <LabelVal name="Automatic renewal">
        <div className={styles['vlaue']}>
          <Checkbox checked={isAuto} onChange={onCheckedChange}>
            Enable automatic renewal
          </Checkbox>
        </div>
      </LabelVal>
    </PurchaseCard>
  );
};

export default Settlement;
