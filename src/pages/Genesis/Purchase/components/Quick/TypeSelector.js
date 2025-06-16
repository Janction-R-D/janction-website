// components/TypeSelector.tsx
import { Radio } from 'antd';
import styles from './selector.less';

const TypeSelector = ({ value, onChange }) => {
  return (
    <Radio.Group
      value={value}
      onChange={onChange}
      className={styles['type-selector']}
    >
      <Radio.Button value="basic-cpu">Basic CPU</Radio.Button>
      <Radio.Button value="high-gpu">High performance GPU</Radio.Button>
      <Radio.Button value="others">Others</Radio.Button>
    </Radio.Group>
  );
};

export default TypeSelector;
