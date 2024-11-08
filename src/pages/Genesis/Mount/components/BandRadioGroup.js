import { Radio } from 'antd';
export const BandRadioGroup = ({ styles }) => {
  return (
    <div className={styles['band-radio-wrapper']}>
      <Radio.Group
        defaultValue="Month"
        buttonStyle="solid"
        style={{
          borderRadius: '24px',
        }}
        className={styles['band-radio']}
        name="billing_mode"
      >
        <Radio.Button value="Day" name="billing_mode">
          Day
        </Radio.Button>
        <Radio.Button value="Week" name="billing_mode">
          Week
        </Radio.Button>
        <Radio.Button value="Month" name="billing_mode">
          Month
        </Radio.Button>
        <Radio.Button value="Year" name="billing_mode">
          Year
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};
