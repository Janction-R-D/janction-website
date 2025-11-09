import { Radio, Select } from 'antd';
import styles from './selector.less';

const { Option } = Select;

const TypeSelector = ({ value = 'basic-cpu', onChange }) => {
  const isFixedOption = ['basic-cpu', 'high-gpu'].includes(value);
  const isCountrySelected = !isFixedOption;

  const handleRadioChange = (e) => {
    onChange(e);
  };

  return (
    <div className={styles['type-selector-container']}>
      <Radio.Group
        value={isCountrySelected ? null : value}
        onChange={handleRadioChange}
        className={styles['type-selector']}
      >
        <Radio.Button value="basic-cpu">Basic CPU</Radio.Button>
        <Radio.Button value="high-gpu">High performance GPU</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default TypeSelector;
