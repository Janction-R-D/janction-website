import { Radio } from 'antd';
import styles from './index.less';

const JanctionRadio = (props) => {
  const { type, defaultValue, onChange, options = [] } = props;
  return (
    <Radio.Group
      defaultValue={defaultValue}
      className={[
        styles['janction-radio'],
        type && styles[`janction-${type}-radio`],
      ]}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((item) => (
        <Radio.Button value={item.value} key={item.value}>
          {item.label}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

export default JanctionRadio;
