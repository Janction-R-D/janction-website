import { empty } from '@/utils/lang';
import styles from './index.less';
import { InputNumber } from 'antd';

const JanctionRange = (props) => {
  const { value, onChange, unit, min = 0, ...extra } = props;

  const onValueChange = (e) => {
    onChange(e);
  };

  const onAdd = () => {
    if (empty(value)) return;
    onChange(value + 1);
  };

  const onSub = () => {
    if (empty(value)) return;
    if (value == min) {
      return;
    }
    onChange(value - 1);
  };

  return (
    <div className={styles['janction-range']}>
      <div className={styles['input-wrapper']}>
        <span onClick={onSub} className={value == min && styles['disabled']}>
          -
        </span>
        <InputNumber
          value={value}
          min={min}
          onChange={onValueChange}
          {...extra}
        />
        <span
          onClick={onAdd}
          className={props.max && value == props.max && styles['disabled']}
        >
          +
        </span>
      </div>
      <span className={styles['unit']}>{unit}</span>
    </div>
  );
};

export default JanctionRange;
