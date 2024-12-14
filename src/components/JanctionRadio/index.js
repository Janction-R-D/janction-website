import { Radio } from 'antd';
import styles from './index.less';
import { useEffect, useState } from 'react';

const JanctionRadio = (props) => {
  const { value, type, onChange, options = [] } = props;

  const [active, setActive] = useState();

  useEffect(() => {
    setActive(value);
  }, [value]);

  return (
    <Radio.Group
      value={active}
      className={[
        styles['janction-radio'],
        type && styles[`janction-${type}-radio`],
      ]}
      onChange={(e) => {
        setActive(e.target.value);
        onChange && onChange(e.target.value);
      }}
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
