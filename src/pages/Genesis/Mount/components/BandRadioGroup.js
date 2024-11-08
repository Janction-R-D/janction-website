import { Radio } from 'antd';
import { useEffect, useState } from 'react';
export const BandRadioGroup = ({ styles, userInfo }) => {
  const [defaultTime, setDefaultTime] = useState('day');
  useEffect(() => {
    if (userInfo?.node_id) {
      setDefaultTime(userInfo?.billing_mode);
      console.log(userInfo?.billing_mode);
    }
  }, [userInfo]);
  return (
    <div className={styles['band-radio-wrapper']}>
      <Radio.Group
        defaultValue={defaultTime}
        buttonStyle="solid"
        style={{
          borderRadius: '24px',
        }}
        className={styles['band-radio']}
        name="billing_mode"
      >
        <Radio.Button value="day" name="billing_mode">
          day
        </Radio.Button>
        <Radio.Button value="week" name="billing_mode">
          week
        </Radio.Button>
        <Radio.Button value="month" name="billing_mode">
          month
        </Radio.Button>
        <Radio.Button value="year" name="billing_mode">
          year
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};
