import { Duration } from '@/constant';
import { capitalizeFirstLetter } from '@/utils/lang';
import { InputNumber, Select } from 'antd';
import LabelVal from '../Card/LabelVal';
import styles from './index.less';

const PurDuration = (props) => {
  const { value = {}, onChange } = props;

  const onInputChange = (val) => {
    onChange({ ...value, value: val });
  };
  const onSelectChange = (val) => {
    onChange({ ...value, unit: val });
  };

  return (
    <div className={styles['duration-wrapper']}>
      <LabelVal nameWidthAuto name="Purchase duration">
        <div className={styles['input-group']}>
          <InputNumber
            bordered={false}
            defaultValue={value}
            min={1}
            style={{ width: '200px' }}
            onChange={onInputChange}
          />
          <Select
            bordered={false}
            options={Object.keys(Duration).map((item) => ({
              label: capitalizeFirstLetter(item),
              value: item,
            }))}
            style={{ width: '105px' }}
            onChange={onSelectChange}
          ></Select>
        </div>
      </LabelVal>
    </div>
  );
};

export default PurDuration;
